'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './sessiontab.css'
import Homepage from '../background/background';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Grid, Paper, useMediaQuery } from '@mui/material';
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
import SetupWrapper from '../setupTab.tsx/setupWrapper';
import axios, { AxiosResponse } from 'axios';
import SetupObject from '../../interfaces/setupDataInterface';
import SetupDataInterface from '../../interfaces/setupDataInterface';
import emptySetupObject from '../../data/emptySetupObject';
import { SettingsContext } from '../authProviderSettings';
import { Theme } from '@mui/material/styles';
import NavBar from '../navbar/navbar';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'left',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: 'rgba(132, 126, 126, 0)',
  boxShadow: 'none', // Override the shadow effect
}));

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
  const {defaults} = useContext(SettingsContext);
  const warningContext = useContext(WarningContext);
  const {
    dashboardWarningsCurrentLimits,
    setDashboardWarningsCurrentLimits,
    dashboardWarningsCurrentLimitsLower,
    setDashboardWarningsCurrentLimitsLower,
    activeWarnings,
    activeWarningsLower,
    acknowledgedWarnings,
    acknowledgedWarningsLower,
    updateWarningsArray,
    setAcknowledgedWarnings,
    setAcknowledgedWarningsLower,
    setActiveWarnings,
    setActiveWarningsLower
  } = warningContext;
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
    backgrounColor: 'red',
    maxWidth:'100%',
    '&:hover': {
      backgroundColor: '#FB9536',
      color: '#F6F6F6',
    },
  });
  const WhiteTextTabInner = styled(Tab)({
    maxWidth:'80%',
    '&:hover': {
      backgroundColor: 'purple',
      color: '#F6F6F6',
    },
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: '#F6F6F6', // Replace with your desired primary color
      },
      secondary: {
        main: '#FB9536', // Replace with your desired secondary color
      },
    },
  });

  function handleExitSession(){
    router.push('/')
  }
  const getEmptySetupObject = (): SetupDataInterface => {
    return {
      "Power Level": {
        Value: "",
        Units: "",
      },
      "Weight Reduction Level": {
        Value: "",
        Units: "",
      },
      "Power Ratio": {
        Value:"",
        Units: "%",
      },
      "Weight Reduction Ratio": {
        Value: "",
        Units: "%",
      },
      "Traction Control": {
        Value:"",
        Units: "",
      },
      "Brake Balance": {
        Value: "",
        Units: "",
      },
      "Ride Height": {
        Value:["", ""],
        Units: "mm",
      },
      "Natural Frequency": {
        Value: ["", ""],
        Units: "Hz",
      },
      "Anti Roll Bar": {
        Value: ["", ""],
        Units: "",
      },
      "Damping Ratio Compression": {
        Value: ["", ""],
        Units: "%",
      },
      "Damping Ratio Rebound": {
        Value: ["", ""],
        Units: "",
      },
      "Camber Angle": {
        Value: ["", ""],
        Units: "degrees",
      },
      "Toe Angle": {
        Value:["", ""],
        Units: "degrees",
      },
      "Downforce": {
        Value:["", ""],
        Units: "Nm",
      },
      "Differntial Gear": {
        Value: "",
        Units: "",
      },
      "LSD Initial Torque": {
        Value: ["", ""],
        Units: "?",
      },
      "LSD Acceleration Sensitivity": {
        Value: ["", ""],
        Units: "?",
      },
      "LSD Braking Sensitivity": {
        Value: ["", ""],
        Units: "?",
      },
      "Front Rear Torque Distribution": {
        Value: "",
        Units: "?",
      },
      "Transmission Type": {
        Value: "",
        Units: "",
      },
      "Max Speed (Auto Set)": {
        Value: "",
        Units: "mph",
      },
      "Gear Ratios": {
        Value:["", ""],
        Units: "ratio/max speed",
      },
      "Final Gear Ratio": {
        Value: "",
        Units: "",
      },
    };
  };
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
    const [setupData, setSetupData] = useState<SetupDataInterface>(getEmptySetupObject());
    const signalRService = new SignalRService(userName,defaults.defualtIPAddress,"sport");
    useEffect(() => {
     signalRService.startConnection();
  
     return () => {
       signalRService.stopConnection();
      };
   }, []);
   const[isWarning,setIsWarning] = useState(false);
   const[suppressedWarnings,setSuppressedWarnings] = useState<WarningInstance[]>([]);
 

  const [dashboardWarnings, setDashboardWarnings] = React.useState<{ [key: string]: string[] }>({
    dashboard1: ['Front Left Temp', 'Front Right Temp', 'Rear Left Temp', 'Rear Right Temp'],
    dashboard2: ["Oil Temperature","RPM","Turbo Boost Pressure","Oil Pressure","Fuel Level","Water Temperature"],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsUnits, setDashboardWarningsUnits] = React.useState<{ [key: string]: string[] }>({
    dashboard1: ['°C', '°C', '°C', '°C'],
    dashboard2: ['°C','RPM','bar','bar','%','°C'],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsData, setDashboardWarningsData] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [1, 5, 3, 4],
    dashboard2: [0,0,0,0,0,0],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsDefaultLimits, setDashboardWarningsDefaultLimits] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [105, 105, 105, 105],
    dashboard2: [0,0,0,0,0,0],
    dashboard3: [],
    dashboard4: [],
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
const handleSetValuesOfInterestCurrentLimits = (
  newDict: { [key: string]: number },
  dashNumber: number
) => {
  // Get the current dashboard warnings
  const currentDashboardWarnings = warningContext.dashboardWarningsCurrentLimits;

  // Update the specific dashboard with the newDict
  currentDashboardWarnings[`dashboard${dashNumber}`] = newDict;

  // Set the updated dashboard warnings using the setter function
  warningContext.setDashboardWarningsCurrentLimits(currentDashboardWarnings);
};
const handleSetValuesOfInterestCurrentLimitsLower = (
  newDict: { [key: string]: number },
  dashNumber: number
) => {
  // Get the current dashboard warnings
  const currentDashboardWarningsLower = warningContext.dashboardWarningsCurrentLimitsLower;

  // Update the specific dashboard with the newDict
  currentDashboardWarningsLower[`dashboard${dashNumber}`] = newDict;

  // Set the updated dashboard warnings using the setter function
  warningContext.setDashboardWarningsCurrentLimitsLower(currentDashboardWarningsLower);
};

const handleSetValuesOfInterestUnits = (newValue:string[],dashNumber: number)=>{
  setDashboardWarningsUnits((prevDashboardWarnings) => ({
    ...prevDashboardWarnings,
   [`dashboard${dashNumber}`]: newValue,
 }));
};
  
const [packetFlag,setPacketFlag] = useState(false);

   function handlePacket (receivedExtendedPacket: ExtendedPacket){
    setPacketFlag(!packetFlag);
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
        const newArray = [...oldArray, { x: distanceFromStart, y: convertMpsToMph(dataPoint) }];
        if (newArray.length > 30) {
          return newArray.slice(1);
        }
        return newArray;
      });
    }
    else if (stateSetter) {
      stateSetter((oldArray) => {
        const prev = oldArray[oldArray.length - 1];
        const newArray = [...oldArray, { x: distanceFromStart, y: dataPoint }];
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

  const handleActiveWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setActiveWarnings);
  };
  const handleActiveWarningsLower = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setActiveWarningsLower);
  };
  const handleAcknowledgedWarningsLower = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit,setAcknowledgedWarningsLower);
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
  useEffect(() => {
    // Set the initial active warnings data

    // Set up an interval to trigger re-render every 5 seconds
    const rerenderInterval = setInterval(() => {
      // Create a new array by adding a unique identifier to each warning
      const updatedWarnings = activeWarningsLower.map((warning, index) => ({
        ...warning,
        id: `${warning.newWarning}-${index}-${Date.now()}`,
      }));
      setActiveWarningsLower(updatedWarnings);
    }, 5000); // 5000 milliseconds (5 seconds)

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(rerenderInterval);
  }, [activeWarningsLower]);


  const setupValue = router.query.setup;
  const handleGetSetup = async () => {
    console.log(userName)
    const username=userName
    const setupname=setupValue
    try {
      const setupResponse: AxiosResponse = await axios.get('/api/retrieveSetupInfo', {
        params: { username, setupname },
      });
      
      console.log('Setup response:', setupResponse.data);
      const setupContainer= setupResponse.data
      setSetupData(setupContainer.setupData.setupObject)
    } catch (error) {
      console.error('Error fetching setup:', error);
    }
  };

  useEffect(() => {
    handleGetSetup();
  }, []);
  
  const isMobile = useMediaQuery('(max-width:750px)')

  return (
    <> {activeWarnings.length > 0 ? (
      activeWarnings.map((value, index) => (
        <>
        <ActualWarningModal key={value.id} activewarning={value} handleActiveWarnings={handleActiveWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} isHigherWarning={true}/>
        </>
      ))
    ) : (
      <p>No active warnings.</p>
    )}
    {activeWarningsLower.length > 0 ? (
      activeWarningsLower.map((value, index) => (
        <>
        <ActualWarningModal key={value.id} activewarning={value} handleActiveWarnings={handleActiveWarningsLower} handleAcknowledgedWarnings={handleAcknowledgedWarningsLower} isHigherWarning={false}/>
        </>
      ))
    ) : (
      <p>No active warnings.</p>
    )}
        <Homepage style={'homepage-containerXG'}>
    <Grid item xs={12}>
              <Homepage style={'navbar-container'}>
                <Item><NavBar /></Item>
              </Homepage></Grid>
    <Box sx={{ width: '100%' }}>
    
      <ThemeProvider theme={theme}>
      <Tabs value={value} textColor="primary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example" centered orientation={isMobile ? 'vertical' : 'horizontal'}>
        <WhiteTextTab label="General" {...a11yProps(0)} />
        <WhiteTextTab label="Engine" {...a11yProps(1)} />
        <WhiteTextTab label="Gearbox" {...a11yProps(2)} />
        <WhiteTextTab label="Tyres/Suspension" {...a11yProps(3)} />
        <WhiteTextTab label="Setup" {...a11yProps(4)} />
        <WhiteTextTab label="Custom Graph" {...a11yProps(5)} />
        </Tabs>
        </ThemeProvider>
      
      <TabPanel value={value} index={0} >
      <GeneralGrid throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceFromStart)} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${1}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${1}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${1}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${1}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${1}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${1}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
      <EngineGrid throttleStream={throttleStream} lapTimer={lapTimer} oilTempStream={oilTempStream} rpmStream={rpmStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} oilPressureStream={oilPressureStream} waterTempStream={waterTempStream} gasCapacity={gasCapacity} gasLevel={gasLevel} turboBoost={turboBoost} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${2}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${2}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${2}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${2}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${2}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${2}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
      <GearboxGrid currentGearStream={currentGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} rpmStream={rpmStream} clutchEngagementStream={clutchEngagementStream} clutchPedalStream={clutchPedalStream} suggestedGearStream={suggestedGear} lapTimer={lapTimer} inLapShifts={inLapShifts}/>
      </TabPanel>
      <TabPanel value={value} index={3}>
      <TyresSuspensionGrid tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadiu} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <SetupWrapper setupData={setupData} />
      </TabPanel>
      <TabPanel value={value} index={5}>
        {"Mongo Write Status" + mongoDbStatus};

      </TabPanel>
    </Box>
    </Homepage>
    </>
  );
}