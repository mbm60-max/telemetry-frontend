
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';
import BannerInterface from '../../interfaces/bannerContent';
import ServiceDisplay from '../serviceDisplay/serviceDisplay';

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

const ItemSquare = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  alignText:'left',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#FB9536',
  boxShadow: 'none', // Override the shadow effect
  borderRadius:10,
  minHeight:'350px',
  minWidth:'150px',
  width:'100%',
  display:'flex',
}));
interface HorizontalBannerProps {
GridContent:string[]|BannerInterface[];
needsBackground?:boolean;
fontSizes:number[];
fontFamilies:string[];
fontWeights:string[];
fontColour:string[];
isMutliStage:boolean;
}


export default function HorizontalBanner({GridContent,needsBackground,fontColour,fontFamilies,fontSizes,fontWeights,isMutliStage}: HorizontalBannerProps) {

    return (
<Box sx={{width:'90%',height:'100%'}}>
<Grid container rowSpacing={2} columnSpacing={8} >
{GridContent.map((content, index) => (
          <Grid item xs={12} sm={ GridContent.length > 1 ? 6 : 12} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
           {isMutliStage ? (
                            needsBackground ? (
                                
                              typeof content !== 'string' ? (
                                <ItemSquare>
                                  <ServiceDisplay componentSetup={content} />
                              </ItemSquare>
                            ) : (
                                null
                            )
                          ) : (
                              typeof content !== 'string' ? (
                                
                                
                                <ServiceDisplay componentSetup={content} />
                            
                             
                            ) : (
                                null
                            )
                          )
                        ) : (
                            needsBackground ? (
                                
                                typeof content === 'string' ? (
                                  <Item>
                                    <Typography fontWeight={fontWeights[index]} fontFamily={fontFamilies[index]} fontSize={fontSizes[index]} sx={{ color: fontColour[index] }}>
                                        {content}
                                    </Typography>
                                </Item>
                              ) : (
                                  null
                              )
                            ) : (
                                typeof content === 'string' ? (
                                  
                                    <Typography fontWeight={fontWeights[index]} fontFamily={fontFamilies[index]} fontSize={fontSizes[index]} sx={{ color: fontColour[index] }}>
                                        {content}
                                    </Typography>
                               
                              ) : (
                                  null
                              )
                            )
                        )}
      </Grid>
        ))}
</Grid>
</Box>
    );
}