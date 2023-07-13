'use client'
import React,{ useContext, useEffect } from 'react';
import NavBar from '../components/navbar/navbar';
import DynamicChart from '../components/sessionTabs/chart';
import SideNav from '../components/sideNav';
import TrackSelection from '../components/sessionStartupComponents/setupComponents/trackSelection';
import TyreTemps from '../components/sessionTabs/tyresTempindicator/tyreTemps';
import { Card, Container,Button  } from '@mui/material';
import ThrottleComponent from '../components/bin/throttle';
import Homepage from '../components/background/background';
import ImageBox from '../components/homepageTrack';
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#847E7E',
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
  const Card1Content=["Boost Your Learning","Real Time insights, Fully rigged","Sign-up to start a session and begin gaining every tenth"]
  const Card2Fonts=[32,17]
  const Card2Colors=["#F6F6F6","#F6F6F6"]
  const Card2Content=["Spa-Francorchamps","Lap Distance: 5.1mi\n Total Laps: 20"]
  const Card2Ml=[0,0]
  const marginLeft = {
    marginLeft: '250px',
  };
  console.log(isLoggedIn);
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
      <Homepage style={'homepage-container'}><div style={{ display: 'flex' }}>
     
      <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Item><NavBar/></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><div style={{ display: 'flex', flexDirection:'column'}}><BasicCard ml={0} mt={0} mr={0} width={200} noOfLines={3} lineFontSizes={Card1Fonts}lineFontColors={Card1Colors} lineContent={Card1Content} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]}></BasicCard><div style={marginLeft}><Button className="action-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/session-startup">Start Session</Link></Button></div></div><div style={{  position: 'absolute', top: '100px', left: '525px', zIndex: 1}}></div></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><BasicCard ml={0} mt={0} mr={0} width={350} noOfLines={2} lineFontSizes={Card2Fonts}lineFontColors={Card2Colors} lineContent={Card2Content} lineML={[]} lineMR={[]} lineMT={[]}lineWhiteSpace={['initial',
'pre-line']}></BasicCard></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><ImageBox
      Width={'400px'}
      Height={'400px'}
      MarginRight={'0px'}
      MarginLeft={'0px'}
      MarginTop={'0px'}
      imageSrc="/images/spa.svg"
    /></Item>
        </Grid>
        <Grid item xs={4}>
          <Item></Item>
        </Grid>
        <Grid item xs={8}>
          <Item></Item>
        </Grid>
      </Grid>
    </Box>
    </div>{isLoggedIn && <h1>Hello, {userName}!</h1>}</Homepage>
  );
};

export default Home;


    