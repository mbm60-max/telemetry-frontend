import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';

interface SetupCarDisplayProps {
name:string;
}



const SetupCarDisplay = ({ name }: SetupCarDisplayProps) => {
 
  return (
    <Box sx={{ width: '100%', minHeight:'300px',position:'relative', backgroundColor:'#F6F6F6',
    borderRadius: 1.5,
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
    <Box sx={{ width: '70%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} >
          <Grid item xs={4}><Grid container spacing={0} >
          <Grid item xs={12}><Typography variant="h6" sx={{fontSize:36}}  fontWeight="bold">Car name</Typography></Grid><Grid item xs={12}><Typography  variant="body2" sx={{fontSize:20}}>Setup Name</Typography></Grid></Grid></Grid><Grid item xs={8} ><Box sx={{ width:'50vw', height: '50vh',position:'relative' }}><Image
        src={'/images/setupCar.svg'}
        alt={''}
        fill={true}
      /></Box></Grid></Grid>
      
    </Box>
     </Box>
     )
     }

     export default SetupCarDisplay