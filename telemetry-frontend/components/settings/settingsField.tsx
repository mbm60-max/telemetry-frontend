
import { Box, Button, Grid, SvgIconTypeMap, Typography } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SettingsFieldProps{
name:string;
Info:string;
onClick:(field:string)=>void;
Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

const SettingsField = ({ name,Info,onClick,Icon}: SettingsFieldProps) => {
    const handleClick=()=>{
        onClick(name);
    }

  return (
    <Box sx={{ width: '85%'}}>
      <Button  onClick={handleClick} variant='contained' sx={{ width: '95%',ml:2, borderRadius:1, border: '1px solid red' ,boxShadow:1,backgroundColor:'grey'}}>
        <Grid container spacing={2} alignItems="center">
          <Box sx={{ width: "100%",height:'100%',backgroundColor:'F6F6F6', margin:1, padding:2,wrap: "wrap", overflow:'scroll'}}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} sm={1} sx={{mt:-3}}>
                <Icon />
              </Grid>
              <Grid item xs={12} sm={10}sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                <Grid container spacing={0} >
                  <Grid item xs={12} sx={{display:'flex',justifyContent:'left'}} >
                    <Typography sx={{ml:2,mt:2}}id="input-slider" gutterBottom >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display:'flex',justifyContent:'left'}}>
                  <Typography sx={{ml:2,mt:2,overflow:'auto',whiteSpace:'nowrap'}}id="input-slider" gutterBottom >
                  {Info}
                    </Typography>
                   
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={1}>
                <ArrowForwardIosIcon sx={{mt:2}}/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Button> 
    </Box>
     )
     }

     export default SettingsField