'use client'
import React from 'react';
import NavBar from '../components/navbar/navbar';
import DynamicChart from '../components/chart';
import SideNav from '../components/sideNav';
import TrackSelection from '../components/trackSelection';
import TyreTemps from '../components/tyresTempindicator/tyreTemps';
import { Card, Container,Button  } from '@mui/material';
import ThrottleComponent from '../components/throttle';
import Homepage from '../components/background/background';
import ImageBox from '../components/homepageTrack';
import BasicCard from '../components/card';
import '../calltoaction.css';
import Link from "next/link";

const Home = () => {
  const Card1Fonts=[32,24,17]
  const Card1Colors=["#F6F6F6","#F6F6F6","#F6F6F6"]
  const Card1Content=["Boost Your Learning","Real Time insights, Fully rigged","Sign-up to start a session and begin gaining every tenth"]
  const Card2Fonts=[32,17]
  const Card2Colors=["#F6F6F6","#F6F6F6"]
  const Card2Content=["Spa-Francorchamps","Laps: 5.1mi\n Total Laps: 20"]
  const Card2Ml=[0,0]
  const marginLeft = {
    marginLeft: '250px', // Replace '10px' with the desired value for marginLeft
  };
  return (
      <Homepage><NavBar/><div style={{ display: 'flex' }}>
      <div style={{ display: 'flex', flexDirection:'column'}}><BasicCard ml={20} mt={10} mr={0} width={400} noOfLines={3} lineFontSizes={Card1Fonts}lineFontColors={Card1Colors} lineContent={Card1Content} lineML={[]} lineMR={[]} lineMT={[]} lineWhiteSpace={[]}></BasicCard><div style={marginLeft}><Button className="action-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/about">Start Session</Link></Button></div></div><div style={{  position: 'absolute', top: '100px', left: '525px', zIndex: 1}}><BasicCard ml={35} mt={5} mr={0} width={350} noOfLines={2} lineFontSizes={Card2Fonts}lineFontColors={Card2Colors} lineContent={Card2Content} lineML={[]} lineMR={[]} lineMT={[]}lineWhiteSpace={['initial',
  'pre-line']}></BasicCard></div>
      <ImageBox
        Width={'400px'}
        Height={'450px'}
        MarginRight={'0px'}
        MarginLeft={'450px'}
        MarginTop={'0px'}
        imageSrc="/images/i1puHqsYDXFby.svg"
      />
    </div><ThrottleComponent/></Homepage>
  );
};

export default Home;