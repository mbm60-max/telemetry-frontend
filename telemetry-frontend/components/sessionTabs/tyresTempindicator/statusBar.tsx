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
      <Box sx={{ width: 120, height: 30, backgroundColor: "#1E1E1E" }} ><Card sx={{width:55, borderRadius:0.5, display:"inline-block", ml:4, mt:1, fontFamily:'Helvetica'}}>{tyre} | {temp.toString()}</Card><LocalFireDepartmentIcon sx={{color:'white', ml:1, fontSize:20}}/></Box>
      <Box sx={{ width: 120, height: 70, backgroundColor: "#1E1E1E", justifyContent:"center", display:"flex" }}><Box sx={{ width: 55, height: 70, backgroundColor: color, mt:1}}></Box> </Box> 
      <Box sx={{ width: 120, height: 15, backgroundColor: "#1E1E1E"}}> </Box> 
    </div>
    );
  };
export default StatusBar;