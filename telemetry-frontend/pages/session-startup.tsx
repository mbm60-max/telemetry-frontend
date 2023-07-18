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
import '../calltoaction.css';
const SessionStartup: React.FC = () => {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
  }));
  const [selectedCar, setSelectedCar] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("noTrack");
  const [selectedCompound, setSelectedCompound] = React.useState("");
  const [selectedSetup, setSelectedSetup] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); 
    if (((selectedCar.trim() !== "") && (selectedCompound.trim() !== ""))&&( selectedTrack != "noTrack")) {
      const queryParams = `car=${selectedCar}&compound=${selectedCompound}&track=${selectedTrack}`;
      router.push(`/session?${queryParams}`);
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
  function handleExit(){
      router.push('/')
    }

  return (
    <><Box className='header'><Button onClick={handleExit}>Exit Session Startup</Button></Box>
     <Homepage style={'homepage'}>
      <div style={{alignItems:'center', justifyContent:'center', display: 'grid', placeItems: 'center',}}>
     <Box sx={{ width: '90%',backgroundColor:'F6F6F6', margin:1, padding:2, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
      
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2} >
                <Grid item xs={6}>
                  <Item>
                    <QuickFilteringGrid onSelectCar={handleCarSelection} />
                  </Item>
                </Grid>
                
                <Grid item xs={6} sx={{height:'500px'}}>
                  <ItemCentered>
                  <Grid container spacing={2}sx={{height:'100%'}} >
                <Grid item xs={6} >
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
                          <MenuItem value={"Dirt Tires"}>Dirt Tires</MenuItem>
                        </Select>
                      </FormControl>
                    </Box></Grid>
                    <Grid item xs={6}><Box sx={{ width: '100%',backgroundColor:'F6F6F6', margin:0, padding:0, borderRadius:1, border: '1px solid grey' ,boxShadow:1}}>
                    <TrackSelectionModal onSelectTrack={handleTrackSelection} />
                    <ImageBox
                      Width={"100%"}
                      Height={"100%"}
                      MarginRight={"0px"}
                      MarginLeft={"0px"}
                      MarginTop={"0px"}
                      imageSrc={`/images/${selectedTrack}.svg`}
                    /></Box></Grid></Grid>
                  </ItemCentered>
                </Grid><Grid item xs={6}><Item><SetupTable onSelectSetup={handlesetupSelection}/></Item></Grid>
                <Grid item xs={6}><Button
                type="submit"
                variant="contained"
                sx={{ mr: 2, width: "167px" }}
              >
                Submit
              </Button><div><BasicCard ml={0} mt={0} mr={0} width={0} noOfLines={4} lineFontSizes={[]} lineFontColors={[]} lineContent={[selectedCar,
                selectedCompound,
                selectedTrack,
                selectedSetup]} lineMR={[]} lineML={[]} lineMT={[]} lineWhiteSpace={[]}/>
              </div></Grid><Grid item xs={4}>
                  <Item>
                    
                  </Item>
                </Grid>
              </Grid>
            </form></Box></div>
            </Homepage>
    </>
  );
};

export default SessionStartup;
