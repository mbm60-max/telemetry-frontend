
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

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import trackData from '../data/trackData'
import { useRouter } from 'next/router';
import ReviewWrapper from './reviewWrapper';

export default function Review(){
    const router = useRouter();
    function handleExitReview(){
        router.push('/')
      }
  return (
    <>
    <Box className='header'><Button onClick={handleExitReview}>Exit Review</Button></Box>
    <Box sx={{ width: '100%' }}>
    <Homepage style={'homepage'}><ReviewWrapper/><ReviewWrapper/></Homepage></Box>
    </>
       
  );
};



