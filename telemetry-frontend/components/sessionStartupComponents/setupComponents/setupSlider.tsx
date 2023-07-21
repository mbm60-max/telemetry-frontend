import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';
import InfoToolTip from '../../helperTooltip.tsx/infoTooltip';


const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps{
width:number|string;
targetAttribute:string
onValueChange: (value:string ) => void;
minValue:number|string;
maxValue:number;
step:number;
toolTipContent:string;
}
export default function InputSlider({width,targetAttribute,onValueChange,minValue,maxValue,step,toolTipContent}:InputSliderProps) {
  const convertMinValue = (minValue:string|number)=>{
    if(typeof minValue =="string"){
      return parseFloat(minValue);
    }return minValue;
   }
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    convertMinValue(minValue),
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    onValueChange(newValue.toString());
  };
 
  const tooltipInfo = (
    <>
     <em>{toolTipContent}</em>
    </>
  );
  return (
    <Box sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
      <Typography id="input-slider" gutterBottom>
        {targetAttribute} {value}
      </Typography>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={typeof value === 'number' ? value : 0}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
            min={convertMinValue(minValue)}
            max={maxValue}
            step={step}
          />
        </Grid> <InfoToolTip name={targetAttribute} info={tooltipInfo}/>
      </Grid>
    </Box>
  );
}