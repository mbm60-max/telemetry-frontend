import { Button, createTheme, Divider, Grid, Paper, styled, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useContext, useState } from "react";
import { JsxElement } from "typescript";
import SettingsObject from "../../interfaces/defaultSettingsInterface";
import { SettingsContext } from "../authProviderSettings";
import Homepage from "../background/background";
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

  return (<>
    <Homepage style={'navbar-container'}>
                <Item><NavBar /></Item>
              </Homepage>
              <Box sx={{ width: '100%' }}>
    <Homepage style={isMobile ? 'homepage-container300' : 'homepage-container'}>
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "95vh",
          width: "95vw",
          display: "flex",
          backgroundColor: "#D8DDF5",
          borderRadius: 10,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={5.5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SettingsTitle title={"Settings"} fontSize={30} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SettingsController onClick={handleFieldSelection} />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              justifyContent: "center",
              display: "flex",
              height: "94.2vh",
            }}
          >
            <StyledVerticalDivider orientation="vertical" />
          </Grid>

          <Grid item xs={5.5}>
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
        </Grid>
      </div>
    </div></Homepage></Box>
    </>
  );
};
export default SettingsWrapper;
