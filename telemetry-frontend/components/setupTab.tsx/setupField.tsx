
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
    <Box sx={{ width: '100%', height: '100%',position:'relative'}}>
      <Button  className={"warningButton"} sx={{width:'100%'}}onClick={handleClick} variant='contained' >

<Box sx={{ width: "100%",height:'100%',backgroundColor:'F6F6F6', margin:1, padding:2,wrap: "wrap", overflow:'scroll',display:'flex',justifyContent:'center',alignItems:'center'}}>

    <Typography id="input-slider" gutterBottom >
    {name}
    </Typography></Box>
     </Button> 
  </Box>
     )
     }

     export default SetupField
 //sx={{ width: '90%', height: '100%',ml:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1,backgroundColor:'grey'}}