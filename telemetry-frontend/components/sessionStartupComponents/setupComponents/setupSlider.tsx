import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import VolumeUp from '@mui/icons-material/VolumeUp';


const Input = styled(MuiInput)`
  width: 42px;
`;

interface InputSliderProps{
width:number
targetAttribute:string
onValueChange: (value:string ) => void;
minValue:number;
maxValue:number;
step:number;
}
export default function InputSlider({width,targetAttribute,onValueChange,minValue,maxValue,step}:InputSliderProps) {
  const [value, setValue] = React.useState<number | string | Array<number | string>>(
    30,
  );

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue);
    onValueChange(newValue.toString());
  };

  return (
    <Box sx={{ width: width }}>
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
            min={minValue}
            max={maxValue}
            step={step}
          />
        </Grid>
      </Grid>
    </Box>
  );
}