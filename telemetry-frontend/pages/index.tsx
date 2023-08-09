'use client'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import NavBar from '../components/navbar/navbar';
import DynamicChart from '../components/sessionTabs/chart';
import SideNav from '../components/sideNav';
import TrackSelection from '../components/sessionStartupComponents/setupComponents/trackSelection';
import TyreTemps from '../components/sessionTabs/tyresTempindicator/tyreTemps';
import { Card, Container, Button, Typography } from '@mui/material';
import ThrottleComponent from '../components/bin/throttle';
import Homepage from '../components/background/background';
import BasicCard from '../components/card';
import '../calltoaction.css';
import Link from "next/link";
import BasicChart from '../components/sessionTabs/chart';
import { AuthContext } from '../components/authProvider';
import GearDisplay from '../components/sessionTabs/gearDisplay.';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import HomepageTrack from '../components/homepageTrackDispaly';
import LeftContentBox from '../components/leftHomePageContent';
import HorizontalBanner from '../components/horizontalBanner/horizontalBanner';
import BannerInterface from '../interfaces/bannerContent';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Sports } from '@mui/icons-material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import LabelIcon from '@mui/icons-material/Label';
import ImageBanner from '../components/splitImageBanner';
import Footer from '../components/footer/footer';
import '../components/navbar/navbar.css';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'rgba(132, 126, 126, 0)',
  boxShadow: 'none', // Override the shadow effect
}));



