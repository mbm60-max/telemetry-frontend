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


export default function BasicGrid() {
  const tyreAttributes = ["tireFL_SurfaceTemperature","tireFR_SurfaceTemperature","tireRL_SurfaceTemperature","tireRR_SurfaceTemperature"];
const gearAttributes =  ["suggestedGear","currentGear"];
const lapAttributes = ["lastLapTime"];

  const [throttleStream, setThrottleStream] = useState([{ x: 0, y: 0 }]);
  const [tyreStream, setTyreStream] = useState([{ x: 0, y: 0 }]);
  const [brakeStream, setBrakeStream] = useState([{ x: 0, y: 0 }]);
  const [speedStream, setSpeedStream] = useState([{ x: 0, y: 0 }]);
  const [suggestedGear,setSuggestedGear] = useState([{ x: 0, y: 0 }]);
  const [currentGear,setCurrentGear] = useState([{ x: 0, y: 0 }]);
  const [frontLeftTemp, setFrontLeftTemp] = useState([{ x: 0, y: 0 }]);
  const [frontRightTemp, setFrontRightTemp] = useState([{ x: 0, y: 0 }]);
  const [rearLeftTemp, setRearLeftTemp] = useState([{ x: 0, y: 0 }]);
  const [rearRightTemp, setRearRightTemp] = useState([{ x: 0, y: 0 }]);
  const [lastLapTime, setLastLapTime] = useState('');
  const [bestLapTime, setBestLapTime] = useState('');
  const [lapTimer, setLapTimer] = useState('');
  const signalRService = new SignalRService();
  useEffect(() => {
   signalRService.startConnection();

   return () => {
     signalRService.stopConnection();
    };
 }, []);


 function handlePacket (receivedExtendedPacket: ExtendedPacket){
  console.log('Received FullPacketMessage:', receivedExtendedPacket);
    //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
    var jsonString = JSON.stringify(receivedExtendedPacket);
    var parsedObject = JSON.parse(jsonString);
    const attributes=['throttle','brake','metersPerSecond','suggestedGear','currentGear','tireFL_SurfaceTemperature','tireFR_SurfaceTemperature','tireRL_SurfaceTemperature','tireRR_SurfaceTemperature','lastLapTime','bestLapTime'];
    var timerValue = parsedObject['lapTiming'];

    setLapTimer(timerValue);
    for(const attribute in attributes){
      var attributeValue = parsedObject[attributes[attribute]];
      if (attributeValue !== undefined && typeof attributeValue == "string") {
        appendStringData(attributes[attribute],attributeValue); 
      }else if(attributeValue !== undefined && typeof attributeValue != "string"){
        appendData(attributes[attribute],attributeValue); 
      }

    }
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
    metersPerSecond: setSpeedStream,
    suggestedGear: setSuggestedGear,
    currentGear: setCurrentGear,
    tireFL_SurfaceTemperature: setFrontLeftTemp,
    tireRL_SurfaceTemperature: setRearLeftTemp,
    tireFR_SurfaceTemperature: setFrontRightTemp,
    tireRR_SurfaceTemperature: setRearRightTemp,
  };
  const stateSetter = stateSetters[attribute];
  if(stateSetter == setSpeedStream){
    stateSetter((oldArray) => {
      const prev = oldArray[oldArray.length - 1];
      const newArray = [...oldArray, { x: prev.x + 1, y: convertMpsToMph(dataPoint) }];
      if (newArray.length > 30) {
        return newArray.slice(1);
      }
      return newArray;
    });
  }
  else if (stateSetter) {
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
type StateSettersStrings = Record<string, React.Dispatch<React.SetStateAction<string>>>;
const appendStringData = (attribute: string, dataPoint: string) => {
  const stateSettersStrings: StateSettersStrings = {
    lastLapTime:setLastLapTime,
    bestLapTime:setBestLapTime,
  };
  const stateSetterStrings = stateSettersStrings[attribute];
  if (stateSetterStrings) {
    stateSetterStrings(dataPoint);
  }
};

function parseNumberStream(stream: { x: number; y: number; }[]) {
  if (stream.length === 0) {
    return -1;
  }
  
  const lastItem = stream[stream.length - 1];
  return lastItem.y;
}

console.log(lapTimer);
function convertMpsToMph(dataPoint:number){
  return Math.round(dataPoint * 2.23694);
}
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} ></TyreTemps></Box><div>fuel ?</div></ItemCentered>
        </Grid>
        <Grid item xs={3}>
          <Item>{lapTimer}</Item>
        </Grid>
        <Grid item xs={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={255} expectedMinValue={-1} dataStream={speedStream}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><GearDisplay currentGear={parseNumberStream(currentGear)} suggestedGear={parseNumberStream(suggestedGear)}></GearDisplay></Item>
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