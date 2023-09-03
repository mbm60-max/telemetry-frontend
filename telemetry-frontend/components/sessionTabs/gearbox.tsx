
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
import Gauge from '../fuelComponents/fuelGauge';
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
  valuesOfInterestUnits: string[];
  handleSetWarning: (
    updatedValuesOfInterest: string[],
    updatedValuesOfInterestData: number[],
    updatedValuesOfInterestUnits: string[],
    updatedValuesOfInterestDefualtLimits: number[]
  ) => void;
  handleSetLimits: (newDict: { [key: string]: number },readyFlag:number) => void;
  handleSetLimitsLower: (newDict: { [key: string]: number },readyFlag:number) => void;
}
export default function GearboxGrid({currentGearStream,suggestedGearStream,rpmStream,rpmClutchToGearboxStream,clutchEngagementStream,clutchPedalStream,lapTimer,inLapShifts,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,handleSetLimits,handleSetLimitsLower,handleSetWarning,valuesOfInterestUnits}:GearboxGridProps) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmStream} units={'RPM'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Clutch To Gearbox '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmClutchToGearboxStream} units={'RPM'} labelXaxis={'Distance Into Lap M'}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><TwoValueDisplay dataValueOne={inLapShifts} dataValueTwo={0} nameOne={'Total Shifts In Lap'} nameTwo={'Total Shifts In Lap'}/></Item>
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