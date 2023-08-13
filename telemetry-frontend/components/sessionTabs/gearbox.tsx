
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
import WarningInstance from '../../interfaces/warningInterface';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
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
      imageSrc="/images/spa.svg" borderRadius={0} hasOverlay={false}>
      </ImageBox>
  </BlackBox>
);

interface GearboxGridProps{
  currentGearStream: { x: number; y: number; }[];
  suggestedGearStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  rpmClutchToGearboxStream: { x: number; y: number; }[];
  clutchPedalStream: { x: number; y: number; }[];
  clutchEngagementStream: { x: number; y: number; }[];
  lapTimer:string;
  inLapShifts:number;
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
export default function GearboxGrid({currentGearStream,suggestedGearStream,rpmStream,rpmClutchToGearboxStream,clutchEngagementStream,clutchPedalStream,lapTimer,inLapShifts,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning}:GearboxGridProps) {
     
  const handleSetNewWarning=(updatedValuesOfInterest:string[],updatedValuesOfInterestData:number[],updatedValuesOfInterestUnits:string[],updatedValuesOfInterestDefualtLimits:number[])=>{
    setValuesOfInterest(updatedValuesOfInterest,3);
    setValuesOfInterestData(updatedValuesOfInterestData,3);
    setValuesOfInterestDefualtLimits(updatedValuesOfInterestDefualtLimits,3);
    setValuesOfInterestUnits(updatedValuesOfInterestUnits,3);
  }
  const handleSetLimits=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimits(newDict,3);
  }
  const handleSetLimitsLower=(newDict:{[key: string]: number;})=>{
    setValuesOfInterestCurrentLimitsLower(newDict,3);
  }



  const possibleWarningsValues=[rpmStream,rpmClutchToGearboxStream]
  const possibleWarningsNames=["RPM","RPM To Clutch"]
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
    handleValuesOfInterestFetch(valuesOfInterest,valuesOfInterestData,3,possibleWarningsNames)
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
        
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmStream} units={'RPM'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Clutch To Gearbox '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmClutchToGearboxStream} units={'RPM'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><TwoValueDisplay dataValueOne={inLapShifts} dataValueTwo={0} nameOne={'Total Shifts In Lap'} nameTwo={'?'}/></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Suggested Gear'} expectedMaxValue={255} expectedMinValue={-1} dataStream={suggestedGearStream} units={''} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Current Gear'} expectedMaxValue={255} expectedMinValue={-1} dataStream={currentGearStream} units={''} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Item><DynamicBasicChart label={'Clutch Pedal Input Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={clutchPedalStream} units={'%'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={2}>
          <Item>hi</Item>
        </Grid>
        <Grid item xs={12} sm={5}>
          <Item>{lapTimer}<DynamicBasicChart label={'Clutch Engagement Trace'} expectedMaxValue={255} expectedMinValue={-1} dataStream={clutchEngagementStream} units={'%'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}