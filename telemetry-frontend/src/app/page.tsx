'use client'
import React from 'react';
import NavBar from '../../components/navbar';
import DynamicChart from '../../components/chart';
import SideNav from '../../components/sideNav';
import ThrottleMonitor from '../../components/output';
import TrackSelection from '../../components/trackSelection';
import { Container } from '@mui/material';

const Home = () => {
  return (
    <div >
        <NavBar/>
        <SideNav><TrackSelection/></SideNav>
        <DynamicChart />
        <ThrottleMonitor/>
      
    </div>
  );
};

export default Home;