'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './sessiontab.css'
import Homepage from '../background/background';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button } from '@mui/material';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authProvider';
import { useRouter } from 'next/router';
import SignalRService from '../../utils/signalrEndpoint';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import GeneralGrid from './flexgridGeneral';
import EngineGrid from './engineGrid';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}


export default function BasicTabs() {
  const router = useRouter();
  const { isLoggedIn, userName } = useContext(AuthContext);
  const DynamicChart = dynamic(() => import('./chart'), { 
    loader: () => import('./chart'),
    ssr: false 
  });
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  
  const WhiteTextTab = styled(Tab)({
    color: '#F6F6F6',
    backgrounColor: '#847E7E',
    '&:hover': {
      backgroundColor: '#DA2E22',
      color: '#F6F6F6',
    },
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#F6F6F6', // Replace with your desired primary color
      },
      secondary: {
        main: '#DA2E22', // Replace with your desired secondary color
      },
    },
  });

  function handleExitSession(){
    router.push('/')
  }

    const [throttleStream, setThrottleStream] = useState([{ x: 0, y: 0 }]);
    const [brakeStream, setBrakeStream] = useState([{ x: 0, y: 0 }]);
    const [speedStream, setSpeedStream] = useState([{ x: 0, y: 0 }]);
    const [suggestedGear,setSuggestedGear] = useState([{ x: 0, y: 0 }]);
    const [currentGear,setCurrentGear] = useState([{ x: 0, y: 0 }]);
    const [frontLeftTemp, setFrontLeftTemp] = useState([{ x: 0, y: 0 }]);
    const [frontRightTemp, setFrontRightTemp] = useState([{ x: 0, y: 0 }]);
    const [rearLeftTemp, setRearLeftTemp] = useState([{ x: 0, y: 0 }]);
    const [rearRightTemp, setRearRightTemp] = useState([{ x: 0, y: 0 }]);
    const [lastLapTime, setLastLapTime] = useState('');
    const [bestLapTime, setBestLapTime] = useState('');
    const [lapTimer, setLapTimer] = useState('');
    const [oilTempStream, setOilTempStream] = useState([{ x: 0, y: 0 }]);
    const [minAlertRPM, setMinAlertRpm] = useState(0);
    const [maxAlertRPM, setMaxAlertRpm] = useState(0);
    const [calculatedMaxSpeed,setCalculatedMaxSpeed]= useState(0);
    const [transmissionTopSpeed,setTransmissionTopSpeed]= useState(0);
    const [gasCapacity,setGasCapacity]= useState(0);
    const [gasLevel,setGasLevel]= useState(0);
    const [rpmStream, setRpmStream] = useState([{ x: 0, y: 0 }]);
    const [waterTempStream, setWaterTemperatureStream] = useState([{ x: 0, y: 0 }]);
    const [oilPressureStream, setOilPressureStream] = useState([{ x: 0, y: 0 }]);
    const signalRService = new SignalRService();
    useEffect(() => {
     signalRService.startConnection();
  
     return () => {
       signalRService.stopConnection();
      };
   }, []);
  
  
   function handlePacket (receivedExtendedPacket: ExtendedPacket){
    console.log('Received FullPacketMessage:', receivedExtendedPacket);
      //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
      var jsonString = JSON.stringify(receivedExtendedPacket);
      var parsedObject = JSON.parse(jsonString);
      const attributes=['throttle','brake','metersPerSecond','suggestedGear','currentGear','tireFL_SurfaceTemperature','tireFR_SurfaceTemperature','tireRL_SurfaceTemperature','tireRR_SurfaceTemperature','lastLapTime','bestLapTime','engineRPM','oilTemperature','minAlertRPM','maxAlertRPM','transmissionTopSpeed','calculatedMaxSpeed','oilPressure','waterTemperature','gasLevel','gasCapacity'];
      var timerValue = parsedObject['lapTiming'];
  
      setLapTimer(timerValue);
      for(const attribute in attributes){
        var attributeValue = parsedObject[attributes[attribute]];
        if (attributeValue !== undefined && typeof attributeValue == "string") {
          appendStringData(attributes[attribute],attributeValue); 
        }else if(attributeValue !== undefined && typeof attributeValue != "string"){
          switch(attributes[attribute]){
            case 'minAlertRPM':
              appendNumberData(attributes[attribute],attributeValue)
              break;
            case 'maxAlertRPM':
              appendNumberData(attributes[attribute],attributeValue)
            break;
            case 'transmissionTopSpeed':
              appendNumberData(attributes[attribute],attributeValue)
              break;
            case 'calculatedMaxSpeed':
              appendNumberData(attributes[attribute],attributeValue)
            break;
            case 'gasCapacity':
              appendNumberData(attributes[attribute],attributeValue)
              break;
            case 'gasLevel':
              appendNumberData(attributes[attribute],attributeValue)
            break;
            default:
              appendData(attributes[attribute],attributeValue); 
              break;
          }
        }
  
      }
    };
  
    
    useEffect(() => {
    signalRService.setHandleFullPacket(handlePacket);
  
    return () => {
      signalRService.removeHandleFullPacket();
    };
  }, []);
  
  
  type StateSetters = Record<string, React.Dispatch<React.SetStateAction<{ x: number; y: number; }[]>>>;
  const appendData = (attribute: string, dataPoint: number) => {
    const stateSetters: StateSetters = {
      throttle: setThrottleStream,
      brake: setBrakeStream,
      metersPerSecond: setSpeedStream,
      suggestedGear: setSuggestedGear,
      currentGear: setCurrentGear,
      tireFL_SurfaceTemperature: setFrontLeftTemp,
      tireRL_SurfaceTemperature: setRearLeftTemp,
      tireFR_SurfaceTemperature: setFrontRightTemp,
      tireRR_SurfaceTemperature: setRearRightTemp,
      engineRPM: setRpmStream,
      oilTemperature: setOilTempStream,
      oilPressure: setOilPressureStream,
      waterTemperature: setWaterTemperatureStream,
    };
    const stateSetter = stateSetters[attribute];
    if(stateSetter == setSpeedStream){
      stateSetter((oldArray) => {
        const prev = oldArray[oldArray.length - 1];
        const newArray = [...oldArray, { x: prev.x + 1, y: convertMpsToMph(dataPoint) }];
        if (newArray.length > 30) {
          return newArray.slice(1);
        }
        return newArray;
      });
    }
    else if (stateSetter) {
      stateSetter((oldArray) => {
        const prev = oldArray[oldArray.length - 1];
        const newArray = [...oldArray, { x: prev.x + 1, y: dataPoint }];
        if (newArray.length > 30) {
          return newArray.slice(1);
        }
        return newArray;
      });
    }
  };
  type StateSettersStrings = Record<string, React.Dispatch<React.SetStateAction<string>>>;
  const appendStringData = (attribute: string, dataPoint: string) => {
    const stateSettersStrings: StateSettersStrings = {
      lastLapTime:setLastLapTime,
      bestLapTime:setBestLapTime,
    };
    const stateSetterStrings = stateSettersStrings[attribute];
    if (stateSetterStrings) {
      stateSetterStrings(dataPoint);
    }
  };

  type StateSettersNumber = Record<string, React.Dispatch<React.SetStateAction<number>>>;
  const appendNumberData = (attribute: string, dataPoint: number) => {
    const stateSettersNumber: StateSettersNumber = {
      minAlertRPM:setMinAlertRpm,
      maxAlertRPM:setMaxAlertRpm,
      calculatedMaxSpeed:setCalculatedMaxSpeed,
      transmissionTopSpeed:setTransmissionTopSpeed,
      gasCapacity:setGasCapacity,
      gasLevel:setGasLevel,
    };
    const stateSetterNumber = stateSettersNumber[attribute];
    if (stateSetterNumber) {
      stateSetterNumber(dataPoint);
    }
  };
  
  function parseNumberStream(stream: { x: number; y: number; }[]) {
    if (stream.length === 0) {
      return -1;
    }
    
    const lastItem = stream[stream.length - 1];
    return lastItem.y;
  }
  
  console.log(lapTimer);
  function convertMpsToMph(dataPoint:number){
    return Math.round(dataPoint * 2.23694);
  }
  return (
    <>
        <Homepage style={'homepage'}>
    <Box className='header'><Button onClick={handleExitSession}>Exit Session</Button></Box>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <ThemeProvider theme={theme}>
        <Tabs value={value} textColor="primary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example" centered >
        <WhiteTextTab label="General" {...a11yProps(0)} />
        <WhiteTextTab label="Engine" {...a11yProps(1)} />
        <WhiteTextTab label="Gearbox" {...a11yProps(2)} />
        <WhiteTextTab label="Tyres/Suspension" {...a11yProps(3)} />
        <WhiteTextTab label="Setup" {...a11yProps(4)} />
        <WhiteTextTab label="blah" {...a11yProps(5)} />
        </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0} >
      <GeneralGrid throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <EngineGrid throttleStream={throttleStream} lapTimer={lapTimer} oilTempStream={oilTempStream} rpmStream={rpmStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} oilPressureStream={oilPressureStream} waterTempStream={waterTempStream} gasCapacity={gasCapacity} gasLevel={gasLevel}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four<h1>hi</h1>
      </TabPanel>
      <TabPanel value={value} index={4}>
        Setup
      </TabPanel>
      <TabPanel value={value} index={5}>
        {userName}
      </TabPanel>
    </Box>
    </Homepage>
    </>
  );
}