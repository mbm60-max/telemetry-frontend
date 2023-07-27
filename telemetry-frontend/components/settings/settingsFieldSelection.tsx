import { Box, Grid, Slider, Typography } from "@mui/material";
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
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F6F6F6",
        minHeight: "300px",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Grid container spacing={2} alignItems="center">
          
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Account"} Info={"Name, Password, Delete Account"} onClick={handleSelectedFieldChange} Icon={AccountCircleIcon} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Data"} Info={"ML Data Consent, Review Lap Limits"} onClick={handleSelectedFieldChange} Icon={DatasetLinkedIcon} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField
                                  name={"Alerts"}
                                  Info={"Default Warnings, Warnings Intervals"}
                                  onClick={handleSelectedFieldChange} Icon={NotificationsActiveIcon}                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Appearance"} Info={"Light Mode/Dark Mode, ?"} onClick={handleSelectedFieldChange} Icon={RemoveRedEyeIcon}/>
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SettingsField name={"Defaults"} Info={"IP Address, Metric vs Imperial"} onClick={handleSelectedFieldChange} Icon={FilterNoneIcon}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SettingsController;