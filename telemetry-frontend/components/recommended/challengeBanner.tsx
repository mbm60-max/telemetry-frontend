import React, { useState } from 'react';
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
interface ChallengeBannerProps{
    challengeName:string;
    isCompleted:boolean;
    trackName:string;
    carName:string;
    image:string;
    letterName:string;
    targetValue:number;
    lastUpdatedDate:string;
}
const ChallengeBanner = ({ challengeName,isCompleted,image,trackName,carName,letterName,targetValue,lastUpdatedDate}:ChallengeBannerProps) => {
  const [isPlayable,setIsPlayable]=useState(true);

  const handleTimechange=(timeRemaining:string)=>{
    if(timeRemaining === "Loading Next Event"){
      setIsPlayable(false);
      return;
    }setIsPlayable(true);
  }

  const startSession=()=>{
    const queryParams = `car=${carName}&compound=${"NONE"}&track=${trackName}&setup=${'No Field Selected'}&challenge=${challengeName}`;
    router.push(`/session?${queryParams}`);
  }
      return (
        <Button className='my-button' variant='text' onClick={startSession}>
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
              <EmojiEventsIcon sx={{mt:1}}></EmojiEventsIcon>
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
      </Box></ImageBanner></Grid><Grid item xs={12}><TimeRemainingBanner lastUpdatedDate={lastUpdatedDate} targetValue={targetValue} type={challengeName} onRemainingTimeChange={handleTimechange}></TimeRemainingBanner></Grid></Grid>
      </Box>
      </Button>
      );
  };
  
  export default ChallengeBanner;