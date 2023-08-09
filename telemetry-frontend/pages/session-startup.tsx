import React, { useContext, useEffect, useRef, useState } from "react";
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
import { GridRowId } from "@mui/x-data-grid";
import { carData } from "../data/gtCarList";
import axios, { AxiosResponse } from "axios";
import { AuthContext } from "../components/authProvider";
import Footer from "../components/footer/footer";
import NavBar from "../components/navbar/navbar";
import '../components/navbar/navbar.css';
import HorizontalBanner from "../components/horizontalBanner/horizontalBanner";

const SessionStartup: React.FC = () => {
  const [selectedRowId, setSelectedRowId] = useState<GridRowId | null>(null); // Manage selectedRowId in the parent component
  const selectedRowIdSetupGridRef = useRef<GridRowId | null>(null);

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "rgba(132, 126, 126, 0)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: "100%",
    width: "90%",
    borderRadius:55,
    display:"flex",
    justifyContent:'center',
    alignItems:'center',
  }));
  const ItemCentered = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "rgba(132, 126, 126, 0)",
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

  const ItemFooter = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(132, 126, 126, 0)',
    boxShadow: 'none', // Override the shadow effect
  }));

  const ItemNav = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(132, 126, 126, 0)',
    boxShadow: 'none', // Override the shadow effect
  }));

  const [selectedCar, setSelectedCar] = useState("");
  const [selectedTrack, setSelectedTrack] = useState("noTrack");
  const [selectedCompound, setSelectedCompound] = React.useState("");
  const [selectedSetup, setSelectedSetup] = useState("");
  const [carError, setCarError] = useState("");
  const [trackError, setTrackError] = useState("");
   const [compoundError, setCompoundError] = useState("");
  const router = useRouter();
  const setupData = useRef<{ id: number; setupname: string }[]>([]);
  const rows = React.useMemo(() => carData, []);
  const rowsSetupGrid = React.useMemo(() => setupData, [setupData]);
  const { isLoggedIn,userName} = useContext(AuthContext);
  const username = userName;

  const handleRowSelectionChange = React.useCallback(
    (selectionModel: any) => {
      // Update the selectedRowId when the row selection changes
      if (selectionModel.length > 0) {
        const selectedRow = rows.find((row) => row.id === selectionModel[0]);
        if (selectedRow) {
        setSelectedRowId(selectionModel[0]);
        const brand = selectedRow.brand;
        const name = selectedRow.name;
        const car = brand + ' ' + name;
        handleCarSelection(car);
        // Rest of the code for handling the selected row
      }
    } else {
      setSelectedRowId(null);
    }
    },
    [],
  );
  const handleRowSelectionChangeSetupGrid = React.useCallback(
    (selectionModel: any) => {
      // Update the selectedRowId when the row selection changes
      if (selectionModel.length > 0) {
        
        const selectedRow = rowsSetupGrid.current.find((row) => row.id === selectionModel[0]);
        if (selectedRow) {
          selectedRowIdSetupGridRef.current = selectionModel[0];
        const name = selectedRow.setupname;
        handlesetupSelection(name);
        // Rest of the code for handling the selected row
      }
    } else {
      console.log("got you")
      console.log(selectedRowIdSetupGridRef.current)
      console.log("here")
      selectedRowIdSetupGridRef.current = null
    }
    },
    [],
  );
  const forceFetchData = () => {
    fetchData();
  };

  
  const fetchData = React.useCallback(async () => {
    try {
      const setupResponse: AxiosResponse = await axios.get('/api/getsetuplistapi', {
        params: { username },
      });
      const data = setupResponse.data;
      
      const rowsWithId = data.setups.map((setup: any, index: number) => ({ setupname: setup.setupname, id: index + 1 }));

      setupData.current=rowsWithId;
    } catch (error) {
      console.error('Error fetching setup data:', error);
    }
  }, [username]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSetSelectedRowId=(id:GridRowId| null)=>{
    setSelectedRowId(id);
  }
  const handleSetSelectedRowIdSetupGrid=(id:GridRowId| null)=>{
    selectedRowIdSetupGridRef.current = id
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      selectedCar.trim() !== "" &&
      selectedCompound.trim() !== "" &&
      selectedTrack != "noTrack"
    ) {
      const queryParams = `car=${selectedCar}&compound=${selectedCompound}&track=${selectedTrack}&setup=${selectedSetup === '' ? "No Field Selected" : selectedSetup}`;
      router.push(`/session?${queryParams}`);
    }setCarError("You must select a car to contiue")
    setCompoundError("You must select a compound to contiue")
    setTrackError("You must select a track to contiue")
    if(selectedCar.trim() !== ""){
      setCarError("")
    }
   if(selectedCompound.trim() !== ""){
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
    <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Homepage style={'navbar-container'}>
                <ItemNav><NavBar /></ItemNav>
              </Homepage>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          
            <Homepage style={"setups-container"}>
        
        
          <form onSubmit={handleSubmit}>
            <Grid container spacing={4}>
            <Grid item xs={12}><Box sx={{ height: '50px' }}></Box></Grid>
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <HorizontalBanner GridContent={["SESSION STARTUP"]} needsBackground={false} fontSizes={[45]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <HorizontalBanner GridContent={["SELECT A CAR"]} needsBackground={false} fontSizes={[29]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} />
                        </Grid>
              <Grid item xs={12}  sx={{ height: "100%",display:'flex',justifyContent:'center'}}>
                <Item>
                  <QuickFilteringGrid onSelectCar={handleCarSelection} selectedRowId={selectedRowId} onRowSelectionModelChange={handleRowSelectionChange} onSelectedRowIdChange={handleSetSelectedRowId} />
                </Item>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ height: "100%" }}>
              <Grid container spacing={4}>
              <Grid item xs={12}> <HorizontalBanner GridContent={["SELECT A SETUP"]} needsBackground={false} fontSizes={[29]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
              <Grid item xs={12}> <Item>
                  <SetupTable onSelectSetup={handlesetupSelection} selectedRowId={selectedRowIdSetupGridRef.current} onRowSelectionModelChange={handleRowSelectionChangeSetupGrid} onSelectedRowIdChange={handleSetSelectedRowIdSetupGrid} fetchDataCallback={forceFetchData} />
                </Item></Grid>
              </Grid>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ height: "100%" }}>
                <Item>
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
                          imageSrc={`/images/${selectedTrack}.svg`} borderRadius={0} 
                          hasOverlay={false}                          >

                          </ImageBox>
                      </Box>
                    </Grid>
                  </Grid>
                </Item>
              </Grid>
              <Grid item xs={12} >
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
       
     <Grid item xs={12}>
            <Homepage style={'navbar-containe-reverse'}>
              <ItemFooter><Footer /></ItemFooter>
            </Homepage>
          </Grid>
         
    </Homepage>
        </Grid>
        </Grid>
      
    </>
  );
};

export default SessionStartup;

//<Box
  // /       sx={{
   //         width: "100px",
    //        backgroundColor: "F6F6F6",
     //       margin: 4,
       //     padding: 2,
         //   borderRadius: 1,
           // border: "1px solid grey",
            //boxShadow: 1,
            //height: "90%",
            //display:'inline',
            //justifyContent:'center',alignItems:'center'
          //}}
        //></Box>