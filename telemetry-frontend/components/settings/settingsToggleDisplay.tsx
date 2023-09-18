import {
    Box,
    Button,
    Divider,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    styled,
    Switch,
    TextField,
    Typography,
  } from "@mui/material";
  import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
  import { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from "../../interfaces/defaultSettingsInterface";
  import { ReactNode, SyntheticEvent, useState } from "react";
  import '../sessionStartupComponents/setupComponents/setupStyles.css'
  
  interface SettingsToggleDisplayProps {
    currentValue: boolean;
    targetSetting: string;
    hasDivider: boolean;
    settingsProp:string;
    currentSettingsData:AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings;
    handleUpdateSettings:(updatedValue: AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings) => void;
    tooltipText:string;
    toggleLeft:string;
    toggleRight:string;
  }
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
      borderWidth: "1px", // Adjust the thickness of the line here
      borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    width:'99%',
    }));
  
  const SettingsToggleDisplay = ({
    currentValue,
    targetSetting,
    hasDivider,
    currentSettingsData,
    settingsProp,
    handleUpdateSettings,
    tooltipText,
    toggleLeft,
    toggleRight,
  }: SettingsToggleDisplayProps) => {
      const [inputValue,setInputValue]=useState(false);

    const handleUpdate=()=>{
          const updatedValue = {
              ...currentSettingsData,
              [settingsProp]: inputValue,
            };
            console.log(updatedValue)
          handleUpdateSettings(updatedValue);
    }

    const handleChange=(event: React.ChangeEvent<HTMLInputElement>)=>{
      setInputValue(event.target.checked);
      handleUpdate();
    }
    const tooltipInfo = (
        <>
          <em>
              {tooltipText}
          </em>
        </>
      );
    return (
      <Box  sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}>
            <Typography fontFamily={'Satoshi'} sx={{ fontSize: 30,color:'white' }} fontWeight="Bold">
              {targetSetting}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <Typography fontFamily={'Satoshi'} sx={{ fontSize: 18,color:'white' }}>Current Value:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography fontFamily={'Satoshi'}  sx={{ fontSize: 22,color:'white' }}>{currentValue?(toggleLeft):toggleRight}</Typography>
        </Grid>
          <Grid item xs={6}>
            <Box className={"slider"}
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
              <Typography fontFamily={'Satoshi'} sx={{color:'white'}}id="input-slider" gutterBottom>
                {targetSetting}
              </Typography>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs>
                  <FormControl fullWidth>
                  <FormControlLabel
        control={<Switch checked={inputValue} onChange={handleChange} />}
        label={inputValue ?  toggleRight : toggleLeft}
      />
                  </FormControl>
                </Grid>
                <InfoToolTip
                  name={targetSetting}
                  info={tooltipInfo} iconColor={""}              />
              </Grid>
            </Box>
          </Grid>
          {hasDivider && <Grid item xs={12}>
           <StyledHorizontalDivider/>
           </Grid>}
         
        </Grid>
      </Box>
    );
  };
  
  export default SettingsToggleDisplay;