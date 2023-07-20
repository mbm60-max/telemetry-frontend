import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import WarningInstance from "../../interfaces/warningInterface";
interface ActualWarningProps {
  onClose:()=>void;
  activeWarning: WarningInstance;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
}

const ActualWarning = ({onClose,activeWarning,handleActiveWarnings,handleAcknowledgedWarnings}: ActualWarningProps) => {
  
  const handleIgnore=()=>{
    handleActiveWarnings(false,activeWarning.newWarning,activeWarning.newWarningValue,activeWarning.newWarningUnits,activeWarning.newWarningLimit);
    handleAcknowledgedWarnings(true,activeWarning.newWarning,activeWarning.newWarningValue,activeWarning.newWarningUnits,activeWarning.newWarningLimit);
    onClose();
  }

  const handleSupress=()=>{
    onClose();
  }

  return (
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  Warning {activeWarning.newWarning} is above the limit you set.
                  This is {activeWarning.newWarningLimit}{activeWarning.newWarningUnits}
                  Warning Value: {activeWarning.newWarningValue}
                </Typography>
    <Button onClick={handleSupress}>Supress</Button>
    <Button onClick={handleIgnore}>Ignore</Button>
    </Box>
  );
};

export default ActualWarning