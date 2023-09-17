import React, { useEffect, useState } from 'react';
import { Box, Divider, Grid, styled, Typography } from '@mui/material';
import convertSecondsToTime, { convertTimeToSeconds } from '../../utils/secondsToString';

interface TimeRemainingBannerProps{
    lastUpdatedDate:string;
    targetValue:number;
    type:string;
    onRemainingTimeChange: (remainingTime: string) => void;
}
const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
  borderWidth: "1.5px", // Adjust the thickness of the line here
  borderColor: "white", // You can change the color to any valid CSS color value
width:'99%',
}));
const TimeRemainingBanner = ({lastUpdatedDate,targetValue,type,onRemainingTimeChange}:TimeRemainingBannerProps) => {
  const [message,setMessage]=useState('');
  const [remainingTime, setRemainingTime] = useState('');

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

  
  function getTimeDifference(inputDate: string) {
    // Split the input date string into day, month, and year
    const [day, month, year] = inputDate.split('/').map(Number);
  
    // Create a Date object for the input date at 00:00:00
    const inputDateTime = new Date(year, month - 1, day, 0, 0, 0, 0);
  
    // Add one day to the input date
    const nextDayDateTime = new Date(inputDateTime);
    nextDayDateTime.setDate(nextDayDateTime.getDate() + 1);
  
    // Get the current GMT time as a timestamp (milliseconds since Unix epoch)
    const currentDateTime = Date.now();
  
    // Calculate the time difference in milliseconds
    const timeDifferenceMillis = currentDateTime - nextDayDateTime.getTime() ;
  
    // Convert the time difference to seconds
    const timeDifferenceSeconds = Math.floor(timeDifferenceMillis / 1000);
  
    return timeDifferenceSeconds;
  }
  function padZero(num: number) {
    return num.toString().padStart(2, '0');
    }

  const getRemainingTime=(timeDifferenceSeconds:number)=>{
    const secondsInDay = 86400;
    const remainingSeconds = secondsInDay - timeDifferenceSeconds
    if(remainingSeconds<=0){
      return "Loading Next Event"
    }
    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = remainingSeconds % 60;

    const formattedTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;
    return formattedTime;
}


useEffect(() => {
  const intervalId = setInterval(() => {
    const timeDifference = getTimeDifference(lastUpdatedDate);
    const newRemainingTime = getRemainingTime(timeDifference);
    setRemainingTime(newRemainingTime);
    onRemainingTimeChange(newRemainingTime);
  }, 1000);

  return () => clearInterval(intervalId);
}, [lastUpdatedDate]);

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