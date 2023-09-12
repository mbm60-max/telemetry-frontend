import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';
import { Box } from '@mui/material';

interface ChallengeBannerProps{
    challengeName:string;
    isCompleted:boolean;
}
const ChallengeBanner = ({ challengeName,isCompleted}:ChallengeBannerProps) => {

      return (
        <Box sx={{width:'95%', backgroundColor:'white',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}>hi</Box>
      );
  };
  
  export default ChallengeBanner;