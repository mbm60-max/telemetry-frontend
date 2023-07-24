import { Button, Card, Grid, Paper, styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
interface StatusBarProps{
    tyre:string
    temp:Number
    color:string
}
const StatusBar = ({tyre,temp,color}:StatusBarProps) => {
    return (
      <div style={{ height: "50%", width:"100%"}}>
      <Box sx={{ width: '100%', height: '20%', backgroundColor: "#1E1E1E", justifyContent:'center',display:'flex',alignItems:'center', wordWrap: 'break-word',}} ><Card sx={{width:'100%', borderRadius:0.5,  fontFamily:'Helvetica'}}>{tyre} | {temp.toString()}<LocalFireDepartmentIcon sx={{color:'black',  fontSize:20,verticalAlign: 'middle'}}/></Card></Box>
      <Box sx={{ width:'100%', height: '70%', backgroundColor: "#1E1E1E", justifyContent:"center", display:"flex" }}><Box sx={{ width: 55, height: 70, backgroundColor: color, mt:1}}></Box> </Box> 
      <Box sx={{ width: '100%', height: '10%', backgroundColor: "#1E1E1E"}}> </Box> 
    </div>
    );
  };
export default StatusBar;