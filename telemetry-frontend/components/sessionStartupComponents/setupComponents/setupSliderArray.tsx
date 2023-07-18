import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


interface ArraySliderProps {
  width: number|string;
  targetAttribute: string;
  onValueChange: (value: string[]) => void;
  minValue:string;
  maxValue:string;
  step:number;
}

export default function ArraySlider({
  width,
  targetAttribute,
  onValueChange,
  minValue,
  maxValue,
  step,
}: ArraySliderProps) {
  const [values, setValues] = React.useState<string[]>([minValue, minValue]);

  const handleSliderChange = (index: number) => (
    event: React.ChangeEvent<{}>,
    newValue: number | number[]
  ) => {
    const newValues = [...values];
    newValues[index] = newValue.toString();
    setValues(newValues);
    onValueChange(newValues);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0} direction="row">
        <Grid item xs={6}>
        <Box sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom>
             {targetAttribute} {values[0]}
          </Typography>
          <Slider
            value={parseFloat(values[0]) || 0}
            onChange={handleSliderChange(0) as any}
            aria-labelledby="input-slider"
            sx={{width:width}}
            valueLabelDisplay="auto"
            min={parseFloat(minValue)}
            max={parseFloat(maxValue)}
            step={step}
          /></Box>
        </Grid>
        <Grid item xs={6}>
        <Box sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom>
            {targetAttribute} {values[1]}
          </Typography>
          <Slider
            value={parseFloat(values[1]) || 0}
            onChange={handleSliderChange(1) as any}
            aria-labelledby="input-slider"
            sx={{width:width}}
            valueLabelDisplay="auto"
            min={parseFloat(minValue)}
            max={parseFloat(maxValue)}
            step={step}
          /></Box>
        </Grid>
      </Grid>
    </Box>
  );
  }  
