import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import splitAndCapitalise from '../../utils/splitAndCapitalise';
import { SettingsContext } from '../authProviderSettings';

interface SetupCarDisplayProps {
carName:string;
setupName:string;
}



const SetupCarDisplay = ({ carName,setupName}: SetupCarDisplayProps) => {
  const {appearance} = React.useContext(SettingsContext);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: appearance.lightModeEnabled ? "white" :"rgba(6, 14, 55, 0.9)",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.3)",
        border: appearance.lightModeEnabled ? "3px solid rgba(8, 13, 100, 0.3)" :" 3px solid white",
      }}
    >
    <Box sx={{ width: '70%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} >
          <Grid item xs={5}><Grid container spacing={0} >
          <Grid item xs={12} sx={{ display: "flex",ml:2 }}><Typography variant="h6" sx={{fontSize:36,color:appearance.lightModeEnabled ? "black" :"white"}}  fontFamily={"Yapari"} fontWeight="bold">{carName}</Typography></Grid> <Grid item xs={12}><Box sx={{height:'30px'}}></Box></Grid><Grid item xs={12} sx={{ display: "flex",ml:2 }}><Typography  variant="body2" sx={{fontSize:20,color:appearance.lightModeEnabled ? "black" :"white"}} fontFamily={"Satoshi"}>{splitAndCapitalise(setupName)}</Typography></Grid></Grid></Grid><Grid item xs={7} ><Box sx={{ width:'45vw', height: '50vh',position:'relative' }}><Image
        src={'/images/setupCar.svg'}
        alt={''}
        fill={true}
      /></Box></Grid></Grid>
      
    </Box>
     </Box>
     )
     }

     export default SetupCarDisplay