
//engine RPM,current gear,suggested gear,clutch pedal,clutch engagement, rpm clutch to gearbox
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import dynamic from 'next/dynamic';
import TwoValueDisplay from './gearDisplay.';
import Gauge from '../fuelComponents/fuelGauge';
import WarningInstance from '../../interfaces/warningInterface';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import { SettingsContext } from '../authProviderSettings';
import { convertToPercentage, getXAxisLabel } from '../../utils/converters';
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



interface GearboxGridProps{
  currentGearStream: { x: number; y: number; }[];
  suggestedGearStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  rpmClutchToGearboxStream: { x: number; y: number; }[];
  clutchPedalStream: { x: number; y: number; }[];
  clutchEngagementStream: { x: number; y: number; }[];
  lapTimer:string;
  inLapShifts:number;
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
export default function GearboxGrid({currentGearStream,suggestedGearStream,rpmStream,rpmClutchToGearboxStream,clutchEngagementStream,clutchPedalStream,lapTimer,inLapShifts,handleAcknowledgedWarnings,handleAcknowledgedWarningsLower,handleActiveWarnings,handleActiveWarningsLower,handleIsWarning,handleSuppressedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestCurrentLimitsLower,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,packetFlag,acknowledgedWarningLower,acknowledgedWarnings,activeWarnings,activeWarningsLower,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestCurrentLimitsLower,valuesOfInterestData,valuesOfInterestDefaultLimits,valuesOfInterestGreaterThanWarning,handleSetLimits,handleSetLimitsLower,handleSetWarning,valuesOfInterestUnits}:GearboxGridProps) {
  const { defaults } = React.useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Trace '} expectedMaxValue={15000} expectedMinValue={0} dataStream={rpmStream} units={'RPM'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'RPM Clutch To Gearbox '} expectedMaxValue={15000} expectedMinValue={0} dataStream={rpmClutchToGearboxStream} units={'RPM'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><TwoValueDisplay dataValueOne={inLapShifts} dataValueTwo={0} nameOne={'Total Shifts In Lap'} nameTwo={'Nothing ?'}/></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Suggested Gear'} expectedMaxValue={12} expectedMinValue={0} dataStream={suggestedGearStream} units={''} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Current Gear'} expectedMaxValue={12} expectedMinValue={0} dataStream={currentGearStream} units={''} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Clutch Pedal Input Trace '} expectedMaxValue={convertToPercentage(1,1)} expectedMinValue={0} dataStream={clutchPedalStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item>{lapTimer}<DynamicBasicChart label={'Clutch Engagement Trace'} expectedMaxValue={convertToPercentage(1,1)} expectedMinValue={0} dataStream={clutchEngagementStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>
  );
}