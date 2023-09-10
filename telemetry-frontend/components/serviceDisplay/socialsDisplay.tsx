
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';
import IconBox from '../iconBox';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import IconGridInterface from '../../interfaces/iconGridInterface';


interface SocialsDisplayProps {
componentSetup:IconGridInterface;
}
export default function  SocialsDisplay({componentSetup}:  SocialsDisplayProps) {

    return (
    <Box sx={{width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Grid container spacing={0} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Grid item xs={2}  sx={{display:'flex',justifyContent:'center',alignItems:'center'}}> <IconBoxCustom icon={componentSetup.customIcon}/></Grid>
          <Grid item xs={6} sx={{display:'flex',justifyContent:'left',alignItems:'center',ml:2}}><Typography fontWeight={componentSetup.titleFontWeight} fontFamily={componentSetup.titleFontStyle} fontSize={componentSetup.titleSize} sx={{color:"white",whiteSpace:'nowrap',overflow:'auto'}}>{componentSetup.title} </Typography> </Grid>
          </Grid>
    </Box>
    );
}


interface IconBoxInputProps {
    icon: React.ElementType;
  }
const IconBoxCustom: React.FC<IconBoxInputProps> = ({ icon: Icon}) => {
    return (
      <Box
        display="flex"
        alignItems="center"
        padding="0px"
        width="10px"
        height="50px"
        justifyContent='center'

      >
            <Icon fontSize="large" sx={{color:'white'}}/>
         
  
      </Box>
    );
  };