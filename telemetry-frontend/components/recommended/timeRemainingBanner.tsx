import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid } from '@mui/material';
import ImageBanner from '../../components/splitImageBanner';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
interface TimeRemainingBannerProps{
    lastUpdatedDate:string;
}
const TimeRemainingBanner = ({lastUpdatedDate}:TimeRemainingBannerProps) => {

      return (
        <Box sx={{width:'95%', backgroundColor:'red',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}>
        <Grid container spacing={2}> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {lastUpdatedDate} time left, laps or target
          </Grid>
        </Grid>
      </Box>
      );
  };
  
  export default TimeRemainingBanner;