import { Box, Grid, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupFeedbackSlider from './setupFeedbackSlider';
import SetupDataDisplay from './setupDataDisplay';
import splitAndCapitalise from '../../utils/splitAndCapitalise';
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

  return (
    <Box
    sx={{
      width: "100%",
      height: "100%",
      backgroundColor: "white",
      borderRadius: 1.5,
      boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.3)",
      border: "6px solid rgba(8, 13, 100, 0.6)",
    }}
  >
    <Box sx={{ width: '100%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}><Grid container spacing={2} alignItems="center"><Grid item xs={12} sx={{ display: "flex",ml:1 }}><Typography variant="h6" sx={{fontSize:30}} fontFamily={"Yapari"}  fontWeight="bold">{selectedField}</Typography></Grid></Grid></Grid><Grid item xs={12} sx={{ display: "flex",ml:1 }}><Typography  variant="body2" sx={{fontSize:20}} fontFamily={"Satoshi"}>{splitAndCapitalise(setupName)}</Typography></Grid>
          <Grid item xs={12}><Box></Box></Grid>
          <Grid item xs={12}>
          <Grid container columnSpacing={0} rowSpacing={4} alignItems="center">
          {fieldData && Object.keys(fieldData).map((fieldName, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <SetupDataDisplay name={fieldName} value={fieldData[fieldName].Value} units={fieldData[fieldName].Units} />
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
      </Grid>
      </Grid>
    </Box>
     </Box>
     )
     }

     export default SetupSelectedFieldDisplay