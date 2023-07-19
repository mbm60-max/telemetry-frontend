import { Box, Button, Grid, Typography } from "@mui/material";
import chroma from "chroma-js";
import React from "react";
import WarningDashboardSettingsModal from "./warningDashboardSettingsModal";
import SettingsIcon from '@mui/icons-material/Settings';
import KeyWarningsAddModal from "./keyWarningsModal";
import KeyWarningsDeleteModal from "./keyWarningsDeleteModal";

interface WarningsDashboardProps {
  valuesOfInterest: string[];
  valuesOfInterestData: number[];
  valuesOfInterestUnits: string[];
  valuesOfInterestDefualtLimits: number[];
handleSetWarning:(updatedValuesOfInterest: string[], updatedValuesOfInterestData: number[], updatedValuesOfInterestUnits: string[], updatedValuesOfInterestDefualtLimits: number[]) => void
}
export default function WarningsDashboard({
  valuesOfInterest,
  valuesOfInterestData,
  valuesOfInterestUnits,
  valuesOfInterestDefualtLimits,
  handleSetWarning,
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
      colorScale = chroma.scale([color2, color1]).mode("lch").colors(steps);
      return calcColor(colorScale, targetTemp, temp);
    } else if (temp < targetTemp) {
      colorScale = chroma.scale([color2, color3]).mode("lch").colors(steps);
      return calcColor(colorScale, temp, targetTemp);
    } else {
      return (color = "#00ff00");
    }
  };

  // Usage
  const Red = "#ff0000";
  const Green = "#00ff00";
  const Blue = "#0000ff";
  const numberOfSteps = 20;

  const [selectedLimits, setSelectedLimits] = React.useState<{
    [key: string]: number;
  }>(
    valuesOfInterest.reduce(
      (limits: { [key: string]: number }, value: string, index: number) => {
        console.log(index)
        limits[`limit${index}`] = valuesOfInterestDefualtLimits[index];
        return limits;
      },
      {}
    )
  );

  const handleLimitSelection = (limit: number, index: string) => {
    setSelectedLimits((prevFields) => ({
      ...prevFields,
      [`limit${index}`]: limit,
    }));
  };
  const handleDeleteWarning = (LimitsIndex:number,valuesIndex:number)=>{
    const updatedValuesOfInterest = [...valuesOfInterest];
    const updatedValuesOfInterestData = [...valuesOfInterestData];
    const updatedValuesOfInterestUnits = [...valuesOfInterestUnits];
    const updatedValuesOfInterestDefualtLimits = [...valuesOfInterestDefualtLimits];
  
    // Remove value of interest at index
    updatedValuesOfInterest.splice(valuesIndex, 1);
    updatedValuesOfInterestData.splice(valuesIndex, 1);
    updatedValuesOfInterestUnits.splice(valuesIndex, 1);
    updatedValuesOfInterestDefualtLimits.splice(valuesIndex, 1);
    // Remove selected limit that matches the index
    const updatedSelectedLimits:{ [key: string]: number }  =  {};
    Object.keys(selectedLimits).forEach((key) => {
      const currentLimitsIndex = parseInt(key.slice(5)); // Extract the index from the key (e.g., "limit0" -> 0)
      if (currentLimitsIndex !== LimitsIndex) {
        // Skip the entry with the index that matches LimitsIndex
        const newLimitsIndex = currentLimitsIndex > LimitsIndex ? currentLimitsIndex - 1 : currentLimitsIndex;
        updatedSelectedLimits[`limit${newLimitsIndex}`] = selectedLimits[key];
      }
    });
    handleSetWarning(updatedValuesOfInterest,updatedValuesOfInterestData,updatedValuesOfInterestUnits,updatedValuesOfInterestDefualtLimits);
    setSelectedLimits(updatedSelectedLimits);
  }
  const handleAddWarning = (newLimit:number,newUnits:string,newWarning:string)=>{
//adds value to end of values of interest and adds new limit to selected limit with value newLimit
const updatedValuesOfInterest = [...valuesOfInterest];
const updatedSelectedLimits = { ...selectedLimits };
const updatedValuesOfInterestData = [...valuesOfInterestData];
const updatedValuesOfInterestUnits = [...valuesOfInterestUnits];
const updatedValuesOfInterestDefualtLimits = [...valuesOfInterestDefualtLimits];

// Add value to end of values of interest
updatedValuesOfInterest.push(newWarning);
updatedValuesOfInterestData.push(0);
updatedValuesOfInterestUnits.push(newUnits);
updatedValuesOfInterestDefualtLimits.push(0);

// Add new limit to selected limits with value newLimit
const newLimitIndex = Object.keys(selectedLimits).length;
updatedSelectedLimits[`limit${newLimitIndex}`] = newLimit;

// Update state
handleSetWarning(updatedValuesOfInterest,updatedValuesOfInterestData,updatedValuesOfInterestUnits,updatedValuesOfInterestDefualtLimits);
setSelectedLimits(updatedSelectedLimits);
  }
return(

    <Grid container spacing={2} columns={valuesOfInterest.length}>
      <Grid item xs={12} sx={{ height: "10px", justifyContent: "end", display: "flex" }}><KeyWarningsAddModal  handleAddWarning={handleAddWarning} allWarnings={valuesOfInterest}/><KeyWarningsDeleteModal  handleDeleteWarning={handleDeleteWarning} allWarnings={valuesOfInterest}/></Grid>
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
                  {valuesOfInterestData[index]} {valuesOfInterestUnits[index]} Current Limit: {selectedLimits[`limit${index}`]}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Grid>
      ))}
    </Grid>
  );
}
