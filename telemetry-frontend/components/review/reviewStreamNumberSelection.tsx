import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { Grid, Typography } from '@mui/material';

interface ReviewStreamNumberSelectionProps{
    onSelectNumber: (numberOfStreams: number) => void;
    label:string;
}
export default function ReviewStreamNumberSelection({label,onSelectNumber}:ReviewStreamNumberSelectionProps) {

    const handleChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelectNumber(Number(event.target.value));
      };
  return (
    <FormControl sx={{backgroundColor:'#FB9536',width:"51%",borderRadius:10, display:'flex',justifyContent:'left',paddingLeft:2,paddingRight:2}}>
      <FormLabel sx={{ml:2}}id="demo-radio-buttons-group-label"><Typography sx={{color:"white",whiteSpace:'nowrap',overflow:'scroll'}} fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25}>{label}</Typography></FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group"
        onChange={handleChoice}
      >
        <Grid container spacing={2}>
                        <Grid item xs={6}>
        <FormControlLabel value={1} control={<Radio />} label={<Typography sx={{color:"white"}} fontFamily={"Satoshi"} fontWeight={"normal"} fontSize={20}>One</Typography>} /></Grid>
        <Grid item xs={6}><FormControlLabel value={2} control={<Radio />} label={<Typography sx={{color:"white"}} fontFamily={"Satoshi"} fontWeight={"norml"} fontSize={20}>Two</Typography>} /></Grid>
        </Grid>
      </RadioGroup>
    </FormControl>
  );
}