import { Button, Card, Grid, Paper, styled,Box, Typography, useMediaQuery } from "@mui/material";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import { SettingsContext } from "../../authProviderSettings";
import { getTempUnits } from "../../../utils/converters";
interface StatusBarProps{
    tyre:string
    temp:Number
    color:string
}
const StatusBar = ({tyre,temp,color}:StatusBarProps) => {
  const isLessThan600= useMediaQuery('(max-width:600px)')
  const isLessThan1000= useMediaQuery('(max-width:1000px)')

const calcSwitchSize =()=>{
 if(isLessThan1000&&!isLessThan600){
  return false;
 }return true;
}
const { defaults } = React.useContext(SettingsContext);
const isMetric = defaults.defaultUnitsMetric;
const size = calcSwitchSize() ? 6 : 12;
const height =  calcSwitchSize() ? '140px':'75px';
const spacing =  calcSwitchSize() ? 2:0;
const fontSize =  calcSwitchSize() ? 35:23;

    return (
     <Box sx={{minHeight:"195px",maxHeight:'100%',overflow:"scroll",backgroundColor:'black',padding:1,borderRadius:5}}>
      <Grid container spacing={spacing}>
        <Grid item xs={12} ><Typography sx={{whiteSpace:'nowrap',overflow:'auto',color:'white'}} fontSize={22} fontFamily={"Yapari"} > {tyre}</Typography></Grid>
        {size ? null :  <Grid item xs={12} ></Grid>}
        <Grid item xs={size} > 
          <Grid container spacing={2}>
            <Grid item xs={12} > 
              <Typography sx={{color:'white'}} fontSize={fontSize} fontFamily={"Satoshi"} > {temp.toString()}</Typography>
            </Grid>
            <Grid item xs={12} > 
              <Typography sx={{color:'white'}} fontSize={fontSize} fontFamily={"Satoshi"} >{getTempUnits(isMetric)}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={size} sx={{display:'flex',justifyContent:'center'}}> <Box sx={{ width: 50, height: height, backgroundColor: color,border:'1.5px solid white'}}></Box> </Grid>
        </Grid>
      
     
    
     
      </Box>
    );
  };
export default StatusBar;