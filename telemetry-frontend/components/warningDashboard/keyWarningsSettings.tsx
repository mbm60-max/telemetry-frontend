import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
interface KeyWarningsSettingsAddProps {
  handleAddition:() => void;
  newUnitsChange: (newUnits: string) => void;
  newWarningChange: (newWarning: string) => void;
  newLimitChange:(newLimit: number) => void;
  newLimitChangeLower:(newLimitLower: number) => void;
  onClose:()=>void;
  allWarnings:string[];
}

const KeyWarningsSettingsAdd = ({ handleAddition,newUnitsChange,newWarningChange,newLimitChange,onClose,allWarnings,newLimitChangeLower}: KeyWarningsSettingsAddProps) => {
    const [newUnits, setNewUnits] = useState("");
    const [newWarning, setNewWarning] = useState("");
    const [newLimit, setNewLimit] = useState(-1);
    const [newLimitLower, setNewLimitLower] = useState(-1);
    const [limitError, setLimitError] = useState("");
    const [limitLowerError, setLimitLowerError] = useState("");
    const [warningError, setWarningError] = useState("");
    const [unitsError, setUnitsError] = useState("");

  const handleAdd = () => {
    setUnitsError("")
    setWarningError("")
    setLimitError("")
    setLimitLowerError("")
    if(newUnits===""){
        setUnitsError("You must provide units")
    }
    if(newWarning===""){
        setWarningError("You must select a new attribute")
    }
    if(newLimit===-1){
        setLimitError("You must provide a warning limit")
    }
    if(newLimitLower===-1){
      setLimitLowerError("You must provide a lower warning limit")
  }
    if((newLimitLower!==-1)&&(newLimit!==-1)&&(newWarning!=="")&&(newUnits!=="")){
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
   const handleNewLimitChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
       setNewLimitLower(isNaN(newValue) ? 0 : Math.max(0, newValue));
       newLimitChangeLower(newValue);
    };

  const handleClose=()=>{
    onClose();
  }

  return (
   
    <Box sx={{ width: '50vh', height: '50%'}}>
    <Grid container spacing={2}><Grid item xs={12}> <Typography id="input-slider" gutterBottom sx={{fontSize:20}}>
                  You are adding a new warning 
                </Typography></Grid><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:15}} >
 Only limits that are not -1 will be submitted.
                </Typography></Grid>
              <Grid item xs={12} sx={{height:'100%'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"Adding a new warning will alter when you see warnings"}/></Grid>
              <Grid item xs={6}><TextField
        id="outlined-basic"
        label="Set Lower Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={newLimitLower}
        onChange={handleNewLimitChangeLower}
        error={Boolean(limitLowerError)}
        helperText={limitLowerError}
      /></Grid>
              <Grid item xs={6}><TextField
      id="outlined-basic"
      label="Set Upper Limit"
      variant="outlined"
      type="number" // Set input type to 'number'
      inputProps={{
        min: 0, // Set minimum value to 0
      }}
      value={newLimit}
      onChange={handleNewLimitChange}
        error={Boolean(limitError)}
        helperText={limitError}
    /></Grid>
    <Grid item xs={6}><TextField
        id="outlined-basic"
        label="Set Units"
        variant="outlined"
        value={newUnits}
        onChange={handleNewUnitsChange}
        error={Boolean(unitsError)}
        helperText={unitsError}
      /></Grid>
              <Grid item xs={6}><TextField
        id="outlined-basic"
        label="Set Warning"
        variant="outlined"
        value={newWarning}
        onChange={handleNewWarningChange}
        error={Boolean(warningError)}
        helperText={warningError}
      /></Grid>
              <Grid item xs={6}><Button onClick={handleAdd}>ADD</Button></Grid>
              <Grid item xs={6}><Button onClick={handleClose}>Exit</Button></Grid></Grid>
  </Box>
  );
};

export default KeyWarningsSettingsAdd