import {  Button, Divider,  Grid,  styled, Typography } from "@mui/material";
import React from "react";
interface SettingsDisplayProps {
    field:string;
}


const SettingsDisplay = ({field}: SettingsDisplayProps) => {

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      <Typography sx={{ml:2,color: "#4A5A44"}}>{field}</Typography>
      {field=="Account" &&<Grid container spacing={2} alignItems="center"><Grid item xs={12}><Button variant="contained" disabled>
                Change Username
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
                Change Password
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
                Delete Account
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              Reset Account Data
              </Button></Grid></Grid>}
      {field=="Data" &&<Grid container spacing={2} alignItems="center"><Grid item xs={12}><Button variant="contained" disabled>
                Opt ouf of lap data pusing
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              Alter review lap limit 10-100
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              opt in to ml and stategy
              </Button></Grid></Grid>}
      {field=="Alerts" &&<Grid container spacing={2} alignItems="center"><Grid item xs={12}><Button variant="contained" disabled>
      Alter Default warnings
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              Alter warning interval
              </Button></Grid></Grid>}
      {field=="Appearance" &&<Grid container spacing={2} alignItems="center"><Grid item xs={12}><Button variant="contained" disabled>
      Light Mode vs Dark Mode
              </Button></Grid></Grid>}
      {field=="Defaults" &&<Grid container spacing={2} alignItems="center"><Grid item xs={12}><Button variant="contained" disabled>
      set defualt units imperial vs metric
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              Alter Default IP
              </Button></Grid></Grid>}
    </div>
  );
};
export default SettingsDisplay;

