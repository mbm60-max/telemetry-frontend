import { Button, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
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
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  You are changing {valueOfInterest}
                </Typography>
    <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValue}
        onChange={handleTextFieldChange}
      />
       <TextField
        id="outlined-basic"
        label="Outlined"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValueLower}
        onChange={handleTextFieldChangeLower}
      />
    <Button onClick={handleClick}>Save New Limit</Button>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default WarningDashboardSettings;