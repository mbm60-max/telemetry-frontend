import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import SetupFeedbackSlider from "./setupFeedbackSlider";
import SetupField from "./setupField";

interface SetupController {
    setupName:string;
    onClick:(field:string)=>void;
}

const SetupController = ({setupName,onClick}: SetupController) => {
  const [selectedField, setSelectedField] = React.useState('');


  const handleSelectedFieldChange=(fieldName:string)=>{
    onClick(fieldName);
    setSelectedField(fieldName);
  }
  const tooltipInfo = (
    <>
      <em>
        {
          "This feature is under construction, based on responses and setup info ML will be used to recommend setups"
        }
      </em>
    </>
  );
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "#F6F6F6",
        minHeight: "500px",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Grid container spacing={2} alignItems="center">
              <Grid
                item
                xs={4}
                sx={{ display: "flex", justifyContent: "left" }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: 30 }}
                  fontWeight="bold"
                >
                  {setupName}
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <InfoToolTip name={"Driver Feeback"} info={tooltipInfo} />
              </Grid>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="body2" sx={{ fontSize: 20 }}>
                  {Boolean(selectedField) ? selectedField : 'No field selected'}
                </Typography>
              </Grid>
          </Grid>
          <Grid item xs={12}>
            <Grid
              container
              spacing={2}
              alignItems="center"
            >
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SetupField name={"General"} tooltipInfo={tooltipInfo} onClick={handleSelectedFieldChange} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SetupField name={"Transmission"} tooltipInfo={tooltipInfo} onClick={handleSelectedFieldChange} />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SetupField
                  name={"Suspension/Aerodynamics"}
                  tooltipInfo={tooltipInfo}
                  onClick={handleSelectedFieldChange}
                />
              </Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
                <SetupField name={"Differential"} tooltipInfo={tooltipInfo} onClick={handleSelectedFieldChange}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SetupController;
