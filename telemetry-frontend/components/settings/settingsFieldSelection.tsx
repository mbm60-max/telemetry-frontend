import { Box, Divider, Grid, Slider, styled, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import SettingsField from "./settingsField";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DatasetLinkedIcon from '@mui/icons-material/DatasetLinked';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';


interface SettingsControllerProps {
    onClick:(field:string)=>void;
}

const SettingsController = ({onClick}: SettingsControllerProps) => {
  const [selectedField, setSelectedField] = React.useState('');


  const handleSelectedFieldChange=(fieldName:string)=>{
    onClick(fieldName);
    setSelectedField(fieldName);
  }
  
  return (
    
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={2} alignItems="center">
          
          <Grid item xs={12}>
            <Grid
              container
              spacing={0}
              alignItems="center"
            >
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Account"} Info={"Name, Password, Delete Account"} onClick={handleSelectedFieldChange} Icon={AccountCircleIcon} hasDivider={true} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Data"} Info={"ML Data Consent, Review Lap Limits"} onClick={handleSelectedFieldChange} Icon={DatasetLinkedIcon} hasDivider={true} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField
                name={"Alerts"}
                Info={"Default Warnings, Warnings Intervals"}
                onClick={handleSelectedFieldChange} Icon={NotificationsActiveIcon} hasDivider={true}                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Appearance"} Info={"Light Mode/Dark Mode, Language"} onClick={handleSelectedFieldChange} Icon={RemoveRedEyeIcon} hasDivider={true}/>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Defaults"} Info={"IP Address, Metric vs Imperial"} onClick={handleSelectedFieldChange} Icon={FilterNoneIcon} hasDivider={false}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
  );
};

export default SettingsController;