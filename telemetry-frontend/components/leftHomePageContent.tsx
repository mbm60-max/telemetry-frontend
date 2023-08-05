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
            <Grid container spacing={0} sx={{minWidth:'300px'}}>
                <Grid item xs={12}>
                    <Item>
                        <Grid container spacing={0}  >
                        <Grid item xs={12} >
                            <BasicCard ml={0} mt={0} mr={0} fontWeights={['Bold']} noOfLines={1} lineFontSizes={Card1Fonts} lineFontColors={Card2Colors} lineFonts={["Yapari"]} lineContent={"OUR COMMUNITY"} lineML={[]} lineMR={[]} lineMT={[]} lineTextAlign={'left'} lineWhiteSpace={['initial',
                                        'pre-line']} justifyContent={"left"}></BasicCard></Grid>
                            <Grid item xs={8}>
                                <BasicCarousel CarouselHeader={["WOW","AMAZING","THE BEST YET","MUST HAVE"]} BodyContent={["This has really helped me to develop my skills i am so happy i tried this","This has really helped me to develop my skills i am so happy i tried this","This has really helped me to develop my skills i am so happy i tried this","This has really helped me to develop my skills i am so happy i tried this"]} Ratings={[1,3.5,2,5]}/>
                            </Grid>
                            <Grid item xs={4}>
                    <ItemInner><BasicCard ml={0} mt={0} mr={0} fontWeights={['Regular', 'Regular']} noOfLines={8} lineFontSizes={Card2Fonts} lineFontColors={Card2Colors} lineContent={''} lineML={[]} lineMR={[]} lineMT={[]} lineTextAlign={'right'} lineWhiteSpace={['initial',
                                        'pre-line']} lineFonts={["Yapari", "Yapari", "Yapari", "Yapari"]} justifyContent={"left"}></BasicCard></ItemInner>
                </Grid><Grid item xs={12} > <ItemInnerTopAligned><div style={{ display: 'flex', justifyContent:'right' }}><div  ><Button className="parallelogram-buttonCTA-LG" sx={{positon:'absolute', top:-80}}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/session-startup">Start Session</Link></Button></div></div></ItemInnerTopAligned></Grid>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default LeftContentBox;