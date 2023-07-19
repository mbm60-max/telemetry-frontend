import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
interface KeyWarningsSettingsAddProps {
  handleAddition:() => void;
  newUnitsChange: (newUnits: string) => void;
  newWarningChange: (newWarning: string) => void;
  newLimitChange:(newLimit: number) => void;
  onClose:()=>void;
  allWarnings:string[];
}

const KeyWarningsSettingsAdd = ({ handleAddition,newUnitsChange,newWarningChange,newLimitChange,onClose,allWarnings}: KeyWarningsSettingsAddProps) => {
    const [newUnits, setNewUnits] = useState("");
    const [newWarning, setNewWarning] = useState("");
    const [newLimit, setNewLimit] = useState(-1);
    const [limitError, setLimitError] = useState("");
    const [warningError, setWarningError] = useState("");
    const [unitsError, setUnitsError] = useState("");

  const handleAdd = () => {
    if(newUnits===""){
        setUnitsError("You must provide units")
    }
    if(newWarning===""){
        setWarningError("You must select a new attribute")
    }
    if(newLimit===-1){
        setLimitError("You must provide a warning limit")
    }
    if((newLimit!==-1)&&(newWarning!=="")&&(newUnits!=="")){
        handleAddition();
    }
    return;
  };

  const handleNewUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value
    newUnitsChange(updatedValue);
    setNewUnits(updatedValue);
   };
   const handleNewWarningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value
    newWarningChange(updatedValue);
    setNewWarning(updatedValue);
   };
   const handleNewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const newValue = parseInt(event.target.value);
      setNewLimit(isNaN(newValue) ? 0 : Math.max(0, newValue));
      newLimitChange(newValue);
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
        error={Boolean(limitError)}
      />
      <TextField
        id="outlined-basic"
        label="Set Units"
        variant="outlined"
        value={newUnits}
        onChange={handleNewUnitsChange}
        error={Boolean(unitsError)}
      />
      <TextField
        id="outlined-basic"
        label="Set Warning"
        variant="outlined"
        value={newWarning}
        onChange={handleNewWarningChange}
        error={Boolean(warningError)}
      />
    <Button onClick={handleAdd}>ADD</Button>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default KeyWarningsSettingsAdd