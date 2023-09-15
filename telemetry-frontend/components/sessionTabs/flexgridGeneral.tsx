import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import TyreTemps from './tyresTempindicator/tyreTemps';
import dynamic from 'next/dynamic';
import SignalRService from '../../utils/signalrEndpoint';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import ImageBox from '../homepageTrack';
import GearDisplay from './gearDisplay.';
import SmallLapTable from './lapTimeTable';
import TwoValueDisplay from './gearDisplay.';
import Test from '../liveTrack';
import WarningsDashboard from '../warningDashboard/keyWarningsDashboard';
import ActualWarningModal from '../warningDashboard/actualWarningModal';
import WarningInstance from '../../interfaces/warningInterface';
import Homepage from '../background/background';
import alterSuggestedGearWhenAtLimit from '../../utils/alterSuggestedGear';
import { convertKMHToMPH, convertToPercentage, getSpeedUnits, getXAxisLabel } from '../../utils/converters';
import { SettingsContext } from '../authProviderSettings';
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
  compound:string;
  setup:string;
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

export default function GeneralGrid({throttleStream,brakeStream,speedStream,suggestedGear,currentGear,frontLeftTemp,frontRightTemp,rearLeftTemp,rearRightTemp,lastLapTime,bestLapTime,lapTimer,track,distanceInLap,handleAcknowledgedWarnings,handleActiveWarnings,handleSuppressedWarnings,handleIsWarning,activeWarnings,acknowledgedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestData,valuesOfInterestDefaultLimits,packetFlag,valuesOfInterestGreaterThanWarning,setValuesOfInterestCurrentLimitsLower,handleAcknowledgedWarningsLower,handleActiveWarningsLower,activeWarningsLower,acknowledgedWarningLower,valuesOfInterestCurrentLimitsLower,handleSetLimits,handleSetLimitsLower,handleSetWarning,valuesOfInterestUnits,compound,setup}:GeneralGridProps) {
  const { defaults } = React.useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;


  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <Grid item xs={12}><Item><WarningsDashboard valuesOfInterest={valuesOfInterest} valuesOfInterestData={valuesOfInterestData} valuesOfInterestUnits={valueOfInterestUnits} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} handleSetWarning={handleSetWarning} handleSetLimits={handleSetLimits} handleAcknowledgedWarnings={handleAcknowledgedWarnings} handleActiveWarnings={handleActiveWarnings} acknowledgedWarnings={acknowledgedWarnings} handleSetLimitsLower={handleSetLimitsLower} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} acknowledgedWarningsLower={acknowledgedWarningLower} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower}/></Item></Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Throttle Trace '} expectedMaxValue={convertToPercentage(255,255)} expectedMinValue={0} dataStream={throttleStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <ItemCentered> <Box sx={{ display:'flex',justifyContent:'center',alignItems:'center'}}><TyreTemps frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp} ></TyreTemps></Box></ItemCentered>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><Box sx={{backgroundColor:'black'}}>{lapTimer}<Test testOffset={distanceInLap}targetSrc={getTrackPath(track)} trackName={checkTrackStatus(track)} /></Box></Item>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Item><DynamicBasicChart label={'Speed Trace '} expectedMaxValue={isMetric ? 500 : convertKMHToMPH(500)} expectedMinValue={0} dataStream={speedStream} units={getSpeedUnits(isMetric)} labelXaxis={getXAxisLabel(isMetric)}></DynamicBasicChart></Item>
        </Grid>
        <Grid item xs={12}>
          <Item><TwoValueDisplay dataValueOne={currentGear} dataValueTwo={alterSuggestedGearWhenAtLimit(suggestedGear)} nameOne={"Current Gear"} nameTwo={"Suggested Gear"}></TwoValueDisplay></Item>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Item><SmallLapTable lastLapTime={lastLapTime} bestLapTime={bestLapTime} compound={compound} setup={setup}></SmallLapTable></Item>
        </Grid>
        <Grid item xs={12} sm={8}>
          <Item><DynamicBasicChart label={'Brake Trace '} expectedMaxValue={convertToPercentage(255,255)} expectedMinValue={0} dataStream={brakeStream} units={'%'} labelXaxis={getXAxisLabel(isMetric)} ></DynamicBasicChart></Item>
        </Grid>
      </Grid>
    </Box>

  );
}