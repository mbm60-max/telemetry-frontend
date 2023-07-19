import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
interface ActualWarningProps {
  onClose:()=>void;
}

const ActualWarning = ({onClose}: ActualWarningProps) => {
  
  const handleClose=()=>{
    onClose();
  }

  return (
    <Box sx={{ width: '100%', height: '50%'}}>
        <Typography id="input-slider" gutterBottom>
                  Warning
                </Typography>
    <Button>Supress</Button>
    <Button onClick={handleClose }>Ignore</Button>
    </Box>
  );
};

export default ActualWarning