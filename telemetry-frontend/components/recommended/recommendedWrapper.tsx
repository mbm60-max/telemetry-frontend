import { Button, createTheme, Divider, Grid, Paper, styled, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { JsxElement } from "typescript";
import SettingsObject from "../../interfaces/defaultSettingsInterface";
import { SettingsContext } from "../authProviderSettings";
import Homepage from "../background/background";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar";

interface RecommendedWrapperProps {}

const ItemPlayer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: ' #FB9536',
  boxShadow: 'none', // Override the shadow effect
  paddingTop:20,
  paddingBottom:20,
  borderRadius:15
}));

const RecommendedWrapper = ({}: RecommendedWrapperProps) => {

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
      <Grid container spacing={4}>
          <Grid item xs={12}sm={6} >
           <ItemPlayer> <Box sx={{width:'90%', backgroundColor:'white',height:'100%',minHeight:'500px',borderRadius:5}}> youtube player hi</Box></ItemPlayer>
         
        </Grid>
        
        <Grid item xs={12}sm={6} >
           daily challenge content  (track car compound conditions, best lap time vs top 10 global best, when you start sessions queries best , then updates if you beat it, keeps track of your best, would need to actually verify )
           tips to improve ml based ?
        </Grid>
        </Grid>
        </Box></Box>
      </Homepage></Box>
      <Homepage style='homepage-container-reverse-short'></Homepage>
              <Homepage style={'navbar-container-reverse'}>
                <Item><Footer /></Item>
              </Homepage>
            
     
    </>
  );
};
export default RecommendedWrapper;