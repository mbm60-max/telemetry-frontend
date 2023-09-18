import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';
import { Box, Button, Grid, Typography } from '@mui/material';
import ImageBanner from '../../components/splitImageBanner';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimeRemainingBanner from './timeRemainingBanner';
import IsPlayable from './isPlayable';
import splitAndCapitalise from '../../utils/splitAndCapitalise';
import './challenge.css'
import router from 'next/router';
import axios, { AxiosResponse } from 'axios';
interface ChallengeBannerProps{
    challengeName:string;
    isCompleted:boolean;
    trackName:string;
    carName:string;
    image:string;
    letterName:string;
    targetValue:number;
    lastUpdatedDate:string;
    challengeStatus:boolean;
}
const ChallengeBanner = ({ challengeName,isCompleted,image,trackName,carName,letterName,targetValue,lastUpdatedDate,challengeStatus}:ChallengeBannerProps) => {
  const [isPlayable,setIsPlayable]=useState(true);
  const [remainingTime, setRemainingTime] = useState('');
  const isTest = true;
  const handleTimeChange=(timeRemaining:string)=>{
    if(timeRemaining === "Loading Next Event"){
      setIsPlayable(false);
      return;
    }else if(challengeStatus == true){
      setIsPlayable(false);
    }else if(challengeStatus == false){
      setIsPlayable(true);
    }
  }
 
  function getTimeDifference(inputDate: string) {
    // Split the input date string into day, month, and year
    const [day, month, year] = inputDate.split('/').map(Number);
  
    // Create a Date object for the input date at 00:00:00
    const inputDateTime = new Date(year, month - 1, day, 0, 0, 0, 0);
  
    // Add one day to the input date
    const nextDayDateTime = new Date(inputDateTime);
    nextDayDateTime.setDate(nextDayDateTime.getDate());
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
    handleTimeChange(newRemainingTime);
  }, 1000);

  return () => clearInterval(intervalId);
}, [lastUpdatedDate]);

  const startSession=()=>{
    const queryParams = `car=${carName}&compound=${"NONE"}&track=${trackName}&setup=${'No Field Selected'}&challenge=${challengeName}`;
    router.push(`/session?${queryParams}`);
  }
      return (
        <Button className='my-button' variant='text' onClick={startSession} disabled={!isPlayable} >
         {isCompleted && (
      <div
      style={{
        position: 'absolute',
        zIndex: 10, // Higher z-index to appear above the box
        background: 'linear-gradient(55deg, rgb(212,175,55,1), rgba(238,232,170,1))', // Gold gradient
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      >
        <Grid container spacing={2} sx={{display:'flex',justifyContent:'center'}}>
        <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Box sx={{mt:30, maxWidth:'290px',width:'100%'}}><Typography sx={{color:'white',whiteSpace:'nowrap', overflow:'auto'}} fontSize={45} fontFamily={"Satoshi"} >Completed</Typography></Box>
          </Grid>
        <Grid item xs={12}  sx={{display:'flex',justifyContent:'left'}}> <Box sx={{display:'flex',justifyContent:'left',width:'100%',ml:3}}><Typography sx={{color:'white',whiteSpace:'nowrap', overflow:'auto'}} fontSize={25} fontFamily={"Satoshi"} >NEXT CHALLENGE IN:</Typography></Box>
          </Grid>
          <Grid item xs={12}  sx={{display:'flex',justifyContent:'left'}}> <Box sx={{ display:'flex',justifyContent:'left',width:'100%',ml:3}}><Typography sx={{color:'white',whiteSpace:'nowrap', overflow:'auto'}} fontSize={25} fontFamily={"Satoshi"} >{remainingTime}</Typography></Box>
          </Grid>
        </Grid>
       
       
      </div>
    )}
        <Box className='my-button' sx={{width:'95%',height:'100%',display:'flex',justifyContent:'center'}}> <Grid container spacing={0}> <Grid item xs={12} ><ImageBanner imageSrc={image} hasOverlay={false} minWidth={'200px'} minHeight={'200px'}  borderRadius="10px 10px 0px 0px" ><Box sx={{ height: "90%", width: '100%', overflow: 'auto', mt: '5%' }}>
            
        <Grid container spacing={2}> 
        <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center' }}>
          <IsPlayable isPlayable={isPlayable}></IsPlayable>
        </Grid>
          <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{width:'95%', backgroundColor:'rgba(42, 43, 40,0.8)',height:'100%',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Grid container spacing={2} sx={{overflow:'auto'}}>
            <Grid item xs={2} >
            <Typography sx={{color:'white',whiteSpace:'nowrap'}} fontSize={15} fontFamily={"Yapari"} fontWeight={"bold"}>
              <EmojiEventsIcon sx={{mt:1,color:isCompleted ? 'rgb(212,175,55,1)':'white' }}></EmojiEventsIcon>
              </Typography>
            </Grid> 
            <Grid item xs={10} sx={{display:'flex',justifyContent:'start',alignItems:'center'}}>
            <Typography sx={{color:'white',whiteSpace:'nowrap'}} fontSize={15} fontFamily={"Yapari"} fontWeight={"bold"}>
            {letterName}
              </Typography>
            </Grid>
          </Grid>
          </Box>
          </Grid> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{width:'98%', backgroundColor:'rgba(42, 43, 40,0.8)',height:'100%',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Grid container spacing={2}> 
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
           <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={30} fontFamily={"Yapari"} fontWeight={"bold"}>{challengeName}</Typography> {isCompleted}
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' ,ml:1}}>
          <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={15} fontFamily={"Satoshi"} fontWeight={"bold"}>Track:</Typography>
            </Grid>  
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' ,ml:1}}>
          <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={20} fontFamily={"Satoshi"} fontWeight={"bold"}>{splitAndCapitalise(trackName)}</Typography>
          </Grid> 
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={0}>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' ,ml:1}}>
          <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={15} fontFamily={"Satoshi"} fontWeight={"bold"}>Car:</Typography>
          </Grid> 
              <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'left', alignItems: 'center' ,ml:1}}>
          <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={20} fontFamily={"Satoshi"} fontWeight={"bold"}>{splitAndCapitalise(carName)}</Typography>
          </Grid> 
            </Grid>
          </Grid>
          
            </Grid>
           </Box>
          </Grid>
          
        </Grid>
      </Box></ImageBanner></Grid><Grid item xs={12}><TimeRemainingBanner remainingTime={remainingTime}targetValue={targetValue} type={challengeName} ></TimeRemainingBanner></Grid></Grid>
      </Box>
      </Button>
      );
  };
  
  export default ChallengeBanner;