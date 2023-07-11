import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListSubheader } from '@mui/material';

interface ReviewGroupingProps{
    Field:string| null;
    onSelectStream: (stream: string, streamNumber:string) => void;
    streamNumber:string;
}
export default function ReviewGrouping({Field,onSelectStream,streamNumber}:ReviewGroupingProps) {
  const [selectedStream, setSelectedStream] = React.useState('');
  const [selectedLabel, setSelectedLabel] = React.useState('Stream');

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedStream(event.target.value as string);
    onSelectStream(event.target.value as string,streamNumber);
  };
// Declare your four arrays based on Field value
const array1 = ["Throttle", "Tyre Temperatures", "MetersPerSecond","CurrentGear","Brake", "InLapShifts","InLapTimer","LastLapTime"];
const array2 = ["EngineRPM"];
const array3 = [ "RPMFromClutchToGearbox", "SuggestedGear","ClutchPedal", "ClutchEngagement"];
const array4 = ["Suspension Height", "Rotational Speed"];
let isDisabled = false;
const defaultValue = "Please select a field";
// Select the array based on Field value
let selectedArray: string[] = [];
let newLabel: string = "No Field";
if (Field === "General") {
  selectedArray = array1;
  newLabel = "Stream";
} else if (Field === "Engine") {
  selectedArray = array2;
  newLabel = "Stream";
} else if (Field === "Gearbox") {
  selectedArray = array3;
  newLabel = "Stream";
} else if (Field === "Tyres/Suspension") {
  selectedArray = array4;
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