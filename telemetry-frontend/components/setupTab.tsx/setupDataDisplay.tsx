import { Box, Grid, Typography } from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';

interface SetupDataDisplayProps {
name:string;
value:string|string[];
units:string;
}



const SetupDataDisplay= ({name,value,units}: SetupDataDisplayProps) => {
 
    return (
        <div>
          {typeof value === 'string' ? (
            <Box sx={{ width: '100%', minHeight: '100px', height: '100%', position: 'relative', backgroundColor: '#F6F6F6', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
              {/* Use Typography or a div to wrap the content */}
              <Typography>{name}</Typography>
              <Typography>{value}</Typography>
              <Typography>{units}</Typography>
            </Box>
          ) : (
            // "else" condition, handle non-string value (assuming value is an array of strings)
            <Box sx={{ width: '100%', minHeight: '100px', height: '100%', position: 'relative', backgroundColor: '#F6F6F6', borderRadius: 1.5, boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)" }}>
              <Typography>{name}</Typography>
              {/* Use the spread operator to render each value separately */}
              {value.map((val, index) => (
                <Typography key={index}>{val}</Typography>
              ))}
              <Typography>{units}</Typography>
            </Box>
          )}
        </div>
      );
     }

     export default SetupDataDisplay