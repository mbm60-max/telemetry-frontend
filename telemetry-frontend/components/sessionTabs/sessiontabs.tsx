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
import GearboxGrid from './gearbox';
import  trackData  from '../../data/trackData';
import TyresSuspensionGrid from './tyresSuspension';
import ActualWarningModal from '../warningDashboard/actualWarningModal';
import WarningInstance from '../../interfaces/warningInterface';
import { WarningContext } from '../authProviderWarnings';

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
  const { car, compound, track } = router.query;
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
    const [tireFL_SusHeight, setTireFL_SusHeight] = useState([{x: 0, y: 0}]);
    const [tireFR_SusHeight, setTireFR_SusHeight] = useState([{x: 0, y: 0}]);
    const [tireRL_SusHeight, setTireRL_SusHeight] = useState([{x: 0, y: 0}]);
    const [tireRR_SusHeight, setTireRR_SusHeight] = useState([{x: 0, y: 0}]);
    const [tireFL_TireRadiu, setTireFL_TireRadius] = useState([{x: 0, y: 0}]);
    const [tireFR_TireRadius, setTireFR_TireRadius] = useState([{x: 0, y: 0}]);
    const [tireRL_TireRadius, setTireRL_TireRadius] = useState([{x: 0, y: 0}]);
    const [tireRR_TireRadius, setTireRR_TireRadius] = useState([{x: 0, y: 0}]);
    const [wheelFL_RevPerSecond, setWheelFL_RevPerSecond] = useState([{x: 0, y: 0}]);
    const [wheelFR_RevPerSecond, setWheelFR_RevPerSecond] = useState([{x: 0, y: 0}]);
    const [wheelRL_RevPerSecond, setWheelRL_RevPerSecond] = useState([{x: 0, y: 0}]);
    const [wheelRR_RevPerSecond, setWheelRR_RevPerSecond] = useState([{x: 0, y: 0}]);
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
    const [turboBoost,setTurboBoost]= useState(0);
    const [inLapShifts, setInLapShifts] = useState(0);
    const [rpmStream, setRpmStream] = useState([{ x: 0, y: 0 }]);
    const [waterTempStream, setWaterTemperatureStream] = useState([{ x: 0, y: 0 }]);
    const [oilPressureStream, setOilPressureStream] = useState([{ x: 0, y: 0 }]);
    const [clutchEngagementStream,setClutchEngagementStream] = useState([{ x: 0, y: 0 }]);
    const [clutchPedalStream,setClutchPedalStream]= useState([{ x: 0, y: 0 }]);
    const [rpmClutchToGearboxStream,setRpmFromClutchToGearbox]= useState([{ x: 0, y: 0 }]);
    const [distanceFromStart, setDistanceFromStart] = useState(0);
    const signalRService = new SignalRService();
    useEffect(() => {
     signalRService.startConnection();
  
     return () => {
       signalRService.stopConnection();
      };
   }, []);
   const[isWarning,setIsWarning] = useState(false);
   const[activeWarnings,setActiveWarnings] = useState<WarningInstance[]>([]);
   const[suppressedWarnings,setSuppressedWarnings] = useState<WarningInstance[]>([]);
   const[acknowledgedWarnings,setAcknowledgedWarnings] = useState<WarningInstance[]>([]);
   
   const [valuesOfInterest,setValuesOfInterest]=useState(['test', 'test2', 'test3', 'brah']);  
  const [valueOfInterestUnits,setValuesOfInterestUnits]=useState(['KPH', 'RPM', 'M/S', 'KG']); 
  const [valuesOfInterestData,setValuesOfInterestData]=useState([1, 5, 3, 4]);
  const [valuesOfInterestDefaultLimits,setValuesOfInterestDefaultLimits]=useState([0, 105, 0, 100]);
  const [valuesOfInterestCurrentLimits, setValuesOfInterestCurrentLimits] = React.useState<{
    [key: string]: number;
  }>({});
  const [dashboardWarnings, setDashboardWarnings] = React.useState<{ [key: string]: string[] }>({
    dashboard1: ['test', 'test2', 'test3', 'brah'],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsUnits, setDashboardWarningsUnits] = React.useState<{ [key: string]: string[] }>({
    dashboard1: ['KPH', 'RPM', 'M/S', 'KG'],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsData, setDashboardWarningsData] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [1, 5, 3, 4],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsDefaultLimits, setDashboardWarningsDefaultLimits] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [0, 105, 0, 100],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsCurrentLimits, setDashboardWarningsCurrentLimits] = React.useState<{ [key: string]: {[key: string]: number;} }>({
    dashboard1: {},
    dashboard2: {"":0},
    dashboard3: {"":0},
    dashboard4: {"":0},
  });
  const handleSetValuesOfInterest = (newValue:string[],dashNumber: number)=>{
    setDashboardWarnings((prevDashboardWarnings) => ({
       ...prevDashboardWarnings,
      [`dashboard${dashNumber}`]: newValue,
    }));
};
const handleSetValuesOfInterestData = (newValue:number[],dashNumber: number)=>{
  setDashboardWarningsData((prevDashboardWarnings) => ({
    ...prevDashboardWarnings,
   [`dashboard${dashNumber}`]: newValue,
 }));
};
const handleSetValuesOfInterestDefaultLimits = (newValue:number[],dashNumber:number)=>{
  setDashboardWarningsDefaultLimits((prevDashboardWarnings) => ({
    ...prevDashboardWarnings,
   [`dashboard${dashNumber}`]: newValue,
 }));
};
const handleSetValuesOfInterestCurrentLimits = (newDict:{[key: string]: number;},dashNumber:number)=>{
  setDashboardWarningsCurrentLimits((prevDashboardWarnings) => ({
    ...prevDashboardWarnings,
   [`dashboard${dashNumber}`]: newDict,
 }));
};
const handleSetValuesOfInterestUnits = (newValue:string[],dashNumber: number)=>{
  setDashboardWarningsUnits((prevDashboardWarnings) => ({
    ...prevDashboardWarnings,
   [`dashboard${dashNumber}`]: newValue,
 }));
};
  
   function handlePacket (receivedExtendedPacket: ExtendedPacket){
    console.log('Received FullPacketMessage:', receivedExtendedPacket);
      //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
      var jsonString = JSON.stringify(receivedExtendedPacket);
      var parsedObject = JSON.parse(jsonString);
      const attributes=['throttle','brake','metersPerSecond','suggestedGear','currentGear','tireFL_SurfaceTemperature','tireFR_SurfaceTemperature','tireRL_SurfaceTemperature','tireRR_SurfaceTemperature','lastLapTime','bestLapTime','engineRPM','oilTemperature','minAlertRPM','maxAlertRPM','transmissionTopSpeed','calculatedMaxSpeed','oilPressure','waterTemperature','gasLevel','gasCapacity','turboBoost','rpmFromClutchToGearbox','clutchEngagement','clutchPedal','InLapShifts','distanceFromStart','tireFL_SusHeight','tireFR_SusHeight','tireRL_SusHeight','tireRR_SusHeight','tireFL_TireRadius','tireFR_TireRadius','tireRL_TireRadius','tireRR_TireRadius','wheelFL_RevPerSecond','wheelFR_RevPerSecond','wheelRL_RevPerSecond','wheelRR_RevPerSecond'];
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
            case 'turboBoost':
              appendNumberData(attributes[attribute],attributeValue)
            break;
            case 'InLapShifts':
              appendNumberData(attributes[attribute],attributeValue)
            break;
            case 'distanceFromStart':
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
  
  let mongoDbStatus= signalRService.handleMongoWriteFail;


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
      tireFL_SusHeight:setTireFL_SusHeight,
      tireFR_SusHeight:setTireFR_SusHeight,
      tireRL_SusHeight:setTireRL_SusHeight,
      tireRR_SusHeight:setTireRR_SusHeight,
      tireFL_TireRadius:setTireFL_TireRadius,
      tireFR_TireRadius:setTireFR_TireRadius,
      tireRL_TireRadius:setTireRL_TireRadius,
      tireRR_TireRadius:setTireRR_TireRadius,
      wheelFL_RevPerSecond:setWheelFL_RevPerSecond,
      wheelFR_RevPerSecond:setWheelFR_RevPerSecond,
      wheelRL_RevPerSecond:setWheelRL_RevPerSecond,
      wheelRR_RevPerSecond:setWheelRR_RevPerSecond,
      engineRPM: setRpmStream,
      oilTemperature: setOilTempStream,
      oilPressure: setOilPressureStream,
      waterTemperature: setWaterTemperatureStream,
      clutchPedal: setClutchPedalStream,
      rpmFromClutchToGearbox: setRpmFromClutchToGearbox,
      clutchEngagement: setClutchEngagementStream,
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
      turboBoost:setTurboBoost,
      InLapShifts:setInLapShifts,
      distanceFromStart:setDistanceFromStart,
    };
    const stateSetterNumber = stateSettersNumber[attribute];
    if(stateSetterNumber == setDistanceFromStart){
    stateSetterNumber(dataPoint);
  }else{
    stateSetterNumber(dataPoint);
  }
  };
  
  function getTrackDistancePercentage(track: string | string[] | undefined, dataPoint: number) {
    const trackInfo = trackData.find((item: { title: string | string[] }) => item.title === track);
    
    if (trackInfo && dataPoint != 0 && typeof track === "string") {
      const lapDistanceInMeters = trackInfo.distance;
      const distancePercentage = Math.round((dataPoint / lapDistanceInMeters) * 100);
      return distancePercentage;
    }
  
    return 0; // Default value when track is not found
  }
  function parseNumberStream(stream: { x: number; y: number; }[]) {
    if (stream.length === 0) {
      return -1;
    }
    
    const lastItem = stream[stream.length - 1];
    return lastItem.y;
  }
  
  function convertMpsToMph(dataPoint:number){
    return Math.round(dataPoint * 2.23694);
  }
  const handleIsWarning=()=>{
    if(!(activeWarnings)&&!(suppressedWarnings)){
      setIsWarning(false);
      return;
    }setIsWarning(true);
  }
  const updateWarningsArray = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
    setWarnings: React.Dispatch<React.SetStateAction<WarningInstance[]>>
  ) => {
    setWarnings((prevWarnings) => {
      if (add) {
        const warningInstance: WarningInstance = {
          newWarning,
          newWarningValue,
          newWarningUnits,
          newWarningLimit,
        };
        return [...prevWarnings, warningInstance];
      } else {
        console.log("previois")
        console.log(newWarning)
        console.log(prevWarnings.filter(
          (warning) =>
            warning.newWarning !== newWarning ||
            warning.newWarningValue !== newWarningValue ||
            warning.newWarningUnits !== newWarningUnits ||
            warning.newWarningLimit !== newWarningLimit 
        ));

        return prevWarnings.filter(
          (warning) =>
            warning.newWarning !== newWarning ||
            warning.newWarningValue !== newWarningValue ||
            warning.newWarningUnits !== newWarningUnits
        );
      }
    });
  };
  
  const handleActiveWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setActiveWarnings);
  };

  const handleSuppressedWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setSuppressedWarnings);
  };

  const handleAcknowledgedWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setAcknowledgedWarnings);
  };

  useEffect(() => {
    // Set the initial active warnings data

    // Set up an interval to trigger re-render every 5 seconds
    const rerenderInterval = setInterval(() => {
      // Create a new array by adding a unique identifier to each warning
      const updatedWarnings = activeWarnings.map((warning, index) => ({
        ...warning,
        id: `${warning.newWarning}-${index}-${Date.now()}`,
      }));
      setActiveWarnings(updatedWarnings);
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(rerenderInterval);
  }, [activeWarnings]);
  return (
    <> {activeWarnings.length > 0 ? (
      console.log(activeWarnings),
      activeWarnings.map((value, index) => (
        <>
        <ActualWarningModal key={value.id} activewarning={value} handleActiveWarnings={handleActiveWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings}/>
        </>
      ))
    ) : (
      <p>No active warnings.</p>
    )}
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
        <WhiteTextTab label="Custom Graph" {...a11yProps(5)} />
        </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0} >
      <GeneralGrid throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceFromStart)} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${1}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${1}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${1}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${1}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${1}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <EngineGrid throttleStream={throttleStream} lapTimer={lapTimer} oilTempStream={oilTempStream} rpmStream={rpmStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} oilPressureStream={oilPressureStream} waterTempStream={waterTempStream} gasCapacity={gasCapacity} gasLevel={gasLevel} turboBoost={turboBoost}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <GearboxGrid currentGearStream={currentGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} rpmStream={rpmStream} clutchEngagementStream={clutchEngagementStream} clutchPedalStream={clutchPedalStream} suggestedGearStream={suggestedGear} lapTimer={lapTimer} inLapShifts={inLapShifts}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TyresSuspensionGrid tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadiu} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        Setup
      </TabPanel>
      <TabPanel value={value} index={5}>
        {"Mongo Write Status" + mongoDbStatus};

      </TabPanel>
    </Box>
    </Homepage>
    </>
  );
}