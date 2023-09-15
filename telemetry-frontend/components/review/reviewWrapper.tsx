import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../sessionTabs/sessiontab.css'
import { useContext, useEffect, useState } from 'react';
import { Button, Link, Modal, Typography } from '@mui/material';
import ReviewFieldSelection from './reviewFieldSelection';
import ReviewGrouping from './reviewGrouping';
import ReviewStreamNumberSelection from './reviewStreamNumberSelection';
import ReviewChart from './reviewChart';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../authProvider';
import ReviewLapSelection from './reviewLapSelection';
import TuneIcon from '@mui/icons-material/Tune';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import LapSelectionTable from './reviewLapSelect';
import { GridRowId } from '@mui/x-data-grid';
import ClearIcon from '@mui/icons-material/Clear';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import ImageBanner from '../../components/splitImageBanner';
import LabelIcon from '@mui/icons-material/Label';
import BannerInterface from '../../interfaces/bannerContent';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  bgcolor: 'rgba(8, 13, 56, 0.5)',
  border: '2px solid white',
  borderRadius: 15,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Add this to enable vertical scrolling when content overflows
  display: 'flex',
  justifyContent: 'center'  // Add this to make sure the children are wrapped and the container becomes scrollable
  // Set the direction to 'column' to wrap the children vertically
};
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#FB9536' : '#FB9536',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ItemWhite = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backGroundColor: theme.palette.text.primary,
}));
const ItemBlur= styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(100,100,0,0.3)' : 'rgba(164, 198, 252,0.5)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  backGroundColor: theme.palette.text.primary,
  borderRadius:50,
}));
const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}));
const BlackBox = styled(Box)(({ theme }) => ({
  paddingTop: 15,
  paddingBottom: 15,
}));

interface ReviewViewProps {
  viewNumber: string;
}


