import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
interface sideNavProps{
  children:React.ReactNode;
}
const SideNav = ({children}:sideNavProps) => {
    return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <Box sx={{ width: "100%", height: 10, backgroundColor: "white" }} />
      <div style={{ flex: 1, display: "flex", height: "100%" }}>
        <div style={{ width: 200, backgroundColor: "#9F160C", padding: "10px" }}>Session Options</div>
        <div style={{ flex: 1, backgroundColor: "#1E1E1E", padding: "10px", overflow: "auto" }}>{children}</div>
      </div>
    </div>
    );
  };
export default SideNav
