import { Button, createTheme, Divider, Grid, Paper, styled, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { JsxElement } from "typescript";
import SettingsObject from "../../interfaces/defaultSettingsInterface";
import { AuthContext } from "../authProvider";
import { SettingsContext } from "../authProviderSettings";
import SvgRenderer from "../avatar/svgRenderer";
import Homepage from "../background/background";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar";
import SettingsDisplay from "./settingsDisplay";
import SettingsController from "./settingsFieldSelection";
import SettingsTitle from "./settingsTitle";
interface SettingsWrapperProps {}

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

const SettingsWrapper = ({}: SettingsWrapperProps) => {
  const {userName,pfpSVG20,pfpSVG40,pfpSVG60 } = useContext(AuthContext);
  const { alerts,setAlerts,data,setData,appearance,setAppearance,defaults,setDefaults} = useContext(SettingsContext);
 const userSettings:SettingsObject={
   data: data,
   alerts: alerts,
   appearance: appearance,
   defaults: defaults
 }
  
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
  const [field, setField] = useState("");
  const handleFieldSelection = (field: string) => {
    setField(field);
  };

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

      }}
    >
        <Grid container spacing={0}>
          <Grid item xs={6} sx={{borderRight:'1.5px solid white'}}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Box sx={{mt:4}}><SvgRenderer svgString={pfpSVG60}></SvgRenderer>
                <SettingsTitle title={"Settings"} fontSize={30} /></Box>
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SettingsController onClick={handleFieldSelection} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={6} sx={{borderLeft:'1.5px solid white'}}>
            <Grid container spacing={0} direction="row">
              <Grid item xs={12}>
                <Grid container spacing={0} direction="row">
                  <Grid item xs={12} sx={{height:'15vh'}}>
                    <SettingsTitle title={field+" "+"Settings"} fontSize={30} />
                  </Grid>
                  <Grid item xs={12}>
                  <StyledHorizontalDivider />
                  </Grid>
                </Grid> 
              </Grid>
              <Grid item xs={12}>
                <SettingsDisplay field={field} userSettings={userSettings} setAlerts={setAlerts} setDefaults={setDefaults} setAppearance={setAppearance} setData={setData}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid></Box></Box>
      </Homepage></Box>
      <Homepage style='homepage-container-reverse-short'></Homepage>
      <Homepage style={'navbar-container-reverse'}>
                <Item><Footer /></Item>
              </Homepage>
    </>
  );
};
export default SettingsWrapper;
