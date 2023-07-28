import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from "../../interfaces/defaultSettingsInterface";
import { ReactNode, useState } from "react";

interface SettingsTextDisplayProps {
  currentValue: string | number;
  targetSetting: string;
  hasDivider: boolean;
  settingsProp:string;
  currentSettingsData:AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings;
  handleUpdateSettings:(updatedValue: AlertSettings | AppearanceSettings | DataSettings | DefaultsSettings) => void
}

const SettingsTextDisplay = ({
  currentValue,
  targetSetting,
  hasDivider,
  currentSettingsData,
  settingsProp,
  handleUpdateSettings,
}: SettingsTextDisplayProps) => {
    const [inputValue,setInputValue]=useState<string|number>();
  const tooltipInfoTransmission = (
    <>
      <em>
        {
          "Select the transmission. The types of transmission that can be selected will depend on the car. The selected transmission will affect the speed of gear changes and will determine whether or not a steering wheel controller's clutch pedal can be used. Selecting a 'Fully Customised' option allows individual gear ratios to be adjusted."
        }
      </em>
    </>
  );
  const handleUpdate=()=>{
    const updatedValue = {
        ...currentSettingsData,
        [settingsProp]: inputValue,
      };
    handleUpdateSettings(updatedValue);
  }
  
  const handleChange=(event: React.ChangeEvent<{ value: string|number }>)=>{
    setInputValue(event.target.value)
  }

  return (
    <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 30 }} fontWeight="Bold">
            {targetSetting}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 18 }}>Current Value:</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography sx={{ fontSize: 22 }}>{currentValue}</Typography>
        </Grid>
        <Grid item xs={6}>
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
                  >
                  </TextField>
                </FormControl>
              </Grid>
              <InfoToolTip
                name={"Transmission Type"}
                info={tooltipInfoTransmission}
              />
            </Grid>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Button variant="contained" sx={{ml:5}} onClick={handleUpdate}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsTextDisplay;
