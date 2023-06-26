import React from 'react';
import { Box, TextField, InputAdornment } from '@mui/material';
import Icon from '@mui/material';

interface IconBoxInputProps {
  icon: React.ElementType;
}

const IconBox: React.FC<IconBoxInputProps> = ({ icon: Icon}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      borderRadius="4px"
      border="1px solid #ccc"
      padding="8px"
      width="30px"
      height="38px"
      justifyContent='center'
      sx={{borderRight:"none"}}
    >
          <Icon fontSize="medium" sx={{color:'#ccc'}}/>
       

    </Box>
  );
};

export default IconBox;
