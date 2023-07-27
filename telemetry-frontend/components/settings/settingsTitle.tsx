import {  Divider,  styled, Typography } from "@mui/material";
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
      <Typography sx={{fontSize:{fontSize},ml:2,color: "#4A5A44"}}>{title}</Typography>
    </div>
  );
};
export default SettingsTitle;