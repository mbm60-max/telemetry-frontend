import { Button, Divider, Grid, styled, Typography } from "@mui/material";
import React, { useContext } from "react";
import SettingsObject, {
  AlertSettings,
  AppearanceSettings,
  DataSettings,
  DefaultsSettings,
} from "../../interfaces/defaultSettingsInterface";
import SettingsDefaultWarningsTabSelector from "./warningsTable.tsx/settingsDefaultWarnings";
import SettingsTextDisplay from "./settingsTextDisplay";
import SettingsToggleDisplay from "./settingsToggleDisplay";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../authProvider";
interface SettingsDisplayProps {
  field: string;
  userSettings: SettingsObject;
  setAlerts: (alertsValue: AlertSettings) => void;
  setDefaults: (defaultValue: DefaultsSettings) => void;
  setAppearance: (appearanceValue: AppearanceSettings) => void;
  setData: (dataValue: DataSettings) => void;
}

const SettingsDisplay = ({
  field,
  userSettings,
  setAlerts,
  setAppearance,
  setData,
  setDefaults,
}: SettingsDisplayProps) => {

  const {userName} = useContext(AuthContext);
  const handleUserNameChange = async ( username:string|number) => {
    try {
      let Failed = false;
       //Send the data to the server
       const userResponse: AxiosResponse = await axios.get('/api/checkuserapi', {
        params: { username },
      });
      
      if (userResponse.data.message === 'Success') {
        //username taken
        return { isValid: false, errorMessage: "That username is already taken" };
      }
      return  { isValid: true, errorMessage: "" };
    }
    catch (error) {
      console.error("Error checking for user:", error);
    }
  }


  const handleUpdateSettings = (
    updatedValue:
      | AlertSettings
      | AppearanceSettings
      | DataSettings
      | DefaultsSettings
  ) => {
    if(typeof updatedValue === "string"){
      return;
    }
    else{
      if (updatedValue.type === "AlertSettings") {
        setAlerts(updatedValue as AlertSettings);
      } else if (updatedValue.type === "AppearanceSettings") {
        setAppearance(updatedValue as AppearanceSettings);
      } else if (updatedValue.type === "DataSettings") {
        setData(updatedValue as DataSettings);
      } else if (updatedValue.type === "DefaultSettings") {
        setDefaults(updatedValue as DefaultsSettings);
      } else {
        console.log(updatedValue.type + "is not a valid settings type");
      }
    }
    // Identify the type of updatedValue and call the corresponding setter
  };
  const validateIPWithMessage = (value: string | number) => {
    const ipRegex =
      /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    if (typeof value == "string") {
      if (ipRegex.test(value)) {
        return { isValid: true, errorMessage: "" };
      }
      return { isValid: false, errorMessage: "Please submit a valid IP" };
    }
    return { isValid: false, errorMessage: "Internal Issue" };
  };
  const  validateNotificationDelay = (value: string | number) => {
    if(value > 1800 || value < 5){
      return{ isValid: false, errorMessage: "Value must be between 5 and 1800" };
    }
    return { isValid: true, errorMessage: "" };
      
  }
  const validateReviewLimit = (value: string | number) => {
    if(value > 100 || value < 10){
      return{ isValid: false, errorMessage: "Value must be between 10 and 100" };
    }
    return { isValid: true, errorMessage: "" };   
  }


  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      {field == "Account" && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Button variant="contained" disabled>
              Change Username
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disabled>
              Change Password
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disabled>
              Delete Account
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" disabled>
              Reset Account Data
            </Button>
          </Grid>
          <Grid item xs={12}>
          <SettingsTextDisplay
              currentValue={userSettings.defaults.defualtIPAddress}
              targetSetting={"Change Username"}
              hasDivider={true}
              settingsProp={""}
              validateInputPromise={handleUserNameChange}
              tooltipText={
                "This must be 4 numbers between 0 and 255 seperated by 3 dots, eg 1.123.234.0"
              }
              isNumber={false}
            />
          </Grid>
          <Grid item xs={12}>
          <SettingsTextDisplay
          
              targetSetting={"Change Password"}
              hasDivider={true}
              settingsProp={""}
              validateInputPromise={validateIPWithMessage}
              tooltipText={
                "This must be 4 numbers between 0 and 255 seperated by 3 dots, eg 1.123.234.0"
              }
              isNumber={false}
            />
          </Grid>
        </Grid>
      )}
      {field == "Data" && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <SettingsToggleDisplay
              currentValue={userSettings.data.allowML}
              targetSetting={"OPT OUT OF LAP DATA PUSHING"}
              hasDivider={true}
              settingsProp={"lightModeEnabled"}
              currentSettingsData={userSettings.data}
              handleUpdateSettings={handleUpdateSettings}
              tooltipText={"Stops your lap data being used in training ML models and from being stored, removes ability to use review page"}
              toggleLeft={"Opted In"}
              toggleRight={"Opted Out"}
            />
          </Grid>
          <Grid item xs={12}>
            <SettingsToggleDisplay
              currentValue={userSettings.data.optInToDataPushing}
              targetSetting={"OPT IN TO ML AND STRATEGY FEATURES"}
              hasDivider={true}
              settingsProp={"optInToDataPushing"}
              currentSettingsData={userSettings.data}
              handleUpdateSettings={handleUpdateSettings}
              tooltipText={"Allows Machine Learning features to be accessed"}
              toggleLeft={"Opted In"}
              toggleRight={"Opted Out"}
              
            />
          </Grid>
          <Grid item xs={12}>
            <SettingsTextDisplay
              currentValue={userSettings.alerts.alertWarningInterval+" "+"Laps"}
              targetSetting={"ALTER REVIEW LAP LIMIT"}
              hasDivider={false}
              handleUpdateSettings={handleUpdateSettings}
              currentSettingsData={userSettings.alerts}
              settingsProp={"alertWarningInterval"}
              validateInput={validateReviewLimit}
              tooltipText={
                "This must between 10 and 100, this is how many laps that will be retained for future use"
              }
              isNumber={true}
              minValue={10}
              maxValue={100}
            />
          </Grid>
        </Grid>
      )}
      {field == "Alerts" && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}><SettingsDefaultWarningsTabSelector/></Grid>
          <Grid item xs={12}>
            <SettingsTextDisplay
              currentValue={userSettings.alerts.alertWarningInterval+" "+"ms"}
              targetSetting={"Alter Warning Notification Interval (1000ms)"}
              hasDivider={false}
              handleUpdateSettings={handleUpdateSettings}
              currentSettingsData={userSettings.alerts}
              settingsProp={"alertWarningInterval"}
              validateInput={validateNotificationDelay}
              tooltipText={
                "This must between 5 and 1800, this number is taken to 3dp and converted to ms, determines frequency of warnings"
              }
              isNumber={true}
              minValue={5}
              maxValue={1800}
              modifier={1000}
            />
          </Grid>
          
        </Grid>
      )}
      {field == "Appearance" && (
        <Grid container spacing={2} alignItems="center"> 
          <Grid item xs={12}>
            <SettingsToggleDisplay
              currentValue={userSettings.appearance.lightModeEnabled}
              targetSetting={"Enable Light Mode"}
              hasDivider={false}
              settingsProp={"lightModeEnabled"}
              currentSettingsData={userSettings.appearance}
              handleUpdateSettings={handleUpdateSettings}
              tooltipText={"Adjusts colours to better suit light and dark enviroments"}
              toggleLeft={"Lightmode"}
              toggleRight={"Darkmode"}
            />
          </Grid>
        </Grid>
      )}
      {field == "Defaults" && (
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <SettingsTextDisplay
              currentValue={userSettings.defaults.defualtIPAddress}
              targetSetting={"IP Address"}
              hasDivider={true}
              handleUpdateSettings={handleUpdateSettings}
              currentSettingsData={userSettings.defaults}
              settingsProp={"defualtIPAddress"}
              validateInput={validateIPWithMessage}
              tooltipText={
                "This must be 4 numbers between 0 and 255 seperated by 3 dots, eg 1.123.234.0"
              }
              isNumber={false}
            />
          </Grid>
          <Grid item xs={12}>
            <SettingsToggleDisplay
              currentValue={userSettings.defaults.defaultUnitsMetric}
              targetSetting={"Set Default Units"}
              hasDivider={false}
              settingsProp={"defaultUnitsMetric"}
              currentSettingsData={userSettings.defaults}
              handleUpdateSettings={handleUpdateSettings}
              tooltipText={"The unit system to be used across the site"}
              toggleLeft={"Metric"}
              toggleRight={"Imperial"}
            />
          </Grid>
        </Grid>
      )}
    </div>
  );
};
export default SettingsDisplay;
