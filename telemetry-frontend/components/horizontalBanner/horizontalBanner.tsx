
import * as React from 'react';
import Button from '@mui/material/Button';
import { Box, Grid, Paper, styled, Typography } from '@mui/material';
import BannerInterface from '../../interfaces/bannerContent';
import ServiceDisplay from '../serviceDisplay/serviceDisplay';
import ImageBox from '../homepageTrack';
import IconGridInterface from '../../interfaces/iconGridInterface';
import SocialsDisplay from '../serviceDisplay/socialsDisplay';

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
  backgroundColor: 'rgba(251, 149, 54, 0.95)',
  boxShadow: 'none', // Override the shadow effect
  borderRadius:50,
  minHeight:'350px',
  minWidth:'150px',
  width:'100%',
  display:'flex',
}));
interface HorizontalBannerProps {
GridContent:string[]|BannerInterface[]|IconGridInterface[];
needsBackground?:boolean;
fontSizes:number[];
fontFamilies:string[];
fontWeights:string[];
fontColour:string[];
isMutliStage:boolean;
marginLeftValue:number[];
isBannerInterface:boolean;
}


export default function HorizontalBanner({GridContent,needsBackground,fontColour,fontFamilies,fontSizes,fontWeights,isMutliStage,marginLeftValue,isBannerInterface}: HorizontalBannerProps) {

    return (
<Box sx={{width:'90%',height:'100%'}}>
<Grid container rowSpacing={2} columnSpacing={8} >
{GridContent.map((content, index) => (
          <Grid item xs={12} sm={ GridContent.length > 1 ? 6 : 12} key={index} sx={{ display: 'flex', justifyContent: 'center' }}>
           {isMutliStage ? (
                            needsBackground ? (
                                
                              typeof content !== 'string' ? (
                                <ItemSquare>
                    {isBannerInterface ? (
                      <ServiceDisplay componentSetup={content as BannerInterface} />
                    ) : (
                      <SocialsDisplay componentSetup={content as IconGridInterface} />
                      /* Handle IconGridInterface content here */
                    )}
                  </ItemSquare>
                            ) : (
                                null
                            )
                          ) : (
                              typeof content !== 'string' ? (<>
                                {isBannerInterface ? (
                                  <ServiceDisplay componentSetup={content as BannerInterface} />
                                ) : (
                                  <SocialsDisplay componentSetup={content as IconGridInterface} />
                                  /* Handle IconGridInterface content here */
                                )}
                             </>
                            ) : (
                                null
                            )
                          )
                        ) : (
                            needsBackground ? (
                                
                                typeof content === 'string' ? (
                                  <Item>
                                    <ImageBox imageSrc={content} Width={'90%'} Height={'90%'} MarginRight={''} MarginLeft={marginLeftValue[index]} MarginTop={''} borderRadius={0} hasOverlay={false} >
                                    </ImageBox>
                                </Item>
                              ) : (
                                typeof content !== 'string' ? (
                                  <Item>
                      {isBannerInterface ? (
                        <ServiceDisplay componentSetup={content as BannerInterface} />
                      ) : (
                        <SocialsDisplay componentSetup={content as IconGridInterface} />
                        /* Handle IconGridInterface content here */
                      )}
                    </Item>
                              ):(null)
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