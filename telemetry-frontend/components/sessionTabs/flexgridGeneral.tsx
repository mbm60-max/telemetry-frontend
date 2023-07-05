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
import Test from '../liveTrack';
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
}
export default function GeneralGrid({throttleStream,brakeStream,speedStream,suggestedGear,currentGear,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,lastLapTime,bestLapTime,lapTimer}:GeneralGridProps) {
 
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp} ></TyreTemps></Box><div>fuel ?</div></ItemCentered>
        </Grid>
        <Grid item xs={3}>
          <Item>{lapTimer}<Test testOffset={0}targetSrc={"/images/legunaSeca.svg"} trackName={"legunaSeca"} /></Item>
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