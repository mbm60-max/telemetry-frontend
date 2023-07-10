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

function checkTrackStatus(track:string| string[] | undefined){
  if(typeof track === "string" ){
    return track
  }return '';
}
function getTrackPath(track:string| string[] | undefined){
  if(typeof track === "string" ){
    return "/images/" + track + ".svg";
  }return "/images/noTrack.svg";
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
  const [selectedNumber, setSelectedNumber] = React.useState([1]);
  
  const handleFieldSelection = (field: string, fieldNumber: string) => {
    setSelectedFields((prevFields) => ({
      ...prevFields,
      [`field${fieldNumber}`]: field,
    }));
  };
  
  const handleStreamSelection = (stream: string, streamNumber: string) => {
    setSelectedStreams((prevStreams) => ({
      ...prevStreams,
      [`stream${streamNumber}`]: stream,
    }));
  };
  
  const handleNumberSelection = (numberOfStreams: number) => {
    setSelectedNumber(Array.from({ length: numberOfStreams }, (_, index) => index + 1));
  };
  function handleExitReview(){
    router.push('/')
  }
  const { userName } = useContext(AuthContext);
  const username = userName;
  const lapDate = "1:30";
  useEffect(() => {
    const fetchData = async () => {
      try {
        const dataResponse: AxiosResponse = await axios.get('/api/retrivereviewdataapi', {
          params: { username, lapDate },
        });

        if (dataResponse.data.message === 'Success') {
          // Process the data
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [username, lapDate]);
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
            <Grid item xs={12}><Typography sx={{ fontSize: 24 }} color="text.secondary" gutterBottom>Primary View Controller select lap</Typography></Grid>
            <Grid item xs={12}><ReviewStreamNumberSelection onSelectNumber={handleNumberSelection}/></Grid>
            {selectedNumber.map((item) => (
              <>
            <Grid item xs={12}><Typography sx={{ fontSize: 17 }} color="text.secondary" gutterBottom>Stream {item}</Typography></Grid>
            <Grid item xs={6}><ReviewFieldSelection onSelectField={handleFieldSelection} fieldNumber={item.toString()}/></Grid>
            <Grid item xs={6}><ReviewGrouping Field={selectedFields[`field${item}`]} onSelectStream={handleStreamSelection} streamNumber={item.toString()}/></Grid>
            {selectedFields[`field${item}`]}{selectedStreams[`stream${item}`]}
            </>
          ))}
            </Grid> 
          </Box>
        </Item>
        </Grid>
        <Grid item xs={8}>
        <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={255} expectedMinValue={-1}  dataStream={throttleStream}></DynamicBasicChart></Item>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={4}>
        <Item> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}>Secondary View Controller</Box></Item>
        </Grid>
        <Grid item xs={8}>
        <Item><ReviewChart expectedMaxValue={10} expectedMinValue={0} expectedMaxValueTwo={100} expectedMinValueTwo={0} seriesOne={[1,2,3,4,5,6,7,8,]} seriesTwo={[8,7,6,5,4,6,7,8,]} numberOfStreams={2} curves={['stepline','straight']}/></Item>
        </Grid>
      </Grid>
    </Box>
    </Homepage></Box>
    </>
  );
}