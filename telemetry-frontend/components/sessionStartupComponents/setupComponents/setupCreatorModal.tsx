import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TrackSelection from "./trackSelection";
import ImageBox from "../../homepageTrack";
import { useContext, useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../../authProvider";
import InputSlider from "./setupSlider";
import ArraySlider from "./setupSliderArray";
import ArraySliderText from "./textFieldArray";
import { Chip, Divider, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import ClearIcon from '@mui/icons-material/Clear';
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 850,
  height: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  overflowY: "auto",
};

interface SetupCreatorModalProps {
  onSetupAddition: () => void;
}

export default function SetupCreatorModal({onSetupAddition}:SetupCreatorModalProps
) {
  const handleChange = (event: SelectChangeEvent) => {
    setTransmissionType(event.target.value);
  };
  const handleDifferentialGearChange = (event: SelectChangeEvent) => {
    setDifferentialGear(event.target.value);
  };
  const { isLoggedIn, userName } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [powerLevel, setPowerLevel] = useState("");
  const [weightReductionLevel, setWeightReductionLevel] = useState("");
  const [powerRatio, setPowerRatio] = useState("");
  const [weightReductionRatio, setWeightReductionRatio] = useState("");
  const [tractionControl, setTractionControl] = useState("");
  const [brakeBalance, setBrakeBalance] = useState("");
  const [rideHeight, setRideHeight] = useState(["", ""]);
  const [naturalFrequency, setNaturalFrequency] = useState(["", ""]);
  const [antiRollBar, setAntiRollBar] = useState(["", ""]);
  const [dampingRatioCompression, setDampingRatioCompression] = useState([
    "",
    "",
  ]);
  const [dampingRatioRebound, setDampingRatioRebound] = useState(["", ""]);
  const [camberAngle, setCamberAngle] = useState(["", ""]);
  const [toeAngle, setToeAngle] = useState(["", ""]);
  const [downforce, setDownforce] = useState(["", ""]);
  const [differentialGear, setDifferentialGear] = useState("");
  const [lsdIntiailTorque, setLsdIntiailTorque] = useState(["", ""]);
  const [lsdAccelerationSensitivity, setLsdAccelerationSensitivity] = useState([
    "",
    "",
  ]);
  const [lsdBrakingSensitivity, setLsdBrakingSensitivity] = useState(["", ""]);
  const [frontRearTorqueDistribution, setFrontRearTorqueDistribution] =
    useState("");
  const [transmissionType, setTransmissionType] = useState("");
  const [maxSpeedAutoSet, setMaxSpeedAutoSet] = useState("");
  const [gearratios, setGearRatios] = useState(["", ""]);
  const [finalGearRatio, setFinalGearRatio] = useState("");
  const [nameError, setNameError] = useState("");
  const username = userName;

  const handleSetupSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const nameResponse: AxiosResponse = await axios.get('/api/checksetupapi', {
      params: { name },
    });
    const setupObject = {
      "Power Level": {
        Value: powerLevel,
        Units: "",
      },
      "Weight Reduction Level": {
        Value: weightReductionLevel,
        Units: "",
      },
      "Power Ratio": {
        Value: powerRatio,
        Units: "%",
      },
      "Weight Reduction Ratio": {
        Value: weightReductionRatio,
        Units: "%",
      },
      "Traction Control": {
        Value: tractionControl,
        Units: "",
      },
      "Brake Balance": {
        Value: brakeBalance,
        Units: "",
      },
      "Ride Height": {
        Value: rideHeight,
        Units: "mm",
      },
      "Natural Frequency": {
        Value: naturalFrequency,
        Units: "Hz",
      },
      "Anti Roll Bar": {
        Value: antiRollBar,
        Units: "",
      },
      "Damping Ratio Compression": {
        Value: dampingRatioCompression,
        Units: "%",
      },
      "Damping Ratio Rebound": {
        Value: dampingRatioRebound,
        Units: "",
      },
      "Camber Angle": {
        Value: camberAngle,
        Units: "degrees",
      },
      "Toe Angle": {
        Value: toeAngle,
        Units: "degrees",
      },
      Downforce: {
        Value: downforce,
        Units: "Nm",
      },
      "Differntial Gear": {
        Value: differentialGear,
        Units: "",
      },
      "LSD Initial Torque": {
        Value: lsdIntiailTorque,
        Units: "?",
      },
      "LSD Acceleration Sensitivity": {
        Value: lsdAccelerationSensitivity,
        Units: "?",
      },
      "LSD Braking Sensitivity": {
        Value: lsdBrakingSensitivity,
        Units: "?",
      },
      "Front Rear Torque Distribution": {
        Value: frontRearTorqueDistribution,
        Units: "?",
      },
      "Transmission Type": {
        Value: transmissionType,
        Units: "",
      },
      "Max Speed (Auto Set)": {
        Value: maxSpeedAutoSet,
        Units: "mph",
      },
      "Gear Ratios": {
        Value: gearratios,
        Units: "ratio/max speed",
      },
      "Final Gear Ratio": {
        Value: finalGearRatio,
        Units: "",
      },};
    setNameError("");
    if(name != ''){
      try{
        if (nameResponse.data.message === 'Success') {
          setNameError("This name is already taken") // currently checking all files should only be user specific
          return
        }
        if(userName != ''){
          await axios.post("/api/createsetupapi", { username, name, setupObject });
          setName('');
          onSetupAddition();
          handleClose();

        }
      }catch{
      }

    }
  };
  const handleInputChange =
    (setValue: (value: string) => void) => (value: string) => {
      setValue(value);
    };
  const handleInputChangeArray =
    (setValue: (value: string[]) => void) => (value: string[]) => {
      let newValues = value;
      setValue(newValues);
    };
  const handleInputText =
    (setValue: (value: string) => void) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { value } = event.target;
      setValue(value);
    };
  return (
    <>
      <Button onClick={handleOpen}>Add Setup</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            onChange={(value) => handleInputText(setName)(value)}
            error={Boolean(nameError)}
                      helperText={nameError}
          />
          
          <Button   onClick={handleSetupSubmit}
                    type="submit"
                    variant="contained"
                    sx={{ mr: 2, width: "167px" }}
                  >Submit</Button>
                  <Button onClick={handleClose}>Clear<ClearIcon/></Button>
                  <Divider sx={{}}>
        <Chip label="General" />
      </Divider>
         <Grid container spacing={0} direction="row">
        <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setPowerLevel)(value)
                }
                width={'85%'}
                targetAttribute={"Power Level"}
                minValue={1}
                maxValue={5}
                step={1}
              /></Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setWeightReductionLevel)(value)
                }
                width={'85%'}
                targetAttribute={"Weight Reduction Level"}
                minValue={1}
                maxValue={5}
                step={1}
              /></Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setPowerRatio)(value)
                }
                width={'85%'}
                targetAttribute={"Power Ratio"}
                minValue={0}
                maxValue={200}
                step={1}
              />
              </Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setWeightReductionRatio)(value)
                }
                width={'85%'}
                targetAttribute={"Weight Reduction Ratio"}
                minValue={0}
                maxValue={200}
                step={1}
              /></Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setTractionControl)(value)
                }
                width={'85%'}
                targetAttribute={"Traction Control"}
                minValue={1}
                maxValue={5}
                step={1}
              /></Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setBrakeBalance)(value)
                }
                width={'85%'}
                targetAttribute={"Brake Balance"}
                minValue={"-5"}
                maxValue={5}
                step={1}
              /></Grid></Grid>
                          <Divider>
        <Chip label="Transmission" />
      </Divider>
      <Grid container spacing={0} direction="row">
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setMaxSpeedAutoSet)(value)
                }
                width={'85%'}
                targetAttribute={"Max Speed (Auto Set)"}
                minValue={0}
                maxValue={500}
                step={1}
              /></Grid>
              <Grid item xs={6}>
              <InputSlider
                onValueChange={(value) =>
                  handleInputChange(setFinalGearRatio)(value)
                }
                width={'85%'}
                targetAttribute={"Final Gear "}
                minValue={1}
                maxValue={5}
                step={0.001}///might need changing
              /></Grid>
              <Grid item xs={6}>
              <Box sx={{ width: '85%',backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
              <Typography id="input-slider" gutterBottom>
             Transmission Type
          </Typography>  
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selected Value</InputLabel>
        <Select
          labelId="simple-select-label"
          id="Transmission-Type-Select"
          value={transmissionType}
          label="Selected Value"
          onChange={handleChange}
        >
          <MenuItem value={'Default'}>Default</MenuItem>
          <MenuItem value={'Fully Customised'}>Fully Customised</MenuItem>
        </Select>
      </FormControl>
    </Box></Grid>
              <Grid item xs={6}>
              <ArraySliderText
                width={'85%'}
                targetAttribute={"Number of Gears"}
                onValueChange={setGearRatios}
                
              /></Grid>
            </Grid>
            <Divider>
        <Chip label="Suspension and Aerodynamics" />
      </Divider>
            <Grid item xs={12}>
              <Grid container spacing={0} direction="row">
              <Grid item xs={6}>
              <Typography id="input-slider" gutterBottom>
                Front 
              </Typography>
              </Grid>
              <Grid item xs={6}>
              <Typography id="input-slider" gutterBottom>
                Rear
              </Typography>
              </Grid>
              </Grid>
              <ArraySlider
                width={"85%"}
                targetAttribute={"Ride Height"}
                onValueChange={(value) =>
                  handleInputChangeArray(setRideHeight)(value)
                }
                minValue={'0'}
                maxValue={'300'}
                step={1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Natural Frequency"}
                onValueChange={(value) =>
                  handleInputChangeArray(setNaturalFrequency)(value)
                }
                minValue={'1'}
                maxValue={'5'}
                step={0.1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Anti Roll Bar"}
                onValueChange={(value) =>
                  handleInputChangeArray(setAntiRollBar)(value)
                }
                minValue={'1'}
                maxValue={'10'}
                step={1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Damping Ratio Compression"}
                onValueChange={(value) =>
                  handleInputChangeArray(setDampingRatioCompression)(value)
                }
                minValue={'0'}
                maxValue={'85'}
                step={1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Damping Ratio Rebound"}
                onValueChange={(value) =>
                  handleInputChangeArray(setDampingRatioRebound)(value)
                }
                minValue={'0'}
                maxValue={'85'}
                step={1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Camber Angle"}
                onValueChange={(value) =>
                  handleInputChangeArray(setCamberAngle)(value)
                }
                minValue={'-10'}
                maxValue={'10'}
                step={1}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Toe Angle"}
                onValueChange={(value) =>
                  handleInputChangeArray(setToeAngle)(value)
                }
                minValue={'-1'}
                maxValue={'1'}
                step={0.01}
              />
              <ArraySlider
                width={'85%'}
                targetAttribute={"Downforce"}
                onValueChange={(value) =>
                  handleInputChangeArray(setDownforce)(value)
                }
                minValue={'0'}
                maxValue={'5000'}
                step={10}//adjust this
              />
            </Grid>
            <Divider>
        <Chip label="Differential" />
      </Divider>
          <ArraySlider
            width={'85%'}
            targetAttribute={"LSD Initial Torque"}
            onValueChange={(value) =>
              handleInputChangeArray(setLsdIntiailTorque)(value)
            }
            minValue={'0'}
            maxValue={'85'}
            step={1}
          />
          <ArraySlider
            width={'85%'}
            targetAttribute={"LSD Acceleration Sensitivity"}
            onValueChange={(value) =>
              handleInputChangeArray(setLsdAccelerationSensitivity)(value)
            }
            minValue={'0'}
            maxValue={'85'}
            step={1}
          />
          <ArraySlider
            width={'85%'}
            targetAttribute={"LSD Braking Sensitivity"}
            onValueChange={(value) =>
              handleInputChangeArray(setLsdBrakingSensitivity)(value)
            }
            minValue={'0'}
            maxValue={'85'}
            step={1}
          />
          <Grid container spacing={0} direction="row">
        <Grid item xs={6}>
          <InputSlider
            width={'85%'}
            targetAttribute={"Front Rear Torque Distribution"}
            onValueChange={(value) =>
              handleInputChange(setFrontRearTorqueDistribution)(value)
            }
            minValue={1}//need to make a new component for this
            maxValue={3}
            step={1}
          />
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ width: '85%',backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom>
          Differential Gear
          </Typography>  
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Selected Value</InputLabel>
        <Select
          labelId="simple-select-label"
          id="Differential-Gear-Select"
          value={differentialGear}
          label="Selected Value"
          onChange={handleDifferentialGearChange}
        >
          <MenuItem value={'Default'}>Default</MenuItem>
          <MenuItem value={'Fully Customised'}>Fully Customised</MenuItem>
        </Select>
      </FormControl>
          </Box>
          </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
