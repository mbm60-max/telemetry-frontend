
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    alignText:'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#FB9536',
    boxShadow: 'none', // Override the shadow effect
    borderRadius:130,
    minHeight:'75px',
    minWidth:'150px',
    width:'100%',
    display:'flex',
}));

interface HorizontalBannerProps {
GridContent:string[];
needsBackground:boolean;
fontSizes:number[];
fontFamilies:string[];
fontWeights:string[];
fontColour:string[];
}
export default function HorizontalBanner({GridContent,needsBackground,fontColour,fontFamilies,fontSizes,fontWeights}: HorizontalBannerProps) {

    return (
<Box sx={{width:'75%',height:'100%'}}>
<Grid container spacing={2} >
{GridContent.map((content, index) => (
          <Grid item xs={12}    sm={needsBackground && GridContent.length > 1 ? 4 : 12} key={index} sx={{display:'flex',justifyContent:'center'}}>
            {needsBackground ? <Item><Typography fontWeight={fontWeights[index]} fontFamily={fontFamilies[index]} fontSize={fontSizes[index]} sx={{color:fontColour[index]}}>{content}</Typography></Item> : <Typography fontWeight={fontWeights[index]} fontFamily={fontFamilies[index]} fontSize={fontSizes[index]} sx={{color:fontColour[index]}}>{content}</Typography>}
          </Grid>
        ))}
</Grid>
</Box>
    );
}