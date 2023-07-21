import React, { useContext, useState } from "react";
import {
  TextField,
  Button,
  Divider,
  Grid,
  styled,
  Paper,
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Chip,
} from "@mui/material";
import { useRouter } from "next/router";
import Link from "next/link";
import IconBox from "../components/iconBox";
import BadgeIcon from "@mui/icons-material/Badge";
import QuickFilteringGrid from "../components/sessionStartupComponents/setupComponents/carSelectionTable/carSelectionTable";
import CompoundSelect from "../components/sessionStartupComponents/setupComponents/compoundSelector";
import TrackSelection from "../components/sessionStartupComponents/setupComponents/trackSelection";
import TrackSelectionModal from "../components/sessionStartupComponents/setupComponents/trackSelectionModal";
import ImageBox from "../components/homepageTrack";
import SetupTable from "../components/sessionStartupComponents/setupComponents/setupCreator";
import BasicCard from "../components/card";
import Homepage from "../components/background/background";
import "../calltoaction.css";
import InfoToolTip from "../components/helperTooltip.tsx/infoTooltip";
const SessionStartup: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "90%",
    width: "95%",
  }));
  const ItemCentered = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "90%",
    width: "95%",
  }));
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("noTrack");
  const [selectedCompound, setSelectedCompound] = React.useState("");
  const [selectedSetup, setSelectedSetup] = useState("");
  const [carError, setCarError] = useState("");
  const [trackError, setTrackError] = useState("");
   const [compoundError, setCompoundError] = useState("");
  const router = useRouter();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      selectedCar.trim() !== "" &&
      selectedCompound.trim() !== "" &&
      selectedTrack != "noTrack"
    ) {
      const queryParams = `car=${selectedCar}&compound=${selectedCompound}&track=${selectedTrack}`;
      router.push(`/session?${queryParams}`);
    }setCarError("You must select a car to contiue")
    setCompoundError("You must select a compound to contiue")
    setTrackError("You must select a track to contiue")
    if(selectedCar.trim() !== ""){
      console.log("hi")
      setCarError("")
    }
   if(selectedCompound.trim() !== ""){
      console.log("me")
      setCompoundError("")
    }
    if(selectedTrack !== "noTrack"){
      setTrackError("")
    }
  };

  const handleCarSelection = (car: string) => {
    setSelectedCar(car);
  };
  const handleCompoundSelection = (event: SelectChangeEvent) => {
    setSelectedCompound(event.target.value);
  };
  const handleTrackSelection = (track: string) => {
    setSelectedTrack(track);
  };
  const handlesetupSelection = (setup: string) => {
    setSelectedSetup(setup);
  };
  function handleExit() {
    router.push("/");
  }

  const tooltipInfo = (
    <>
      <em>{'A session requires a track,car and tyre compound in order to be started.'}</em> <b>{'You can optionally also add a setup.'}</b> <u>{'This information is then used during and after the session.'}</u>{"hmm"}
    </>
  );
  return (
    <>
      <Box className="header">
        <Button onClick={handleExit}>Exit Session Startup</Button>
      </Box>
      <Homepage style={"homepage"}>
        <div
          style={{
            alignItems: "center",
            justifyContent: "center",
            display: "grid",
            placeItems: "center",
          }}
        >
          <Box
            sx={{
              width: "90%",
              backgroundColor: "F6F6F6",
              margin: 4,
              padding: 2,
              borderRadius: 1,
              border: "1px solid grey",
              boxShadow: 1,
              height: "90%",
            }}
          >
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={6} sx={{ height: "100%" }}>
                  <Item>
                    <QuickFilteringGrid onSelectCar={handleCarSelection} />
                  </Item>
                </Grid>
                <Grid item xs={6} sx={{ height: "100%" }}>
                  <Item>
                    <SetupTable onSelectSetup={handlesetupSelection} />
                  </Item>
                </Grid>
                <Grid item xs={6} sx={{ height: "100%" }}>
                  <ItemCentered>
                    <Grid container spacing={2} sx={{ height: "100%" }}>
                      <Grid item xs={6}>
                        <Box sx={{ minWidth: "100%" }}>
                          <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">
                              Compound
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={selectedCompound}
                              label="Compound"
                              onChange={handleCompoundSelection}
                            >
                              <MenuItem value={"Comfort: Hard (CH)"}>
                                Comfort: Hard (CH)
                              </MenuItem>
                              <MenuItem value={"Comfort: Medium (CM)"}>
                                Comfort: Medium (CM)
                              </MenuItem>
                              <MenuItem value={"Comfort: Soft (CS)"}>
                                Comfort: Soft (CS)
                              </MenuItem>
                              <MenuItem value={"Sports: Hard (SH)"}>
                                Sports: Hard (SH)
                              </MenuItem>
                              <MenuItem value={"Sports: Medium (SM)"}>
                                Sports: Medium (SM)
                              </MenuItem>
                              <MenuItem value={"Sports: Soft (SS)"}>
                                Sports: Soft (SS)
                              </MenuItem>
                              <MenuItem value={"Racing: Hard (RH)"}>
                                Racing: Hard (RH)
                              </MenuItem>
                              <MenuItem value={"Racing: Medium (RM)"}>
                                Racing: Medium (RM)
                              </MenuItem>
                              <MenuItem value={"Racing: Soft (RS)"}>
                                Racing: Soft (RS)
                              </MenuItem>
                              <MenuItem value={"Racing: Super Soft (RSS)"}>
                                Racing: Super Soft (RSS)
                              </MenuItem>
                              <MenuItem value={"Racing: Intermediate (RI)"}>
                                Racing: Intermediate (RI)
                              </MenuItem>
                              <MenuItem value={"Racing: Heavy Wet (RH)"}>
                                Racing: Heavy Wet (RH)
                              </MenuItem>
                              <MenuItem value={"Dirt Tires"}>
                                Dirt Tires
                              </MenuItem>
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            width: "100%",
                            backgroundColor: "F6F6F6",
                            margin: 0,
                            padding: 0,
                            borderRadius: 1,
                            border: "3px solid red",
                            boxShadow: 1,
                          }}
                        >
                          <TrackSelectionModal
                            onSelectTrack={handleTrackSelection}
                          />
                          <ImageBox
                            Width={"100%"}
                            Height={"300px"}
                            MarginRight={"0px"}
                            MarginLeft={"0px"}
                            MarginTop={"0px"}
                            imageSrc={`/images/${selectedTrack}.svg`}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  </ItemCentered>
                </Grid>
                <Grid item xs={6}>
                  <ItemCentered>
                    <Grid container spacing={2} sx={{ height: "100%" }}><Grid item xs={12}><Divider sx={{}}>
        <Chip label="Current Setup" />
      </Divider></Grid>
                      <Grid item xs={6}>
                      <Box sx={{ width: '90%', height:'75%',backgroundColor:'F6F6F6', margin:1, padding:1, borderRadius:1, border: '1px solid grey' ,boxShadow:1, justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <TextField
                        disabled
                          id="outlined-error"
                          label="Selected Car"
                          defaultValue="Selected Car"
                          value={selectedCar}
                          sx={{width: "90%"}}
                          error={Boolean(carError)}
                      helperText={carError}
                        /></Box>
                      </Grid>
                      <Grid item xs={6}  >
                      <Box sx={{ width: '90%',height:'75%',backgroundColor:'F6F6F6', margin:1, padding:1, borderRadius:1, border: '1px solid grey' ,boxShadow:1, justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <TextField
                        disabled
                          error={Boolean(trackError)}
                          helperText={trackError}
                          id="outlined-error"
                          label="Selected Track"
                          defaultValue="Selected Track"
                          value={selectedTrack}
                          sx={{width: "90%"}}
                        /></Box>
                      </Grid>
                      <Grid item xs={6}>
                      <Box sx={{ width: '90%',height:'75%',backgroundColor:'F6F6F6', margin:1, padding:1, borderRadius:1, border: '1px solid grey' ,boxShadow:1, justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <TextField
                        disabled
                          error={Boolean(compoundError)}
                          helperText={compoundError}
                          id="outlined-error"
                          label="Selected Compound"
                          defaultValue="Selected Compound"
                          value={selectedCompound}
                          sx={{width: "90%"}}
                        /></Box>
                      </Grid>
                      <Grid item xs={6}>
                      <Box sx={{ width: '90%',height:'75%',backgroundColor:'F6F6F6', margin:1, padding:1, borderRadius:1, border: '1px solid grey' ,boxShadow:1, justifyContent:'center',alignItems:'center',display:'flex'}}>
                        <TextField
                        disabled
                          id="outlined-error"
                          label="Selected Setup"
                          defaultValue="Selected Setup"
                          value={selectedSetup}
                          sx={{width: "90%"}}
                        /></Box>
                      </Grid>
                      <Grid item xs={12}>
                        {" "}
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{  width: "50%" }}
                        >
                          Submit
                        </Button><InfoToolTip name={"Sessions"} info={tooltipInfo}/>
                      </Grid>
                    </Grid>{" "}
                  </ItemCentered>
                </Grid>
              </Grid>
            </form>
          </Box>
        </div>
      </Homepage>
    </>
  );
};

export default SessionStartup;
