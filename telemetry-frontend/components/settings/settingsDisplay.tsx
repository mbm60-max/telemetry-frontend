import { Button, Divider, Grid, styled, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
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
import validatePassword from "../../utils/validatePassword";
import handleValidateEmail from "../../utils/emailSender";
import handleVerifyEmail from "../../utils/emailSender";
import LockedButton from "./lockedButton";
import SeriousActionButton from "./actionButton";
import router from "next/router";
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
  const { userName } = useContext(AuthContext);
  const [pageLock,setPageLock]=useState(true);
  const handleUserNameChange = async ( username:string) => {
    try {
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


const checkOriginalData= async (newData:string,target:string)=>{
  const username=userName;
  if(target == "password"){
    try {
      const checkOriginalDataResponse: AxiosResponse = await axios.get('/api/checkpasswordapi', {
        params: { username},
      });
      
      console.log('Response:', checkOriginalDataResponse);
      if(checkOriginalDataResponse.data.password==newData){
        return true;
      }else{
        return false;
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }else if(target == "email"){
    try {
      const checkOriginalDataResponse: AxiosResponse = await axios.get('/api/checkemailisnewapi', {
        params: { username},
      });
      
      console.log('Response:', checkOriginalDataResponse);
      if(checkOriginalDataResponse.data.email==newData){
        return true;
      }else{
        return false;
      }
      
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
}

const checkPasswordIsNew= async (newPassword:string)=>{
  try {
    // Check if the new password is the same as the old password
    const isSameAsOriginalPassword = await checkOriginalData(newPassword,"password");
  
    if (isSameAsOriginalPassword) {
      return { isValid: false, errorMessage: "New password must be different from the old one" };
    } return { isValid: true, errorMessage: "" };
  }catch(error) {
    console.error('Error fetching setup:', error);
  }
}
const checkEmailIsNew= async (newEmail:string)=>{
  try {
    // Check if the new password is the same as the old password
    const isSameAsOriginalEmail = await checkOriginalData(newEmail,"email");
  
    if (isSameAsOriginalEmail) {
      return { isValid: false, errorMessage: "New email must be different from the old one" };
    } return { isValid: true, errorMessage: "" };
  }catch(error) {
    console.error('Error fetching setup:', error);
  }
}


const handlePasswordValidation =(newPassword: string) => {
      const result = validatePassword(newPassword);

      if (result) {
        return { isValid: true, errorMessage: '' };
      } else {
        return { isValid: false, errorMessage: 'Password must contain at least one upper, lower, and numeric character, and must be over 6 letters long.' };
      }
};





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
    if(typeof value == "number"){
      if(value > 1800 || value < 5){
        return{ isValid: false, errorMessage: "Value must be between 5 and 1800" };
      }
    }
    return { isValid: true, errorMessage: "" };
      
  }
  const validateReviewLimit = (value: string | number) => {
    if(typeof value == "number"){
    if(value > 100 || value < 10){
      return{ isValid: false, errorMessage: "Value must be between 10 and 100" };
    }}
    return { isValid: true, errorMessage: "" };   
  }

  const handleSetLock=(setValue:boolean)=>{
    setPageLock(setValue);
  }
  const relockAccountPage=()=>{
    handleSetLock(true);
  }

  const deleteAccount = async ( username:string) =>{
    console.log("called")
    const collectionNames:string[]=["Settings","setups","Users",username];
    const databaseNames:string[]=["Data","Data","Test","UserSessions"];
    if(collectionNames.length==databaseNames.length){
      for(let i=0;i<collectionNames.length;i++){
        try {
          let collectionName = collectionNames[i];
          let databaseName = databaseNames[i];
          await axios.post("/api/deleteuserdataapi", {username, collectionName, databaseName });
          router.push("/signup");
       }
       catch (error) {
         console.error("Error checking for user:", error);
       }
      }
    }
  }

  const resetAccount = async (username:string) =>{
 
    const settingsname = "Default Settings"
    const settingsObject: SettingsObject = {
      data: {
          allowML: false,
          reviewLapLimit: 10,
          optInToDataPushing:false,
          type: "DataSettings"
      },
      appearance: {
          lightModeEnabled:true,
          language:"en",
          type: "AppearanceSettings"
      },
      alerts: {

          alertDefaultWarningsNames:[["Front Left Temp","Front Right Temp","Rear Left Temp","Rear Right Temp"],
                                     ['"Oil Temperature"','RPM','Turbo Boost Pressure','Oil Pressure','Fuel Level','Water Temperature'],
                                     ['RPM','RPM To Clutch'],
                                     ['Front Left Suspension Height','Front Right Suspension Height','Rear Left Suspension Height','Rear Right Suspension Height','Front Left RPS','Front Right RPS','Rear Left RPS','Rear Right RPS']],
          alertDefaultWarningsUpperLimits:[[ 106,  105,  105,  105 ],
                                           [ 0,  0,  0,  0,  0,  0 ],
                                           [ 3000, 3000 ],
                                           [ 100,  100,  100,  100,10,10,10,10]],
          alertDefaultWarningsLowerLimits:[[ 5,  0,  0,  0 ],
                                           [ 0,  0,  0,  0,  0,  0],
                                           [ 0, 0 ],
                                           [ 0,  0,  0,  0,  0,  0,  0 , 0 ]],
          alertDefaultWarningsUnits:[[ '°C',  '°C',  '°C',  '°C', ],
                                           [ '°C', 'RPM',  'Bar',  'Bar',  '%',  '°C' ],
                                           [ 'RPM', 'RPM' ],
                                           [ 'mm',  'mm',  'mm',  'mm',  'RPS',  'RPS',  'RPS' , 'RPS']],
          alertWarningInterval:5000,
          type: "AlertSettings"
      },
      defaults: {
          defaultUnitsMetric:true,
          defualtIPAddress:"0.0.0.0",
          type: "DefaultSettings"
      },
    
    };
    //put settings detials back to default
    await axios.post("/api/editusersettingsapi", { username,settingsname , settingsObject });

    const collectionNames:string[]=["setups",username];
    const databaseNames:string[]=["Data","UserSessions"];
    if(collectionNames.length==databaseNames.length){
      for(let i=0;i<collectionNames.length;i++){
        try {
          let collectionName = collectionNames[i];
          let databaseName = databaseNames[i];
          await axios.post("/api/deleteuserdataapi", {username, collectionName, databaseName });
          router.push("/login");
       }
       catch (error) {
         console.error("Error checking for user:", error);
       }
      }
    }
  }

  useEffect(() => {
    if (field !== 'Account') {
      relockAccountPage();
    }
  }, [field]);

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      {field == "Account" && (<>
      {pageLock ?<LockedButton targetSetting={"Password"} hasDivider={true} tooltipText={"Enter your password to view this page"} setLock={handleSetLock} username={userName}></LockedButton> : <Grid container spacing={2} alignItems="center">
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
            <SeriousActionButton targetSetting={"Delete Account"} hasDivider={true} tooltipText={""} username={userName} warningMessage={"Deleting you account will remove all personal data associated with your username. Your username will become available for others to use. This action cannot be undone. All data will be lost."} action={"ACCOUNT DELETION"} actionMethod={deleteAccount}/>
          </Grid>
          <Grid item xs={12}>
            <SeriousActionButton targetSetting={"Reset Account Data"} hasDivider={true} tooltipText={""} username={userName} warningMessage={"Resetting you account will maintain your user status, but will remove any setups,lap data, settings or other personal information, you will maintain access to the account"} action={"ACCOUNT DATA WIPE"} actionMethod={resetAccount}/>
          </Grid>
          <Grid item xs={12}>
          <SettingsTextDisplay
              currentValue={userName}
              targetSetting={"Change Username"}
              hasDivider={true}
              settingsProp={""}
              validateInputPromise={handleUserNameChange}
              tooltipText={
                "This can be anything as long as it is not already in use, changing your name makes your previous name available "
              }
              isNumber={false}
            />
          </Grid>
          <Grid item xs={12}>
          <SettingsTextDisplay
          
              targetSetting={"Change Password"}
              hasDivider={true}
              settingsProp={""}
              validatePassword={handlePasswordValidation}
              tooltipText={
                "This must be new, over 6 characters long and contain at least a upper,lower and numeric character"
              }
              isNumber={false}
              checkPasswordIsNew={checkPasswordIsNew}
            />
          </Grid>
          <Grid item xs={12}>
          <SettingsTextDisplay
          
              targetSetting={"Change Email"}
              hasDivider={true}
              settingsProp={""}
              verifyEmail={handleVerifyEmail}
              tooltipText={
                "This must be a valid email address, you will need to verify this using a link to apply the change."
              }
              isNumber={false}
              checkEmailIsNew={checkEmailIsNew}
            />
          </Grid>
        </Grid>}
        </>
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
              currentValue={userSettings.data.reviewLapLimit}
              targetSetting={"ALTER REVIEW LAP LIMIT"}
              hasDivider={false}
              handleUpdateSettings={handleUpdateSettings}
              currentSettingsData={userSettings.data}
              settingsProp={"reviewLapLimit"}
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
