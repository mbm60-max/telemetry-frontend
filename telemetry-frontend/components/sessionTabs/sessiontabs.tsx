'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import './sessiontab.css'
import Homepage from '../background/background';
import { styled } from '@mui/material/styles';
import { createTheme } from '@mui/material';

import { ThemeProvider } from '@mui/material/styles';
import { Button, Grid, Paper, useMediaQuery } from '@mui/material';
import dynamic from 'next/dynamic';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../authProvider';
import { useRouter } from 'next/router';
import SignalRService from '../../utils/signalrEndpoint';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import trackData from '../../data/trackData';
import ActualWarningModal from '../warningDashboard/actualWarningModal';
import WarningInstance from '../../interfaces/warningInterface';
import { WarningContext } from '../authProviderWarnings';
import SetupWrapper from '../setupTab.tsx/setupWrapper';
import axios, { AxiosResponse } from 'axios';
import SetupDataInterface from '../../interfaces/setupDataInterface';
import { SettingsContext } from '../authProviderSettings';
import NavBar from '../navbar/navbar';
import isNewLapCheck from '../../utils/isNewLapCheck';
import GridWarningConsumer from '../warningDashboard/activeWarningFunctions/handlesSetLimits';
import convertMpsToMph, { convertBarsToPsi, convertCelciusToFahrenheit, convertMetresToFeet, convertMMToInches, convertMpsToKMH, convertToPercentage,convertKPAToPSI,convertLitresToGallons, convertNegativeToZero, convertWheelRPS } from '../../utils/converters';
import { alterSuggestedForGraph } from '../../utils/alterSuggestedGear';
import convertSecondsToTime, { convertTimeToSeconds } from '../../utils/secondsToString';

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
  const { car, compound, track, challenge } = router.query;
  const { isLoggedIn, userName } = useContext(AuthContext);
  const { defaults, alerts } = useContext(SettingsContext);
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
    setActiveWarningsLower,
    dashboardWarningsNames,
    setDashboardWarningsNames,
    setDashboardWarningsUnitsTest,
    dashboardWarningsUnitsTest
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
    maxWidth: '100%',
    '&:hover': {
      backgroundColor: '#FB9536',
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

  function handleExitSession() {
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
        Value: "",
        Units: "%",
      },
      "Weight Reduction Ratio": {
        Value: "",
        Units: "%",
      },
      "Traction Control": {
        Value: "",
        Units: "",
      },
      "Brake Balance": {
        Value: "",
        Units: "",
      },
      "Ride Height": {
        Value: ["", ""],
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
        Value: ["", ""],
        Units: "degrees",
      },
      "Downforce": {
        Value: ["", ""],
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
        Value: ["", ""],
        Units: "ratio/max speed",
      },
      "Final Gear Ratio": {
        Value: "",
        Units: "",
      },
    };
  };
  const [throttleStream, setThrottleStream] = useState([{ x: 0, y: -1 }]);
  const [brakeStream, setBrakeStream] = useState([{ x: 0, y: -1 }]);
  const [speedStream, setSpeedStream] = useState([{ x: 0, y: -1 }]);
  const [suggestedGear, setSuggestedGear] = useState([{ x: 0, y: -1 }]);
  const [currentGear, setCurrentGear] = useState([{ x: 0, y: -1 }]);
  const [frontLeftTemp, setFrontLeftTemp] = useState([{ x: 0, y: -1 }]);
  const [frontRightTemp, setFrontRightTemp] = useState([{ x: 0, y: -1 }]);
  const [rearLeftTemp, setRearLeftTemp] = useState([{ x: 0, y: -1 }]);
  const [rearRightTemp, setRearRightTemp] = useState([{ x: 0, y: 2 }]);
  const [tireFL_SusHeight, setTireFL_SusHeight] = useState([{ x: 0, y: -1 }]);
  const [tireFR_SusHeight, setTireFR_SusHeight] = useState([{ x: 0, y: -1 }]);
  const [tireRL_SusHeight, setTireRL_SusHeight] = useState([{ x: 0, y: -1 }]);
  const [tireRR_SusHeight, setTireRR_SusHeight] = useState([{ x: 0, y: -1 }]);
  const [tireFL_TireRadius, setTireFL_TireRadius] = useState([{ x: 0, y: -1 }]);
  const [tireFR_TireRadius, setTireFR_TireRadius] = useState([{ x: 0, y: -1 }]);
  const [tireRL_TireRadius, setTireRL_TireRadius] = useState([{ x: 0, y: -1 }]);
  const [tireRR_TireRadius, setTireRR_TireRadius] = useState([{ x: 0, y: -1 }]);
  const [wheelFL_RevPerSecond, setWheelFL_RevPerSecond] = useState([{ x: 0, y: -1 }]);
  const [wheelFR_RevPerSecond, setWheelFR_RevPerSecond] = useState([{ x: 0, y: -1 }]);
  const [wheelRL_RevPerSecond, setWheelRL_RevPerSecond] = useState([{ x: 0, y: -1 }]);
  const [wheelRR_RevPerSecond, setWheelRR_RevPerSecond] = useState([{ x: 0, y: -1 }]);
  const [lastLapTime, setLastLapTime] = useState('');
  const [bestLapTime, setBestLapTime] = useState('');
  const [lapCount, setLapCount] = useState(-1);
  const [lapTimer, setLapTimer] = useState('');
  const [fuelStartLap, setFuelStartLap] = useState(-1);
  const [previousLapCount, setPreviousLapCount] = useState(-1);
  const [oilTempStream, setOilTempStream] = useState([{ x: 0, y: -1 }]);
  const [minAlertRPM, setMinAlertRpm] = useState(-1);
  const [maxAlertRPM, setMaxAlertRpm] = useState(-1);
  const [calculatedMaxSpeed, setCalculatedMaxSpeed] = useState(-1);
  const [transmissionTopSpeed, setTransmissionTopSpeed] = useState(-1);
  const [gasCapacity, setGasCapacity] = useState(-1);
  const [gasLevel, setGasLevel] = useState(-1);
  const [turboBoost, setTurboBoost] = useState(-1);
  const [inLapShifts, setInLapShifts] = useState(-1);
  const [rpmStream, setRpmStream] = useState([{ x: 0, y: -1 }]);
  const [waterTempStream, setWaterTemperatureStream] = useState([{ x: 0, y: -1 }]);
  const [oilPressureStream, setOilPressureStream] = useState([{ x: 0, y: -1 }]);
  const [clutchEngagementStream, setClutchEngagementStream] = useState([{ x: 0, y: -1 }]);
  const [clutchPedalStream, setClutchPedalStream] = useState([{ x: 0, y: -1 }]);
  const [rpmClutchToGearboxStream, setRpmFromClutchToGearbox] = useState([{ x: 0, y: -1 }]);
  const [setupData, setSetupData] = useState<SetupDataInterface>(getEmptySetupObject());
  const [distanceValue, setDistanceValue] = useState(-1);
  const signalRService = new SignalRService(userName, "192.168.1.200", "sport");//change to ip address
  useEffect(() => {
    signalRService.startConnection();

    return () => {
      signalRService.stopConnection();
    };
  }, []);
  const [isWarning, setIsWarning] = useState(false);
  const [suppressedWarnings, setSuppressedWarnings] = useState<WarningInstance[]>([]);


  const [dashboardWarnings, setDashboardWarnings] = React.useState<{ [key: string]: string[] }>({
    dashboard1: [],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsUnits, setDashboardWarningsUnits] = React.useState<{ [key: string]: string[] }>({
    dashboard1: [],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });

  const [dashboardWarningsData, setDashboardWarningsData] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });
  const [dashboardWarningsDefaultLimits, setDashboardWarningsDefaultLimits] = React.useState<{ [key: string]: number[] }>({
    dashboard1: [],
    dashboard2: [],
    dashboard3: [],
    dashboard4: [],
  });

  const handleSetValuesOfInterest = (newValue: string[], dashNumber: number) => {
    setDashboardWarnings((prevDashboardWarnings) => ({
      ...prevDashboardWarnings,
      [`dashboard${dashNumber}`]: newValue,
    }));
  };

  useEffect(() => {
    const dashboardValues: { index: number; names: string[] }[] = [];
    let indexValue = 1;
    for (const dashboardKey in dashboardWarningsNames) {
      if (dashboardWarningsNames.hasOwnProperty(dashboardKey)) {
        const namesObj = dashboardWarningsNames[dashboardKey];
        const names = Object.values(namesObj);
        dashboardValues.push({ index: indexValue, names });
        indexValue += 1;
      }

    }

    dashboardValues.forEach(({ index, names }) => {

      handleSetValuesOfInterest(names, index);
    });
  }, [dashboardWarningsNames]);


  const handleSetValuesOfInterestData = (newValue: number[], dashNumber: number) => {
    setDashboardWarningsData((prevDashboardWarnings) => ({
      ...prevDashboardWarnings,
      [`dashboard${dashNumber}`]: newValue,
    }));
  };
  const handleSetValuesOfInterestDefaultLimits = (newValue: number[], dashNumber: number) => {
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

  const handleSetValuesOfInterestUnits = (newValue: string[], dashNumber: number) => {
    setDashboardWarningsUnits((prevDashboardWarnings) => ({
      ...prevDashboardWarnings,
      [`dashboard${dashNumber}`]: newValue,
    }));
  };

  useEffect(() => {
    const dashboardValues: { index: number; units: string[] }[] = [];
    let indexValue = 1;
    for (const dashboardKey in dashboardWarningsUnitsTest) {
      if (dashboardWarningsUnitsTest.hasOwnProperty(dashboardKey)) {
        const unitsObj = dashboardWarningsUnitsTest[dashboardKey];
        const units = Object.values(unitsObj);
        dashboardValues.push({ index: indexValue, units });
        indexValue += 1;
      }

    }

    dashboardValues.forEach(({ index, units }) => {
      handleSetValuesOfInterestUnits(units, index);
    });
  }, []);

  const resetFuelData = () => {
    const isNewLap = isNewLapCheck(lapCount, previousLapCount);
    if (isNewLap) {
      setPreviousLapCount(lapCount);
      setFuelStartLap(gasLevel);
    }
  }

  const [packetFlag, setPacketFlag] = useState(false);

  function handlePacket(receivedExtendedPacket: ExtendedPacket) {
    setPacketFlag(!packetFlag);
    //console.log('Received FullPacketMessage:', receivedExtendedPacket);
    //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
    var jsonString = JSON.stringify(receivedExtendedPacket);
    var parsedObject = JSON.parse(jsonString);
    const attributes = ['throttle', 'brake', 'metersPerSecond', 'suggestedGear', 'currentGear', 'tireFL_SurfaceTemperature', 'tireFR_SurfaceTemperature', 'tireRL_SurfaceTemperature', 'tireRR_SurfaceTemperature', 'lastLapTime', 'bestLapTime', 'engineRPM', 'oilTemperature', 'minAlertRPM', 'maxAlertRPM', 'transmissionTopSpeed', 'calculatedMaxSpeed', 'oilPressure', 'waterTemperature', 'gasLevel', 'gasCapacity', 'turboBoost', 'rpmFromClutchToGearbox', 'clutchEngagement', 'clutchPedal', 'inLapShifts', 'tireFL_SusHeight', 'tireFR_SusHeight', 'tireRL_SusHeight', 'tireRR_SusHeight', 'tireFL_TireRadius', 'tireFR_TireRadius', 'tireRL_TireRadius', 'tireRR_TireRadius', 'wheelFL_RevPerSecond', 'wheelFR_RevPerSecond', 'wheelRL_RevPerSecond', 'wheelRR_RevPerSecond'];
    var timerValue = parsedObject['lapTiming'];
    var distanceFromStart = parsedObject['distanceFromStart'];
    setDistanceValue(distanceFromStart);
    setLapTimer(timerValue);
    let  distanceInCorrectUnits = 0;
    const isMetric = defaults.defaultUnitsMetric;
    if(isMetric){
      distanceInCorrectUnits = distanceFromStart
    }else{
      distanceInCorrectUnits =  convertMetresToFeet(distanceFromStart)
    }
    for (const attribute in attributes) {
      var attributeValue = parsedObject[attributes[attribute]];
      if (attributeValue !== undefined && typeof attributeValue == "string") {
        appendStringData(attributes[attribute], attributeValue);
      } else if (attributeValue !== undefined && typeof attributeValue != "string") {
        switch (attributes[attribute]) {
          case 'minAlertRPM':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'maxAlertRPM':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'lapCount':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'transmissionTopSpeed':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'calculatedMaxSpeed':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'gasCapacity':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'gasLevel':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'turboBoost':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'inLapShifts':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          case 'distanceFromStart':
            appendNumberData(attributes[attribute], attributeValue)
            break;
          default:
            appendData(attributes[attribute], attributeValue, distanceInCorrectUnits);
            break;
        }
      }

    }
    resetFuelData();
  };


  useEffect(() => {
    signalRService.setHandleFullPacket(handlePacket);

    return () => {
      signalRService.removeHandleFullPacket();
    };
  }, []);

  let mongoDbStatus = signalRService.handleMongoWriteFail;

  const getConversionNormalTypes = (
    stateSetter: React.Dispatch<React.SetStateAction<{ x: number; y: number; }[]>>,
    dataPoint: number,
    isMetric: boolean
  ): number => {
    switch (stateSetter) {
      case setSpeedStream:
        if (isMetric) {
          return convertMpsToKMH(convertNegativeToZero(dataPoint));
        } else {
          return convertMpsToMph(dataPoint);
        }
      case setThrottleStream:
        return convertToPercentage(dataPoint, 255);
      case setBrakeStream:
        return convertToPercentage(dataPoint, 255);
      case setSuggestedGear:
        return alterSuggestedForGraph(dataPoint);
      case setCurrentGear:
        return convertNegativeToZero(dataPoint);
      case setFrontLeftTemp:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setRearLeftTemp:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setFrontRightTemp:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setRearRightTemp:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setTireFL_SusHeight://*1000 converts from metres to mm
        if (isMetric) {
          return convertNegativeToZero(dataPoint)*1000;
        } else {
          convertMMToInches(dataPoint*1000);
        }
      case setTireFR_SusHeight:
        if (isMetric) {
          return convertNegativeToZero(dataPoint)*1000;
        } else {
          convertMMToInches(dataPoint*1000);
        }
      case setTireRL_SusHeight:
        if (isMetric) {
          return convertNegativeToZero(dataPoint)*1000;
        } else {
          convertMMToInches(dataPoint*1000);
        }
      case setTireRR_SusHeight:
        if (isMetric) {
          return convertNegativeToZero(dataPoint)*1000;
        } else {
          convertMMToInches(dataPoint*1000);
        }
      case setTireFL_TireRadius:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertMetresToFeet(dataPoint);
        }
      case setTireFR_TireRadius:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertMetresToFeet(dataPoint);
        }
      case setTireRL_TireRadius:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertMetresToFeet(dataPoint);
        }
      case setTireRR_TireRadius:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertMetresToFeet(dataPoint);
        }
      case setWheelFL_RevPerSecond:
        return convertWheelRPS(dataPoint); 
      case setWheelFR_RevPerSecond:
        return convertWheelRPS(dataPoint); 
      case setWheelRL_RevPerSecond:
        return convertWheelRPS(dataPoint); 
      case setWheelRR_RevPerSecond:
        return convertWheelRPS(dataPoint); 
      case setRpmStream:
        return convertNegativeToZero(dataPoint);
      case setOilTempStream:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setOilPressureStream:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertBarsToPsi(dataPoint);
        }
      case setWaterTemperatureStream:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertCelciusToFahrenheit(dataPoint);
        }
      case setClutchPedalStream:
        return convertToPercentage(dataPoint, 1);
      case setRpmFromClutchToGearbox:
        return convertNegativeToZero(dataPoint);
      case setClutchEngagementStream:
        return convertToPercentage(dataPoint, 1);
      // Add more cases for other stateSetters as needed
      default:
        return convertNegativeToZero(dataPoint);
    }
  };
  const getConversionNumbersSpecific = (
    stateSetterNumber:React.Dispatch<React.SetStateAction<number>>,
    dataPoint: number,
    isMetric: boolean
  ): number => {
    switch (stateSetterNumber) {
      case setMinAlertRpm:
        return convertNegativeToZero(dataPoint);
      case setMaxAlertRpm:
        return convertNegativeToZero(dataPoint);
      case setLapCount:
        return convertNegativeToZero(dataPoint);
      case setCalculatedMaxSpeed:
        if (isMetric) {
          convertMpsToKMH(convertNegativeToZero(dataPoint));
        } else {
          return convertMpsToMph(dataPoint);
        }
      case setTransmissionTopSpeed:
        if (isMetric) {
          convertMpsToKMH(convertNegativeToZero(dataPoint));
        } else {
          return convertMpsToMph(dataPoint);
        }
      case setGasCapacity:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertLitresToGallons(dataPoint);
        }
      case setGasLevel:
        if (isMetric) {
          return convertNegativeToZero(dataPoint);
        } else {
          convertLitresToGallons(dataPoint);
        }
      case setTurboBoost:
        if (isMetric) {
          return  convertNegativeToZero(dataPoint);
        } else {
          return convertKPAToPSI(dataPoint);
        }
      case setInLapShifts:
        return convertNegativeToZero(dataPoint);
      default:
        return convertNegativeToZero(dataPoint);
    }
  }
  type StateSetters = Record<string, React.Dispatch<React.SetStateAction<{ x: number; y: number; }[]>>>;
  const appendData = (attribute: string, dataPoint: number, distanceFromStart: number) => {
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
      tireFL_SusHeight: setTireFL_SusHeight,
      tireFR_SusHeight: setTireFR_SusHeight,
      tireRL_SusHeight: setTireRL_SusHeight,
      tireRR_SusHeight: setTireRR_SusHeight,
      tireFL_TireRadius: setTireFL_TireRadius,
      tireFR_TireRadius: setTireFR_TireRadius,
      tireRL_TireRadius: setTireRL_TireRadius,
      tireRR_TireRadius: setTireRR_TireRadius,
      wheelFL_RevPerSecond: setWheelFL_RevPerSecond,
      wheelFR_RevPerSecond: setWheelFR_RevPerSecond,
      wheelRL_RevPerSecond: setWheelRL_RevPerSecond,
      wheelRR_RevPerSecond: setWheelRR_RevPerSecond,
      engineRPM: setRpmStream,
      oilTemperature: setOilTempStream,
      oilPressure: setOilPressureStream,
      waterTemperature: setWaterTemperatureStream,
      clutchPedal: setClutchPedalStream,
      rpmFromClutchToGearbox: setRpmFromClutchToGearbox,
      clutchEngagement: setClutchEngagementStream,
    };
    const stateSetter = stateSetters[attribute];
    stateSetter((oldArray) => {
      const prev = oldArray[oldArray.length - 1];
      const newArray = [...oldArray, { x: distanceFromStart, y: getConversionNormalTypes(stateSetter, dataPoint, defaults.defaultUnitsMetric) }];
      if (newArray.length > 30) {
        return newArray.slice(1);
      }
      return newArray;
    });


  };
  type StateSettersStrings = Record<string, React.Dispatch<React.SetStateAction<string>>>;
  const appendStringData = (attribute: string, dataPoint: string) => {
    const stateSettersStrings: StateSettersStrings = {
      lastLapTime: setLastLapTime,
      bestLapTime: setBestLapTime,
    };
    const stateSetterStrings = stateSettersStrings[attribute];
    if (stateSetterStrings) {
      stateSetterStrings(dataPoint);
    }
  };

  type StateSettersNumber = Record<string, React.Dispatch<React.SetStateAction<number>>>;
  const appendNumberData = (attribute: string, dataPoint: number) => {
    const stateSettersNumber: StateSettersNumber = {
      minAlertRPM: setMinAlertRpm,
      maxAlertRPM: setMaxAlertRpm,
      lapCount: setLapCount,
      calculatedMaxSpeed: setCalculatedMaxSpeed,
      transmissionTopSpeed: setTransmissionTopSpeed,
      gasCapacity: setGasCapacity,
      gasLevel: setGasLevel,
      turboBoost: setTurboBoost,
      inLapShifts: setInLapShifts,
    };
    const stateSetterNumber = stateSettersNumber[attribute];
    stateSetterNumber(getConversionNumbersSpecific(stateSetterNumber,dataPoint,defaults.defaultUnitsMetric));

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

  const handleIsWarning = () => {
    if (!(activeWarnings) && !(suppressedWarnings)) {
      setIsWarning(false);
      return;
    } setIsWarning(true);
  }

  const handleActiveWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit, setActiveWarnings);
  };
  const handleActiveWarningsLower = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit, setActiveWarningsLower);
  };
  const handleAcknowledgedWarningsLower = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit, setAcknowledgedWarningsLower);
  };


  const handleSuppressedWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit, setSuppressedWarnings);
  };

  const handleAcknowledgedWarnings = (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
  ) => {
    updateWarningsArray(add, newWarning, newWarningValue, newWarningUnits, newWarningLimit, setAcknowledgedWarnings);
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
    }, alerts.alertWarningInterval);

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
    }, alerts.alertWarningInterval);

    // Clean up the interval when the component unmounts to avoid memory leaks
    return () => clearInterval(rerenderInterval);
  }, [activeWarningsLower]);


  const setupValue = router.query.setup;
  const handleGetSetup = async () => {
    console.log(userName)
    const username = userName
    const setupname = setupValue
    try {
      const setupResponse: AxiosResponse = await axios.get('/api/retrieveSetupInfo', {
        params: { username, setupname },
      });

      console.log('Setup response:', setupResponse.data);
      const setupContainer = setupResponse.data
      setSetupData(setupContainer.setupData.setupObject)
    } catch (error) {
      console.error('Error fetching setup:', error);
    }
  };


  useEffect(() => {
    handleGetSetup();
  }, []);

  const isMobile = useMediaQuery('(max-width:750px)')

  const handleSetupValueTypeCheck = () => {
    if (typeof setupValue == "string") {
      return setupValue;
    }
    return "None";
  }
  const handleCompoundValueTypeCheck = () => {
    if (typeof compound == "string") {
      return compound;
    }
    return "None";
  }

  return (
    <> {activeWarnings.length > 0 ? (
      activeWarnings.map((value, index) => (
        <>
          <ActualWarningModal key={value.id} activewarning={value} handleActiveWarnings={handleActiveWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} isHigherWarning={true} />
        </>
      ))
    ) : (
      null
    )}
      {activeWarningsLower.length > 0 ? (
        activeWarningsLower.map((value, index) => (
          <>
            <ActualWarningModal key={value.id} activewarning={value} handleActiveWarnings={handleActiveWarningsLower} handleAcknowledgedWarnings={handleAcknowledgedWarningsLower} isHigherWarning={false} />
          </>
        ))
      ) : (
       null
      )}
      <Grid item xs={12}>
        <Homepage style={'navbar-container'}>
          <Item><NavBar /></Item>
        </Homepage></Grid>
      <Box sx={{ width: '100%' }}>
        <Homepage style={isMobile ? 'homepage-container300' : 'homepage-container100'}>
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
        </Homepage>
        <Homepage style={'homepage-specail'}>
          <TabPanel value={value} index={0} >
            <GridWarningConsumer throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceValue)} handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterest={dashboardWarnings[`dashboard${1}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${1}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${1}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${1}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${1}`]} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${1}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}
              oilTempStream={oilTempStream} rpmStream={rpmStream} turboBoost={turboBoost} oilPressureStream={oilPressureStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} fuelStartLap={fuelStartLap} gasLevel={gasLevel} gasCapacity={gasCapacity} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} waterTempStream={waterTempStream}
              tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond}
              currentGearStream={currentGear} suggestedGearStream={suggestedGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} clutchPedalStream={clutchPedalStream} clutchEngagementStream={clutchEngagementStream} inLapShifts={inLapShifts} dashboardIndex={1} possibleWarningsValues={[throttleStream, brakeStream, speedStream, parseNumberStream(suggestedGear), parseNumberStream(currentGear), parseNumberStream(frontLeftTemp), parseNumberStream(frontRightTemp), parseNumberStream(rearLeftTemp), parseNumberStream(rearRightTemp)]} possibleWarningsNames={["Throttle", "Brake", "Velocity", "Suggested Gear", "Current Gear", "Front Left Temp", "Front Right Temp", "Rear Left Temp", "Rear Right Temp"]} compound={handleCompoundValueTypeCheck()} setup={handleSetupValueTypeCheck()} challenge={challenge} lapCount={lapCount} ></GridWarningConsumer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            <GridWarningConsumer throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceValue)} handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterest={dashboardWarnings[`dashboard${2}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${2}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${2}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${2}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${2}`]} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${2}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}
              oilTempStream={oilTempStream} rpmStream={rpmStream} turboBoost={turboBoost} oilPressureStream={oilPressureStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} fuelStartLap={fuelStartLap} gasLevel={gasLevel} gasCapacity={gasCapacity} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} waterTempStream={waterTempStream}
              tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond}
              currentGearStream={currentGear} suggestedGearStream={suggestedGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} clutchPedalStream={clutchPedalStream} clutchEngagementStream={clutchEngagementStream} inLapShifts={inLapShifts} dashboardIndex={2} possibleWarningsValues={[throttleStream, oilTempStream, rpmStream, turboBoost, oilPressureStream, gasLevel, waterTempStream]} possibleWarningsNames={["Oil Temperature", "RPM", "Turbo Boost Pressure", "Oil Pressure", "Fuel Level", "Water Temperature"]} compound={handleCompoundValueTypeCheck()} setup={handleSetupValueTypeCheck()} challenge={challenge} lapCount={lapCount}> </GridWarningConsumer>

          </TabPanel>
          <TabPanel value={value} index={2}>
            <GridWarningConsumer throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceValue)} handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterest={dashboardWarnings[`dashboard${3}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${3}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${3}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${3}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${3}`]} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${3}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}
              oilTempStream={oilTempStream} rpmStream={rpmStream} turboBoost={turboBoost} oilPressureStream={oilPressureStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} fuelStartLap={fuelStartLap} gasLevel={gasLevel} gasCapacity={gasCapacity} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} waterTempStream={waterTempStream}
              tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond}
              currentGearStream={currentGear} suggestedGearStream={suggestedGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} clutchPedalStream={clutchPedalStream} clutchEngagementStream={clutchEngagementStream} inLapShifts={inLapShifts} dashboardIndex={3} possibleWarningsValues={[rpmStream, rpmClutchToGearboxStream]} possibleWarningsNames={["RPM", "RPM To Clutch"]} compound={handleCompoundValueTypeCheck()} setup={handleSetupValueTypeCheck()} challenge={challenge} lapCount={lapCount}></GridWarningConsumer>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <GridWarningConsumer throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceValue)} handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterest={dashboardWarnings[`dashboard${4}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${4}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${4}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${4}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${4}`]} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${4}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}
              oilTempStream={oilTempStream} rpmStream={rpmStream} turboBoost={turboBoost} oilPressureStream={oilPressureStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} fuelStartLap={fuelStartLap} gasLevel={gasLevel} gasCapacity={gasCapacity} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} waterTempStream={waterTempStream}
              tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond}
              currentGearStream={currentGear} suggestedGearStream={suggestedGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} clutchPedalStream={clutchPedalStream} clutchEngagementStream={clutchEngagementStream} inLapShifts={inLapShifts} dashboardIndex={4} possibleWarningsValues={[tireFL_SusHeight, tireFR_SusHeight, tireRL_SusHeight, tireRR_SusHeight, wheelFL_RevPerSecond, wheelFR_RevPerSecond, wheelRL_RevPerSecond, wheelRR_RevPerSecond]} possibleWarningsNames={["Front Left Suspension Height", "Front Right Suspension Height", "Rear Left Suspension Height", "Rear Right Suspension Height", "Front Left RPS", "Front Right RPS", "Rear Left RPS", "Rear Right RPS"]} compound={handleCompoundValueTypeCheck()} setup={handleSetupValueTypeCheck()} challenge={challenge} lapCount={lapCount}></GridWarningConsumer>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <SetupWrapper setupData={setupData} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            {"Mongo Write Status" + mongoDbStatus};

          </TabPanel>
        </Homepage>
      </Box>

    </>
  );
}
// <GeneralGrid throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={parseNumberStream(suggestedGear)} currentGear={parseNumberStream(currentGear)} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={getTrackDistancePercentage(track, distanceFromStart)} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${1}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${1}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${1}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${1}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${1}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${1}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}/>
      //<EngineGrid throttleStream={throttleStream} lapTimer={lapTimer} oilTempStream={oilTempStream} rpmStream={rpmStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} oilPressureStream={oilPressureStream} waterTempStream={waterTempStream} gasCapacity={gasCapacity} gasLevel={gasLevel} turboBoost={turboBoost} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${2}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${2}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${2}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${2}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${2}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${2}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag} lastLapTime={lastLapTime} fuelStartLap={fuelStartLap}/>
    //<GearboxGrid currentGearStream={currentGear} rpmClutchToGearboxStream={rpmClutchToGearboxStream} rpmStream={rpmStream} clutchEngagementStream={clutchEngagementStream} clutchPedalStream={clutchPedalStream} suggestedGearStream={suggestedGear} lapTimer={lapTimer} inLapShifts={inLapShifts}  handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${3}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${3}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${3}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${3}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${3}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${3}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}/>
      //<TyresSuspensionGrid tireFL_SurfaceTemperature={frontLeftTemp} tireRL_SurfaceTemperature={rearLeftTemp} tireFR_SurfaceTemperature={frontRightTemp} tireRR_SurfaceTemperature={rearRightTemp} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond} frontLeftTemp={parseNumberStream(frontLeftTemp)} frontRightTemp={parseNumberStream(frontRightTemp)} rearLeftTemp={parseNumberStream(rearLeftTemp)} rearRightTemp={parseNumberStream(rearRightTemp)}  handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleIsWarning={handleIsWarning} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} valuesOfInterest={dashboardWarnings[`dashboard${4}`]} valueOfInterestUnits={dashboardWarningsUnits[`dashboard${4}`]} valuesOfInterestData={dashboardWarningsData[`dashboard${4}`]} valuesOfInterestDefaultLimits={dashboardWarningsDefaultLimits[`dashboard${4}`]} valuesOfInterestCurrentLimits={dashboardWarningsCurrentLimits[`dashboard${4}`]} setValuesOfInterest={handleSetValuesOfInterest} setValuesOfInterestData={handleSetValuesOfInterestData} setValuesOfInterestDefualtLimits={handleSetValuesOfInterestDefaultLimits} setValuesOfInterestUnits={handleSetValuesOfInterestUnits} setValuesOfInterestCurrentLimits={handleSetValuesOfInterestCurrentLimits} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningsLower} valuesOfInterestCurrentLimitsLower={dashboardWarningsCurrentLimitsLower[`dashboard${4}`]} valuesOfInterestGreaterThanWarning={[]} setValuesOfInterestCurrentLimitsLower={handleSetValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}/>
