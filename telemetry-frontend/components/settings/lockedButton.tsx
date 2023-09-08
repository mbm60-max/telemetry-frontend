import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    styled,
    Switch,
    TextField,
    Typography,
  } from "@mui/material";
  import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
  import { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from "../../interfaces/defaultSettingsInterface";
  import { ReactNode, SyntheticEvent, useState } from "react";
import { isNumber } from "@mui/x-data-grid/internals";
import axios, { AxiosResponse } from "axios";
  
  interface LockedButtonProps {
    targetSetting: string;
    hasDivider: boolean;
    tooltipText:string;
    setLock:(setValue: boolean) => void;
    username:string;
  }
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
      borderWidth: "1px", // Adjust the thickness of the line here
      borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    width:'99%',
    }));
  
  const LockedButton= ({
    targetSetting,
    hasDivider,
    tooltipText,
    setLock,
    username,
  }: LockedButtonProps) => {

    const [inputValue,setInputValue]=useState("");
    const [errorValue,setErrorValue]=useState("");
    const checkPassword= async (username:string,password:string)=>{
        try {
            const checkOriginalDataResponse: AxiosResponse = await axios.get('/api/checkpasswordapi', {
              params: { username},
            });
            
            console.log('Response:', checkOriginalDataResponse);
            if(checkOriginalDataResponse.data.password==password){
                setErrorValue("");
              return true;
            }else{
                setErrorValue("Incorrect password")
              return false;
            }
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }
    const handleUnlock= async ()=>{
        if(await checkPassword(username,inputValue)){
            setLock(false);
        }else{
            setLock(true);
        }
    }

    const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      setInputValue(event.target.value);
    }
    const tooltipInfo = (
        <>
          <em>
              {tooltipText}
          </em>
        </>
      );
    return (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 20 }} fontWeight="Bold">
              Account settings are pasword locked, switching to another settings tab will relock this page, please enter your password to view this page.
            </Typography>
          </Grid>
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
            <Button variant="contained" sx={{ml:5}} onClick={handleUnlock}>Submit</Button>
          </Grid>
          {hasDivider && <Grid item xs={12}>
           <StyledHorizontalDivider/>
           </Grid>}
         
        </Grid>
      </Box>
    );
  };
  
  export default LockedButton;