import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid } from '@mui/material';
import ImageBanner from '../../components/splitImageBanner';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TimeRemainingBanner from './timeRemainingBanner';
interface ChallengeBannerProps{
    challengeName:string;
    isCompleted:boolean;
    image:string;
}
const ChallengeBanner = ({ challengeName,isCompleted,image}:ChallengeBannerProps) => {

      return (
        <Box sx={{width:'95%', backgroundColor:'white',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}> <Grid container spacing={2}> <Grid item xs={12}><ImageBanner imageSrc={image} hasOverlay={true} minWidth={'200px'} minHeight={'200px'}  borderRadius={10}  ><Box sx={{ height: "90%", width: '100%', overflow: 'auto', mt: '5%' }}>
            
        <Grid container spacing={2}> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            {challengeName}
          </Grid>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <EmojiEventsIcon></EmojiEventsIcon>{"Challenge A"}
          </Grid> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            Title, track, car
          </Grid> 
        </Grid>
      </Box></ImageBanner></Grid><Grid item xs={12}><TimeRemainingBanner lastUpdatedDate={'10:30'}></TimeRemainingBanner></Grid></Grid>
      </Box>
      );
  };
  
  export default ChallengeBanner;