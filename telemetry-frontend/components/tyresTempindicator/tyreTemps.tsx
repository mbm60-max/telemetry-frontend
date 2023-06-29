import { Button, Grid, Paper, styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { JsxElement } from "typescript";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StatusBar from "./statusBar";
import chroma from 'chroma-js';
import ExtendedPacket from "../../interfaces/extendedPacketInterface";
import SignalRService from "../../utils/signalrEndpoint";

interface tyreTempKeys{
  targetAttributes:string[];
  signalrservice: SignalRService;
}
const calcColor = (colorScale:string[],temp:number,targetTemp:number)=>{
  let color="";
  let difference = targetTemp-temp;
  if(difference>=colorScale.length){
    return colorScale[colorScale.length-1];
  }else if(difference<=1){
    return colorScale[0];
  }
  return colorScale[difference];
}
const colorInterpolation = (color1: string, color2: string,  color3: string, steps: number, temp:number,targetTemp:number) => {
  let colorScale=[''];
  let color="";
  if(temp > targetTemp){
   colorScale = chroma.scale([color2, color1]).mode('lch').colors(steps);
   return calcColor(colorScale,targetTemp,temp);
  }else if(temp < targetTemp){
    colorScale = chroma.scale([color2, color3]).mode('lch').colors(steps);
    return calcColor(colorScale,temp,targetTemp);
  }else{
    return color='#00ff00'
  }
};


// Usage
const Red = '#ff0000'; 
const Green = '#00ff00';
const Blue= '#0000ff'; 
const numberOfSteps = 20;

//const colorsBetween = colorInterpolation(Red, Green,Blue, numberOfSteps,70,85);
//console.log(colorsBetween);

const TyreTemps = ({targetAttributes, signalrservice}:tyreTempKeys) => {
  const [frontLeftTemp, setFrontLeftTemp] = useState<number>(0);
  const [frontRightTemp, setFrontRightTemp] = useState<number>(0);
  const [rearLeftTemp, setRearLeftTemp] = useState<number>(0);
  const [rearRightTemp, setRearRightTemp] = useState<number>(0);

  function handlePacket(receivedExtendedPacket: ExtendedPacket) {
    var jsonString = JSON.stringify(receivedExtendedPacket);
    var parsedObject = JSON.parse(jsonString);
    setFrontLeftTemp(parsedObject[targetAttributes[0]]);
    setFrontRightTemp(parsedObject[targetAttributes[1]]);
    setRearLeftTemp(parsedObject[targetAttributes[2]]);
    setRearRightTemp(parsedObject[targetAttributes[3]]);
    console.log(parsedObject[targetAttributes[0]]);
  };
  useEffect(() => {
  signalrservice.setHandleFullPacket(handlePacket);
  
  return () => {
    signalrservice.removeHandleFullPacket();
  };
  }, []);
    return (
      <div style={{ height: "100%", width:"100%"}}>
      <Grid container spacing={1} columns={6}>
  <Grid item xs={2}> <Box sx={{ width: 120, height: 230, backgroundColor: "white" ,border: "3px solid black"}} ><StatusBar tyre={"FL"} temp={frontLeftTemp} color={colorInterpolation(Red, Green,Blue, numberOfSteps,frontLeftTemp,85)}/><StatusBar tyre={"RL"} temp={frontRightTemp} color={colorInterpolation(Red, Green,Blue, numberOfSteps,frontRightTemp,85)}/></Box>
 
  </Grid>
  <Grid item xs={2}><Box sx={{width:120}}>Some info</Box>
 
  </Grid>
  <Grid item xs={2}>
  <Box sx={{ width: 120, height: 230, backgroundColor: "white",border: "3px solid black" }} ><StatusBar tyre={"FR"} temp={rearLeftTemp} color={colorInterpolation(Red, Green,Blue, numberOfSteps,rearLeftTemp,85)} /><StatusBar tyre={"RR"} temp={rearRightTemp} color={colorInterpolation(Red, Green,Blue, numberOfSteps,rearRightTemp,85)}/></Box>
  </Grid>
</Grid>
    </div>
    );
  };
export default TyreTemps;