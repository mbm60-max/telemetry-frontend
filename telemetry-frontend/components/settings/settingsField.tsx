
import { Box, Button, Divider, Grid, styled, SvgIconTypeMap, Typography, useMediaQuery } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

interface SettingsFieldProps{
name:string;
Info:string;
onClick:(field:string)=>void;
hasDivider:boolean;
Icon:OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
}

const SettingsField = ({ name,Info,onClick,Icon,hasDivider}: SettingsFieldProps) => {
    const handleClick=()=>{
        onClick(name);
    }
const isMobile = useMediaQuery('(max-width:600px)')
const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
  borderWidth: "1.5px", // Adjust the thickness of the line here
  borderColor: "white", // You can change the color to any valid CSS color value
width:'73%'
}));
  return (
   
              <Grid container spacing={0} alignItems="center" >
              <Grid item xs={12}> <Box sx={{ width: '100%',display:'flex',justifyContent:'end'}}><Box sx={{width: '85%'}}>
      <Button  onClick={handleClick} variant='contained' sx={{ width: '95%',ml:0, borderRadius:1, boxShadow:0,backgroundColor:'rgba(0,0,0,0)'}}>
        <Grid container spacing={2} alignItems="center">
          <Box sx={{ width: "100%",height:'100%',backgroundColor:'F6F6F6', margin:1, padding:2,wrap: "wrap", overflow:'scroll'}}>
            <Grid container spacing={0} alignItems="center">
              <Grid item xs={12} sm={1} sx={{mt:0}}>
                <Icon />
              </Grid>
              {!isMobile ?(<Grid item xs={6} sm={10}sx={{display:'flex',justifyContent:'left',alignItems:'center'}}>
                <Grid container spacing={0} >
                  <Grid item xs={12} sx={{display:'flex',justifyContent:'left'}} >
                    <Typography fontFamily={'Satoshi'}sx={{ml:2,mt:2,color:'white'}}id="input-slider" gutterBottom >
                      {name}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sx={{display:'flex',justifyContent:'left'}}>
                  <Typography fontFamily={'Satoshi'} sx={{ml:2,mt:2,overflow:'auto',whiteSpace:'nowrap',color:'white'}}id="input-slider" gutterBottom >
                  {Info}
                    </Typography>
                   
                  </Grid>
                </Grid>
              </Grid>):null}
              <Grid item xs={12} sm={1}>
                <ArrowForwardIosIcon sx={{mt:2}}/>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      </Button> </Box>
    </Box></Grid>
    {hasDivider?(
              <Grid item xs={12} ><Box sx={{width:'100%',display:'flex',justifyContent:'end'}}><StyledHorizontalDivider/></Box></Grid>):null}
                </Grid>
            
   
     )
     }

     export default SettingsField