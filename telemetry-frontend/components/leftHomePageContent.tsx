'use client'

import { Box, Button, Grid, Link, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import trackData from "../data/trackData";
import BasicCard from "./card";
import BasicCarousel from "./carousel/carousel";
import ImageBox from "./homepageTrack";
import './navbar/navbar.css';

interface LeftContentBoxProps {

}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(8, 13, 56, 0.5)',
    boxShadow: 'none', // Override the shadow effect
    borderTopRightRadius:130,
    borderBottomRightRadius:130,
}));
const ItemInner = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: 'rgba(8, 13, 56, 0)',
    boxShadow: 'none', // Override the shadow effect
}));
const ItemInnerTopAligned = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: 'rgba(8, 13, 56, 0)',
    boxShadow: 'none', // Override the shadow effect
}));
function LeftContentBox({ }: LeftContentBoxProps) {
    const Card1Fonts = [28]
    const Card2Fonts = [22, 22,22,22,22, 22,22,22]
    const Card1Colors = ["#F6F6F6"]
    const Card2Colors = ["#F6F6F6"]

  

    return (
        <Box sx={{width:'100%', display:'flex',justifyContent:'left'}}>
            <Box sx={{width:'80%'}}>
            <Grid container spacing={0} sx={{minWidth:'350px'}}>
                <Grid item xs={12}>
                    <Item>
                        <Grid container spacing={0}  >
                        <Grid item xs={12} >
                            <BasicCard ml={0} mt={0} mr={0} fontWeights={['Bold']} noOfLines={1} lineFontSizes={Card1Fonts} lineFontColors={Card2Colors} lineFonts={["Yapari"]} lineContent={"OUR COMMUNITY"} lineML={[]} lineMR={[]} lineMT={[]} lineTextAlign={'left'} lineWhiteSpace={['initial',
                                        'pre-line']} justifyContent={"left"}></BasicCard></Grid>
                            <Grid item xs={12} >
                            <Box sx={{ height: '95%', width: '90%',minWidth:'375px', backgroundColor: 'rgba(9, 27, 119, 1)',borderRadius:10,padding:1}}>
                                <Grid container spacing={0}  >
                                    <Grid item xs={8} >
                                            <Box sx={{width:'350px',minWidth:'350px',height:'100%', overflow: 'hidden', display:'flex',justifyContent:'left'}}>
                                                <BasicCarousel CarouselHeader={["WOW", "AMAZING", "THE BEST YET", "MUST HAVE"]} BodyContent={["This has really helped me to develop my skills i am so happy i tried this", "This has really helped me to develop my skills i am so happy i tried this", "This has really helped me to develop my skills i am so happy i tried this", "This has really helped me to develop my skills i am so happy i tried this"]} Ratings={[1, 3.5, 2, 5]} Names={["MaxBm","Alicia P","G","LiamBYNG123"]}/>
                                            </Box>
                                    </Grid>
                                <Grid item xs={4} >
                                    <ItemInnerTopAligned><Button className="parallelogram-buttonCTA-LG" ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/customer_review">LEAVE A REVIEW</Link></Button></ItemInnerTopAligned>
                                </Grid>
                                
                            </Grid>
                            </Box>
                            </Grid>
                          
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default LeftContentBox;