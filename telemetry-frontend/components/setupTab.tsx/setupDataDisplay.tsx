import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
interface SetupDataDisplayProps {
name:string;
value:string|string[];
units:string;
}



const SetupDataDisplay= ({name,value,units}: SetupDataDisplayProps) => {
 
    return (
        <div>
          {typeof value === 'string' ? (
            <Box sx={{ width: '90%', minHeight: '100px', height: '100%', position: 'relative', backgroundColor: '#F6F6F6', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",mb:1,ml:1}}>
              {/* Use Typography or a div to wrap the content */}
              <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Typography sx={{fontSize:22}} fontWeight="bold">{name}</Typography></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><AccessibilityNewIcon sx={{fontSize:40}}/></Grid><Grid item xs={12} sx={{ml:4}}><Typography  sx={{fontSize:18}}>{value}{units}</Typography> </Grid></Grid> 
            </Box>
          ) : (
            // "else" condition, handle non-string value (assuming value is an array of strings)
            <Box sx={{ width: '90%', minHeight: '100px', height: '100%', position: 'relative', backgroundColor: '#F6F6F6', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",mb:1,ml:1 }}>
              <Grid container spacing={2} alignItems="center">
  {value.length <= 2 ? (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 22 }} fontWeight="bold">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AccessibilityNewIcon sx={{ fontSize: 40 }} />
      </Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ fontSize: 17,wrap: "wrap", overflow:'scroll' }} >
      {value[0]}{units}
        </Typography></Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}><Typography sx={{ fontSize: 17,wrap: "wrap", overflow:'scroll' }} >
      {value[1]}{units}
        </Typography></Grid>
      
    </>
  ) : (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 24 }} fontWeight="bold">
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <AccessibilityNewIcon sx={{ fontSize: 40 }} />
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Typography sx={{wrap: "wrap", overflow:'scroll'}}>
    {value.map((val, index) => (
      <React.Fragment key={index}>
        {val}{index < value.length - 1 && ', '}    
      </React.Fragment>
    ))}
  </Typography>
      </Grid>
      <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center',wrap: "wrap", overflow:'scroll' }}>
      <Typography>
   {units}
  </Typography>
      </Grid>
    </>
  )}
</Grid>
            </Box>
          )}
        </div>
      );
     }

     export default SetupDataDisplay