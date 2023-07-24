import { Button, Grid, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
interface WarningDashboardSettingsProps {
  onSelectLimit: (limit: number,limitLower: number, index:number) => void;
  index:number
  valueOfInterest:string;
  valueOfInterestUnits:string;
  onClose:()=>void;
}

const WarningDashboardSettings = ({ onSelectLimit,index,valueOfInterest,valueOfInterestUnits, onClose }: WarningDashboardSettingsProps) => {
  const [limitValue, setLimitValue] = useState<number>(-1);
  const [limitValueLower, setLimitValueLower] = useState<number>(-1);
  const prevLimit = useRef<number>(limitValue);
  const previousLimitValue = useRef<number>(0);
  const prevLimitLower = useRef<number>(limitValueLower);
  const previousLimitValueLower = useRef<number>(0);
  const [upperLimitError,setUpperLimitError] = useState("");
  const [lowerLimitError,setLowerLimitError] = useState("");
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setLimitValue(isNaN(newValue) ? 0 : Math.max(0, newValue));
  };
  const handleTextFieldChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setLimitValueLower(isNaN(newValue) ? 0 : Math.max(0, newValue));
  };
 

const handleClick = () => {
  if((limitValueLower!=-1)||(limitValue!=-1)){
    onSelectLimit(limitValue,limitValueLower,index)
  }
  else{
    setLowerLimitError("At least one limit must be set to a value");
    setUpperLimitError("At least one limit must be set to a value");
  }
};
useEffect(() => {
  previousLimitValue.current = prevLimit.current; // Update previousLimitValue whenever prevLimit.current changes
  prevLimit.current = limitValue;
}, [limitValue]);
useEffect(() => {
  previousLimitValueLower.current = prevLimitLower.current; // Update previousLimitValue whenever prevLimit.current changes
  prevLimitLower.current = limitValueLower;
}, [limitValueLower]);

const handleClose=()=>{
  onClose();
}

  return (
    <Box sx={{ width: '50vh', height: '50%'}}>
      <Grid container spacing={2}><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:20}} fontWeight="bold">
                  You are changing the limit for {valueOfInterest} !
                </Typography></Grid><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:15}} >
 Only limits that are not -1 will be submitted.
                </Typography></Grid>
                <Grid item xs={12} sx={{height:'100%'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"By changing these limits previosuly set limits are removed, this will alter when you see warnings"}/></Grid>
                <Grid item xs={6}><TextField
        id="outlined-basic"
        label="Upper Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValue}
        onChange={handleTextFieldChange}
        error={Boolean(upperLimitError)}
        helperText={upperLimitError}
      /></Grid>
                <Grid item xs={6}><TextField
        id="outlined-basic"
        label="Lower Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValueLower}
        onChange={handleTextFieldChangeLower}
        error={Boolean(lowerLimitError)}
        helperText={lowerLimitError}
      /></Grid>
                <Grid item xs={6}><Button onClick={handleClick}>Submit New Limits</Button></Grid>
                <Grid item xs={6}><Button onClick={handleClose}>Exit</Button></Grid></Grid>
        
                
                
    
       
    

    </Box>
  );
};

export default WarningDashboardSettings;