
import { Box, Grid, Typography } from '@mui/material';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupSelectedFieldDisplay from './setupSelectedFieldDisplay';


interface SetupFieldProps{
name:string;
tooltipInfo:JSX.Element;
}

const SetupField = ({ name,tooltipInfo }: SetupFieldProps) => {
 
  return (
    <Box sx={{ width: '90%', height: '100%',position:'relative',ml:2}}>
    <Grid container spacing={2} alignItems="center">
<Box sx={{ width: "100%",backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1,wrap: "wrap", overflow:'scroll'}}>
    <Typography id="input-slider" gutterBottom >
    {name}
    </Typography><InfoToolTip name={"hi"} info={tooltipInfo}/> </Box>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>

      </Grid> 
    </Grid> </Grid>
  </Box>
     )
     }

     export default SetupField
