import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';
import { Box, Grid, Typography } from '@mui/material';
import ImageBanner from '../../components/splitImageBanner';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
interface IsPlayableProps{
    isPlayable:boolean;
}
const IsPlayable = ({isPlayable}:IsPlayableProps) => {

      return (
        <Box sx={{width:'95%', backgroundColor: isPlayable ? 'rgba(72, 212, 59,1)': 'rgba(212,72,59,1)' ,height:'100%',borderRadius:1,display:'flex',justifyContent:'center',alignItems:'center'}}>
        {isPlayable ?  <Grid container spacing={2}> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={13} fontFamily={"Yapari"} fontWeight={"bold"}>Available to enter</Typography>
          </Grid>
        </Grid>: <Grid container spacing={2}> 
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography sx={{color:'white',overflow:'auto',whiteSpace:'nowrap'}} fontSize={13} fontFamily={"Yapari"} fontWeight={"bold"}>Entry period over</Typography>
          </Grid>
        </Grid>}
       
        
      </Box>
      );
  };
  
  export default IsPlayable;