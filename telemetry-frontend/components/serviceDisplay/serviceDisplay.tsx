
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';
import BannerInterface from '../../interfaces/bannerContent';
import IconBox from '../iconBox';


interface ServiceDisplayProps {
componentSetup:BannerInterface;
}
export default function  ServiceDisplay({componentSetup}:  ServiceDisplayProps) {

    return (
<Box sx={{width:'100%',height:'100%'}}>
<Grid container spacing={4} >

          <Grid item xs={12}    sm={12} sx={{display:'flex',justifyContent:'center'}}>
             <Typography fontWeight={componentSetup.titleFontWeight} fontFamily={componentSetup.titleFontStyle} fontSize={componentSetup.titleSize} sx={{color:'white'}}>{componentSetup.title}</Typography> 
          </Grid>
          <Grid item xs={12}    sm={12} sx={{display:'flex',justifyContent:'center'}}>
             <Typography fontWeight={componentSetup.bodyFontWeight} fontFamily={componentSetup.bodyFontStyle} fontSize={componentSetup.bodySize[0]} sx={{color:'white'}}>{componentSetup.body[0]}</Typography>
          </Grid>
          <Grid item xs={12} sm={12} sx={{ display: 'flex', justifyContent: 'center' }}>
          <Grid container spacing={1} >
          {componentSetup.body.map((content, index) => {
          // Skip the first item which is the componentSetup.body
          if (index === 0) return null;
          
          // Render each item in the Grid
          return (
            <>
          <Grid item xs={4}  sx={{ display: 'flex', justifyContent: 'center' }} key={index}><IconBoxCustom icon={componentSetup.customIcon}/></Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'left' ,alignItems:'center'}} key={index}>
                
           
                <Typography fontWeight={componentSetup.bodyFontWeight} fontFamily={componentSetup.bodyFontStyle} fontSize={componentSetup.bodySize[index]} sx={{ color: 'white' }}>
                  {content}
                </Typography>
            
            </Grid>
            </>
          );
        })}
          </Grid></Grid>
          <Grid item xs={12}    sm={12} sx={{display:'flex',justifyContent:'center'}}>
            {componentSetup.ctaButton}
          </Grid>
      
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
        padding="8px"
        width="10px"
        height="50px"
        justifyContent='center'
      >
            <Icon fontSize="medium" sx={{color:'white'}}/>
         
  
      </Box>
    );
  };