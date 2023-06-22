'use client'
import React from 'react';
import NavBar from '../../components/navbar';
import DynamicChart from '../../components/chart';
import SideNav from '../../components/sideNav';
import TrackSelection from '../../components/trackSelection';
import TyreTemps from '../../components/tyresTempindicator/tyreTemps';
import { Container } from '@mui/material';
import ThrottleComponent from '../../components/throttle';

const Home = () => {
  return (
    <div >
        <NavBar/>
        <SideNav><TrackSelection/></SideNav>
        <DynamicChart />
        <ThrottleComponent/>
        <TyreTemps/>
      
    </div>
  );
};

export default Home;