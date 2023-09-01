import {  Box, Divider,  styled, Typography } from "@mui/material";
import React from "react";
interface SettingsTitleProps {
    title:string;
    fontSize:number;
}
const SettingsTitle = ({title,fontSize}: SettingsTitleProps) => {

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      <Box sx={{ width: '100%',display:'flex',justifyContent:'end'}}><Box sx={{width: '85%'}}>
      <Typography sx={{fontSize:{fontSize},ml:4,color: "#4A5A44"}}>{title}</Typography></Box></Box>
    </div>
  );
};
export default SettingsTitle;