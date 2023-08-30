import { Box, Grid, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';

interface SetupFeedbackSliderProps {
name:string;
tooltipText:string;
minValue:number;
maxValue:number;
step:number;
}



const SetupFeedbackSlider = ({ tooltipText,maxValue,minValue,name,step }: SetupFeedbackSliderProps) => {
    const [value, setValue] = React.useState(0);
    
      const handleSliderChange = (event: Event, newValue: number | number[]) => {
        if(typeof newValue =='number'){
            setValue(newValue);
        }
      };
      const tooltipInfo = (
        <>
         <em>{tooltipText}</em>
        </>
      );
  return (
    <Box  className={"slider"} sx={{ width: "85%",backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
    <Typography id="input-slider" gutterBottom>
    {name}
    </Typography>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>
        <Slider
          value={typeof value === 'number' ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          valueLabelDisplay="auto"
          min={minValue}
          max={maxValue}
          step={step}
        />
      </Grid> <InfoToolTip name={name} info={tooltipInfo} iconColor={'white'}/>
    </Grid>
  </Box>
     )
     }

     export default SetupFeedbackSlider

