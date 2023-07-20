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
const DynamicBasicChart = dynamic(() => import('./chart'), { 
  loader: () => import('./chart'),
  ssr: false 
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ItemBlack = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backGroundColor: theme.palette.text.primary,
}));
const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));
const BlackBox = styled(Box)(({ theme }) => ({
  paddingTop:15,
  paddingBottom:15,
}));
const WrappedImageBox = () => (
  <BlackBox>
    <ImageBox
      Width={'100%'}
      Height={'400px'}
      MarginRight={'0px'}
      MarginLeft={'0px'}
      MarginTop={'0px'}
      imageSrc="/images/spa.svg"
    />
  </BlackBox>
);

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
  handleIsWarning:() => void;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleSuppressedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  activeWarnings:WarningInstance[];
  acknowledgedWarnings:WarningInstance[];
  valuesOfInterest:string[];
  valueOfInterestUnits:string[];
  valuesOfInterestData:number[];
  valuesOfInterestDefaultLimits:number[];
  valuesOfInterestCurrentLimits:{ [key: string]: number; }
  setValuesOfInterest:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestData:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestDefualtLimits:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestUnits:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestCurrentLimits:(newDict: { [key: string]: number; }, dashNumber: number) => void
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

export default function GeneralGrid({throttleStream,brakeStream,speedStream,suggestedGear,currentGear,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,lastLapTime,bestLapTime,lapTimer,track,distanceInLap,handleAcknowledgedWarnings,handleActiveWarnings,handleSuppressedWarnings,handleIsWarning,activeWarnings,acknowledgedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestData,valuesOfInterestDefaultLimits}:GeneralGridProps) {
 
  const handleSetNewWarning=(updatedValuesOfInterest:string[],updatedValuesOfInterestData:number[],updatedValuesOfInterestUnits:string[],updatedValuesOfInterestDefualtLimits:number[])=>{
    setValuesOfInterest(updatedValuesOfInterest,1);
    setValuesOfInterestData(updatedValuesOfInterestData,1);
    setValuesOfInterestDefualtLimits(updatedValuesOfInterestDefualtLimits,1);
    setValuesOfInterestUnits(updatedValuesOfInterestUnits,1);
  }
  const handleSetLimits=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimits(newDict,1);
  }
  useEffect(() => {
  }, [valuesOfInterestCurrentLimits]);

  useEffect(() => {
    for(let i=0; i<valuesOfInterest.length;i++){
      console.log(valuesOfInterestCurrentLimits[`limit${i}`]);
      if((valuesOfInterestData[i]>=valuesOfInterestCurrentLimits[`limit${i}`])&&(activeWarnings!==undefined)){
        const warningExists = activeWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )//;
        const warningIsIgnored = acknowledgedWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if ((!warningExists)&&(!warningIsIgnored)) {
        handleActiveWarnings(true,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
        handleIsWarning();
        }
      }else if((valuesOfInterestData[i]<valuesOfInterestCurrentLimits[`limit${i}`])&&(activeWarnings!==undefined)){
        const warningExists = activeWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        const warningIsIgnored = acknowledgedWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if (warningExists) {
          handleActiveWarnings(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
          handleIsWarning();
          }else if(warningIsIgnored){
            handleAcknowledgedWarnings(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
            handleIsWarning();
          }
      }
    }
  }, [valuesOfInterest.length, valuesOfInterestData,valuesOfInterestCurrentLimits]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Box sx={{ width: '98%',backgroundColor:'#F6F6F6', margin:1, padding:1, borderRadius:2, border: '1px solid grey' ,boxShadow:1}}><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings}/></Box></Grid>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp} ></TyreTemps></Box></ItemCentered>
        </Grid>
        <Grid item xs={3}>
          <Item><Box sx={{backgroundColor:'black'}}>{lapTimer}<Test testOffset={distanceInLap}targetSrc={getTrackPath(track)} trackName={checkTrackStatus(track)} /></Box></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={speedStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><TwoValueDisplay dataValueOne={currentGear} dataValueTwo={suggestedGear} nameOne={"Current Gear"} nameTwo={"Suggested Gear"}></TwoValueDisplay></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><SmallLapTable lastLapTime={lastLapTime} bestLapTime={bestLapTime}></SmallLapTable></Item>
        </Grid>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={brakeStream} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}