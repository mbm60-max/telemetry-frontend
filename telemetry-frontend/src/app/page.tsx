'use client'
import React from 'react';
import NavBar from '../../components/navbar/navbar';
import DynamicChart from '../../components/chart';
import SideNav from '../../components/sideNav';
import TrackSelection from '../../components/trackSelection';
import TyreTemps from '../../components/tyresTempindicator/tyreTemps';
import { Card, Container } from '@mui/material';
import ThrottleComponent from '../../components/throttle';
import Homepage from '../../components/background/background';
import ImageBox from '../../components/homepageTrack';
import BasicCard from '../../components/card';
const Home = () => {
  return (
      <Homepage><NavBar/><div style={{ display: 'flex', alignItems: 'center' }}>
      <BasicCard />
      <ImageBox
        Width={'400px'}
        Height={'450px'}
        MarginRight={'10px'}
        MarginLeft={'250px'}
        MarginTop={'0px'}
        imageSrc="/images/i1puHqsYDXFby.svg"
      />
    </div></Homepage>
  );
};

export default Home;