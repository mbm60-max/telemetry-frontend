import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import WarningIcon from '@mui/icons-material/Warning';
import FormHelperText from '@mui/material/FormHelperText';
import './keyWarningsDelete.css'
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
    const [deleteError,setDeleteError]= useState("");
    const [selectedWarning, setSelectedWarning] = useState("");
  const handleDelete = () => {
    if(selectedWarning!==""){
      handleDeletion();
      return;
    }setDeleteError("You must select a warning to be deleted")
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
    setDeleteError("")
   };

  const handleClose=()=>{
    onClose();
  }

  return (
     <Box sx={{ width: '50vh', height: '50%'}}>
     <Grid container spacing={2}><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:20}}>
     {(allWarnings[selectedWarning as unknown as number]===undefined) ? "You are about to delete an item" : "You are about to delete " + allWarnings[selectedWarning as unknown as number]}

                </Typography></Grid><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:15}} >
This action cannot be directly undone
               </Typography></Grid>
               <Grid item xs={12} sx={{height:'100%'}}><TextWarningOverlay height={100} width={100} icon={WarningIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Warning"} text={"Once deleted you will no longer recieve warnings for this property"}/></Grid>
               <Grid item xs={12}><FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Delete Warning</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedWarning}
          label="Select Warning"
          onChange={handleSelectedWarning}
          error={(Boolean(deleteError))}
        >
          {allWarnings.map((warning, index) => (
                  <MenuItem key={index} value={index}>
                    {warning}
                  </MenuItem>))}
        </Select><FormHelperText className="red-text">{deleteError}</FormHelperText>
      </FormControl></Grid>
               <Grid item xs={6}><Button onClick={handleDelete}>Delete</Button></Grid>
               <Grid item xs={6}><Button onClick={handleClose}>Exit</Button></Grid></Grid>
   </Box>
  );
};

export default KeyWarningsSettingsDelete