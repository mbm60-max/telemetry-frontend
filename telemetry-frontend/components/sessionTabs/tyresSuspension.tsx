
//engine RPM,current gear,suggested gear,clutch pedal,clutch engagement, rpm clutch to gearbox
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import ImageBox from '../homepageTrack';
import MultiDisplayChart from './multiDisplayChart';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import WarningInstance from '../../interfaces/warningInterface';
import { convertCelciusToFahrenheit, convertMetresToFeet, convertMMToInches, getMDistanceUnits, getTempUnits, getXAxisLabel } from '../../utils/converters';
import { SettingsContext } from '../authProviderSettings';
import { getTestMessageUrl } from 'nodemailer';
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


interface TyresSuspensionProps{
  tireFL_SurfaceTemperature: { x: number; y: number; }[];
  tireRL_SurfaceTemperature: { x: number; y: number; }[];
  tireFR_SurfaceTemperature: { x: number; y: number; }[]; 
  tireRR_SurfaceTemperature: { x: number; y: number; }[]; 
  tireFL_SusHeight: { x: number; y: number; }[];
  tireFR_SusHeight: { x: number; y: number; }[];
  tireRL_SusHeight: { x: number; y: number; }[];
  tireRR_SusHeight: { x: number; y: number; }[];
  tireFL_TireRadius: { x: number; y: number; }[];
  tireFR_TireRadius: { x: number; y: number; }[];
  tireRL_TireRadius: { x: number; y: number; }[];
  tireRR_TireRadius: { x: number; y: number; }[];
  wheelFL_RevPerSecond: { x: number; y: number; }[];
  wheelFR_RevPerSecond: { x: number; y: number; }[];
  wheelRL_RevPerSecond: { x: number; y: number; }[];
  wheelRR_RevPerSecond: { x: number; y: number; }[];
  frontLeftTemp:number;
  frontRightTemp:number;
  rearLeftTemp:number;
  rearRightTemp:number;
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
export default function TyresSuspensionGrid({tireFL_SurfaceTemperature,tireFR_SurfaceTemperature,tireRL_SurfaceTemperature,tireRR_SurfaceTemperature,tireFL_SusHeight,tireFR_SusHeight,tireRL_SusHeight,tireRR_SusHeight,tireFL_TireRadius,tireFR_TireRadius,tireRL_TireRadius,tireRR_TireRadius,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,wheelFL_RevPerSecond,wheelFR_RevPerSecond,wheelRL_RevPerSecond,wheelRR_RevPerSecond,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,valuesOfInterestUnits,handleSetLimits,handleSetLimitsLower,handleSetWarning}:TyresSuspensionProps) {
  const { defaults } = React.useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;
 return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        <Grid item xs={12} sm={8}>
          <Item><MultiDisplayChart expectedMinValue={isMetric ? 20 : convertCelciusToFahrenheit(20)} expectedMaxValue={isMetric ? 150 : convertCelciusToFahrenheit(150)} dataStream1={tireFL_SurfaceTemperature} dataStream2={tireFR_SurfaceTemperature} dataStream3={tireRL_SurfaceTemperature} dataStream4={tireRR_SurfaceTemperature} height={400} label={"Tyre Temps"} units={getTempUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}/></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp}/></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={100} dataStream1={wheelFL_RevPerSecond} dataStream2={wheelFR_RevPerSecond} dataStream3={wheelRL_RevPerSecond} dataStream4={wheelRR_RevPerSecond} height={400} label={"Wheel Revs Per Second"} units={'rad/s'} labelXaxis={getXAxisLabel(isMetric)}/></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={isMetric ? 1 : convertMetresToFeet(1)} dataStream1={tireFL_TireRadius} dataStream2={tireFR_TireRadius} dataStream3={tireRL_TireRadius} dataStream4={tireRR_TireRadius} height={400} label={"Wheel Radius"} units={getMDistanceUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}/></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><MultiDisplayChart expectedMinValue={0} expectedMaxValue={isMetric ? 500 : convertMMToInches(500)} dataStream1={tireFL_SusHeight} dataStream2={tireFR_SusHeight} dataStream3={tireRL_SusHeight} dataStream4={tireRR_SusHeight} height={400} label={"Suspension Height"} units={'mm'} labelXaxis={getXAxisLabel(isMetric)}/></Item>
        </Grid>
      </Grid>
    </Box>
  );
}