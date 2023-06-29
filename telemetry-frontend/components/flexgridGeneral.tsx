import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import SignalRService from '../utils/signalrEndpoint';
import { useEffect } from 'react';
import ExtendedPacket from '../interfaces/extendedPacketInterface';
import ImageBox from './homepageTrack';
import GearDisplay from './gearDisplay.';
import SmallLapTable from './lapTimeTable';
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
      imageSrc="/images/i1puHqsYDXFby.svg"
    />
  </BlackBox>
);
const tyreAttributes = ["tireFL_SurfaceTemperature","tireFR_SurfaceTemperature","tireRL_SurfaceTemperature","tireRR_SurfaceTemperature"];
const gearAttributes =  ["suggestedGear","currentGear"];
const lapAttributes = ["lastLapTime"];
export default function BasicGrid() {
  const signalRService = new SignalRService();
  useEffect(() => {
   signalRService.startConnection();

   return () => {
     signalRService.stopConnection();
    };
 }, []);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="throttle" signalrservice={signalRService} ></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps signalrservice={signalRService} targetAttributes={tyreAttributes} ></TyreTemps></Box><div>fuel ?</div></ItemCentered>
        </Grid>
        <Grid item xs={3}>
          <Item><WrappedImageBox /></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="speed" signalrservice={signalRService} ></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><GearDisplay targetAttributes={gearAttributes} signalrservice={signalRService}></GearDisplay></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><SmallLapTable targetAttributes={lapAttributes} signalrservice={signalRService}></SmallLapTable></Item>
        </Grid>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="brake" signalrservice={signalRService} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}