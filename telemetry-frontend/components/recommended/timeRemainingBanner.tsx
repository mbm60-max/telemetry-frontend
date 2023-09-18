import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, styled, Typography } from '@mui/material';
import convertSecondsToTime, { convertTimeToSeconds } from '../../utils/secondsToString';

interface TimeRemainingBannerProps{
    remainingTime:string;
    targetValue:number;
    type:string;
}
const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
  borderWidth: "1.5px", // Adjust the thickness of the line here
  borderColor: "white", // You can change the color to any valid CSS color value
width:'99%',
}));
const TimeRemainingBanner = ({targetValue,type,remainingTime}:TimeRemainingBannerProps) => {
  const [message,setMessage]=useState('');

  const giveMessage =(stype:string)=>{
    switch(type){
      case "Consistency":
      setMessage(`Maintain a pace within ${targetValue}%  across 3 consecutive laps`);
      break;
      case "Pace":
      setMessage(`Hit the target pace of ${convertSecondsToTime(targetValue)} for ${1} lap`);
      break;
      case "Endurance":
      setMessage(`Complete ${targetValue} laps`);
      break;
    }
  }
  useEffect(()=>{
    giveMessage(type);
  },[])

 

      return (
        <Box sx={{width:'100%', backgroundColor:'rgba(42, 43, 40,0.8)',minHeight:'75px',height:'20vh',borderRadius:'0px 0px 10px 10px',display:'flex',justifyContent:'center',overflow:'auto'}}>
        <Grid container spacing={2}> 
        <Grid item xs={12}>
          <Grid container spacing={2}>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'left',overflow:'auto' }}>
            <Typography sx={{color:'white',whiteSpace:'nowrap',ml:1}} fontFamily={"Satoshi"} fontSize={15}>Time Remaining:</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography sx={{color:'white'}} fontFamily={"Yapari"} fontSize={25}>{remainingTime}</Typography>
            
          </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left',overflow:'auto',ml:1 }}>
            <Typography sx={{color:'white',whiteSpace:'nowrap'}} fontFamily={"Satoshi"} fontSize={15}>{message}</Typography>
          </Grid>
          </Grid>
        </Grid>
         
        </Grid>
      </Box>
      );
  };
  
  export default TimeRemainingBanner;