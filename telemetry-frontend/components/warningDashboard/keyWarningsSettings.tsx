import { Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
interface KeyWarningsSettingsProps {
  hanldeAddition:() => void;
  handleDeletion:() => void;
  newUnitsChange: (newUnits: string) => void;
  newWarningChange: (newWarning: string) => void;
  newLimitChange:(newLimit: number) => void;
  valuesIndexChange:(valuesIndex: number) => void;
  limitsIndexChange:(limitsIndex: number) => void;
  onClose:()=>void;
  allWarnings:string[];
}

const KeyWarningsSettings = ({ hanldeAddition,handleDeletion,newUnitsChange,newWarningChange,newLimitChange,valuesIndexChange,limitsIndexChange,onClose}: KeyWarningsSettingsProps) => {
    const [newUnits, setNewUnits] = useState("");
    const [newWarning, setNewWarning] = useState("");
    const [newLimit, setNewLimit] = useState(0);
    const [valuesIndex, setValuesIndex] = useState(0);
    const [limitsIndex, setLimitsIndex] = useState(0);
   

  const handleAdd = () => {
    hanldeAddition();
  };
  const handleDelete = () => {
   handleDeletion();
  };
  const handleNewUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    newUnitsChange(newUnits);
    setNewUnits(newUnits);
   };
   const handleNewWarningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    newWarningChange(newWarning);
    setNewWarning(newWarning);
   };
   const handleNewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   newLimitChange(newLimit);
   const newValue = parseInt(event.target.value);
      setNewLimit(isNaN(newValue) ? 0 : Math.max(0, newValue));
   };
   const handleValuesIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    valuesIndexChange(valuesIndex);
    setValuesIndex(valuesIndex);
   };
   const handleLimitsIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    limitsIndexChange(limitsIndex);
    setLimitsIndex(limitsIndex);
   };

  const handleClose=()=>{
    onClose();
  }

  return (
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  You are changing 
                </Typography>
    <TextField
        id="outlined-basic"
        label="Set Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={newLimit}
        onChange={handleNewLimitChange}
      />
      <TextField
        id="outlined-basic"
        label="Set Units"
        variant="outlined"
        value={newUnits}
        onChange={handleNewUnitsChange}
      />
      <TextField
        id="outlined-basic"
        label="Set Warning"
        variant="outlined"
        value={newWarning}
        onChange={handleNewWarningChange}
      />
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    <Button onClick={handleAdd}>ADD</Button>
    <Button onClick={handleDelete}>Delete</Button>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default KeyWarningsSettings