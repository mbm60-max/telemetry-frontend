import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SvgIconTypeMap,
  TextField,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import InfoToolTip from "../helperTooltip.tsx/infoTooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

interface SettingsTextDisplayProps {
  currentValue: string | number | boolean;
  targetSetting: string;
  hasDivider: boolean;
}

const SettingsTextDisplay = ({
  currentValue,
  targetSetting,
  hasDivider,
}: SettingsTextDisplayProps) => {
  const tooltipInfoTransmission = (
    <>
      <em>
        {
          "Select the transmission. The types of transmission that can be selected will depend on the car. The selected transmission will affect the speed of gear changes and will determine whether or not a steering wheel controller's clutch pedal can be used. Selecting a 'Fully Customised' option allows individual gear ratios to be adjusted."
        }
      </em>
    </>
  );

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
                  <InputLabel id="demo-simple-select-label">
                    New Value
                  </InputLabel>
                  <Select
                    labelId="simple-select-label"
                    id="Transmission-Type-Select"
                    value={0}
                    label="New Value"
                    //onChange={handleChange}
                  >
                    <MenuItem value={"Default"}>Default</MenuItem>
                    <MenuItem value={"Fully Customised"}>
                      Fully Customised
                    </MenuItem>
                  </Select>
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
          <Button variant="contained" sx={{ml:5}}>Submit</Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SettingsTextDisplay;
