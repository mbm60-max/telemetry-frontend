import { Box, Grid, Paper, styled } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import SetupObject from "../../interfaces/setupDataInterface";
import { AuthContext } from "../authProvider";
import SetupCarDisplay from "./setupCarDisplay";
import SetupController from "./setupController";
import SetupFeedback from "./setupFeedback";
import SetupSelectedFieldDisplay from "./setupSelectedFieldDisplay";

interface SetupWrapperProps {
 setupData:SetupObject;
}
const setupFeedbackConditions = [
  "Oversteer",
  "Understeer",
  "Instability",
  "No traction",
  "Throttle Response",
];

const SetupWrapper = ({setupData}: SetupWrapperProps) => {
  const router = useRouter();
  const compoundValue = router.query.compound;
  const setupValue = router.query.setup;
  const carValue = router.query.car;
  const [selectedField, setSelectedField] = React.useState('');

 
  const GeneralItems = ["Power Level","Weight Reduction Level","Power Ratio","Weight Reduction Ratio","Traction Control","Brake Balance"]
  const Suspension_AerodynamicsItems =["Ride Height","Natural Frequency","Anti Roll Bar","Damping Ratio Compression","Damping Ratio Rebound","Camber Angle", "Toe Angle","Downforce"]
  const TransmissionItems=["Transmission Type","Max Speed (Auto Set)","Gear Ratios","Final Gear Ratio"]
  const DifferentialItems=["Differntial Gear","LSD Initial Torque","LSD Acceleration Sensitivity","LSD Braking Sensitivity","Front Rear Torque Distribution"]


type SetupObject = {
  [key: string]: any;
};
const extractData=(sourceObject:SetupObject,itemsArray:string[])=>{
  let itemDict: SetupObject = {};
  for (const item of itemsArray) {
    itemDict[item] = sourceObject[item];
  }
  return itemDict;
}
const [setupDataDict, setSetupDataDict] = useState<Record<string, SetupObject>>({});


useEffect(() => {
  const generatedSetupDataDict ={
    "General":extractData(setupData,GeneralItems),
    "Suspension/Aerodynamics":extractData(setupData,Suspension_AerodynamicsItems),
    "Transmission":extractData(setupData,TransmissionItems),
    "Differential":extractData(setupData,DifferentialItems),
  } 
  setSetupDataDict(generatedSetupDataDict);
}, [setupData]);







  const handleSelectedFieldChange=(fieldName:string)=>{
    setSelectedField(fieldName);
  }
  return (
    <>
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(8, 13, 56, 0)",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",
      }}
    >
       <Box sx={{paddingLeft:2,paddingRight:2,paddingBottom:2}}>
      <Grid container columnSpacing={2} rowSpacing={4}  >
        <Grid item xs={12} sm={3.5} >
        <Grid container spacing={4} alignItems="center">
        <Grid item xs={12}>
        <SetupController setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} onClick={handleSelectedFieldChange}/>

        </Grid>
        </Grid>
        </Grid>
        
        <Grid item xs={12} sm={8.5}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12}>
              <SetupSelectedFieldDisplay conditions={[]} fieldData={setupDataDict[selectedField]} setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} selectedField={ selectedField === '' ? "No Field Selected" : selectedField}/>
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
      </Box>
      </Box>
    </>
  );
};

export default SetupWrapper;
//<SetupController setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} onClick={handleSelectedFieldChange}/>