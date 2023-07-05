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
  oilTempStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  turboBoost:number;
  oilPressureStream: { x: number; y: number; }[];
  minAlertRPM:number;
  maxAlertRPM:number;
  gasLevel:number;
  gasCapacity:number;
  calculatedMaxSpeed:number;
  transmissionTopSpeed:number;
  waterTempStream: { x: number; y: number; }[];
  lapTimer:string;
}
export default function EngineGrid({throttleStream,lapTimer,oilTempStream,rpmStream,minAlertRPM,maxAlertRPM, calculatedMaxSpeed,transmissionTopSpeed,oilPressureStream,waterTempStream,gasCapacity,gasLevel,turboBoost}:GeneralGridProps) {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><DynamicBasicChart label={'Water Temperature '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={waterTempStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><TwoValueDisplay nameOne='Minimum Alert RPM' nameTwo='Maximum Alert RPM' dataValueOne={minAlertRPM} dataValueTwo={maxAlertRPM}/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={rpmStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><TwoValueDisplay nameOne='Calculated Max Speed' nameTwo='Transmission Max Speed' dataValueOne={calculatedMaxSpeed} dataValueTwo={transmissionTopSpeed}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><Grid container spacing={1}><Grid item xs={6}> Fuel Level: {gasLevel}%<Gauge gasCapacity={gasCapacity} gasLevel={gasLevel} targetSrc={"/images/fuel.svg"}/></Grid><Grid item xs={6}> Turbo Pressure: {turboBoost*100} kPa<Gauge gasCapacity={100} gasLevel={turboBoost} targetSrc={"/images/turbo.svg"}/></Grid></Grid></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{lapTimer}<DynamicBasicChart label={'Oil Pressure'} expectedMaxValue={255} expectedMinValue={-1}  dataStream={oilPressureStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><DynamicBasicChart label={'Oil Temperature '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={oilTempStream}></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}