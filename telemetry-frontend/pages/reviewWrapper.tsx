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
import { Button, Drawer, Modal, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import ReviewFieldSelection from '../components/review/reviewFieldSelection';
import ReviewGrouping from '../components/review/reviewGrouping';
import ReviewStreamNumberSelection from '../components/review/reviewStreamNumbeSelection';
import ReviewChart from '../components/review/reviewChart';
import axios, { AxiosResponse } from 'axios';
import { AuthContext } from '../components/authProvider';
import ReviewLapTable from '../components/review/reviewLapTable';
import ReviewLapSelection from '../components/review/reviewLapSelection';
import TuneIcon from '@mui/icons-material/Tune';
const DynamicBasicChart = dynamic(() => import('../components/sessionTabs/chart'), { 
  loader: () => import('../components/sessionTabs/chart'),
  ssr: false 
});

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
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




export default function ReviewWrapper() {
  const [controllerOpen, setControllerOpen] = useState(false);
  const [open, setOpen] = React.useState(false);
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
          if(lapSelection == 1){
            handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${1}`],parsedObject),1,selectedSpecialStream[`stream1isSpecial`])
            if(selectedNumber.length>=2){
              handleStreamDataLap1(parseSpecailStream(selectedStreams[`stream${2}`],parsedObject),2,selectedSpecialStream[`stream2isSpecial`]);
            }
            setLapDistanceXAxis(parsedObject.data["distanceFromStart"]);
          }else{
            handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${1}`],parsedObject),1,selectedSpecialStream[`stream1isSpecial`])
            if(selectedNumber.length>=2){
              handleStreamDataLap2(parseSpecailStream(selectedStreams[`stream${2}`],parsedObject),2,selectedSpecialStream[`stream2isSpecial`]);
            }
            setLapDistanceXAxisLap2(parsedObject.data["distanceFromStart"]);
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

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}>

        <Item>
          {!controllerOpen && <Button onClick={handleOpen}>Edit Graph Settings  <TuneIcon/></Button> }
          
          <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{ display: 'grid', gridGap: '16px', gridTemplateColumns: '1fr' }}>
        <Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>Primary View Controller select lap{userName}</Typography>
        <Grid container spacing={2}>
      <Grid item xs={6}>
        <ReviewStreamNumberSelection onSelectNumber={handleNumberLapsSelection} label={"Number Of Laps"} />
        {selectedNumberLaps.map((item) => (
          <>
            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>Lap {item}</Typography>
            <ReviewLapSelection onSelectLap={handleLapsSelection} lapNumber={item.toString()} availableLaps={availableLaps} />
            {selectedLaps[`lap${item}`]}{selectedStreamsDataLap1[`stream1DataLap${item}`]}{selectedStreamsDataLap2[`stream2DataLap${item}`]}
          </>
        ))}
        </Grid>
        <Grid item xs={6}>
        <ReviewStreamNumberSelection onSelectNumber={handleNumberSelection} label={"Number Of Streams"} />
        {selectedNumber.map((item) => (
          <>
            <Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>Stream {item}</Typography>
            <ReviewFieldSelection onSelectField={handleFieldSelection} fieldNumber={item.toString()} />
            <ReviewGrouping
              Field={selectedFields[`field${item}`]}
              onSelectStream={handleStreamSelection}
              streamNumber={item.toString()}
              onSelectStreamMinMax={handleMinMaxValues}
              onSelectStreamGraphTypes={handleGraphTypes}
              onSelectSpecialStream={handleSpecialStream}
            />
            {selectedFields[`field${item}`]}{selectedStreams[`stream${item}`]}
          </>
        ))}</Grid></Grid>
      </div>
    </Box>
  </Box>
</Modal>

    
<ReviewChart expectedMaxValue={maxValues[`max${"1"}`]} expectedMinValue={minValues[`min${"1"}`]} expectedMaxValueTwo={maxValues[`max${"2"}`]} expectedMinValueTwo={minValues[`min${"2"}`]} seriesOneLapOne={validateData(selectedStreamsDataLap1[`stream1DataLap${1}`])} seriesTwoLapOne={validateData(selectedStreamsDataLap1[`stream2DataLap${1}`])} seriesOneLapTwo={validateData(selectedStreamsDataLap2[`stream1DataLap${2}`])} seriesTwoLapTwo={validateData(selectedStreamsDataLap2[`stream2DataLap${2}`])} numberOfStreams={selectedNumber.length} numberOfLaps={selectedNumberLaps.length} curves={graphTypesArray} leftLabel={selectedStreams[`stream${1}`]} rightLabel={selectedStreams[`stream${2}`]} label={getLabel(selectedStreams[`stream${1}`], selectedStreams[`stream${2}`])} stream1IsSpecial={selectedSpecialStream[`stream${1}isSpecial`]} stream2IsSpecial={selectedSpecialStream[`stream${2}isSpecial`]} XAxisData={validateData(lapDistanceXAxis)} XAxisDataLap2={validateData(lapDistanceXAxisLap2)} height={250}/></Item>
        </Grid>
      </Grid>
    </Box>
    </>
  );
}