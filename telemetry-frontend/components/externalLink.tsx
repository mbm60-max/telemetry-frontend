import React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import './navbar/navbar.css';
interface ExternalLinkButtonProps{
    url:string;
    label:string;
}
const ExternalLinkButton = ({ url, label }:ExternalLinkButtonProps) => {
  const handleButtonClick = () => {
    window.location.href = url;
  };

  return (
    <Button className={"externalLink-button"} onClick={handleButtonClick}>
     <Typography fontSize={19} fontFamily={"Satoshi"} sx={{color:'white'}}> {label}</Typography>
    </Button>
  );
};

export default ExternalLinkButton;
