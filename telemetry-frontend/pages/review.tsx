import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import '../components/sessionTabs/sessiontab.css'
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import ExtendedPacket from '../interfaces/extendedPacketInterface';
import Homepage from '../components/background/background';
import { Button, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ReviewFieldSelection from '../components/review/reviewFieldSelection';
import ReviewGrouping from '../components/review/reviewGrouping';
import ReviewStreamNumberSelection from '../components/review/reviewStreamNumbeSelection';
import ReviewChart from '../components/review/reviewChart';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../components/authProvider';
import ReviewLapTable from '../components/review/reviewLapTable';
import ReviewLapSelection from '../components/review/reviewLapSelection';
const DynamicBasicChart = dynamic(() => import('../components/sessionTabs/chart'), { 
  loader: () => import('../components/sessionTabs/chart'),
  ssr: false 
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ItemBlack = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  backGroundColor: theme.palette.text.primary,
}));
const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}));
const BlackBox = styled(Box)(({ theme }) => ({
  paddingTop:15,
  paddingBottom:15,
}));


interface GeneralGridProps{
  throttleStream: { x: number; y: number; }[];
  brakeStream: { x: number; y: number; }[];
  speedStream: { x: number; y: number; }[];
  suggestedGear:number;
  currentGear:number;
  frontLeftTemp:number;
  frontRightTemp:number;
  rearLeftTemp:number;
  rearRightTemp:number;
  lastLapTime:string;
  bestLapTime:string;
  lapTimer:string;
  track:string| string[] | undefined;
  distanceInLap:number;
}

