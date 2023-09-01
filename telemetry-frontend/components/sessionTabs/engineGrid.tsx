import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import SignalRService from '../../utils/signalrEndpoint';
import { useEffect, useState } from 'react';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import ImageBox from '../homepageTrack';
import GearDisplay from './gearDisplay.';
import SmallLapTable from './lapTimeTable';
import TwoValueDisplay from './gearDisplay.';
import Gauge from '../fuelComponents/fuelGauge';
import WarningInstance from '../../interfaces/warningInterface';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import getFuelOnConsumptionByRelativeFuelLevels, { calculateRemainingFuel } from '../../utils/relativeFuelCalculations';
import FuelDataDisplay from '../fuelComponents/fuelData';


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
      imageSrc="/images/spa.svg" borderRadius={0} hasOverlay={false}    >

      </ImageBox>
  </BlackBox>
);

interface GeneralGridProps{
  throttleStream: { x: number; y: number; }[];
  oilTempStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  turboBoost:number;
  oilPressureStream: { x: number; y: number; }[];
  minAlertRPM:number;
  maxAlertRPM:number;
  fuelStartLap:number;
  gasLevel:number;
  lastLapTime:string;
  gasCapacity:number;
  calculatedMaxSpeed:number;
  transmissionTopSpeed:number;
  waterTempStream: { x: number; y: number; }[];
  lapTimer:string;
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
}
export default function EngineGrid({throttleStream,lapTimer,oilTempStream,rpmStream,minAlertRPM,maxAlertRPM, calculatedMaxSpeed,transmissionTopSpeed,oilPressureStream,waterTempStream,gasCapacity,gasLevel,turboBoost,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,lastLapTime,fuelStartLap,}:GeneralGridProps) {
  const handleSetNewWarning=(updatedValuesOfInterest:string[],updatedValuesOfInterestData:number[],updatedValuesOfInterestUnits:string[],updatedValuesOfInterestDefualtLimits:number[])=>{
    setValuesOfInterest(updatedValuesOfInterest,2);
    setValuesOfInterestData(updatedValuesOfInterestData,2);
    setValuesOfInterestDefualtLimits(updatedValuesOfInterestDefualtLimits,2);
    setValuesOfInterestUnits(updatedValuesOfInterestUnits,2);
  }
  const handleSetLimits=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimits(newDict,2);
  }
  const handleSetLimitsLower=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimitsLower(newDict,2);
  }
  //const tsxTimeString = "02:30:15.500"; // Example TSX time string

  //const parseTSXTimeString = (tsxTimeString) => {
    //const [timePart, millisecondsPart] = tsxTimeString.split(".");
    //const [hours, minutes, seconds] = timePart.split(":").map(Number);
    //const milliseconds = Number(millisecondsPart || 0);
    //return { hours, minutes, seconds, milliseconds };
  //};
  
  //const convertToSeconds = ({ hours, minutes, seconds, milliseconds }) => {
    //return hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
  //};
  
  //const seconds = convertToSeconds(parseTSXTimeString(tsxTimeString));
  //console.log(seconds);
  const fuelObject = calculateRemainingFuel(100,95,90); //change to fuel start lap and gas level and lap time
  const FuelObjectMaps = getFuelOnConsumptionByRelativeFuelLevels(fuelObject,90,95); //change to lap time,and gas level

  const possibleWarningsValues=[throttleStream,oilTempStream,rpmStream,turboBoost,oilPressureStream,gasLevel,waterTempStream]
  const possibleWarningsNames=["Oil Temperature","RPM","Turbo Boost Pressure","Oil Pressure","Fuel Level","Water Temperature"]
  useEffect(() => {
  }, [valuesOfInterestCurrentLimits]);

  useEffect(() => {
    const handleValuesOfInterestFetch=(valuesToCheck:string[],valuesToUpdate:number[],dashboardNumber:number,possibleWarningsNames:string[])=>{
      for(let i =0; i<valuesToCheck.length;i++){
        for(let j =0; j<possibleWarningsNames.length;j++){
        if(valuesToCheck[i]==possibleWarningsNames[j]){
            const value=possibleWarningsValues[j];
            if(typeof value !== "number"){
              const lastItem = value[value.length-1]
              valuesToUpdate[i]= lastItem.y;
            }else{
              valuesToUpdate[i]= value;
            }
        }
      }
      }setValuesOfInterestData(valuesToUpdate,dashboardNumber);
      return;
    }
    handleValuesOfInterestFetch(valuesOfInterest,valuesOfInterestData,2,possibleWarningsNames)
  }, [packetFlag]);

  useEffect(() => {
    for(let i=0; i<valuesOfInterest.length;i++){

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
      if((valuesOfInterestData[i]<=valuesOfInterestCurrentLimitsLower[`limitLower${i}`])&&(activeWarningsLower!==undefined)){
        const warningExists = activeWarningsLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )//;
        const warningIsIgnored = acknowledgedWarningLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if ((!warningExists)&&(!warningIsIgnored)) {
        handleActiveWarningsLower(true,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
        handleIsWarning();
        }
      }else if((valuesOfInterestData[i]>valuesOfInterestCurrentLimitsLower[`limitlower${i}`])&&(activeWarningsLower!==undefined)){
        const warningExists = activeWarningsLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        const warningIsIgnored = acknowledgedWarningLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if (warningExists) {
          handleActiveWarningsLower(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
          handleIsWarning();
          }else if(warningIsIgnored){
            handleAcknowledgedWarningsLower(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
            handleIsWarning();
          }
      }
    }
  }, [valuesOfInterest.length, valuesOfInterestData,valuesOfInterestCurrentLimits,valuesOfInterestGreaterThanWarning]);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={throttleStream} units={'%'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Item>{lapTimer}<DynamicBasicChart label={'Oil Pressure'} expectedMaxValue={255} expectedMinValue={-1} dataStream={oilPressureStream} units={'bar'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Item><DynamicBasicChart label={'Oil Temperature '} expectedMaxValue={255} expectedMinValue={-1} dataStream={oilTempStream} units={'°C'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Water Temperature '} expectedMaxValue={255} expectedMinValue={-1} dataStream={waterTempStream} units={'°C'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Item><FuelDataDisplay FuelObjectMaps={FuelObjectMaps} gasLevel={gasLevel}></FuelDataDisplay></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmStream} units={'RPM'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><Grid container spacing={1}><Grid item xs={6}> Fuel Level: {gasLevel}%<Gauge gasCapacity={gasCapacity} gasLevel={gasLevel} targetSrc={"/images/fuel.svg"}/></Grid><Grid item xs={6}> Turbo Pressure: {turboBoost*100} kPa<Gauge gasCapacity={100} gasLevel={turboBoost} targetSrc={"/images/turbo.svg"}/></Grid></Grid></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><TwoValueDisplay nameOne='Minimum Alert RPM' nameTwo='Maximum Alert RPM' dataValueOne={minAlertRPM} dataValueTwo={maxAlertRPM}/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><TwoValueDisplay nameOne='Calculated Max Speed' nameTwo='Transmission Max Speed' dataValueOne={calculatedMaxSpeed} dataValueTwo={transmissionTopSpeed}/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}

