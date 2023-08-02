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
import trackData from '../data/trackData'

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
  const Card1Content=["Boost Your Learning","Real Time insights, Fully rigged","Sign-up to start a session and begin gaining every tenth"]
  const Card2Fonts=[32,17]
  const Card2Colors=["#F6F6F6","#F6F6F6"]
  type TrackData = {
    distance: number;
    title: string;
    elevationChange: number|string;
    corners: number|string;
    longestStraight: number|string;
  };
  function getRandomNumber(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function splitAndCapitalise(input: string): string {
    const words = input.split(/(?=[A-Z])/); // Split at capital letters
    const capitalizedWords = words.map((word) => {
      const firstLetter = word.charAt(0).toUpperCase();
      const restOfWord = word.slice(1);
      return firstLetter + restOfWord;
    });
    return capitalizedWords.join(' ');
  }
  const checkForNaValues = (data:string|number) =>{
    if(typeof data == "string"){
      return "N/A"
    }
    return data + " m"
  }
  const [randomTrackData, setRandomTrackData] = useState(["null"]);
  const [trackSvgPath, setTrackSvgPath] = useState('');
  const removeReverseFromString = (pathString:string) =>{
    return pathString.replace(/Reverse$/, '');
  }
  useEffect(() => {
    const randomIndex = getRandomNumber(0, trackData.length - 1);
    const { distance, title, elevationChange, corners, longestStraight } = trackData[randomIndex];
    
    // Assign values to string array
    const trackInfo = [
      `${splitAndCapitalise(title)}`,
      `Distance: ${checkForNaValues(distance)}`,
      `Elevation Change: ${checkForNaValues(elevationChange)}`,
      `Corners: ${corners}`,
      `Longest Straight: ${checkForNaValues(longestStraight)} `,
    ];
    setRandomTrackData(trackInfo);
    
    // Assign track SVG path
    const path = `/images/${removeReverseFromString(title)}.svg`;
    setTrackSvgPath(path);
  }, []);
  

  console.log(isLoggedIn);
  useEffect(() => {
    console.log(isLoggedIn);
    if (!isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, router]);
  return (
    <>
    <Grid container spacing={1}>
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
        <Grid item xs={5}>
          <Item><div style={{ display: 'flex', flexDirection:'column'}}><BasicCard ml={0} mt={0} mr={0} width={200} noOfLines={3} lineFontSizes={Card1Fonts}lineFontColors={Card1Colors} lineContent={Card1Content} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]}></BasicCard><div ><Button className="action-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/session-startup">Start Session</Link></Button></div></div><div style={{  position: 'absolute', zIndex: 1}}></div></Item>
        </Grid>
        <Grid item xs={3}>
          <Item><BasicCard ml={0} mt={0} mr={0} width={350} noOfLines={5} lineFontSizes={Card2Fonts}lineFontColors={Card2Colors} lineContent={randomTrackData} lineML={[]} lineMR={[]} lineMT={[]}lineWhiteSpace={['initial',
'pre-line']}></BasicCard></Item>
        </Grid>
        <Grid item xs={4}>
          <Item><ImageBox
      Width={'400px'}
      Height={'400px'}
      MarginRight={'0px'}
      MarginLeft={'0px'}
      MarginTop={'0px'}
      imageSrc={trackSvgPath}
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
    </Grid></Grid>
    </>
  );
};

export default Home;


    