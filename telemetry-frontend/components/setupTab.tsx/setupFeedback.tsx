import { Box, Grid, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupFeedbackSlider from './setupFeedbackSlider';
import { SettingsContext } from '../authProviderSettings';

interface SetupFeedbackProps {
conditions:string[];
}



const SetupFeedback = ({ conditions }: SetupFeedbackProps) => {
    const [value, setValue] = React.useState(0);
    
      const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if(typeof newValue =='number'){
            setValue(newValue);
        }
      };
      const tooltipInfo = (
        <>
         <em>{"This feature is under construction, based on responses and setup info ML will be used to recommend setups"}</em>
        </>
      );
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
    <Box sx={{ width: '100%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} alignItems="center">
    <Grid item xs={12} sx={{ display: "flex",ml:1 }}><Typography id="input-slider" fontFamily={"Yapari"} gutterBottom sx={{fontSize:30,color:appearance.lightModeEnabled ? "black" :"white"}}  fontWeight="bold">
    Driver Feedback On Setup
    </Typography><InfoToolTip name={"Driver Feeback"} info={tooltipInfo} iconColor={appearance.lightModeEnabled ? "black" :"white"}/></Grid>
        {conditions.map((condition, index) => (
          <React.Fragment key={index}>
            <Grid item xs={4}>
              <SetupFeedbackSlider
                name={condition}
                tooltipText={`Tooltip for ${condition}`}
                minValue={0}
                maxValue={5}
                step={1}
              />
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
     </Box>
     )
     }

     export default SetupFeedback