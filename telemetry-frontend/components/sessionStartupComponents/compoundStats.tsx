import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Divider, Grid, styled, Typography} from '@mui/material';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';
import CompoundData from '../../data/compoundData';

  interface CompoundStatBarsProps {
    selectedCompound: string;
  }

  const ProgressBar = styled(LinearProgress)(({ theme }) => ({
    height: 15,
    width:'85%',
    borderRadius: 5,
    display:'flex',
    justifyContent:'center',
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? "#FB9536" : "#FB9536",
    },
  }));
  
 
export default function CompoundStatBars({selectedCompound}:CompoundStatBarsProps) {
    const selectedData = CompoundData[selectedCompound];

  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'rgba(8, 13, 56, 0.5)',borderRadius:10,
    border: "3px solid #FB9536",
    boxShadow: 1, }}>
      <Grid container spacing={2}>
      <Grid item xs={12}  >
         <Typography sx={{textAlign:'left',ml:5,mt:2,color:"#F6F6F6"}} fontSize={22}  fontFamily={"Yapari"}>Grip</Typography>
        </Grid>
        <Grid item xs={12}sx={{display:'flex',
    justifyContent:'center'}}>
          <ProgressBar variant="determinate" value={selectedData.grip}  />
        </Grid>
        <Grid item xs={12}>
         <Typography sx={{textAlign:'left',ml:5,mt:2,color:"#F6F6F6"}} fontSize={22}  fontFamily={"Yapari"}>Durability</Typography>
        </Grid>
        <Grid item xs={12}sx={{display:'flex',
    justifyContent:'center'}}>
          <ProgressBar variant="determinate" value={selectedData.durability}  />
        </Grid>
        <Grid item xs={12}>
         <Typography sx={{textAlign:'left',ml:5,mt:2,color:"#F6F6F6"}} fontSize={22}  fontFamily={"Yapari"}>Wear</Typography>
        </Grid>
        <Grid item xs={12}sx={{display:'flex',
    justifyContent:'center'}}>
          <ProgressBar variant="determinate" value={selectedData.wear} />
        </Grid>
      </Grid>
    </Box>
  );
}