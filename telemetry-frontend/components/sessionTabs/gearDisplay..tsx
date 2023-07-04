import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SignalRService from '../../utils/signalrEndpoint';
import { useEffect, useState } from 'react';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';

interface twoValueProps {
  dataValueOne:number;//current
  dataValueTwo:number;
  nameOne:string;//current
  nameTwo:string
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function TwoValueDisplay({dataValueOne,dataValueTwo,nameOne,nameTwo}:twoValueProps) {
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={6.35} columns={1} >
        <Grid item xs={6}>
          <Item>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          {nameOne}
        </Typography>
        <Typography variant="h2" component="div" color="text.primary">
         {dataValueOne}
        </Typography>
      </CardContent>
    </Item>
        </Grid>
        <Grid><Item>something else ?</Item></Grid>
        <Grid item xs={6}>
          <Item>
      <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        {nameTwo}
      </Typography>
      <Typography variant="h2" component="div" color="text.primary">
       {dataValueTwo}
      </Typography>
    </CardContent>
  </Item>
        </Grid>
       
      </Grid>
    </Box>
  );
}