import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
interface KeyWarningsSettingsDeleteProps {
  handleDeletion:() => void;
  valuesIndexChange:(valuesIndex: number) => void;
  limitsIndexChange:(limitsIndex: number) => void;
  onClose:()=>void;
  allWarnings:string[];
}

const KeyWarningsSettingsDelete = ({handleDeletion,valuesIndexChange,limitsIndexChange,onClose,allWarnings}: KeyWarningsSettingsDeleteProps) => {
    const [valuesIndex, setValuesIndex] = useState(0);
    const [limitsIndex, setLimitsIndex] = useState(0);
    const [selectedWarning, setSelectedWarning] = useState("");
  const handleDelete = () => {
   handleDeletion();
  };

   const handleValuesIndexChange = (index:number) => {
    valuesIndexChange(index);
    setValuesIndex(index);
   };
   const handleLimitsIndexChange = (index:number) => {
    limitsIndexChange(index);
    setLimitsIndex(index);
   };
   const handleSelectedWarning = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setSelectedWarning(event.target.value)
    const index = parseInt(event.target.value);
    //for some reason it acts as both a string and a number in different cases so watch out
    handleLimitsIndexChange(index)
    handleValuesIndexChange(index)
    console.log(allWarnings[index])
   };

  const handleClose=()=>{
    onClose();
  }

  return (
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  You are changing 
                </Typography>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Set Warning</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedWarning}
          label="Select Warning"
          onChange={handleSelectedWarning}
        >
          {allWarnings.map((warning, index) => (
                  <MenuItem key={index} value={index}>
                    {warning}
                  </MenuItem>))}
        </Select>
      </FormControl>
    <Button onClick={handleDelete}>Delete</Button>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default KeyWarningsSettingsDelete