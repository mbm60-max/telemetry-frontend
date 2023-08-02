'use client'
import React,{ useCallback, useContext, useEffect, useMemo, useState } from 'react';
import NavBar from '../components/navbar/navbar';
import DynamicChart from '../components/sessionTabs/chart';
import SideNav from '../components/sideNav';
import TrackSelection from '../components/sessionStartupComponents/setupComponents/trackSelection';
import TyreTemps from '../components/sessionTabs/tyresTempindicator/tyreTemps';
import { Card, Container,Button  } from '@mui/material';
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
const ItemBlack = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backGroundColor: theme.palette.text.primary,
}));
const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));
const BlackBox = styled(Box)(({ theme }) => ({
  paddingTop:15,
  paddingBottom:15,
}));

const Home = () => {
  const { isLoggedIn, userName } = useContext(AuthContext);
  const router = useRouter();
  const Card1Fonts=[32,24,17]
  const Card1Colors=["#F6F6F6","#F6F6F6","#F6F6F6"]
  const Card1Content=["BOOST YOUR LEARNING","REAL TIME INSIGHTS - FULLY RIGGED","SIGN UP TO GET STARTED AND START GAINING EVERY TENTH"]


  console.log(isLoggedIn);
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
    <>
    <Grid container spacing={0}>
    <Grid item xs={12}>
    <Grid container spacing={1}>
        <Grid item xs={12}>
        <Homepage style={'navbar-container'}>
          <Item><NavBar/></Item>
          </Homepage>
        </Grid></Grid></Grid> <Grid item xs={12}>
      <Homepage style={'homepage-container'}><div style={{ display: 'flex' }}>
     
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
      <Grid item xs={12}><Box sx={{height:'100px'}}></Box></Grid>
        <Grid item xs={12} sm={5}>
        <Item><div style={{ display: 'flex', flexDirection:'column'}}><Grid container spacing={1}>
        <Grid item xs={12}><BasicCard ml={0} mt={0} mr={0} noOfLines={3} lineTextAlign={'left'} lineFontSizes={Card1Fonts}lineFontColors={Card1Colors} lineContent={Card1Content} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]}></BasicCard></Grid><Grid item xs={12} ><div ><Button className="parallelogram-buttonCTA-XLG" sx={{left:30}}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/session-startup">Start Session</Link></Button></div></Grid></Grid></div></Item>
        </Grid>
        <Grid item xs={12} sm={7} sx={{display:'flex',justifyContent:'right',alignItems:'center'}}>
          <Item><HomepageTrack/></Item>
        </Grid>
        <Grid item xs={8}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
    </div>{isLoggedIn && <h1>Hello, {userName}!</h1>}</Homepage>
    </Grid></Grid>
    </>
  );
};

export default Home;


    