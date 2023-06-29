import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import SignalRService from '../utils/signalrEndpoint';
import { useEffect, useState } from 'react';
import ExtendedPacket from '../interfaces/extendedPacketInterface';

interface gearProps {
  signalrservice: SignalRService;
  targetAttributes: string[];
}

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

export default function GearDisplay({signalrservice, targetAttributes}:gearProps) {

  const [suggestedGear,setSuggestedGear] = useState<number>(0);
  const [currentGear,setCurrentGear] = useState<number>(0);

  function handlePacket(receivedExtendedPacket: ExtendedPacket) {
    var jsonString = JSON.stringify(receivedExtendedPacket);
    var parsedObject = JSON.parse(jsonString);
    setSuggestedGear(parsedObject[targetAttributes[0]]);
    setCurrentGear(parsedObject[targetAttributes[1]]);
    console.log(parsedObject[targetAttributes[0]]);
  };
  useEffect(() => {
  signalrservice.setHandleFullPacket(handlePacket);
  
  return () => {
    signalrservice.removeHandleFullPacket();
  };
  }, []);
  return (
    <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={6.35} columns={1} >
        <Grid item xs={6}>
          <Item>
      <CardContent>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
          Current Gear
        </Typography>
        <Typography variant="h2" component="div" color="text.primary">
         {currentGear}
        </Typography>
      </CardContent>
    </Item>
        </Grid>
        <Grid><Item>something else ?</Item></Grid>
        <Grid item xs={6}>
          <Item>
      <CardContent>
      <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>
        Suggested Gear
      </Typography>
      <Typography variant="h2" component="div" color="text.primary">
       {suggestedGear}
      </Typography>
    </CardContent>
  </Item>
        </Grid>
       
      </Grid>
    </Box>
  );
}