
'use client'
import React from 'react';
import {Button  } from '@mui/material';
import Homepage from '../components/background/background';
import '../calltoaction.css';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router';
import ReviewWrapper from '../components/review/reviewWrapper';

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



