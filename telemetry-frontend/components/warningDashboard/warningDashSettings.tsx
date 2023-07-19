import { Button, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { useState } from "react";
import TextField from '@mui/material/TextField';
interface WarningDashboardSettingsProps {
  onSelectLimit: (limit: number, index:number) => void;
  index:number
  valueOfInterest:string;
  valueOfInterestUnits:string;
  onClose:()=>void;
}

const WarningDashboardSettings = ({ onSelectLimit,index,valueOfInterest,valueOfInterestUnits, onClose }: WarningDashboardSettingsProps) => {
    const [limitValue, setLimitValue] = useState<number>(0);

    const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = parseInt(event.target.value);
      setLimitValue(isNaN(newValue) ? 0 : Math.max(0, newValue));
    };

  const handleClick = () => {
    onSelectLimit(limitValue,index)
  };
  
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
    <Button onClick={handleClick}>Save New Limit</Button>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default WarningDashboardSettings;