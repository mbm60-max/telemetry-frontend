
//engine RPM,current gear,suggested gear,clutch pedal,clutch engagement, rpm clutch to gearbox
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
import Gauge from './fuelGauge';
import ReviewChart from '../review/reviewChart';
import MultiDisplayChart from './multiDisplayChart';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import WarningInstance from '../../interfaces/warningInterface';
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
      imageSrc="/images/spa.svg" borderRadius={0}  hasOverlay={false}>
        </ImageBox>
  </BlackBox>
);

interface TyresSuspensionProps{
  tireFL_SurfaceTemperature: { x: number; y: number; }[];
  tireRL_SurfaceTemperature: { x: number; y: number; }[];
  tireFR_SurfaceTemperature: { x: number; y: number; }[]; 
  tireRR_SurfaceTemperature: { x: number; y: number; }[]; 
  tireFL_SusHeight: { x: number; y: number; }[];
  tireFR_SusHeight: { x: number; y: number; }[];
  tireRL_SusHeight: { x: number; y: number; }[];
  tireRR_SusHeight: { x: number; y: number; }[];
  tireFL_TireRadius: { x: number; y: number; }[];
  tireFR_TireRadius: { x: number; y: number; }[];
  tireRL_TireRadius: { x: number; y: number; }[];
  tireRR_TireRadius: { x: number; y: number; }[];
  wheelFL_RevPerSecond: { x: number; y: number; }[];
  wheelFR_RevPerSecond: { x: number; y: number; }[];
  wheelRL_RevPerSecond: { x: number; y: number; }[];
  wheelRR_RevPerSecond: { x: number; y: number; }[];
  frontLeftTemp:number;
  frontRightTemp:number;
  rearLeftTemp:number;
  rearRightTemp:number;
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
export default function TyresSuspensionGrid({tireFL_SurfaceTemperature,tireFR_SurfaceTemperature,tireRL_SurfaceTemperature,tireRR_SurfaceTemperature,tireFL_SusHeight,tireFR_SusHeight,tireRL_SusHeight,tireRR_SusHeight,tireFL_TireRadius,tireFR_TireRadius,tireRL_TireRadius,tireRR_TireRadius,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,wheelFL_RevPerSecond,wheelFR_RevPerSecond,wheelRL_RevPerSecond,wheelRR_RevPerSecond,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag}:TyresSuspensionProps) {
  const handleSetNewWarning=(updatedValuesOfInterest:string[],updatedValuesOfInterestData:number[],updatedValuesOfInterestUnits:string[],updatedValuesOfInterestDefualtLimits:number[])=>{
    setValuesOfInterest(updatedValuesOfInterest,4);
    setValuesOfInterestData(updatedValuesOfInterestData,4);
    setValuesOfInterestDefualtLimits(updatedValuesOfInterestDefualtLimits,4);
    setValuesOfInterestUnits(updatedValuesOfInterestUnits,4);
  }
  const handleSetLimits=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimits(newDict,4);
  }
  const handleSetLimitsLower=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimitsLower(newDict,4);
  }



  const possibleWarningsValues=[tireFL_SusHeight,tireFR_SusHeight,tireRL_SusHeight,tireRR_SusHeight,wheelFL_RevPerSecond,wheelFR_RevPerSecond,wheelRL_RevPerSecond,wheelRR_RevPerSecond]
  const possibleWarningsNames=["Front Left Suspension Height","Front Right Suspension Height","Rear Left Suspension Height","Rear Right Suspension Height","Front Left RPS","Front Right RPS","Rear Left RPS","Rear Right RPS"]
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
    handleValuesOfInterestFetch(valuesOfInterest,valuesOfInterestData,4,possibleWarningsNames)
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
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_SurfaceTemperature} dataStream2={tireFR_SurfaceTemperature} dataStream3={tireRL_SurfaceTemperature} dataStream4={tireRR_SurfaceTemperature} height={400} label={"Tyre Temps"} units={'°C'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp}/></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={wheelFL_RevPerSecond} dataStream2={wheelFR_RevPerSecond} dataStream3={wheelRL_RevPerSecond} dataStream4={wheelRR_RevPerSecond} height={400} label={"Wheel Revs Per Second"} units={'RPS'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_TireRadius} dataStream2={tireFR_TireRadius} dataStream3={tireRL_TireRadius} dataStream4={tireRR_TireRadius} height={400} label={"Wheel Radius"} units={'Radians'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_SusHeight} dataStream2={tireFR_SusHeight} dataStream3={tireRL_SusHeight} dataStream4={tireRR_SusHeight} height={400} label={"Suspension Height"} units={'mm'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}