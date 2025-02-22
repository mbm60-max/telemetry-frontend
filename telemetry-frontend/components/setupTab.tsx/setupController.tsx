import { Box, Grid, Slider, Typography } from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import SetupFeedbackSlider from "./setupFeedbackSlider";
import SetupField from "./setupField";
import splitAndCapitalise from "../../utils/splitAndCapitalise";
import { SettingsContext } from "../authProviderSettings";

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
  const {appearance} = React.useContext(SettingsContext);
  return (
    
    <Box
      sx={{
        width: "100%",
        height: "102%",
        backgroundColor: appearance.lightModeEnabled ? "white" :"rgba(6, 14, 55, 0.9)",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.3)",
        border: appearance.lightModeEnabled ? "3px solid rgba(8, 13, 100, 0.3)" :" 3px solid white",
      }}
    >
      <Box >
        <Grid container spacing={2} >
          <Grid item xs={12}>
            <Grid container spacing={4} >
              <Grid
                item
                xs={12}
                sx={{ display: "flex",ml:2 }}
              >
                <Typography
                  variant="h6"
                  sx={{ fontSize: 30,color:appearance.lightModeEnabled ? "black" :"white" }}
                  fontWeight="bold"
                  fontFamily={"Yapari"}
                >
                  {splitAndCapitalise(setupName)}
                </Typography>
              </Grid>
              
            </Grid>
            <Grid item xs={12}><Box sx={{height:'30px'}}></Box></Grid>
            <Grid item xs={12} sx={{ display: "flex",ml:2 }}>
                <Typography variant="body2" sx={{ fontSize: 20,color:appearance.lightModeEnabled ? "black" :"white" }} fontFamily={"Satoshi"}>
                  {Boolean(selectedField) ? selectedField : 'No field selected'}
                </Typography>
              </Grid>
          </Grid>
          <Grid item xs={12}><Box ></Box></Grid>
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
              <Grid item xs={12}><Box ></Box></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SetupController;
