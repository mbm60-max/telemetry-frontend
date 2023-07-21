import { Box, Button, Grid, Typography } from "@mui/material";
import chroma from "chroma-js";
import React, { useEffect,useRef  } from "react";
import WarningDashboardSettingsModal from "./warningDashboardSettingsModal";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyWarningsAddModal from "./keyWarningsModal";
import KeyWarningsDeleteModal from "./keyWarningsDeleteModal";
import KeyWarningsIgnoredModal from "./keyWarningsIgnoredModal";
import WarningInstance from "../../interfaces/warningInterface";


interface WarningsDashboardProps {
  valuesOfInterest: string[];
  valuesOfInterestData: number[];
  valuesOfInterestUnits: string[];
  valuesOfInterestDefaultLimits: number[];
handleSetWarning:(updatedValuesOfInterest: string[], updatedValuesOfInterestData: number[], updatedValuesOfInterestUnits: string[], updatedValuesOfInterestDefualtLimits: number[]) => void
handleSetLimits:(newDict: { [key: string]: number; }) => void;
handleSetLimitsLower:(newDict: { [key: string]: number; }) => void;
handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
handleActiveWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
handleAcknowledgedWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
acknowledgedWarnings:WarningInstance[];
acknowledgedWarningsLower:WarningInstance[];
}
export default function WarningsDashboard({
  valuesOfInterest,
  valuesOfInterestData,
  valuesOfInterestUnits,
  valuesOfInterestDefaultLimits,
  handleSetWarning,handleSetLimits,
  handleAcknowledgedWarnings,
  handleActiveWarnings,
  acknowledgedWarnings,handleSetLimitsLower,handleAcknowledgedWarningsLower,handleActiveWarningsLower,acknowledgedWarningsLower
}: WarningsDashboardProps) {
  const calcColor = (
    colorScale: string[],
    temp: number,
    targetTemp: number
  ) => {
    let color = "";
    let difference = targetTemp - temp;
    if (difference >= colorScale.length) {
      return colorScale[colorScale.length - 1];
    } else if (difference <= 1) {
      return colorScale[0];
    }
    return colorScale[difference];
  };
  const colorInterpolation = (
    color1: string,
    color2: string,
    color3: string,
    steps: number,
    temp: number,
    targetTemp: number
  ) => {
    let colorScale = [""];
    let color = "";
    if (temp > targetTemp) {
      return (color = "#ff0000");
    } else if (temp < targetTemp) {
      colorScale = chroma.scale([color1, color2]).mode("lch").colors(steps);
      return calcColor(colorScale, temp, targetTemp);
    } else {
      return (color = "#ff0000");
    }
  };

  // Usage
  const Red = "#ff0000";
  const Green = "#00ff00";
  const Blue = "#0000ff";
  const numberOfSteps = 10;

  const [selectedLimits, setSelectedLimits] = React.useState<{
    [key: string]: number;
  }>(
    valuesOfInterest.reduce(
      (limits: { [key: string]: number }, value: string, index: number) => {
        limits[`limit${index}`] = valuesOfInterestDefaultLimits[index];
        return limits;
      },
      {}
    )
  );
  const [selectedLimitsLower, setSelectedLimitsLower] = React.useState<{
    [key: string]: number;
  }>(
    valuesOfInterest.reduce(
      (limits: { [key: string]: number }, value: string, index: number) => {
        limits[`limitLower${index}`] = valuesOfInterestDefaultLimits[index];
        return limits;
      },
      {}
    )
  );

  const handleLimitSelection = (limit: number,limitLower:number, index: string) => {
    if(limit==-1){
      setSelectedLimitsLower((prevFields) => ({
        ...prevFields,
        [`limitLower${index}`]: limitLower,
      }));
    }
    if(limitLower==-1){
      setSelectedLimits((prevFields) => ({
        ...prevFields,
        [`limit${index}`]: limit,
      }));
    }
    if((limitLower!=-1)&&(limit!=-1)){
    setSelectedLimitsLower((prevFields) => ({
      ...prevFields,
      [`limitLower${index}`]: limitLower,
    }));
    setSelectedLimits((prevFields) => ({
      ...prevFields,
      [`limit${index}`]: limit,
    }));
  }
  };
  const prevSelectedLimits = useRef(selectedLimits);
  const prevSelectedLimitsLower = useRef(selectedLimitsLower);
  const handleDeleteWarning = (LimitsIndex:number,valuesIndex:number)=>{
    const updatedValuesOfInterest = [...valuesOfInterest];
    const updatedValuesOfInterestData = [...valuesOfInterestData];
    const updatedValuesOfInterestUnits = [...valuesOfInterestUnits];
    const updatedValuesOfInterestDefualtLimits = [...valuesOfInterestDefaultLimits];
  
    handleActiveWarnings(false,updatedValuesOfInterest[valuesIndex],updatedValuesOfInterestData[valuesIndex],updatedValuesOfInterestUnits[valuesIndex],updatedValuesOfInterestDefualtLimits[valuesIndex]);
    handleAcknowledgedWarnings(false,updatedValuesOfInterest[valuesIndex],updatedValuesOfInterestData[valuesIndex],updatedValuesOfInterestUnits[valuesIndex],updatedValuesOfInterestDefualtLimits[valuesIndex]);
    handleActiveWarningsLower(false,updatedValuesOfInterest[valuesIndex],updatedValuesOfInterestData[valuesIndex],updatedValuesOfInterestUnits[valuesIndex],updatedValuesOfInterestDefualtLimits[valuesIndex]);
    handleAcknowledgedWarningsLower(false,updatedValuesOfInterest[valuesIndex],updatedValuesOfInterestData[valuesIndex],updatedValuesOfInterestUnits[valuesIndex],updatedValuesOfInterestDefualtLimits[valuesIndex]);
    // Remove value of interest at index
    updatedValuesOfInterest.splice(valuesIndex, 1);
    updatedValuesOfInterestData.splice(valuesIndex, 1);
    updatedValuesOfInterestUnits.splice(valuesIndex, 1);
    updatedValuesOfInterestDefualtLimits.splice(valuesIndex, 1);
    // Remove selected limit that matches the index
    const updatedSelectedLimits:{ [key: string]: number }  =  {};
    const updatedSelectedLimitsLower:{ [key: string]: number }  =  {};
    Object.keys(selectedLimits).forEach((key) => {
      const currentLimitsIndex = parseInt(key.slice(5)); // Extract the index from the key (e.g., "limit0" -> 0)
      if (currentLimitsIndex !== LimitsIndex) {
        // Skip the entry with the index that matches LimitsIndex
        const newLimitsIndex = currentLimitsIndex > LimitsIndex ? currentLimitsIndex - 1 : currentLimitsIndex;
        updatedSelectedLimits[`limit${newLimitsIndex}`] = selectedLimits[key];
      }
    }); 
    Object.keys(selectedLimitsLower).forEach((key) => {
      const currentLimitsIndex = parseInt(key.slice(10)); // Extract the index from the key (e.g., "limit0" -> 0)
      console.log(key.slice(10))
      if (currentLimitsIndex !== LimitsIndex) {
        // Skip the entry with the index that matches LimitsIndex
        const newLimitsIndex = currentLimitsIndex > LimitsIndex ? currentLimitsIndex - 1 : currentLimitsIndex;
        updatedSelectedLimitsLower[`limitLower${newLimitsIndex}`] = selectedLimitsLower[key];
      }
    }); 
    handleSetWarning(updatedValuesOfInterest,updatedValuesOfInterestData,updatedValuesOfInterestUnits,updatedValuesOfInterestDefualtLimits);
    setSelectedLimits(updatedSelectedLimits);
    setSelectedLimitsLower(updatedSelectedLimitsLower);
  }
  const handleAddWarning = (newLimit:number,newLimitLower:number,newUnits:string,newWarning:string)=>{
//adds value to end of values of interest and adds new limit to selected limit with value newLimit
const updatedValuesOfInterest = [...valuesOfInterest];
const updatedSelectedLimits = { ...selectedLimits };
const updatedSelectedLimitsLower = { ...selectedLimitsLower };
const updatedValuesOfInterestData = [...valuesOfInterestData];
const updatedValuesOfInterestUnits = [...valuesOfInterestUnits];
const updatedValuesOfInterestDefualtLimits = [...valuesOfInterestDefaultLimits];

// Add value to end of values of interest
updatedValuesOfInterest.push(newWarning);
updatedValuesOfInterestData.push(0);
updatedValuesOfInterestUnits.push(newUnits);
updatedValuesOfInterestDefualtLimits.push(0);

// Add new limit to selected limits with value newLimit
const newLimitIndex = Object.keys(selectedLimits).length;
updatedSelectedLimits[`limit${newLimitIndex}`] = newLimit;
const newLimitIndexLower = Object.keys(selectedLimitsLower).length;
updatedSelectedLimitsLower[`limitLower${newLimitIndexLower}`] = newLimitLower;

// Update state
handleSetWarning(updatedValuesOfInterest,updatedValuesOfInterestData,updatedValuesOfInterestUnits,updatedValuesOfInterestDefualtLimits);
setSelectedLimits(updatedSelectedLimits);
setSelectedLimitsLower(updatedSelectedLimitsLower);
  }
  useEffect(() => {
    // Compare selectedLimits with the previous value
    Object.keys(selectedLimits).forEach((key) => {
      const limitIndex = parseInt(key.slice(5)); // Extract the index from the key (e.g., "limit0" -> 0)
      if (selectedLimits[key] !== prevSelectedLimits.current[key]) {
        // Limit has changed, call handleActiveWarnings and handleAcknowledgedWarnings with the index
        handleActiveWarnings(
          false,
          valuesOfInterest[limitIndex],
          valuesOfInterestData[limitIndex],
          valuesOfInterestUnits[limitIndex],
          valuesOfInterestDefaultLimits[limitIndex]
        );

        handleAcknowledgedWarnings(
          false,
          valuesOfInterest[limitIndex],
          valuesOfInterestData[limitIndex],
          valuesOfInterestUnits[limitIndex],
          valuesOfInterestDefaultLimits[limitIndex]
        );
      }
    });

    // Update the previous value with the current selectedLimits
    prevSelectedLimits.current = selectedLimits;

    // Rest of the useEffect code...
    handleSetLimits(selectedLimits);
  }, [selectedLimits]);

  useEffect(() => {
    // Compare selectedLimits with the previous value
    Object.keys(selectedLimitsLower).forEach((key) => {
      const limitIndex = parseInt(key.slice(5)); // Extract the index from the key (e.g., "limit0" -> 0)
      if (selectedLimitsLower[key] !== prevSelectedLimitsLower.current[key]) {
        // Limit has changed, call handleActiveWarnings and handleAcknowledgedWarnings with the index
        handleActiveWarningsLower(
          false,
          valuesOfInterest[limitIndex],
          valuesOfInterestData[limitIndex],
          valuesOfInterestUnits[limitIndex],
          valuesOfInterestDefaultLimits[limitIndex]
        );

        handleAcknowledgedWarningsLower(
          false,
          valuesOfInterest[limitIndex],
          valuesOfInterestData[limitIndex],
          valuesOfInterestUnits[limitIndex],
          valuesOfInterestDefaultLimits[limitIndex]
        );
      }
    });

    // Update the previous value with the current selectedLimits
    prevSelectedLimitsLower.current = selectedLimitsLower;

    // Rest of the useEffect code...
    handleSetLimitsLower(selectedLimitsLower);
  }, [selectedLimitsLower]);

  // ... rest of the component ...
  
return(

    <Grid container spacing={2} columns={valuesOfInterest.length}>
      <Grid item xs={12} sx={{ height: "10px", justifyContent: "end", display: "flex" }}><KeyWarningsIgnoredModal ignoredWarnings={acknowledgedWarnings}ignoredWarningsLower={acknowledgedWarningsLower}/><KeyWarningsAddModal  handleAddWarning={handleAddWarning} allWarnings={valuesOfInterest}/><KeyWarningsDeleteModal  handleDeleteWarning={handleDeleteWarning} allWarnings={valuesOfInterest}/></Grid>
      {valuesOfInterest.map((value, index) => (
        <Grid
          item
          xs={valuesOfInterest.length * (1 / valuesOfInterest.length)}
          key={index}
        >
          <Box
            sx={{
              width: "100%",
              backgroundColor: colorInterpolation(
                Red,
                Green,
                Red,
                numberOfSteps,
                valuesOfInterestData[index],
                selectedLimits[`limit${index}`]
              ),
              margin: 0,
              padding: 0,
              borderRadius: 2,
              border: "1px solid grey",
              boxShadow: 1,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sx={{ height: "10px", justifyContent: "end", display: "flex" }}
              >
                <WarningDashboardSettingsModal
                  onSelectLimit={handleLimitSelection} index={index} valueOfInterest={valuesOfInterest[index]} valueOfInterestUnits={valuesOfInterestUnits[index]}                />
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                {value}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{
                  justifyContent: "center",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                <Typography id="input-slider" gutterBottom>
                  {valuesOfInterestData[index]} {valuesOfInterestUnits[index]} Current Limit: {selectedLimits[`limit${index}`]}Current lower Limit: {selectedLimitsLower[`limitLower${index}`]}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
