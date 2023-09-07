import {
  Box,
  Button,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
  Typography,
} from "@mui/material";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from "../../interfaces/defaultSettingsInterface";
import { ReactNode, useContext, useState } from "react";
import { roundTo3DP } from "../../utils/roudning";
import { AuthContext } from "../authProvider";
import validatePassword from "../../utils/validatePassword";
import axios, { AxiosResponse } from "axios";

interface SettingsTextDisplayProps {
  currentValue?: string | number;
  targetSetting: string;
  hasDivider: boolean;
  settingsProp:string;
  validateInput?:(value:string|number)=>{isValid:boolean,errorMessage:string};
  currentSettingsData?:AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings;
  handleUpdateSettings?:(updatedValue: AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings) => void
  tooltipText:string;
  isNumber:boolean;
  minValue?:number;
  maxValue?:number;
  modifier?:number;
  validateInputPromise?: (username: string) => Promise<{ isValid: boolean; errorMessage: string;}| undefined>
  validatePassword?:(newPassword: string) => { isValid: boolean; errorMessage: string;}
  checkPasswordIsNew?:(password: string) => Promise<{ isValid: boolean; errorMessage: string;}| undefined>
}
const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
  width:'99%',
  }));

const SettingsTextDisplay = ({
  currentValue,
  targetSetting,
  hasDivider,
  currentSettingsData,
  settingsProp,
  handleUpdateSettings,
  validateInput,
  tooltipText,
  isNumber,
  minValue,
  maxValue,
  modifier,
  validateInputPromise,
  validatePassword,
  checkPasswordIsNew
}: SettingsTextDisplayProps) => {
    const [inputValue,setInputValue]=useState<string|number>();
    const [errorValue,setErrorValue]=useState("");
    const [canSubmit,setCanSubmit]=useState(false);
  const tooltipInfo = (
    <>
      <em>
          {tooltipText}
      </em>
    </>
  );

  const { userName } = useContext(AuthContext);
  const handlePasswordUpdate = async (newPassword:string,userName:string)=>{
    try {
      await axios.post("/api/changepasswordapi", {newPassword,userName });
   }
   catch (error) {
     console.error("Error checking for user:", error);
   }
  }

  
  const handleUpdate=async ()=>{
    if(handleUpdateSettings&&currentSettingsData){
      if(modifier && typeof inputValue !== "undefined" ){
        const numericInputValue = typeof inputValue === "string" ? parseFloat(inputValue) : inputValue;
        const updatedValue = {
          ...currentSettingsData,
          [settingsProp]: (roundTo3DP(numericInputValue)*modifier),
        };
      handleUpdateSettings(updatedValue);
      }
      else{
        const updatedValue = {
          ...currentSettingsData,
          [settingsProp]: inputValue,
        };
      handleUpdateSettings(updatedValue);
      }
    }else if(validateInputPromise){
      if(typeof inputValue === "string"){
        handleUserNameChange(inputValue);
      }
    }else if(validatePassword && checkPasswordIsNew){
      if(typeof inputValue === "string"){
        const passwordCanSubmit = await checkPasswordIsNew(inputValue);
        if(passwordCanSubmit?.isValid==true){
          handlePasswordUpdate(inputValue,userName);
          return true;
        }setErrorValue("New password cannot be the same as old password")
        return false;
      }
    }
  }

  const handleValidation=(value:string|number)=>{
    if(validateInput){
      const {isValid,errorMessage} = validateInput(value);
      if(!isValid){
          setErrorValue(errorMessage);
          setCanSubmit(false);
          return
      }
          setErrorValue("");
          setCanSubmit(true);
          return
    }
    else{
      console.log("no method provided")
      return;
    }
    }


    const changeUsername = async ( newUsername:string,oldUsername:string) =>{
      const collectionNames:string[]=["Settings","setups","Users",oldUsername];
      const databaseNames:string[]=["Data","Data","Test","UserSessions"];
      console.log(oldUsername);
      if(collectionNames.length==databaseNames.length){
        for(let i=0;i<collectionNames.length;i++){
          try {
            let collectionName = collectionNames[i];
            let databaseName = databaseNames[i];
            await axios.post("/api/changeusernameapi", {newUsername, oldUsername, collectionName, databaseName });
         }
         catch (error) {
           console.error("Error checking for user:", error);
         }
        }
      }
    }

    const handleUserNameChange = async ( username:string) => {
      if (validateInputPromise){
        try {
          const result = await validateInputPromise(username);

          if (result) {
            const { isValid, errorMessage } = result;
            if(isValid){
              console.log("tyring to change")
              changeUsername(username,userName);
            }else{
            // Now you can safely use isValid and errorMessage
            setErrorValue(errorMessage);
            }
            
          } else {
            // Handle the case where result is undefined
            console.error('Validation result is undefined');
          }
        } catch (error) {
          console.error(error);
        }
    }  
    }

  const handleChange=(event: React.ChangeEvent<{ value: string|number }>)=>{
    if(validateInput){
      handleValidation(event.target.value);
      setInputValue(event.target.value)
    }else if (validateInputPromise && typeof event.target.value === "string"){
      setInputValue(event.target.value)
      setCanSubmit(true);
    }else if(validatePassword && typeof event.target.value === "string"){
      const passwordIsValid = validatePassword(event.target.value);
      if(passwordIsValid.isValid==true){
        setErrorValue("");
        setInputValue(event.target.value);
        setCanSubmit(true);
      }else{
        setErrorValue(passwordIsValid.errorMessage);
        setInputValue(event.target.value);
        setCanSubmit(false);
      }
    }
  }

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 30 }} fontWeight="Bold">
            {targetSetting}
          </Typography>
        </Grid>
        {currentValue ? <>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 18 }}>Current Value:</Typography>
        </Grid>
        <Grid item xs={12}>
         <Typography sx={{ fontSize: 22 }}>{currentValue}</Typography>
        </Grid> </> : null}
        <Grid item xs={10} sm={6}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "F6F6F6",
              margin: 1,
              padding: 2,
              borderRadius: 1,
              border: "1px solid grey",
              boxShadow: 1,
            }}
          >
            <Typography id="input-slider" gutterBottom>
              {targetSetting}
            </Typography>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs>
                <FormControl fullWidth>
                  <TextField
                    id="Transmission-Type-Select"
                    value={inputValue}
                    label="New Value"
                    onChange={handleChange}
                    error={Boolean(errorValue)}
                    helperText={errorValue}
                    type={isNumber ? 'number' : 'text'} 
                    inputProps={{
                      min: minValue, 
                      max: maxValue,
                    }}
                  >
                  </TextField>
                </FormControl>
              </Grid>
              <InfoToolTip
                name={targetSetting}
                info={tooltipInfo} iconColor={""}              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" sx={{ml:5}} onClick={handleUpdate} disabled={!canSubmit}>Submit</Button>
        </Grid>
        {hasDivider && <Grid item xs={12}>
         <StyledHorizontalDivider/>
         </Grid>}
       
      </Grid>
    </Box>
  );
};

export default SettingsTextDisplay;
