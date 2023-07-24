import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import InfoToolTip from './helperTooltip.tsx/infoTooltip';


const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps{
width:number|string;
targetAttribute:string
toolTipContent:string;
stringValue:string;
targetAttributeValue:number;
}
export default function BoxedNumber({width,targetAttribute,toolTipContent,stringValue,targetAttributeValue}:InputSliderProps) {
  
  const tooltipInfo = (
    <>
     <em>{toolTipContent}</em>
    </>
  );
  return (
    <Box sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
        <Grid container spacing={2}><Grid item xs={8}><Typography id="input-slider" gutterBottom>
        {targetAttribute}&nbsp;{targetAttributeValue}{stringValue}
      </Typography></Grid><Grid item xs={4}>  <InfoToolTip name={targetAttribute} info={tooltipInfo}/></Grid></Grid>
    </Box>
  );
}