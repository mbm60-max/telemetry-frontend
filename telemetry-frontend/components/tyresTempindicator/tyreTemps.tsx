import { Button, Grid, Paper, styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import StatusBar from "./statusBar";
import chroma from 'chroma-js';

const calcColor = (colorScale:string[],temp:number,targetTemp:number)=>{
  let color="";
  let difference = targetTemp-temp;
  if(difference>=colorScale.length){
    return colorScale[length];
  }else if(difference<1){
    return colorScale[0];
  }return colorScale[difference];
}
const colorInterpolation = (color1: string, color2: string,  color3: string, steps: number, temp:number,targetTemp:number) => {
  let colorScale=[''];
  let color="";
  if(temp > targetTemp){
   colorScale = chroma.scale([color2, color1]).mode('lch').colors(steps);
   return calcColor(colorScale,targetTemp,temp);
  }else if(temp < targetTemp){
    colorScale = chroma.scale([color3, color2]).mode('lch').colors(steps);
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

const colorsBetween = colorInterpolation(Red, Green,Blue, numberOfSteps,66,85);
console.log(colorsBetween);

const TyreTemps = () => {
    return (
      <div style={{ height: "100%", width:"100%"}}>
      <Grid container spacing={17} columns={16}>
  <Grid item xs={1.5}> <Box sx={{ width: 120, height: 230, backgroundColor: "white" ,border: "3px solid black"}} ><StatusBar tyre={"FL"} temp={80} color={colorInterpolation(Red, Green,Blue, numberOfSteps,66,85)}/><StatusBar tyre={"RL"} temp={79}/></Box>
 
  </Grid>
  <Grid item xs>
  <Box sx={{ width: 120, height: 230, backgroundColor: "white",border: "3px solid black" }} ><StatusBar tyre={"FR"} temp={80}/><StatusBar tyre={"RR"} temp={79}/></Box>
  </Grid>
</Grid>
    </div>
    );
  };
export default TyreTemps;