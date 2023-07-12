import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface ReviewGroupingProps{
    Field:string| null;
    onSelectStream: (stream: string, streamNumber:string) => void;
    onSelectStreamMinMax: (minValue: string, maxValue:string,streamNumber:string) => void;
    onSelectStreamGraphTypes: (graphType: string,streamNumber:string,isSpecial:boolean) => void;
    onSelectSpecialStream: (isSpecial: boolean,streamNumber:string) => void;
    streamNumber:string;
}
export default function ReviewGrouping({Field,onSelectStream,streamNumber, onSelectStreamMinMax,onSelectStreamGraphTypes,onSelectSpecialStream}:ReviewGroupingProps) {
  const [selectedStream, setSelectedStream] = React.useState('');
  const [selectedLabel, setSelectedLabel] = React.useState('Stream');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStream(event.target.value as string);
    onSelectStream(event.target.value as string,streamNumber);
    if(isSpecialGraphCheck(event.target.value as string)){
      const minMaxIndex = selectedArray.indexOf(event.target.value as string);
      onSelectSpecialStream(true,streamNumber);
      onSelectStreamMinMax(minArray[minMaxIndex],maxArray[minMaxIndex], streamNumber);
      onSelectStreamGraphTypes(graphTypeArray[minMaxIndex],streamNumber,true);
    }else{
      console.log("triggered")
      const minMaxIndex = selectedArray.indexOf(event.target.value as string);
      onSelectStreamMinMax(minArray[minMaxIndex],maxArray[minMaxIndex], streamNumber);
      onSelectStreamGraphTypes(graphTypeArray[minMaxIndex],streamNumber,false);
      onSelectSpecialStream(false,streamNumber);
    }
  };
  const isSpecialGraphCheck=(attribute:string)=>{
    const specialGraphsArray=[ "Tyre Temperatures","Suspension Height", "Rotational Speed"];
    if(specialGraphsArray.indexOf(attribute)==-1){
      return false;
    }return true;
  }
// Declare your four arrays based on Field value
const array1 = [["Throttle", "Tyre Temperatures", "MetersPerSecond","CurrentGear","Brake", "InLapShifts","InLapTimer","LastLapTime"],["-1","0","-1","1","-1","0","0","0"],["255","150","200","15","255","200","0","0"],["straight","straight","straight","stepline","straight","straight","straight","straight"]];
const array2 = [["EngineRPM"],["-1"],["12000"],["straight"]];
const array3 = [[ "RPMFromClutchToGearbox", "SuggestedGear","ClutchPedal", "ClutchEngagement"],["-1","1","0","0"],["12000","15","1","1"],["straight","stepline","straight","straight"]];
const array4 = [["Suspension Height", "Rotational Speed"],["0","0"],["10","10"],["straight","straight"]];
let isDisabled = false;
const defaultValue = "Please select a field";
// Select the array based on Field value
let selectedArray: string[] = [];
let minArray: string[] = [];
let maxArray: string[] = [];
let graphTypeArray: string[] = [];
let newLabel: string = "No Field";
if (Field === "General") {
  selectedArray = array1[0];
  minArray = array1[1];
  maxArray = array1[2];
  graphTypeArray = array1[3];
  newLabel = "Stream";
} else if (Field === "Engine") {
  selectedArray = array2[0];
  minArray = array2[1];
  maxArray = array2[2];
  graphTypeArray = array2[3];
  newLabel = "Stream";
} else if (Field === "Gearbox") {
  selectedArray = array3[0];
  minArray = array3[1];
  maxArray = array3[2];
  graphTypeArray = array3[3];
  newLabel = "Stream";
} else if (Field === "Tyres/Suspension") {
  selectedArray = array4[0];
  minArray = array4[1];
  maxArray = array4[2];
  graphTypeArray = array4[3];
  newLabel = "Stream";
}else {
    isDisabled = true;
  }
  if (newLabel !== selectedLabel) {
    setSelectedLabel(newLabel);
  }
  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{selectedLabel}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedStream}
          label={selectedLabel}
          onChange={handleChange}
          disabled={isDisabled}
        >
            {isDisabled && (
            <MenuItem key={defaultValue} value="" disabled>
              {defaultValue}
            </MenuItem>
          )}
          {selectedArray.map((item) => (
            <MenuItem key={item} value={item}>
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}