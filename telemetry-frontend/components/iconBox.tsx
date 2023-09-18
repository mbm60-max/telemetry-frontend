import React from 'react';
import { Box, TextField, InputAdornment, Button, styled, Tooltip, tooltipClasses, TooltipProps, Typography } from '@mui/material';
import Icon from '@mui/material';
import { info } from 'console';

interface IconBoxInputProps {
  icon: React.ElementType;
  onHoverText:string;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="bottom" arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

const IconBox: React.FC<IconBoxInputProps> = ({ icon:Icon,onHoverText}:IconBoxInputProps) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      border="1px solid #ccc"
      padding="8px"
      width="100px"
      height="38px"
      justifyContent='center'
      sx={{mr:1,backgroundColor:'rgba(9, 27, 119, 0.5)',borderRadius:5}}
     
    >

         
          <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{onHoverText}</Typography>
          </React.Fragment>
        }
      >
        <Button> <Icon fontSize="medium" sx={{color:'white'}}/></Button>
      </HtmlTooltip>

    </Box>
  );
};

export default IconBox;
