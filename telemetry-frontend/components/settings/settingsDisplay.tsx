import {  Button, Divider,  Grid,  styled, Typography } from "@mui/material";
import React from "react";
import SettingsObject, { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from "../../interfaces/defaultSettingsInterface";
import SettingsTextDisplay from "./settingsTextDisplay";
interface SettingsDisplayProps {
    field:string;
     userSettings: SettingsObject;
    setAlerts:(alertsValue: AlertSettings) => void
    setDefaults:(defaultValue: DefaultsSettings) => void
    setAppearance:(appearanceValue: AppearanceSettings) => void
    setData:(dataValue: DataSettings) => void
}


const SettingsDisplay = ({field,userSettings,setAlerts,setAppearance,setData,setDefaults}: SettingsDisplayProps) => {

    const handleUpdateSettings = (updatedValue: AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings) => {
        // Identify the type of updatedValue and call the corresponding setter
        if (updatedValue.type === "AlertSettings") {
          setAlerts(updatedValue as AlertSettings);
        } else if (updatedValue.type === "AppearanceSettings") {
          setAppearance(updatedValue as AppearanceSettings);
        } else if (updatedValue.type === "DataSettings") {
          setData(updatedValue as DataSettings);
        } else if (updatedValue.type === "DefaultSettings") {
           
          setDefaults(updatedValue as DefaultsSettings);
        }else{
            console.log(updatedValue.type )
        }
      };
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
              Opt in to ml and strategy
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
      Set defualt units imperial vs metric
              </Button></Grid><Grid item xs={12}><Button variant="contained" disabled>
              Alter Default IP
              </Button></Grid><Grid item xs={12}><SettingsTextDisplay currentValue={userSettings.defaults.defualtIPAddress} targetSetting={"IP Address"} hasDivider={true} handleUpdateSettings={handleUpdateSettings} currentSettingsData={userSettings.defaults} settingsProp={"defualtIPAddress"}/></Grid></Grid>}
    </div>
  );
};
export default SettingsDisplay;

