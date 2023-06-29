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
          <Item><TyreTemps/></Item>
        </Grid>
        <Grid item xs={3}>
          <Item></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="speed" signalrservice={signalRService} ></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item></Item>
        </Grid>
        <Grid item xs={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="brake" signalrservice={signalRService} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}