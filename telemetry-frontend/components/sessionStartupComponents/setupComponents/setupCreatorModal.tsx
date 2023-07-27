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
import InfoToolTip from "../../helperTooltip.tsx/infoTooltip";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: '75%',
  height:'75%',
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
  const [setupname, setSetupName] = React.useState("");
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
      params: { username,setupname },
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
    if(setupname != ''){
      try{
        if (nameResponse.data.message === 'Success') {
          setNameError("This name is already taken") // currently checking all files should only be user specific
          return
        }
        if(userName != ''){
          console.log(nameResponse.data.message)
          await axios.post("/api/createsetupapi", { username, setupname, setupObject });
          setSetupName('');
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
    const tooltipInfo = (
      <>
        <em>{'Setups contain various segments.'}</em> <b>{'Each can be customised, but if left untouched no value will be taken, despite the value appearing on the slider/selection.'}</b> <u>{'If you do alter any values they will be stored for later use.'}</u>{"You will be able to acces any setup for any car once it is created"}
      </>
    );
    const tooltipInfoDifGear = (
      <>
       <em>{"Select the differential gear. If you select Fully Customised Mechanical LSD, you can adjust the following three LSD (limited slip differential) options."}</em>
      </>
    );
    const tooltipInfoTransmission = (
      <>
       <em>{"Select the transmission. The types of transmission that can be selected will depend on the car. The selected transmission will affect the speed of gear changes and will determine whether or not a steering wheel controller's clutch pedal can be used. Selecting a 'Fully Customised' option allows individual gear ratios to be adjusted."}</em>
      </>
    );
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
            onChange={(value) => handleInputText(setSetupName)(value)}
            error={Boolean(nameError)}
                      helperText={nameError}
          />
          
          <Button   onClick={handleSetupSubmit}
                    type="submit"
                    variant="contained"
                    sx={{ mr: 2, width: "167px" }}
                  >Submit</Button>
                  <Button onClick={handleClose}>Clear<ClearIcon/></Button>
                  <InfoToolTip name={"Setup"} info={tooltipInfo}/>
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
                toolTipContent={"Level to which cars power adjusment has been upgraded to"}
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
                toolTipContent={"Level to which cars weight adjusment has been upgraded to"}
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
                toolTipContent={"% of current car power compared to stock power, this range will depend on the car and power level settings"}
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
                toolTipContent={"% of current car weight compared to stock power, this range will depend on the car and weight level settings"}
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
                toolTipContent={"Traction Control level, some cars may not allow adjustment"}
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
                toolTipContent={"Adjust the balance of the front and rear brakes in real time. Increasing effectiveness for the front wheels makes it easier to oversteer during braking while cornering, while increasing effectiveness for the rear wheels makes it easier to understeer."}
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
                toolTipContent={"Automatically set your transmission's gear ratios to produce the highest maximum speed. Setting the maximum speed too high will slow down acceleration, leading to an overall loss of speed."}
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
                toolTipContent={"Adjust the final gear ratio. In general, increasing the value results in quicker acceleration, while reducing the value helps improve maximum speed."}
              /></Grid>
              <Grid item xs={6}>
              <Box sx={{ width: '85%',backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
              <Typography id="input-slider" gutterBottom>
             Transmission Type
          </Typography>  
          <Grid container spacing={2} alignItems="center">
        <Grid item xs>
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
      </FormControl></Grid><InfoToolTip name={"Transmission Type"} info={tooltipInfoTransmission}/></Grid>
    </Box></Grid>
              <Grid item xs={6}>
              <ArraySliderText
                width={'85%'}
                targetAttribute={"Number of Gears"}
                onValueChange={setGearRatios} 
                toolTipContent={"Number of gears, only available in non-electric drivetrains"}              
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
                toolTipContent={"Tweak the suspension to adjust the distance between the car and the ground. In general, it is better for the car to be lower, and closer to the ground. However, if the car's ride height is too low, it increases the risk of the kerb or other objects damaging the car's body. The car's front and rear ride heights can be adjusted independently, allowing you to alter the weight distribution between the front and rear wheels."}    
              />
              <ArraySlider
              width={'85%'}
              targetAttribute={"Natural Frequency"}
              onValueChange={(value) => handleInputChangeArray(setNaturalFrequency)(value)}
              minValue={'1'}
              maxValue={'5'}
              step={0.1} 
              toolTipContent={"The effective spring rate value changes depending on the suspension type and lever ratio. The natural frequency is a representation of how the ride feels as a result of this. The higher the value, the stiffer the feeling of the ride. The lower the value, the more gentle the ride feels. Matching the natural frequency of the front and back wheels makes for a smoother ride."}              
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
                toolTipContent={"Adjust the stiffness of the anti-roll bar, which connects the left and right sides of the car. The higher the value, the stiffer the bar, meaning that horizontal rolling (e.g. from centrifugal force) is restricted. Making the front anti-roll bar stiffer will make it easier to understeer, while making the rear anti-roll bar stiffer will make it easier to oversteer."}    
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
                toolTipContent={"The damping ratio is the proportion of damping force when no-oscillation is set at 100%. You can set the compression-side ratio here. Higher values correspond to greater damping force, making the springs compress more slowly. Conversely, lower values will cause the springs to compress more quickly."}    
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
                toolTipContent={"The damping ratio is the proportion of damping force when no-oscillation is set at 100%. You can set the rebound-side ratio here. Higher values correspond to greater damping force, making the springs rebound more slowly. Conversely, lower values will cause the springs to rebound more quickly."}    
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
                toolTipContent={"Adjust the angle of the car's tyres relative to the ground. At the lowest value (0), the wheels are perpendicular to the ground. The higher the value, the greater the extent to which the bottom of the wheels are wider apart than the top. With a negative camber angle, the tyres will have more grip while cornering. An excessively negative angle will impede your driving, however."}    
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
                toolTipContent={"Adjust the angle of the car's front tyres as looked at from above. Move the slider to the right to cause a toe-in angle, where the wheels point in towards the centreline of the car. Move the slider to the left to provide a toe-out angle, where the wheels point out away from the centreline of the car. A toe-in angle provides more stability when driving in a straight line, though it also increases the risk of understeering. A toe-out angle has the opposite effect."}    
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
                toolTipContent={"Adjust the force with which the air currents produced by the speed of the car are used to push the car down towards the track. Increasing this value allows for more downforce, but will reduce the car's maximum speed."}    
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
            toolTipContent={"Adjust the initial torque level of the LSD, before the car starts running. Increasing this value will increase the torque and will make the LSD more responsive, though it may also hinder the car's ability to turn."}    
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
            toolTipContent={"Adjust the effectiveness of the LSD when accelerating. Increasing this value will make the LSD more effective, but can make the car unstable when the accelerator is released."}    
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
            toolTipContent={"Adjust the effectiveness of the LSD when decelerating or not accelerating. Increasing this value will make the LSD more effective, but will increase the risk of understeering."}    
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
            toolTipContent={"Ratio with which torque is distributed between the front and rear of the car."}    
          />
          </Grid>
          <Grid item xs={6}>
          <Box sx={{ width: '85%',backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
          <Typography id="input-slider" gutterBottom>
          Differential Gear
          </Typography>  
          <Grid container spacing={2} alignItems="center">
        <Grid item xs>
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
      </FormControl></Grid><InfoToolTip name={"Differential Gear"} info={tooltipInfoDifGear}/></Grid>
          </Box>
          </Grid>
          </Grid>
        </Box>
      </Modal>
    </>
  );
}
