import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import TextField from '@mui/material/TextField';

interface ArraySliderTextProps {
  width: number|string;
  targetAttribute: string;
  onValueChange: (value: string[]) => void;
}

export default function ArraySliderText({
  width,
  targetAttribute,
  onValueChange,
}: ArraySliderTextProps) {
  const [sliderValue, setSliderValue] = useState(1);
  const [textValues, setTextValues] = useState<string[]>(['']);

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const value = Array.isArray(newValue) ? newValue[0] : newValue;
    setSliderValue(value);
    generateTextValues(value);
  };

  const handleTextFieldChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...textValues];
    newValues[index] = event.target.value;
    setTextValues(newValues);
    onValueChange(newValues);
  };

  const generateTextValues = (value: number) => {
    const newValues = new Array(value).fill('').map((_, index) => textValues[index] || '');
    setTextValues(newValues);
    onValueChange(newValues);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
        <Box sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom>
            {targetAttribute}: {sliderValue}
          </Typography>
          <Slider
            value={sliderValue}
            min={1}
            max={10}
            onChange={handleSliderChange}
            aria-labelledby="input-slider"
            valueLabelDisplay="auto"
          /></Box>
        </Grid>
        {textValues.map((textValue, index) => (
          <Grid item xs={3} key={index}>
            <TextField
              value={textValue}
              onChange={handleTextFieldChange(index)}
              label={`Gear ${index + 1}`}
              variant="outlined"
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
