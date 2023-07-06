
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

interface GearboxGridProps{
  currentGearStream: { x: number; y: number; }[];
  suggestedGearStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  rpmClutchToGearboxStream: { x: number; y: number; }[];
  clutchPedalStream: { x: number; y: number; }[];
  clutchEngagementStream: { x: number; y: number; }[];
  lapTimer:string;
  inLapShifts:number;
}
export default function GearboxGrid({currentGearStream,suggestedGearStream,rpmStream,rpmClutchToGearboxStream,clutchEngagementStream,clutchPedalStream,lapTimer,inLapShifts}:GearboxGridProps) {
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={rpmStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'RPM Clutch To Gearbox '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={rpmClutchToGearboxStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><DynamicBasicChart label={'Suggested Gear'} expectedMaxValue={255} expectedMinValue={-1}  dataStream={suggestedGearStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Current Gear'} expectedMaxValue={255} expectedMinValue={-1}  dataStream={currentGearStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><TwoValueDisplay dataValueOne={inLapShifts} dataValueTwo={0} nameOne={'Total Shifts In Lap'} nameTwo={'?'}/></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><DynamicBasicChart label={'Clutch Pedal Input Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={clutchPedalStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>{lapTimer}<DynamicBasicChart label={'Clutch Engagement Trace'} expectedMaxValue={255} expectedMinValue={-1}  dataStream={clutchEngagementStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <Item>hi</Item>
        </Grid>
      </Grid>
    </Box>
  );
}