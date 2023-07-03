import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import SignalRService from '../utils/signalrEndpoint';
import { useEffect, useState } from 'react';
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
      imageSrc="/images/spa.svg"
    />
  </BlackBox>
);
const tyreAttributes = ["tireFL_SurfaceTemperature","tireFR_SurfaceTemperature","tireRL_SurfaceTemperature","tireRR_SurfaceTemperature"];
const gearAttributes =  ["suggestedGear","currentGear"];
const lapAttributes = ["lastLapTime"];

export default function BasicGrid() {
  const [throttleStream, setThrottleStream] = useState([{ x: 0, y: 0 }]);
  const [tyreStream, setTyreStream] = useState([{ x: 0, y: 0 }]);
  const [brakeStream, setBrakeStream] = useState([{ x: 0, y: 0 }]);
  const [speedStream, setSpeedStream] = useState([{ x: 0, y: 0 }]);
  const signalRService = new SignalRService();
  useEffect(() => {
   signalRService.startConnection();

   return () => {
     signalRService.stopConnection();
    };
 }, []);


 function handlePacket (receivedExtendedPacket: ExtendedPacket){
  //console.log('Received FullPacketMessage:', receivedExtendedPacket);
    //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
    var jsonString = JSON.stringify(receivedExtendedPacket);
    var parsedObject = JSON.parse(jsonString);
    const attributes=["throttle","brake","speed"];
    for(const attribute in attributes){
      var attributeValue = parsedObject[attribute];
      if (attributeValue !== undefined && typeof attributeValue === "number") {
        appendData(attribute,attributeValue); // Update the throttle value
       // console.log(attributeValue);
      }
    }
    
    //console.log(attributeValue);
    //console.log(attributeValue);
    
  };

  
  useEffect(() => {
  signalRService.setHandleFullPacket(handlePacket);

  return () => {
    signalRService.removeHandleFullPacket();
  };
}, []);
type StateSetters = Record<string, React.Dispatch<React.SetStateAction<{ x: number; y: number; }[]>>>;
const appendData = (attribute: string, dataPoint: number) => {
  const stateSetters: StateSetters = {
    throttle: setThrottleStream,
    brake: setBrakeStream,
    speed: setSpeedStream,
    // Add more attribute-state mappings if needed
  };

  const stateSetter = stateSetters[attribute];
  if (stateSetter) {
    stateSetter((oldArray) => {
      const prev = oldArray[oldArray.length - 1];
      const newArray = [...oldArray, { x: prev.x + 1, y: dataPoint }];
      if (newArray.length > 30) {
        return newArray.slice(1);
      }
      return newArray;
    });
  }
};

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="throttle" signalrservice={signalRService} dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps signalrservice={signalRService} targetAttributes={tyreAttributes} ></TyreTemps></Box><div>fuel ?</div></ItemCentered>
        </Grid>
        <Grid item xs={3}>
          <Item><WrappedImageBox /></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="metersPerSecond" signalrservice={signalRService} dataStream={speedStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><GearDisplay targetAttributes={gearAttributes} signalrservice={signalRService}></GearDisplay></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><SmallLapTable targetAttributes={lapAttributes} signalrservice={signalRService}></SmallLapTable></Item>
        </Grid>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={255} expectedMinValue={-1} targetAttribute="brake" signalrservice={signalRService} dataStream={brakeStream} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}