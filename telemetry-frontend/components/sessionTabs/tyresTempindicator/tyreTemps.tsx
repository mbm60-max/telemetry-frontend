import { Button, Grid, Paper, styled,Box, useMediaQuery } from "@mui/material";
import React, { useEffect, useState } from "react";

import StatusBar from "./statusBar";
import chroma from 'chroma-js';

interface tyreTempKeys{
  frontLeftTemp:number,
  frontRightTemp:number,
  rearLeftTemp:number,
  rearRightTemp:number,
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

const TyreTemps = ({frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp}:tyreTempKeys) => {
  const isLessThan600= useMediaQuery('(max-width:600px)')
    const isLessThan1000= useMediaQuery('(max-width:1000px)')

  const calcSwitchNames =()=>{
   if(isLessThan1000&&!isLessThan600){
    return false;
   }return true;
  }
  const flTyre = calcSwitchNames() ? "Front Left" : "FL";
  const frTyre = calcSwitchNames() ? "Front Right" : "FR";
  const rlTyre = calcSwitchNames() ? "Rear Left" : "RL";
  const rrTyre = calcSwitchNames() ? "Rear Right" : "RR";
  return (
    
      <Grid container spacing={1}>
        <Grid item xs={6} >
         
            <StatusBar tyre={flTyre} temp={frontLeftTemp} color={colorInterpolation(Red, Green, Blue, numberOfSteps, frontLeftTemp, 85)} />
           
         
        </Grid>
        <Grid item xs={6}> <StatusBar tyre={rlTyre} temp={frontRightTemp} color={colorInterpolation(Red, Green, Blue, numberOfSteps, frontRightTemp, 85)} /></Grid>
        <Grid item xs={6}><StatusBar tyre={frTyre} temp={rearLeftTemp} color={colorInterpolation(Red, Green, Blue, numberOfSteps, rearLeftTemp, 85)} /></Grid>
        <Grid item xs={6}>
          
            
            <StatusBar tyre={rrTyre} temp={rearRightTemp} color={colorInterpolation(Red, Green, Blue, numberOfSteps, rearRightTemp, 85)} />
         
        </Grid>
      </Grid>

  );
};

export default TyreTemps;