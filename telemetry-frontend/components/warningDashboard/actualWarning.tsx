import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import WarningInstance from "../../interfaces/warningInterface";
interface ActualWarningProps {
  onClose:()=>void;
  activeWarning: WarningInstance;
}

const ActualWarning = ({onClose,activeWarning}: ActualWarningProps) => {
  
  const handleClose=()=>{
    onClose();
  }

  return (
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  Warning {activeWarning.newWarning} is above the limit you set.
                  This is {activeWarning.newWarningLimit}{activeWarning.newWarningUnits}
                  Warning Value: {activeWarning.newWarningValue}
                </Typography>
    <Button>Supress</Button>
    <Button onClick={handleClose }>Ignore</Button>
    </Box>
  );
};

export default ActualWarning