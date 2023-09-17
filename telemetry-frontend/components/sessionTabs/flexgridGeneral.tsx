import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import SignalRService from '../../utils/signalrEndpoint';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import ImageBox from '../homepageTrack';
import GearDisplay from './gearDisplay.';
import SmallLapTable from './lapTimeTable';
import TwoValueDisplay from './gearDisplay.';
import Test from '../liveTrack';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import ActualWarningModal from '../warningDashboard/actualWarningModal';
import WarningInstance from '../../interfaces/warningInterface';
import Homepage from '../background/background';
import alterSuggestedGearWhenAtLimit from '../../utils/alterSuggestedGear';
import { convertKMHToMPH, convertToPercentage, getSpeedUnits, getXAxisLabel } from '../../utils/converters';
import { SettingsContext } from '../authProviderSettings';
import axios, { AxiosResponse } from 'axios';
import ActiveChallenge from './activeChallenge';
import convertSecondsToTime, { convertTimeToSeconds } from '../../utils/secondsToString';

const DynamicBasicChart = dynamic(() => import('./chart'), { 
  loader: () => import('./chart'),
  ssr: false 
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(8, 13, 56, 0)' : 'rgba(8, 13, 56, 0)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(8, 13, 56, 0)' : 'rgba(8, 13, 56, 0)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));



interface GeneralGridProps{
  throttleStream: { x: number; y: number; }[];
  brakeStream: { x: number; y: number; }[];
  speedStream: { x: number; y: number; }[];
  suggestedGear:number;
  currentGear:number;
  frontLeftTemp:number;
  frontRightTemp:number;
  rearLeftTemp:number;
  rearRightTemp:number;
  lastLapTime:string;
  bestLapTime:string;
  lapTimer:string;
  track:string| string[] | undefined;
  distanceInLap:number;
  compound:string;
  setup:string;
  handleIsWarning:() => void;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleSuppressedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  activeWarnings:WarningInstance[];
  acknowledgedWarnings:WarningInstance[];
  handleActiveWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleAcknowledgedWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  activeWarningsLower:WarningInstance[];
  acknowledgedWarningLower:WarningInstance[];
  valuesOfInterest:string[];
  valueOfInterestUnits:string[];
  valuesOfInterestData:number[];
  valuesOfInterestDefaultLimits:number[];
  valuesOfInterestCurrentLimits:{ [key: string]: number; }
  valuesOfInterestCurrentLimitsLower:{ [key: string]: number; }
  valuesOfInterestGreaterThanWarning:boolean[];
  setValuesOfInterest:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestData:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestDefualtLimits:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestUnits:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestCurrentLimits:(newDict: { [key: string]: number; }, dashNumber: number) => void
  setValuesOfInterestCurrentLimitsLower:(newDict: { [key: string]: number; }, dashNumber: number) => void
  packetFlag:boolean;
  valuesOfInterestUnits: string[];
  handleSetWarning: (
    updatedValuesOfInterest: string[],
    updatedValuesOfInterestData: number[],
    updatedValuesOfInterestUnits: string[],
    updatedValuesOfInterestDefualtLimits: number[]
  ) => void;
  handleSetLimits: (newDict: { [key: string]: number },readyFlag:number) => void;
  handleSetLimitsLower: (newDict: { [key: string]: number },readyFlag:number) => void;
  challenge:string|string[]|undefined;
  lapCount:number;
}

function checkTrackStatus(track:string| string[] | undefined){
  if(typeof track === "string" ){
    return track
  }return '';
}
function getTrackPath(track:string| string[] | undefined){
  if(typeof track === "string" ){
    return "/images/" + track + ".svg";
  }return "/images/noTrack.svg";
}

interface ChallengeContent{
  Track:string;
  Car:string;
  Target:number;
}