export default function Review({throttleStream,brakeStream,speedStream,suggestedGear,currentGear,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,lastLapTime,bestLapTime,lapTimer,track,distanceInLap}:GeneralGridProps) {
  const router = useRouter();
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
  const [availableLaps,setAvailableLaps]=  React.useState<string[]>(["No Laps Found"]);
  const [minValues, setMinValues] = React.useState<{ [key: string]: any }>({
    min1: 0,
    min2: 0,
  });
  const [maxValues, setMaxValues] = React.useState<{ [key: string]: any }>({
    max1: 0,
    max2: 0,
  });
  const [graphTypesArray, setGraphTypesArray]= React.useState(["straight"]);
  const [lapTimeXAxis, setLapTimeXAxis] = React.useState(["00:00:01"]);
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
    if(numberOfStreams == 1){
      // reset stream 2lap 1 and stream 2 lap 2
      setSelectedStreamsDataLap1((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap1`]: '',}))
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap2`]: '',}))
        setSelectedStreams((prevStreams) => ({
          ...prevStreams,
          [`stream${2}`]: '',
        }));
    }
    setSelectedNumber(Array.from({ length: numberOfStreams }, (_, index) => index + 1));
  };
  const handleNumberLapsSelection = (numberOfLaps: number) => {
    if(numberOfLaps == 1){
      // reset stream 1 lap 2 and stream 2 lap 2
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${1}DataLap2`]: '',}))
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${2}DataLap2`]: '',}))
    }
    setSelectedNumberLaps(Array.from({ length: numberOfLaps }, (_, index) => index + 1));
  };

  const handleLapUpdate = (lapsArray:string[])=>{
    setAvailableLaps(lapsArray);
  }
  function handleExitReview(){
    router.push('/')
  }

  const handleStreamDataLap1 = (streamData:any, streamDataNumber:number,isSpecial:boolean)=>{
    if(isSpecial){
      const stringData = streamData.toString();
      const fullString = '['+ stringData + ']'
      setSelectedStreamsDataLap1((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap1`]:  fullString,
      })
      );
    }
    else{
      setSelectedStreamsDataLap1((prevStreams) => ({
      ...prevStreams,
      [`stream${streamDataNumber}DataLap1`]: streamData,
    })
    );}
  }
  const handleStreamDataLap2 = (streamData:any, streamDataNumber:number,isSpecial:boolean)=>{
    if(isSpecial){
      const stringData = streamData.toString();
      const fullString = '['+ stringData + ']'

      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap2`]: fullString,
      }));
    }else{
      setSelectedStreamsDataLap2((prevStreams) => ({
        ...prevStreams,
        [`stream${streamDataNumber}DataLap2`]: streamData,
      }));
    }
  }
  const handleSpecialStream = (isSpecial:boolean, streamDataNumber:string)=>{
    setSelectedSpecialStream((prevValues) => ({
      ...prevValues,
      [`stream${streamDataNumber}isSpecial`]: isSpecial,
    }));
  }

  const handleMinMaxValues = (minValue:string, maxValue:string,streamNumber:string)=> {
    setMinValues((prevMinValues) => ({
      ...prevMinValues,
      [`min${streamNumber}`]: Number(minValue),
    }));
    setMaxValues((prevMaxValues) => ({
      ...prevMaxValues,
      [`max${streamNumber}`]: Number(maxValue),
    }));
  }
  const handleGraphTypes = (graphType:string, streamNumber:string, isSpecial:boolean)=> {
    const prevGraph = graphTypesArray;
    let newGraph = prevGraph;
    const graphTypeIndex = Number(streamNumber);
    if(isSpecial){
      const fullArray = [graphType,graphType,graphType,graphType];
      const stringDataGraphTypes = fullArray.toString();
      const fullStringGraphTypes = '['+ stringDataGraphTypes + ']'
      newGraph[graphTypeIndex-1]=fullStringGraphTypes;
      newGraph[graphTypeIndex+1]=fullStringGraphTypes;
    }else{
      newGraph[graphTypeIndex-1]=graphType;
      newGraph[graphTypeIndex+1]=graphType;
    }
    setGraphTypesArray(newGraph);
  }

  const getLabel = (stream1:string, stream2:string)=> {
    if(stream2 == ""){
      return stream1;
    }
    return selectedStreams[`stream${1}`]  + " vs " + selectedStreams[`stream${2}`]
  }
  
  function validateData(streamData:any){
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
  function parseSpecailStream(stream:string,parsedObject:any){
    const specailStreams = ["Suspension Height", "Rotational Speed","Tyre Temperatures"];
    if(stream == specailStreams[0]){
      return [parsedObject.data["TireFL_SusHeight"],parsedObject.data["TireFR_SusHeight"],parsedObject.data["TireRL_SusHeight"],parsedObject.data["TireRR_SusHeight"]];
    }
    else if(stream == specailStreams[1]){
      return [parsedObject.data["WheelFL_RevPerSecond"],parsedObject.data["WheelFR_RevPerSecond"],parsedObject.data["WheelRL_RevPerSecond"],parsedObject.data["WheelRR_RevPerSecond"]];
    }else if(stream == specailStreams[2]){
      return [parsedObject.data["TireFL_SurfaceTemperature"],parsedObject.data["TireFR_SurfaceTemperature"],parsedObject.data["TireRL_SurfaceTemperature"],parsedObject.data["TireRR_SurfaceTemperature"]]
    }
    return parsedObject.data[stream];
  }

  
  useEffect(() => {
    const fetchAvailableLaps = async () => {
      try {
        const lapsResponse: AxiosResponse = await axios.get('/api/retrivereviewablelapsapi', {
          params: { username },
        });
        if (lapsResponse.data.message === 'Success') {
          handleLapUpdate(lapsResponse.data.lapDates);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchAvailableLaps();
    const fetchData = async (lapSelection:number,lapDate:string) => {
      try {
        const dataResponse: AxiosResponse = await axios.get('/api/retrivereviewdataapi', {
          params: { username, lapDate },
        });
        if (dataResponse.data.message === 'Success') {
          var jsonString = JSON.stringify(dataResponse.data);
          var parsedObject = JSON.parse(jsonString);
          setLapTimeXAxis(parsedObject.data["LapTiming"]);
          console.log(parsedObject.data["LapTiming"]);
          if(lapSelection == 1){
            handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${1}`],parsedObject),1,selectedSpecialStream[`stream1isSpecial`])
            if(selectedNumber.length>=2){
              handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${2}`],parsedObject),2,selectedSpecialStream[`stream2isSpecial`]);
            }
          }else{
            handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${1}`],parsedObject),1,selectedSpecialStream[`stream1isSpecial`])
            if(selectedNumber.length>=2){
              handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${2}`],parsedObject),2,selectedSpecialStream[`stream2isSpecial`]);
            }
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    for(let i=1; i<=selectedNumberLaps.length; i++){
      fetchData(i,selectedLaps[`lap${i}`]);
    }
  }, [username, selectedLaps, selectedStreams, selectedNumber.length, selectedNumberLaps.length, selectedSpecialStream]);
  return (

    <>
    <Box className='header'><Button onClick={handleExitReview}>Exit Review</Button></Box>
    <Box sx={{ width: '100%' }}>
    <Homepage style={'homepage'}>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Item> 
          <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Grid container spacing={2}>
            <Grid item xs={12}><Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>Primary View Controller select lap{userName}</Typography></Grid>
            <Grid item xs={12}><ReviewStreamNumberSelection onSelectNumber={handleNumberLapsSelection} label={"Number Of Laps"}/></Grid>
            {selectedNumberLaps.map((item) => (
              <>
            <Grid item xs={12}><Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>Lap {item}</Typography></Grid>
            <Grid item xs={12}><ReviewLapSelection onSelectLap={handleLapsSelection} lapNumber={item.toString()} availableLaps={availableLaps}/></Grid>
            {selectedLaps[`lap${item}`]}{selectedStreamsDataLap1[`stream1DataLap${item}`]}{selectedStreamsDataLap2[`stream2DataLap${item}`]}
            
            </>
          ))}
            <Grid item xs={12}><ReviewStreamNumberSelection onSelectNumber={handleNumberSelection} label={"Number Of Streams"}/></Grid>
            {selectedNumber.map((item) => (
              <>
            <Grid item xs={12}><Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>Stream {item}</Typography></Grid>
            <Grid item xs={6}><ReviewFieldSelection onSelectField={handleFieldSelection} fieldNumber={item.toString()}/></Grid>
            <Grid item xs={6}><ReviewGrouping Field={selectedFields[`field${item}`]} onSelectStream={handleStreamSelection} streamNumber={item.toString()} onSelectStreamMinMax={handleMinMaxValues} onSelectStreamGraphTypes={handleGraphTypes} onSelectSpecialStream={handleSpecialStream}/></Grid>
            {selectedFields[`field${item}`]}{selectedStreams[`stream${item}`]}
            </>
          ))}
            </Grid> 
          </Box>
        </Item>
        </Grid>
        <Grid item xs={8}>
        <Item><ReviewChart expectedMaxValue={maxValues[`max${"1"}`]} expectedMinValue={minValues[`min${"1"}`]} expectedMaxValueTwo={maxValues[`max${"2"}`]} expectedMinValueTwo={minValues[`min${"2"}`]} seriesOneLapOne={validateData(selectedStreamsDataLap1[`stream1DataLap${1}`])} seriesTwoLapOne={validateData(selectedStreamsDataLap1[`stream2DataLap${1}`])} seriesOneLapTwo={validateData(selectedStreamsDataLap2[`stream1DataLap${2}`])} seriesTwoLapTwo={validateData(selectedStreamsDataLap2[`stream2DataLap${2}`])}numberOfStreams={selectedNumber.length} numberOfLaps={selectedNumberLaps.length} curves={graphTypesArray} leftLabel={selectedStreams[`stream${1}`]} rightLabel={selectedStreams[`stream${2}`]} label={getLabel(selectedStreams[`stream${1}`],selectedStreams[`stream${2}`])} stream1IsSpecial={selectedSpecialStream[`stream${1}isSpecial`]} stream2IsSpecial={selectedSpecialStream[`stream${2}isSpecial`]} XAxisData={lapTimeXAxis}/></Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Item> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>Secondary View Controller</Box></Item>
        </Grid>
        <Grid item xs={8}>
        <Item></Item>
        </Grid>
      </Grid>
    </Box>
    </Homepage></Box>
    </>
  );
}