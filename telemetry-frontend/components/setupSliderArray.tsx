import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';


interface ArraySliderProps {
  width: number;
  targetAttribute: string;
  onValueChange: (value: string[]) => void;
}

export default function ArraySlider({
  width,
  targetAttribute,
  onValueChange,
}: ArraySliderProps) {
  const [values, setValues] = React.useState<string[]>(['', '']);

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
        <Grid item xs={4}>
          <Typography id="input-slider" gutterBottom>
             {targetAttribute} {values[0]}
          </Typography>
          <Slider
            value={parseInt(values[0]) || 0}
            onChange={handleSliderChange(0) as any}
            aria-labelledby="input-slider"
            sx={{width:150}}
          />
        </Grid>
        <Grid item xs={3}>
          <Typography id="input-slider" gutterBottom>
            {targetAttribute} {values[1]}
          </Typography>
          <Slider
            value={parseInt(values[1]) || 0}
            onChange={handleSliderChange(1) as any}
            aria-labelledby="input-slider"
            sx={{width:150}}
          />
        </Grid>
      </Grid>
    </Box>
  );
  }  