export default function GeneralGrid({throttleStream,brakeStream,speedStream,suggestedGear,currentGear,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,lastLapTime,bestLapTime,lapTimer,track,distanceInLap,handleAcknowledgedWarnings,handleActiveWarnings,handleSuppressedWarnings,handleIsWarning,activeWarnings,acknowledgedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestData,valuesOfInterestDefaultLimits,packetFlag,valuesOfInterestGreaterThanWarning,setValuesOfInterestCurrentLimitsLower,handleAcknowledgedWarningsLower,handleActiveWarningsLower,activeWarningsLower,acknowledgedWarningLower,valuesOfInterestCurrentLimitsLower,handleSetLimits,handleSetLimitsLower,handleSetWarning,valuesOfInterestUnits,compound,setup,challenge,lapCount}:GeneralGridProps) {
  const { defaults } = React.useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;
  const [lapsCompleted,setLapsCompleted]=useState(0);


  const [challengeData, setChallengeData] = useState<ChallengeContent[]>([]); 
  const [allChallengesArray, setAllChallengesArray] = useState<any[]>([]);
  const [challengeDataFetched,setChallengeDataFetched]= useState(false);
  const [targetLaps,setTargetLaps]= useState(0);
  const [goal,setGoal]= useState('');
  const [targetValue,setTargetValue]= useState<string|number>();
  const [hasBeenSet,setHasBeenSet]= useState(false);
  const [lastThreeLaps,setLastThreeLaps]= useState<number[]>([]);


useEffect(()=>{
  if(typeof challengeData[0] !== 'undefined'){
      switch(challenge){
          case 'Consistency':
              setTargetLaps(3)
              setGoal(`You must maintain lap times within ${challengeData[0]["Target"]}% of the previous for three consecutive laps`);
              setTargetValue(challengeData[0]["Target"]);
              break;
          case 'Pace':
          setTargetLaps(1)
          setGoal(`You must record a lap time of ${convertSecondsToTime(challengeData[1]["Target"])} for one lap `);
          setTargetValue(challengeData[1]["Target"]);
          break;
          case 'Endurance':
          setTargetLaps(challengeData[2]["Target"])
          setGoal(`You must complete ${challengeData[2]["Target"]} laps`);
          setTargetValue(challengeData[2]["Target"]);
          break;
      }
  }
},[challengeData])

  useEffect(()=>{
    const handleChallengeUpdate=(originalIndex:number)=>{
        const challengeArray: ChallengeContent[] = [];
            for (let i = 0; i < originalIndex; i++) {
              if (allChallengesArray[i]) {
                let itemObject: ChallengeContent = {
                  Track: allChallengesArray[i].Track,
                  Car: allChallengesArray[i].Car,
                  Target: allChallengesArray[i].Target,
                };
                challengeArray.push(itemObject);
                
              }
            }setChallengeData((prevChallengeData) => [...prevChallengeData, ...challengeArray]);
            
      }
      handleChallengeUpdate(3);
  },[challengeDataFetched])
    useEffect(() => {
    const fetchAvailableChallenges = async () => {
      try {
        const Type = "Challenge"
        const  challengeResponse: AxiosResponse = await axios.get('/api/retrievechallengecontentapi', {
          params: { Type },
        });
        if (challengeResponse.data.message === 'Success') {
          setAllChallengesArray(challengeResponse.data.data["ChallengeData"])
          
          setChallengeDataFetched(true); 
         //handle dataychallengeResponse.data.data["VideoData"])
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
  fetchAvailableChallenges();
  },[]);

  const handlePaceChallenge=(target:number)=>{
  if((lastLapTime !== "-00:00:00.0010000") && (lastLapTime !== "")){
    if(target>convertTimeToSeconds(lastLapTime)){
      setHasBeenSet(true);
      setLapsCompleted(1);
      return;
     }
     else if(!hasBeenSet){
      setLapsCompleted(0);
      return;
     }
  }console.log("invalid lap");
  }
  const handleEnduranceChallenge=(target:number)=>{
    if(lapCount>target){//might need to be -1 to account for the first lap being lap 0, or maybe leave as is?
      setHasBeenSet(true);
      setLapsCompleted(target);
      return;
    }else if(!hasBeenSet){
      setLapsCompleted(lapCount);
      return;
     }
  }
  //works fine
  const handleConsistencyChallenge=(target:number)=>{
    if((lastLapTime !== "-00:00:00.0010000") && (lastLapTime !== "")){
    if(lastThreeLaps.length<1){
      setLapsCompleted(0);
      return;
    }
    if(lastThreeLaps.length<2){
      setLapsCompleted(1);
      return;
    }
    if(lastThreeLaps.length<3){
      const firstLap=lastThreeLaps[0];
      const secondLap=lastThreeLaps[1];
      //check if they are within target% if yes return 2 else return 1
      //if return value 1 push first value out of array and second value to first positon
      const percentageDifference = Math.abs((secondLap - firstLap) / firstLap) * 100;

      if (percentageDifference <= target) {
        setLapsCompleted(2);
      return;
      } else {
        // Update the lastThreeLaps array
        const updatedLaps = [secondLap];
        setLastThreeLaps(updatedLaps);
        setLapsCompleted(1);
      return;
      }
    }
    if(lastThreeLaps.length=3){
      const secondLap=lastThreeLaps[1];
      const thirdLap=lastThreeLaps[2];
      const percentageDifference = Math.abs((thirdLap - secondLap) / secondLap) * 100;
      if (percentageDifference <= target) {
        setLapsCompleted(3);
      return;
      } else {
        // Update the lastThreeLaps array
        const updatedLaps = [thirdLap];
        setLastThreeLaps(updatedLaps);
        setLapsCompleted(1);
      return;
      }
    }
  }console.log("invalid lap")
  };

  useEffect(()=>{
    const handleLastThreeLaps=()=>{
      if(lastLapTime !== ""){
        setLastThreeLaps((prevLaps) => {
          // Calculate the new value based on the previous state and lastLapTime
          // For example, you can add the new lap time to the beginning and remove the oldest lap time
          const newLaps = [...prevLaps, convertTimeToSeconds(lastLapTime)];
          
          // Ensure that the array only contains the last three lap times
          if (newLaps.length > 3) {
            newLaps.shift(); // Remove the oldest lap time
          }
          
          return newLaps;
        });
      }
      
    }

handleLastThreeLaps();
},[lastLapTime]);

useEffect(()=>{
  const updateChallengeProgress=()=>{
    switch(challenge){
      case 'Consistency':
        handleConsistencyChallenge(targetValue as number);
          break;
      case 'Pace':
      handlePaceChallenge(targetValue as number);
      break;
      case 'Endurance':
        handleEnduranceChallenge(targetValue as number);
     //
      break;
  }
}
updateChallengeProgress();
},[lastThreeLaps,lastLapTime,lapCount])

  return (
  
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      {challenge ? <Grid item xs={12}><Item><Box sx={{display:'flex',alignItems:'center'}}><Box sx={{backgroundColor:'black'}}><ActiveChallenge challenge={challenge} lapsCompleted={lapsCompleted} targetLaps={targetLaps} goal={goal}></ActiveChallenge></Box></Box></Item></Grid>:null}
        
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={convertToPercentage(255,255)} expectedMinValue={0} dataStream={throttleStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp} ></TyreTemps></Box></ItemCentered>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><Box sx={{backgroundColor:'black'}}>{lapTimer}<Test testOffset={distanceInLap}targetSrc={getTrackPath(track)} trackName={checkTrackStatus(track)} /></Box></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={isMetric ? 500 : convertKMHToMPH(500)} expectedMinValue={0} dataStream={speedStream} units={getSpeedUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><TwoValueDisplay dataValueOne={currentGear} dataValueTwo={alterSuggestedGearWhenAtLimit(suggestedGear)} nameOne={"Current Gear"} nameTwo={"Suggested Gear"}></TwoValueDisplay></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><SmallLapTable lastLapTime={lastLapTime} bestLapTime={bestLapTime} compound={compound} setup={setup}></SmallLapTable></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={convertToPercentage(255,255)} expectedMinValue={0} dataStream={brakeStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>

  );
}