const Home = () => {
  const { isLoggedIn, userName } = useContext(AuthContext);
  const router = useRouter();
  const Card1Fonts = [29, 22, 21]
  const Card1Colors = ["#F6F6F6", "#F6F6F6", "#F6F6F6"]
  const Card2Colors = ["#F6F6F6", "#F6F6F6", "#F6F6F6"]
  const Card1Content = ["BOOST YOUR LEARNING", "REAL TIME INSIGHTS - FULLY RIGGED", "SIGN UP TO GET STARTED AND START GAINING EVERY TENTH"]
  const Card2Content = ["NOT SURE WHERE TO START", "BROWSE HUNDREDS OF PREPLANNED SESSIONS", "CURATED BY EXPERTS FOR YOU"]

  console.log(isLoggedIn);
  useEffect(() => {
  console.log(isLoggedIn);
  if (!isLoggedIn) {
   router.push('/login');
  }
  }, [isLoggedIn, router]);

  const bannerItems: BannerInterface[] = [
    {
      title: 'Sessions',
      titleSize: 29,
      titleFontStyle: 'Yapari',
      titleFontWeight: 'bold',
      body: ['Sessions allow for real time data streaming directly from your console.', 'Real Time Data Streaming', 'Console/PC Connectivity', 'Data Recording', 'Access to Setups'],
      bodySize: [22, 17, 17, 17, 17],
      bodyFontStyle: 'Satoshi',
      bodyFontWeight: 'normal',
      customIcon: LabelIcon, // Replace with your custom icon component
      ctaButton: 
      <Button className="parallelogram-buttonBlue" sx={{fontWeight: 'bold', fontFamily: "Satoshi" }}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href="/session-startup">Start Sessions</Link></Button>,
      ctaTarget: '',
    },
    {
      title: 'REVIEW',
      titleSize: 29,
      titleFontStyle: 'Yapari',
      titleFontWeight: 'bold',
      body: ['Sessions allow for real time data streaming directly from your console.', 'Over 15 Data Streams To Compare', '1-100 Reviewable Laps', 'Cross Lap and Session Comparisons ', 'Multiple Stream Comparisons'],
      bodySize: [22, 17, 17, 17, 17],
      bodyFontStyle: 'Satoshi',
      bodyFontWeight: 'normal',
      customIcon: LabelIcon, // Replace with your custom icon component
      ctaButton: <Button className="parallelogram-buttonBlue" sx={{fontWeight: 'bold', fontFamily: "Satoshi" }}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href="/review">Review</Link></Button>,
      ctaTarget: '',
    },
    {
      title: 'RECOMMENDED',
      titleSize: 29,
      titleFontStyle: 'Yapari',
      titleFontWeight: 'bold',
      body: ['Sessions allow for real time data streaming directly from your console.', 'Daily Challenge Content', 'Tips To Improve', 'Coming Soon', 'Coming Soon'],
      bodySize: [22, 17, 17, 17, 17],
      bodyFontStyle: 'Satoshi',
      bodyFontWeight: 'normal',
      customIcon: LabelIcon,// Replace with your custom icon component
      ctaButton: <Button className="parallelogram-buttonBlue" sx={{ fontWeight: 'bold', fontFamily: "Satoshi" }}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href="/recommended">Recommended</Link></Button>,
      ctaTarget: '',
    },
    {
      title: 'COMING SOON',
      titleSize: 29,
      titleFontStyle: 'Yapari',
      titleFontWeight: 'bold',
      body: [],
      bodySize: [22, 17, 17, 17, 17],
      bodyFontStyle: 'Satoshi',
      bodyFontWeight: 'normal',
      customIcon: LabelIcon,// Replace with your custom icon component
      ctaButton: <Button variant="contained" disabled color="primary">N/A</Button>,
      ctaTarget: '',
    },
  ];

  return (
    <>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Homepage style={'navbar-container'}>
                <Item><NavBar /></Item>
              </Homepage>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={4}>
           <Grid item xs={12}>
                <Homepage style={'homepage-container'}>
                  <div style={{ display: 'flex' }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}><Box sx={{ height: '100px' }}></Box></Grid>
                          <Grid item xs={12} sm={5}>
                            <Item>
                              <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <Grid container spacing={1}>
                                  <Grid item xs={12}>
                                    <BasicCard ml={0} mt={0} mr={0} fontWeights={['Bold', 'Regular', 'Regular']} noOfLines={3} lineTextAlign={'left'} lineFontSizes={Card1Fonts} lineFontColors={Card1Colors} lineContent={Card1Content} lineFonts={["Yapari", "Yapari", "Satoshi", "Satoshi"]} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]} justifyContent={'right'}></BasicCard>
                                  </Grid>
                                  <Grid item xs={12} >
                                    <div >
                                    <Button className="parallelogram-buttonCTA-XLG" sx={{ left: 30, fontWeight: 'bold', fontFamily: "Satoshi" }}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href="/session-startup">Start Session</Link></Button>
                                    </div>
                                  </Grid>
                                </Grid>
                              </div>
                            </Item>
                          </Grid>
                        <Grid item xs={12} sm={7} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                          <Item>
                            <HomepageTrack />
                          </Item>
                        </Grid>
                        <Grid item xs={8}>
                          <Item>
                          </Item>
                        </Grid>
                      </Grid>
                    </Box>
                  </div>{isLoggedIn && <h1>Hello, {userName}!</h1>}
                </Homepage>
                </Grid>
         
                <Grid item xs={12}>
          <Homepage style='homepage-containerExtended'>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={8}>
                <Grid item xs={12}>
                  <ImageBanner imageSrc={"/images/test2.jpg"} hasOverlay={true}  >
                    <Box sx={{ height: "90%", width: '100%', overflow: 'auto', mt: '5%' }}>
                      <Grid container spacing={2}> 
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <HorizontalBanner GridContent={["WHAT WE OFFER"]} needsBackground={false} fontSizes={[45]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <HorizontalBanner GridContent={bannerItems} fontSizes={[0]} needsBackground={true} fontFamilies={["N/A"]} fontWeights={["N/A"]} fontColour={["N/A"]} isMutliStage={true} marginLeftValue={[]} />
                        </Grid> 
                      </Grid>
                    </Box>
                  </ImageBanner>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ height: "93%", width: '100%', overflow: 'auto', mt: '5%' }}> 
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <HorizontalBanner GridContent={["OUR PARTNERS"]} needsBackground={false} fontSizes={[45]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <HorizontalBanner GridContent={['/images/dataVision.svg', '/images/peopleco.svg', '/images/securl.svg', '/images/testbase.svg', '/images/woosh.svg', '/images/drvn.svg']} needsBackground={true} fontSizes={[22, 22, 22, 22, 22, 22]} fontFamilies={["Satoshi", "Satoshi", "Satoshi", "Satoshi", "Satoshi", "Satoshi"]} fontWeights={[]} fontColour={["White", "White", "White", "White", "White", "White"]} isMutliStage={false} marginLeftValue={[0,50,50,50,50,50]} />
                    </Grid>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ height: "93%", width: '100%', overflow: 'auto', mt: '5%' }}> 
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <HorizontalBanner GridContent={["OUR SOCIALS"]} needsBackground={false} fontSizes={[45]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} />
                    </Grid>
                    <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <HorizontalBanner GridContent={["COMPANY A", "COMPANY B", "COMPANY C", "COMPANY D", "COMPANY E", "COMPANY F"]} needsBackground={true} fontSizes={[22, 22, 22, 22, 22, 22]} fontFamilies={["Satoshi", "Satoshi", "Satoshi", "Satoshi", "Satoshi", "Satoshi"]} fontWeights={[]} fontColour={["White", "White", "White", "White", "White", "White"]} isMutliStage={false} marginLeftValue={[]} />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Homepage>
          </Grid> </Grid>
          <Homepage style='homepage-container-reverse'>
            <Grid container spacing={8}>
              <Grid item xs={12}>
                <Box sx={{ height: '150px' }}></Box>
              </Grid>
              <Grid item xs={12} sm={7} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                <Item>
                  <LeftContentBox />
                </Item>
              </Grid>
              <Grid item xs={12} sm={5}>
                <Item>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <Grid container spacing={1}>
                      <Grid item xs={12}>
                        <BasicCard ml={0} mt={0} mr={0} fontWeights={['Bold', 'Regular', 'Regular']} noOfLines={3} lineTextAlign={'left'} lineFontSizes={Card1Fonts} lineFontColors={Card2Colors} lineContent={Card2Content} lineFonts={["Yapari", "Yapari", "Satoshi", "Satoshi"]} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]} justifyContent={'right'}></BasicCard>
                      </Grid>
                      <Grid item xs={12} >
                        <div >
                          <Button className="parallelogram-buttonCTA-XLG" sx={{ left: 30, fontWeight: 'bold', fontFamily: "Satoshi" }}>
                            <Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href="/recomended">Recomended</Link>
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Item>
              </Grid>
              <Grid item xs={8}>
                <Item></Item>
                </Grid></Grid>
            </Homepage>
      </Grid>
      <Grid item xs={12}>
              <Homepage style={'navbar-containe-reverse'}>
                <Item><Footer /></Item>
              </Homepage>
            </Grid>
      </Grid>

    </>
  );
};

export default Home;


