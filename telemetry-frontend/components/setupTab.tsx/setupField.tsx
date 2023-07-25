
import { Box, Button, Grid, Typography } from '@mui/material';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';


interface SetupFieldProps{
name:string;
tooltipInfo:JSX.Element;
onClick:(field:string)=>void;
}

const SetupField = ({ name,tooltipInfo,onClick }: SetupFieldProps) => {
    const handleClick=()=>{
        onClick(name);
    }

  return (
    <Box sx={{ width: '100%', height: '100%',position:'relative'}}><Button  onClick={handleClick} variant='contained' sx={{ width: '90%', height: '100%',ml:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1,backgroundColor:'grey'}}>
    <Grid container spacing={2} alignItems="center">
<Box sx={{ width: "100%",height:'100%',backgroundColor:'F6F6F6', margin:1, padding:2,wrap: "wrap", overflow:'scroll'}}>

    <Typography id="input-slider" gutterBottom >
    {name}
    </Typography><InfoToolTip name={"hi"} info={tooltipInfo}/></Box>
    <Grid container spacing={2} alignItems="center">
      <Grid item xs>

      </Grid> 
    </Grid> </Grid></Button> 
  </Box>
     )
     }

     export default SetupField
 