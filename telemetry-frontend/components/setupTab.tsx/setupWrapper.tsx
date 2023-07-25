import { Grid } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../authProvider";
import SetupCarDisplay from "./setupCarDisplay";
import SetupController from "./setupController";
import SetupFeedback from "./setupFeedback";
import SetupSelectedFieldDisplay from "./setupSelectedFieldDisplay";

interface SetupWrapperProps {
 
}
const setupFeedbackConditions = [
  "Oversteer",
  "Understeer",
  "Instability",
  "No traction",
  "Throttle Response",
];

const SetupWrapper = ({ }: SetupWrapperProps) => {
  const router = useRouter();
  const compoundValue = router.query.compound;
  const setupValue = router.query.setup;
  const carValue = router.query.car;
  const [selectedField, setSelectedField] = React.useState('');
  
  



  const handleSelectedFieldChange=(fieldName:string)=>{
    setSelectedField(fieldName);
  }
  return (
    <>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} sm={3} sx={{ minWidth: "100px" }}>
          <SetupController setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} onClick={handleSelectedFieldChange}/>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <SetupSelectedFieldDisplay conditions={[]} field={"Suspension"} setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} selectedField={ selectedField === '' ? "No Field Selected" : selectedField}/>
            </Grid>
            <Grid item xs={12}>
              <SetupCarDisplay carName={typeof carValue === 'string' ? carValue : "No Car Selected"} setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} />
            </Grid>{" "}
            <Grid item xs={12}>
              <SetupFeedback conditions={setupFeedbackConditions} />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SetupWrapper;
