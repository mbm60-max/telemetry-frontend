import { Box, Grid, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupFeedbackSlider from './setupFeedbackSlider';
import SetupDataDisplay from './setupDataDisplay';
type SetupObject = {
  [key: string]: any;
};
interface SetupSelectedFieldDisplayProps {
conditions:string[];
setupName:string;
selectedField:string;
fieldData:SetupObject;
}



const SetupSelectedFieldDisplay= ({ conditions,fieldData,setupName,selectedField }: SetupSelectedFieldDisplayProps) => {
      const tooltipInfo = (
        <>
         <em>{"This feature is under construction, based on responses and setup info ML will be used to recommend setups"}</em>
        </>
      );
      console.log(fieldData)
  return (
    <Box sx={{ width: '100%', height: '50%',position:'relative', backgroundColor:'#F6F6F6',
    borderRadius: 1.5,
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
    <Box sx={{ width: '100%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}><Grid container spacing={2} alignItems="center"><Grid item xs={4} sx={{display:'flex', justifyContent:'left'}}><Typography variant="h6" sx={{fontSize:30}}  fontWeight="bold">{selectedField}</Typography></Grid><Grid item xs={8}><InfoToolTip name={"Driver Feeback"} info={tooltipInfo}/></Grid></Grid></Grid><Grid item xs={12}><Typography  variant="body2" sx={{fontSize:20}}>{setupName}</Typography></Grid>
          {fieldData && Object.keys(fieldData).map((fieldName, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <SetupDataDisplay name={fieldName} value={fieldData[fieldName].Value} units={fieldData[fieldName].Units} />
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
    </Box>
     </Box>
     )
     }

     export default SetupSelectedFieldDisplay