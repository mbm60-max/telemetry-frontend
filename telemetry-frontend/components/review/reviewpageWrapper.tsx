import { Button, createTheme, Divider, Grid, Paper, styled, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { JsxElement } from "typescript";
import SettingsObject from "../../interfaces/defaultSettingsInterface";
import { SettingsContext } from "../authProviderSettings";
import Homepage from "../background/background";
import NavBar from "../navbar/navbar";
import ReviewView from "./reviewWrapper";

interface ReviewWrapperProps {}

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

const ReviewWrapper = ({}: ReviewWrapperProps) => {

  const StyledVerticalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    height: "100%",
  }));
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
  width:'99%',
  }));


  const isMobile = useMediaQuery('(max-width:750px)')
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
  return (<>
    <Homepage style={'navbar-container'}>
                <Item><NavBar /></Item>
              </Homepage>
              <Box sx={{ width: '100%' }}>
    <Homepage style={isMobile ? 'homepage-container300' : 'homepage-container100'}>
    </Homepage>
    <Homepage style={'homepage-specail'}>
      <Box  sx={{
        width: "100%",
        height: "100%",display:'flex',justifyContent:'center'}}>
    <Box
      sx={{
        width: "95%",
        height: "100%",
        backgroundColor: "rgba(8, 13, 56, 0.4)",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
        padding:1
      }}>
        <Grid container spacing={8}>
        <Grid item xs={12}>new lqp selection method</Grid>
        <Grid item xs={12}>rework of states</Grid>
        <Grid item xs={12}>model spacing</Grid>
          <Grid item xs={12}sm={12} >
         <ReviewView viewNumber={'Primary View'}/>
        </Grid>
        <Grid item xs={12}sm={12} >
            <ReviewView viewNumber={'Secondary View'}/>
        </Grid></Grid>
        </Box></Box>
      </Homepage></Box>
    </>
  );
};
export default ReviewWrapper;