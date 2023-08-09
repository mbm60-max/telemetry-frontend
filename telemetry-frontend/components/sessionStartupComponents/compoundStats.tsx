import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid, LinearProgress, styled } from '@mui/material';


  interface CompoundStatBarsProps {
    selectedCompound: string;
  }
  
  interface CompoundData {
    wear: number;
    durability: number;
    grip: number;
  }
  const compoundData: { [key: string]: CompoundData } = {
    "Comfort: Hard (CH)": { wear: 60, durability: 80, grip: 70 },
    compoundB: { wear: 75, durability: 65, grip: 85 },
    // Add more compound data as needed
  };
export default function CompoundStatBars({selectedCompound}:CompoundStatBarsProps) {
    const selectedData = compoundData[selectedCompound];

  return (
    <Box sx={{width:'100%',height:'100%',backgroundColor:'rgba(8, 13, 56, 0.5)'}}>
 <Grid container spacing={4}>
              <Grid item xs={12}><LinearProgress variant="determinate" value={selectedData.wear} color="primary" /></Grid>
              <Grid item xs={12}> <LinearProgress variant="determinate" value={selectedData.durability} color="secondary" /></Grid>
              <Grid item xs={12}><LinearProgress variant="determinate" value={selectedData.grip} /></Grid>
              </Grid>
    </Box>
  );
}