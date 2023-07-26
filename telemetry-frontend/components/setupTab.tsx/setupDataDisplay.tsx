import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';

interface SetupDataDisplayProps {
name:string;
value:string|number;
}



const SetupDataDisplay= ({name,value}: SetupDataDisplayProps) => {
 
  return (
    <Box sx={{ width: '100%', minHeight:'300px',position:'relative', backgroundColor:'#F6F6F6',
    borderRadius: 1.5,
    boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
{name}{value}
     </Box>
     )
     }

     export default SetupDataDisplay