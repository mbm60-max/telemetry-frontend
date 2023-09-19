import { Box, Grid, Paper, styled, SvgIconProps } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { ReactNode, useContext, useEffect, useState } from "react";
import SetupObject from "../../interfaces/setupDataInterface";
import { AuthContext } from "../authProvider";
import SetupCarDisplay from "./setupCarDisplay";
import SetupController from "./setupController";
import SetupFeedback from "./setupFeedback";
import SetupSelectedFieldDisplay from "./setupSelectedFieldDisplay";
import WindPowerIcon from '@mui/icons-material/WindPower';
import AccessibilityNewIcon from '@mui/icons-material/AccessibilityNew';
import ScaleIcon from '@mui/icons-material/Scale';
import BalanceIcon from '@mui/icons-material/Balance';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import HeightIcon from '@mui/icons-material/Height';
import WavesIcon from '@mui/icons-material/Waves';
import SpaceBarIcon from '@mui/icons-material/SpaceBar';
import CompressIcon from '@mui/icons-material/Compress';
import ExpandIcon from '@mui/icons-material/Expand';
import TextRotationAngledownIcon from '@mui/icons-material/TextRotationAngledown';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import SpeedIcon from '@mui/icons-material/Speed';
import SettingsIcon from '@mui/icons-material/Settings';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
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

interface MUIIcon {
  icon: ReactNode; // You can also use `React.ReactElement` if needed
  props?: SvgIconProps; // Optional props specific to Material-UI SvgIcon
}
interface IconList {
  icons: MUIIcon[];
}

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
  const iconGeneral: IconList = {icons: [{icon: <WindPowerIcon sx={{fontSize:40}}/>, },{ icon: <ScaleIcon sx={{fontSize:40}}/>,},{ icon: <WindPowerIcon sx={{fontSize:40}}/>,},{ icon: <ScaleIcon sx={{fontSize:40}}/>,},{icon:<BalanceIcon sx={{fontSize:40}}/> },{ icon:<SportsEsportsIcon sx={{fontSize:40}}/>},],};
  const iconSuspension: IconList = {icons: [{icon: <HeightIcon sx={{fontSize:40}}/>, },{ icon: <WavesIcon sx={{fontSize:40}}/>,},{ icon: <SpaceBarIcon sx={{fontSize:40}}/>,},{ icon: <CompressIcon sx={{fontSize:40}}/>,},{icon:<ExpandIcon sx={{fontSize:40}}/> },{ icon:<TextRotationAngledownIcon sx={{fontSize:40}}/>},{ icon:<TextRotationAngledownIcon sx={{fontSize:40}}/>},{ icon:<KeyboardDoubleArrowDownIcon sx={{fontSize:40}}/>}],};
  const iconTransmission: IconList = {icons: [{icon: <IndeterminateCheckBoxIcon sx={{fontSize:40}}/>, },{ icon: <SpeedIcon sx={{fontSize:40}}/>,},{ icon: <SettingsIcon sx={{fontSize:40}}/>,},{ icon: <SettingsIcon sx={{fontSize:40}}/>,},],};
  const iconDifferential: IconList = {icons: [{icon: <SettingsIcon sx={{fontSize:40}}/>, },{ icon: <KeyboardDoubleArrowRightIcon sx={{fontSize:40}}/>,},{ icon: <BalanceIcon sx={{fontSize:40}}/>,},{ icon: <BalanceIcon sx={{fontSize:40}}/>,},{icon:<BalanceIcon sx={{fontSize:40}}/> },],};

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



const getIcons = (selectedField:string)=>{
  switch(selectedField){
    case "General":
      return iconGeneral;
    case "Suspension/Aerodynamics":
      return iconSuspension;
    case "Transmission":
      return iconTransmission;
    case "Differential":
      return iconDifferential;
  }
}



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
       <Box sx={{paddingLeft:2,paddingRight:3,paddingBottom:4}}>
      <Grid container columnSpacing={4} rowSpacing={2}  >
        <Grid item xs={12} sm={3.5}   >
      
        <Grid container spacing={2} sx={{height:'100%'}}>
        <Grid item xs={12}>
          
        <SetupController setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} onClick={handleSelectedFieldChange}/>

        
        </Grid>
        
        </Grid>
        </Grid>
        
        <Grid item xs={12} sm={8.5}>
       
          <Grid container spacing={2} sx={{height:'102%'}}>
            <Grid item xs={12}>
              <SetupSelectedFieldDisplay conditions={[]} icons={getIcons(selectedField)}fieldData={setupDataDict[selectedField]} setupName={typeof setupValue === 'string' ? setupValue : "No Setup Selected"} selectedField={ selectedField === '' ? "No Field Selected" : selectedField}/>
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