export default function ReviewView({ viewNumber }: ReviewViewProps) {
  const [controllerOpen, setControllerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [showView, setShowView] = React.useState(false);
  const [showGraph, setShowGraph] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }

    setControllerOpen(open);
  };
  const [lapSelectionData, setLapSelectionData] = useState<{
    date: string[];
    laptime: string[];
    track: string[];
    car: string[];
  }>({
    date: [],
    laptime: [],
    track: [],
    car: [],
  });

  // Function to update carData based on a passed-in dictionary
  const updateLapSelectionData = (newData: {
    date: string[];
    laptime: string[];
    track: string[];
    car: string[];
  }) => {
    setLapSelectionData(newData);
  };

  const [selectedFields, setSelectedFields] = React.useState<{ [key: string]: string }>({
    field1: '',
    field2: '',
    field3: '',
  });
  const [selectedStreams, setSelectedStreams] = React.useState<{ [key: string]: string }>({
    stream1: '',
    stream2: '',
    stream3: '',
  });
  const [selectedStreamsDataLap1, setSelectedStreamsDataLap1] = React.useState<{ [key: string]: any }>({
    stream1DataLap1: '',
    stream2DataLap1: '',
    stream3DataLap1: '',
  });
  const [selectedStreamsDataLap2, setSelectedStreamsDataLap2] = React.useState<{ [key: string]: any }>({
    stream1DataLap2: '',
    stream2DataLap2: '',
    stream3DataLap2: '',
  });
  const [selectedSpecialStream, setSelectedSpecialStream] = React.useState<{ [key: string]: any }>({
    stream1isSpecial: '',
    stream2isSpecial: '',
  });
  const [selectedLaps, setSelectedLaps] = React.useState<{ [key: string]: any }>({
    lap1: '',
    lap2: '',
    lap3: '',
  });
  const [selectedNumber, setSelectedNumber] = React.useState([1]);
  const [selectedNumberLaps, setSelectedNumberLaps] = React.useState([1]);
  const [availableLaps, setAvailableLaps] = React.useState<string[]>(["No Laps Found"]);
  const [minValues, setMinValues] = React.useState<{ [key: string]: any }>({
    min1: 0,
    min2: 0,
  });
  const [maxValues, setMaxValues] = React.useState<{ [key: string]: any }>({
    max1: 0,
    max2: 0,
  });
  const [graphTypesArray, setGraphTypesArray] = React.useState(["straight"]);
  const [lapDistanceXAxis, setLapDistanceXAxis] = React.useState([0]);
  const [lapDistanceXAxisLap2, setLapDistanceXAxisLap2] = React.useState([0]);
  const handleFieldSelection = (field: string, fieldNumber: string) => {
    setSelectedFields((prevFields) => ({
      ...prevFields,
      [`field${fieldNumber}`]: field,
    }));
  };

  const handleLapsSelection = (laps: string, lapNumber: string) => {
    setSelectedLaps((prevLaps) => ({
      ...prevLaps,
      [`lap${lapNumber}`]: laps,
    }));
  };
  const handleStreamSelection = (stream: string, streamNumber: string) => {
    setSelectedStreams((prevStreams) => ({
      ...prevStreams,
      [`stream${streamNumber}`]: stream,
    }));
  };

  const handleNumberSelection = (numberOfStreams: number) => {
    if (numberOfStreams == 1) {
      // reset stream 2lap 1 and stream 2 lap 2
      setSelectedStreamsDataLap1((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap1`]: '',
      }))
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap2`]: '',
      }))
      setSelectedStreams((prevStreams) => ({
        ...prevStreams,
        [`stream${2}`]: '',
      }));
    }
    setSelectedNumber(Array.from({ length: numberOfStreams }, (_, index) => index + 1));
  };
  const handleNumberLapsSelection = (numberOfLaps: number) => {
    if (numberOfLaps == 1) {
      // reset stream 1 lap 2 and stream 2 lap 2
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${1}DataLap2`]: '',
      }))
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap2`]: '',
      }))
    }
    setSelectedNumberLaps(Array.from({ length: numberOfLaps }, (_, index) => index + 1));
  };

  const handleLapUpdate = (lapsArray: string[]) => {
    setAvailableLaps(lapsArray);
  }


  const handleStreamDataLap1 = (streamData: any, streamDataNumber: number, isSpecial: boolean) => {
    if (isSpecial) {
      const stringData = streamData.toString();
      const fullString = '[' + stringData + ']'
      setSelectedStreamsDataLap1((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap1`]: fullString,
      })
      );
    }
    else {
      setSelectedStreamsDataLap1((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap1`]: streamData,
      })
      );
    }
  }
  const handleStreamDataLap2 = (streamData: any, streamDataNumber: number, isSpecial: boolean) => {
    if (isSpecial) {
      const stringData = streamData.toString();
      const fullString = '[' + stringData + ']'

      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap2`]: fullString,
      }));
    } else {
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap2`]: streamData,
      }));
    }
  }
  const handleSpecialStream = (isSpecial: boolean, streamDataNumber: string) => {
    setSelectedSpecialStream((prevValues) => ({
      ...prevValues,
      [`stream${streamDataNumber}isSpecial`]: isSpecial,
    }));
  }

  const handleMinMaxValues = (minValue: string, maxValue: string, streamNumber: string) => {
    setMinValues((prevMinValues) => ({
      ...prevMinValues,
      [`min${streamNumber}`]: Number(minValue),
    }));
    setMaxValues((prevMaxValues) => ({
      ...prevMaxValues,
      [`max${streamNumber}`]: Number(maxValue),
    }));
  }
  const handleGraphTypes = (graphType: string, streamNumber: string, isSpecial: boolean) => {
    const prevGraph = graphTypesArray;
    let newGraph = prevGraph;
    const graphTypeIndex = Number(streamNumber);
    if (isSpecial) {
      const fullArray = [graphType, graphType, graphType, graphType];
      const stringDataGraphTypes = fullArray.toString();
      const fullStringGraphTypes = '[' + stringDataGraphTypes + ']'
      newGraph[graphTypeIndex - 1] = fullStringGraphTypes;
      newGraph[graphTypeIndex + 1] = fullStringGraphTypes;
    } else {
      newGraph[graphTypeIndex - 1] = graphType;
      newGraph[graphTypeIndex + 1] = graphType;
    }
    setGraphTypesArray(newGraph);
  }

  const getLabel = (stream1: string, stream2: string) => {
    if (stream2 == "") {
      return stream1;
    }
    return selectedStreams[`stream${1}`] + " vs " + selectedStreams[`stream${2}`]
  }

  function validateData(streamData: any) {
    if (streamData !== undefined && streamData !== null && streamData !== '') {
      const parsedArray = JSON.parse(streamData) as number[];
      if (Array.isArray(parsedArray)) {
        return parsedArray;
      }
    }
    return [0];
  }
  const { userName } = useContext(AuthContext);
  const username = userName;
  function parseSpecailStream(stream: string, parsedObject: any) {
    const specailStreams = ["Suspension Height", "Rotational Speed", "Tyre Temperatures"];
    if (stream == specailStreams[0]) {
      return [parsedObject.data["TireFL_SusHeight"], parsedObject.data["TireFR_SusHeight"], parsedObject.data["TireRL_SusHeight"], parsedObject.data["TireRR_SusHeight"]];
    }
    else if (stream == specailStreams[1]) {
      return [parsedObject.data["WheelFL_RevPerSecond"], parsedObject.data["WheelFR_RevPerSecond"], parsedObject.data["WheelRL_RevPerSecond"], parsedObject.data["WheelRR_RevPerSecond"]];
    } else if (stream == specailStreams[2]) {
      return [parsedObject.data["TireFL_SurfaceTemperature"], parsedObject.data["TireFR_SurfaceTemperature"], parsedObject.data["TireRL_SurfaceTemperature"], parsedObject.data["TireRR_SurfaceTemperature"]]
    }
    return parsedObject.data[stream];
  }

  ///const parseLapSelectionData=(parsedObject:any)=>{

  //updateCarData();
  ///}
  function parseBracketedString(inputString: string) {
    // Remove square brackets and split by commas
    const items = inputString.slice(1, -1).split(',');

    // Trim each item to remove extra whitespace
    const resultArray = items.map((item) => item.trim());

    return resultArray;
  }

  useEffect(() => {
    const fetchAvailableLaps = async () => {
      try {
        const lapsResponse: AxiosResponse = await axios.get('/api/retrivereviewablelapsapi', {
          params: { username },
        });
        if (lapsResponse.data.message === 'Success') {
          //handleLapUpdate(parseBracketedString(lapsResponse.data.lapData[0]["laptime"]));
          const datesArray = lapsResponse.data.lapData.map((lapItem: { date: any; }) => lapItem.date);
          const trackArray = lapsResponse.data.lapData.map((lapItem: { track: any; }) => lapItem.track);
          const carArray = lapsResponse.data.lapData.map((lapItem: { car: any; }) => lapItem.car);
          const bestLaptimeArray = lapsResponse.data.lapData.map((lapItem: { bestlaptime: any; }) => lapItem.bestlaptime);
          const finalLapArray = [];
          for (let i = 0; i < bestLaptimeArray.length; i++) {
            const bestLapTimes = parseBracketedString(bestLaptimeArray[i])
            const bestLapTime = bestLapTimes[0];
            finalLapArray.push(bestLapTime);
          }

          const newData = {
            date: lapsResponse.data.lapData.map((lapItem: { date: any; }) => lapItem.date),
            laptime: finalLapArray,
            track: lapsResponse.data.lapData.map((lapItem: { track: any; }) => lapItem.track),
            car: lapsResponse.data.lapData.map((lapItem: { car: any; }) => lapItem.car),
          };
          updateLapSelectionData(newData);
          handleLapUpdate(datesArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAvailableLaps();
  }, []);

  useEffect(() => {
    const fetchData = async (lapSelection: number, lapDate: string) => {
      try {
        const dataResponse: AxiosResponse = await axios.get('/api/retrivereviewdataapi', {
          params: { username, lapDate },
        });
        if (dataResponse.data.message === 'Success') {
          var jsonString = JSON.stringify(dataResponse.data);
          var parsedObject = JSON.parse(jsonString);
          if (lapSelection == 1) {
            handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${1}`], parsedObject), 1, selectedSpecialStream[`stream1isSpecial`])
            if (selectedNumber.length >= 2) {
              handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${2}`], parsedObject), 2, selectedSpecialStream[`stream2isSpecial`]);
            }
            setLapDistanceXAxis(parsedObject.data["distanceFromStart"]);
          } else {
            handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${1}`], parsedObject), 1, selectedSpecialStream[`stream1isSpecial`])
            if (selectedNumber.length >= 2) {
              handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${2}`], parsedObject), 2, selectedSpecialStream[`stream2isSpecial`]);
            }
            setLapDistanceXAxisLap2(parsedObject.data["distanceFromStart"]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    for (let i = 1; i <= selectedNumberLaps.length; i++) {
      fetchData(i, selectedLaps[`lap${i}`]);
    }
  }, [selectedLaps, selectedStreams]);

  const handleShow = (target:string) => {
    if(target==="graph"){
      setShowGraph(true);
    }
    else if (target==="view"){
      setShowView(true);
    }
  }
  const handleHide = (target:string) => {
    if(target==="graph"){
      setShowGraph(false);
    }
    else if (target==="view"){
      setShowView(false);
    }
  }

  const bannerItems: BannerInterface[] = [
    {
      title: 'VIEW HIDDEN',
      titleSize: 29,
      titleFontStyle: 'Yapari',
      titleFontWeight: 'bold',
      body: ['To view some data','To view some data', 'Press show header, then press show graph ', 'From there press edit view settings', 'Select a lap and a field'],
      bodySize: [22, 17, 17, 17,17],
      bodyFontStyle: 'Satoshi',
      bodyFontWeight: 'normal',
      customIcon: LabelIcon, // Replace with your custom icon component
      ctaButton: 
      <Button className={"sliderArray"} sx={{ml:2}} onClick={() => handleShow("view")}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}>SHOW HEADER </Typography><VisibilityIcon /></Button>,
      ctaTarget: '',
    },
  ];


  const tooltipInfo = (
    <>
      <em>{'Review chart allows you to see how you to compare any two of up to ten laps.'}</em> <b>{'Each lap view can be tailored to show one or two streams of data, this is presented as the whole lap data stream against the distance into the lap at the point of recording'}</b> <u>{'You are able to have up to two of these views at once'}</u>
    </>
  );
  const tooltipInfoLap = (
    <>
      <em>{'This sets the lap to view, this is a list of laps by lap time. If you see no laps found it means you are not logged in'}</em>
    </>
  );
  const tooltipInfoStreams = (
    <>
      <em>{'Field selects the grouping from which to select the data stream you wish to view, while stream sets the actual stream, changing the field will alter the available streams'}</em>
    </>
  );
  const viewName = !showView && showGraph ? viewNumber : null;
  return (

    <>

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
        {showView ?<Grid item xs={12}><Item>
          <Grid container spacing={0}>
            <Grid item xs={12}><Box><Typography fontFamily={"Yapari"} fontWeight={"bold"} fontSize={35} sx={{ color: "white",ml:2 }}>{viewNumber}<Button className={"sliderArray"} onClick={() => handleHide("view")}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}>HIDE HEADER </Typography><VisibilityIcon /></Button> </Typography></Box></Grid>
            <Grid item xs={12}>


              <Grid container spacing={0}>{!showGraph ? <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center'}}><Button className={"sliderArray"} sx={{ml:2}} onClick={() => handleShow("graph")}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}>SHOW GRAPH </Typography><VisibilityIcon /></Button></Grid>:<Grid item xs={4} sx={{ display: 'flex', justifyContent: 'start', alignItems: 'center' }}><Button className={"sliderArray"} sx={{ml:2}} onClick={() => handleHide("graph")}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}>HIDE GRAPH   </Typography><VisibilityOffIcon /></Button></Grid>}{!controllerOpen && <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}><Button className={"sliderArray"} onClick={handleOpen}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}> EDIT VIEW SETTINGS </Typography><TuneIcon /><InfoToolTip name={"Review Charts"} info={tooltipInfo} iconColor={'white'} /></Button> </Grid>}</Grid>

              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                <Box sx={{ width: '80vw', height: '100%'}}>
    <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'85%'}}>Clear<ClearIcon/></Button>
   <Grid container spacing={4}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontSize={35} fontWeight={"bold"} sx={{color:'white',whiteSpace:'nowrap',overflow:'scroll'}}>{viewNumber} Controller</Typography></Grid>
   <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
            
            
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{padding:0.5,width: '100%'}}>
            <ReviewStreamNumberSelection onSelectNumber={handleNumberLapsSelection} label={"Number Of Laps"} currentValue={selectedNumberLaps.length} />
    </Box></Grid>
             <Grid item xs={12}>
              
             <Grid container spacing={4}>
            
             {selectedNumberLaps.map((item) => (
                          <>
                            <Grid item xs={12}> <ItemBlur>
                            <Grid container spacing={4}>
                            <Grid item xs={12}>
                              
                                <Typography sx={{color:"white",whiteSpace:'nowrap',overflow:'scroll',ml:2}} fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25}>Lap {item}</Typography>  </Grid>
                             {selectedLaps[`lap${item}`]}{selectedStreamsDataLap1[`stream1DataLap${item}`]}{selectedStreamsDataLap2[`stream2DataLap${item}`]}
                             <Grid item xs={12}><LapSelectionTable onSelectLap={handleLapsSelection} lapSelectionData={lapSelectionData} lapNumber={`${item}`} /></Grid>
                             </Grid></ItemBlur>
                             </Grid>

                          </>

                        ))}</Grid>
             </Grid>
             <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
             <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{padding:0.5,width: '100%'}}>
             <ReviewStreamNumberSelection onSelectNumber={handleNumberSelection} label={"Number Of Streams"} currentValue={selectedNumber.length}/>
    </Box></Grid>
             <Grid item xs={12}>
             <Grid container spacing={4}>
                        {selectedNumber.map((item) => (
                          <><Grid item xs={12}> <ItemBlur>
                          <Grid container spacing={4}>
                          <Grid item xs={12}>
                            
                              <Typography sx={{color:"white",whiteSpace:'nowrap',overflow:'scroll',ml:2}} fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25}>Stream {item}</Typography>  </Grid>
                              <Grid item xs={12}> {selectedFields[`field${item}`]}{selectedStreams[`stream${item}`]}</Grid>
                           <Grid item xs={12}><ReviewFieldSelection onSelectField={handleFieldSelection} fieldNumber={item.toString()} /></Grid>
                           <Grid item xs={12}><ReviewGrouping
                              Field={selectedFields[`field${item}`]}
                              onSelectStream={handleStreamSelection}
                              streamNumber={item.toString()}
                              onSelectStreamMinMax={handleMinMaxValues}
                              onSelectStreamGraphTypes={handleGraphTypes}
                              onSelectSpecialStream={handleSpecialStream}
                            /></Grid>
                           </Grid></ItemBlur>
                           </Grid>
                          </>
                        ))}</Grid></Grid>
             <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleClose} >Exit</Box></Button></Grid>
             <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
             </Grid>
 </Box>



                  
                </Box>
              </Modal>
            </Grid>
          </Grid></Item>
        </Grid>:<><Grid item xs={4}><Button className={"sliderArray"} sx={{ml:2}} onClick={() => handleShow("view")}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={15} sx={{ color: "white" }}>SHOW HEADER </Typography><VisibilityIcon /></Button></Grid><Grid item xs={6}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25} sx={{ color: "white" }}>{viewName}</Typography></Grid></>}
          {showGraph && <Grid item xs={12}>
            <ItemWhite>
              <ReviewChart expectedMaxValue={maxValues[`max${"1"}`]} expectedMinValue={minValues[`min${"1"}`]} expectedMaxValueTwo={maxValues[`max${"2"}`]} expectedMinValueTwo={minValues[`min${"2"}`]} seriesOneLapOne={validateData(selectedStreamsDataLap1[`stream1DataLap${1}`])} seriesTwoLapOne={validateData(selectedStreamsDataLap1[`stream2DataLap${1}`])} seriesOneLapTwo={validateData(selectedStreamsDataLap2[`stream1DataLap${2}`])} seriesTwoLapTwo={validateData(selectedStreamsDataLap2[`stream2DataLap${2}`])} numberOfStreams={selectedNumber.length} numberOfLaps={selectedNumberLaps.length} curves={graphTypesArray} leftLabel={selectedStreams[`stream${1}`]} rightLabel={selectedStreams[`stream${2}`]} label={getLabel(selectedStreams[`stream${1}`], selectedStreams[`stream${2}`])} stream1IsSpecial={selectedSpecialStream[`stream${1}isSpecial`]} stream2IsSpecial={selectedSpecialStream[`stream${2}isSpecial`]} XAxisData={validateData(lapDistanceXAxis)} XAxisDataLap2={validateData(lapDistanceXAxisLap2)} height={350} />
            </ItemWhite>
          </Grid>}
          {((!showGraph)&&(!showView)) && <Grid item xs={12}><ImageBanner imageSrc={"/images/test5.jpg"} hasOverlay={true} minWidth={'330px'} minHeight={'330px'} borderRadius={100}  >
                    <Box sx={{ height: "90%", width: '100%', overflow: 'auto', mt: '5%' }}>
                      <Grid container spacing={2}> 
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                          <HorizontalBanner GridContent={[`${viewNumber}`]} needsBackground={false} fontSizes={[45]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["#FB9536"]} isMutliStage={false} marginLeftValue={[]}  isBannerInterface={false} />
                        </Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                          <HorizontalBanner GridContent={bannerItems} fontSizes={[0]} needsBackground={true} fontFamilies={["N/A"]} fontWeights={["N/A"]} fontColour={["N/A"]} isMutliStage={true} marginLeftValue={[]} isBannerInterface={true} />
                        </Grid> 
                      </Grid>
                    </Box>
                  </ImageBanner></Grid>}
        </Grid>
        
      </Box>
    </>
  );
}