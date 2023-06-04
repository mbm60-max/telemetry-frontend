import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";

const SideNav = () => {
    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ flexGrow: 1, height: '100%' }}>
        <Box sx={{ width:'100%', height: 10,backgroundColor:'white' }}/>
          <Grid container spacing={0} columns={40} style={{ height: '100%' }}>
            <Grid item xs={0}>
              <div style={{ height: '100%' }}>
                <Box sx={{ width: 200, height: '95%', backgroundColor: '#9F160C'}}>Session Options</Box>
              </div>
            </Grid>
            <Grid item xs sx={{ height: '100%' }}>
              <div style={{ height: '100%' }}>
                <Box sx={{ flexGrow: 1, backgroundColor: 'black', height: '95%' }}>hi</Box>
              </div>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  };
export default SideNav
