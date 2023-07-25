import { Box, Grid, Slider, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupFeedbackSlider from './setupFeedbackSlider';

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
  return (
    <Box sx={{ width: '100%', height: '50%',position:'relative', backgroundColor:'#F6F6F6',
    borderRadius: 1.5,
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
    <Box sx={{ width: '100%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} alignItems="center">
    <Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:30}}  fontWeight="bold">
    Driver Feedback On Setup
    </Typography><InfoToolTip name={"Driver Feeback"} info={tooltipInfo}/></Grid>
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