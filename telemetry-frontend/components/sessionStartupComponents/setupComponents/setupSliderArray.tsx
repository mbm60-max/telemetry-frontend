import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import InfoToolTip from '../../helperTooltip.tsx/infoTooltip';
import './setupStyles.css'


interface ArraySliderProps {
  width: number|string;
  targetAttribute: string;
  onValueChange: (value: string[]) => void;
  minValue:string;
  maxValue:string;
  step:number;
  toolTipContent:string;
}

export default function ArraySlider({
  width,
  targetAttribute,
  onValueChange,
  minValue,
  maxValue,
  step,
  toolTipContent,
}: ArraySliderProps) {
  const tooltipInfoFront = (
    <>
     <em>{"Sets Front Values:"+toolTipContent}</em>
    </>
  );
  const tooltipInfoRear = (
    <>
     <em>{"Sets Rear Values:"+toolTipContent}</em>
    </>
  );
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
    <Box  sx={{ flexGrow: 1 }}>
      <Grid container rowSpacing={0} columnSpacing={6} direction="row">
        <Grid item xs={6}>
        <Box className={"sliderArray"} sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom fontSize={22} fontFamily={"Satoshi"} sx={{overflow:'auto',whiteSpace: 'nowrap' }}>
             {targetAttribute} {values[0]}
          </Typography>
          <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={parseFloat(values[0]) || 0}
            onChange={handleSliderChange(0) as any}
            aria-labelledby="input-slider"
            sx={{width:width}}
            valueLabelDisplay="auto"
            min={parseFloat(minValue)}
            max={parseFloat(maxValue)}
            step={step}
          /></Grid><InfoToolTip name={"Front" + targetAttribute} info={tooltipInfoFront} iconColor={'white'}/></Grid></Box>
        </Grid>
        <Grid item xs={6}>
        <Box className={"sliderArray"} sx={{ width: width,backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom fontSize={22} fontFamily={"Satoshi"} sx={{overflow:'auto',whiteSpace: 'nowrap' }}>
            {targetAttribute} {values[1]}
          </Typography>
          <Grid container spacing={2} alignItems="center">
        <Grid item xs>
          <Slider
            value={parseFloat(values[1]) || 0}
            onChange={handleSliderChange(1) as any}
            aria-labelledby="input-slider"
            sx={{width:width}}
            valueLabelDisplay="auto"
            min={parseFloat(minValue)}
            max={parseFloat(maxValue)}
            step={step}
          /></Grid><InfoToolTip name={"Rear" + targetAttribute} info={tooltipInfoRear} iconColor={'white'}/></Grid></Box>
        </Grid>
      </Grid>
    </Box>
  );
  }  
