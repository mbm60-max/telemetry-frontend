
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
}
export default function TyresSuspensionGrid({tireFL_SurfaceTemperature,tireFR_SurfaceTemperature,tireRL_SurfaceTemperature,tireRR_SurfaceTemperature,tireFL_SusHeight,tireFR_SusHeight,tireRL_SusHeight,tireRR_SusHeight,tireFL_TireRadius,tireFR_TireRadius,tireRL_TireRadius,tireRR_TireRadius,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,wheelFL_RevPerSecond,wheelFR_RevPerSecond,wheelRL_RevPerSecond,wheelRR_RevPerSecond}:TyresSuspensionProps) {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_SurfaceTemperature} dataStream2={tireFR_SurfaceTemperature} dataStream3={tireRL_SurfaceTemperature} dataStream4={tireRR_SurfaceTemperature} height={400} label={"Tyre Temps"} units={'°C'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp}/></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={wheelFL_RevPerSecond} dataStream2={wheelFR_RevPerSecond} dataStream3={wheelRL_RevPerSecond} dataStream4={wheelRR_RevPerSecond} height={400} label={"Wheel Revs Per Second"} units={'RPS'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_TireRadius} dataStream2={tireFR_TireRadius} dataStream3={tireRL_TireRadius} dataStream4={tireRR_TireRadius} height={400} label={"Wheel Radius"} units={'Radians'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
        <Grid item xs={8}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={255} dataStream1={tireFL_SusHeight} dataStream2={tireFR_SusHeight} dataStream3={tireRL_SusHeight} dataStream4={tireRR_SusHeight} height={400} label={"Suspension Height"} units={'mm'} labelXaxis={'Distance Into Lap M'}/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}