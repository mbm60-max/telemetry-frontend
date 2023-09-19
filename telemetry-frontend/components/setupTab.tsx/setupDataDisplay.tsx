import { Box, Grid, SvgIconProps, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import { SettingsContext } from '../authProviderSettings';
import { mapMetricToImperial } from '../../utils/converters';
interface MUIIcon {
  icon: ReactNode; // You can also use `React.ReactElement` if needed
  props?: SvgIconProps; // Optional props specific to Material-UI SvgIcon
}
interface SetupDataDisplayProps {
name:string;
value:string|string[];
units:string;
icon:MUIIcon | undefined;
}



const SetupDataDisplay= ({name,value,units,icon}: SetupDataDisplayProps) => {
  const {appearance,defaults} = React.useContext(SettingsContext);
    return (
        <div>
          {typeof value === 'string' ? (
            <Box sx={{ width: '90%', height: '200px', position: 'relative', backgroundColor: 'rgba(8, 30, 150, 0.4)', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",mb:1,ml:1}}>
              {/* Use Typography or a div to wrap the content */}
              <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center',}}><Typography fontFamily={"Yapari"} sx={{fontSize:22 , whiteSpace: 'nowrap',color:'white',
          overflowX: 'auto',}}  fontWeight="bold">{name}</Typography></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> <Typography sx={{color:'white'}}>{icon && icon.icon}</Typography></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography  sx={{fontSize:22,color:'white' }}>{value+" "}{defaults.defaultUnitsMetric ? units : mapMetricToImperial(units)}</Typography> </Grid></Grid> 
            </Box>
          ) : (
            // "else" condition, handle non-string value (assuming value is an array of strings)
            <Box sx={{ width: '90%', height: '200px', position: 'relative', backgroundColor: 'rgba(8, 30, 150, 0.4)', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",mb:1,ml:1 }}>
              <Grid container spacing={2} alignItems="center">
  {value.length <= 2 ? (
    <>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Typography sx={{ fontSize: 22, whiteSpace: 'nowrap',color:'white' ,
          overflowX: 'auto', }} fontWeight="bold" fontFamily={"Yapari"}>
          {name}
        </Typography>
      </Grid>
      <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
     <Typography sx={{color:'white'}}>{icon && icon.icon}</Typography>
      </Grid>
      <Grid item xs={0} sm={12}><Box></Box></Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap',
          overflowX: 'auto', }}><Typography sx={{ fontSize: 22,wrap: "wrap", overflow:'scroll',color:'white'  }} >
      {value[0]+" "}{defaults.defaultUnitsMetric ? units : mapMetricToImperial(units)}
        </Typography></Grid>
      <Grid item xs={12} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', whiteSpace: 'nowrap',
          overflowX: 'auto', }}><Typography sx={{ fontSize: 22,wrap: "wrap", overflow:'scroll',color:'white'  }} >
      {value[1]+" "}{defaults.defaultUnitsMetric ? units : mapMetricToImperial(units)}
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
      <Typography sx={{color:'white'}}>{icon && icon.icon}</Typography>
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
   {defaults.defaultUnitsMetric ? units : mapMetricToImperial(units)}
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