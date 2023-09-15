import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import ImageBox from '../homepageTrack';
import TwoValueDisplay from './gearDisplay.';
import Gauge from '../fuelComponents/fuelGauge';
import WarningInstance from '../../interfaces/warningInterface';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import getFuelOnConsumptionByRelativeFuelLevels, { calculateRemainingFuel } from '../../utils/relativeFuelCalculations';
import FuelDataDisplay from '../fuelComponents/fuelData';
import { SettingsContext } from '../authProviderSettings';
import { convertBarsToPsi, convertCelciusToFahrenheit, convertLitresToGallons, convertToPercentage, getPressureUnits, getTempUnits, getXAxisLabel } from '../../utils/converters';
import { Typography } from '@mui/material';


const DynamicBasicChart = dynamic(() => import('./chart'), { 
  loader: () => import('./chart'),
  ssr: false 
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(8, 13, 56, 0)' : 'rgba(8, 13, 56, 0)',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const ItemCentered = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(8, 13, 56, 0)' : 'rgba(8, 13, 56, 0)',
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
  oilTempStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  turboBoost:number;
  oilPressureStream: { x: number; y: number; }[];
  minAlertRPM:number;
  maxAlertRPM:number;
  fuelStartLap:number;
  gasLevel:number;
  lastLapTime:string;
  gasCapacity:number;
  calculatedMaxSpeed:number;
  transmissionTopSpeed:number;
  waterTempStream: { x: number; y: number; }[];
  lapTimer:string;
  handleIsWarning:() => void;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleSuppressedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  activeWarnings:WarningInstance[];
  acknowledgedWarnings:WarningInstance[];
  handleActiveWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  handleAcknowledgedWarningsLower:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void
  activeWarningsLower:WarningInstance[];
  acknowledgedWarningLower:WarningInstance[];
  valuesOfInterest:string[];
  valueOfInterestUnits:string[];
  valuesOfInterestData:number[];
  valuesOfInterestDefaultLimits:number[];
  valuesOfInterestCurrentLimits:{ [key: string]: number; }
  valuesOfInterestCurrentLimitsLower:{ [key: string]: number; }
  valuesOfInterestGreaterThanWarning:boolean[];
  setValuesOfInterest:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestData:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestDefualtLimits:(newValue: number[], dashNumber: number) => void
  setValuesOfInterestUnits:(newValue: string[], dashNumber: number) => void
  setValuesOfInterestCurrentLimits:(newDict: { [key: string]: number; }, dashNumber: number) => void
  setValuesOfInterestCurrentLimitsLower:(newDict: { [key: string]: number; }, dashNumber: number) => void
  packetFlag:boolean;
  valuesOfInterestUnits: string[];
  handleSetWarning: (
    updatedValuesOfInterest: string[],
    updatedValuesOfInterestData: number[],
    updatedValuesOfInterestUnits: string[],
    updatedValuesOfInterestDefualtLimits: number[]
  ) => void;
  handleSetLimits: (newDict: { [key: string]: number },readyFlag:number) => void;
  handleSetLimitsLower: (newDict: { [key: string]: number },readyFlag:number) => void;

}
export default function EngineGrid({throttleStream,lapTimer,oilTempStream,rpmStream,minAlertRPM,maxAlertRPM, calculatedMaxSpeed,transmissionTopSpeed,oilPressureStream,waterTempStream,gasCapacity,gasLevel,turboBoost,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,lastLapTime,fuelStartLap,handleSetLimits,handleSetLimitsLower,handleSetWarning,valuesOfInterestUnits}:GeneralGridProps) {
  const { defaults } = React.useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;
  "00:02:58.0830000"
  function convertTimeToSeconds(timeString:string) {
    const timeParts = timeString.split(":");
    
    if (timeParts.length !== 3) {
     //"Invalid time format. Use the format 'hh:mm:ss.milliseconds'");
     return 0;
    }
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const secondsParts = timeParts[2].split(".");
    
    if (secondsParts.length !== 2) {
      //"Invalid time format. Use the format 'hh:mm:ss.milliseconds'");
     return 0;
    }
    
    const seconds = parseInt(secondsParts[0], 10);
    const milliseconds = parseInt(secondsParts[1], 10);
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    
    return Math.round(totalSeconds);
  }
  const getGasLevel=()=>{
    if(isMetric){
      return gasLevel;
    }
    return convertLitresToGallons(gasLevel);
  }
  const fuelObject = calculateRemainingFuel(fuelStartLap,getGasLevel(),convertTimeToSeconds(lastLapTime)); 
  const FuelObjectMaps = getFuelOnConsumptionByRelativeFuelLevels(fuelObject,convertTimeToSeconds(lastLapTime),gasLevel); 
return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={convertToPercentage(255,255)} expectedMinValue={0} dataStream={throttleStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Item><DynamicBasicChart label={'Oil Pressure'} expectedMaxValue={isMetric ? 200 : convertBarsToPsi(200)} expectedMinValue={0} dataStream={oilPressureStream} units={getPressureUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={6} sm={4}>
          <Item><DynamicBasicChart label={'Oil Temperature '}expectedMaxValue={isMetric ? 150 : convertCelciusToFahrenheit(150)} expectedMinValue={isMetric ? 20 : convertCelciusToFahrenheit(20)} dataStream={oilTempStream} units={getTempUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Water Temperature '} expectedMaxValue={isMetric ? 100 : convertCelciusToFahrenheit(100)} expectedMinValue={isMetric ? 20 : convertCelciusToFahrenheit(20)} dataStream={waterTempStream} units={getTempUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={12}>
          <Item><FuelDataDisplay FuelObjectMaps={FuelObjectMaps} gasLevel={gasLevel}></FuelDataDisplay></Item>
        </Grid>
        <Grid item xs={12} >
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={15000} expectedMinValue={0} dataStream={rpmStream} units={'RPM'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}  >
          <Item><Grid container spacing={2} sx={{maxHeight:'448px'}}> <Grid item xs={12} ><Typography fontFamily={'Yapari'} fontSize={35} fontWeight={"bold"} sx={{color:'black',whiteSpace:'nowrap',overflow:'scroll'}}>Turbo Pressure:{turboBoost*100} {getPressureUnits(isMetric)}</Typography></Grid> <Grid item xs={12} sx={{display:'flex',justifyContent:'center',maxHeight:'448px'}} ><Gauge gasCapacity={100} gasLevel={turboBoost} targetSrc={"/images/turbo.svg"}/></Grid></Grid></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><TwoValueDisplay nameOne='Minimum Alert RPM' nameTwo='Maximum Alert RPM' dataValueOne={minAlertRPM} dataValueTwo={maxAlertRPM}/></Item>
        </Grid>
        <Grid item xs={6}>
          <Item><TwoValueDisplay nameOne='Calculated Max Speed' nameTwo='Transmission Max Speed' dataValueOne={calculatedMaxSpeed} dataValueTwo={transmissionTopSpeed}/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}

