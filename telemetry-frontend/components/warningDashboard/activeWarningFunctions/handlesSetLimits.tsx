import Box from "@mui/material/Box";
import { ReactNode, useEffect } from "react";
import WarningInstance from "../../../interfaces/warningInterface";
import EngineGrid from "../../sessionTabs/engineGrid";
import GeneralGrid from "../../sessionTabs/flexgridGeneral";
import GearboxGrid from "../../sessionTabs/gearbox";
import TyresSuspensionGrid from "../../sessionTabs/tyresSuspension";

interface GridWarningConsumerProps{
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


  oilTempStream: { x: number; y: number; }[];
  rpmStream: { x: number; y: number; }[];
  turboBoost:number;
  oilPressureStream: { x: number; y: number; }[];
  minAlertRPM:number;
  maxAlertRPM:number;
  fuelStartLap:number;
  gasLevel:number;
  gasCapacity:number;
  calculatedMaxSpeed:number;
  transmissionTopSpeed:number;
  waterTempStream: { x: number; y: number; }[];


  currentGearStream: { x: number; y: number; }[];
  suggestedGearStream: { x: number; y: number; }[];
  rpmClutchToGearboxStream: { x: number; y: number; }[];
  clutchPedalStream: { x: number; y: number; }[];
  clutchEngagementStream: { x: number; y: number; }[];
  inLapShifts:number;

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
  dashboardIndex:number;
  possibleWarningsValues: (number | {x: number; y: number;}[])[];
  possibleWarningsNames:string[];

}



export default function GridWarningConsumer({handleAcknowledgedWarnings,handleActiveWarnings,handleSuppressedWarnings,handleIsWarning,activeWarnings,acknowledgedWarnings,setValuesOfInterest,setValuesOfInterestCurrentLimits,setValuesOfInterestData,setValuesOfInterestDefualtLimits,setValuesOfInterestUnits,valueOfInterestUnits,valuesOfInterest,valuesOfInterestCurrentLimits,valuesOfInterestData,valuesOfInterestDefaultLimits,packetFlag,valuesOfInterestGreaterThanWarning,setValuesOfInterestCurrentLimitsLower,handleAcknowledgedWarningsLower,handleActiveWarningsLower,activeWarningsLower,acknowledgedWarningLower,valuesOfInterestCurrentLimitsLower,dashboardIndex,possibleWarningsNames,possibleWarningsValues,throttleStream,tireFL_SurfaceTemperature,tireFL_SusHeight,tireFL_TireRadius,tireFR_SurfaceTemperature,tireFR_SusHeight,tireFR_TireRadius,tireRL_SurfaceTemperature,tireRL_SusHeight,tireRL_TireRadius,tireRR_SurfaceTemperature,tireRR_SusHeight,tireRR_TireRadius,track,transmissionTopSpeed,turboBoost,oilTempStream,lapTimer,waterTempStream,bestLapTime,lastLapTime,rearLeftTemp,frontLeftTemp,rearRightTemp,rpmClutchToGearboxStream,frontRightTemp,brakeStream,maxAlertRPM,minAlertRPM,speedStream,suggestedGear,suggestedGearStream,rpmStream,fuelStartLap,inLapShifts,clutchPedalStream,currentGearStream,oilPressureStream,calculatedMaxSpeed,wheelFL_RevPerSecond,wheelFR_RevPerSecond,wheelRL_RevPerSecond,wheelRR_RevPerSecond,clutchEngagementStream,distanceInLap,currentGear,gasCapacity,gasLevel}:GridWarningConsumerProps) {
 
  const handleSetNewWarning=(updatedValuesOfInterest:string[],updatedValuesOfInterestData:number[],updatedValuesOfInterestUnits:string[],updatedValuesOfInterestDefualtLimits:number[])=>{
    setValuesOfInterest(updatedValuesOfInterest,dashboardIndex);
    setValuesOfInterestData(updatedValuesOfInterestData,dashboardIndex);
    setValuesOfInterestDefualtLimits(updatedValuesOfInterestDefualtLimits,dashboardIndex);
    setValuesOfInterestUnits(updatedValuesOfInterestUnits,dashboardIndex);
  }
  const handleSetLimits=(newDict:{[key: string]: number;},readyFlag:number)=>{
    if(readyFlag>=2){
      setValuesOfInterestCurrentLimits(newDict,dashboardIndex);
    }
   return;
  }
  const handleSetLimitsLower=(newDict:{[key: string]: number;},readyFlag:number)=>{
    if(readyFlag>=2){
      setValuesOfInterestCurrentLimitsLower(newDict,dashboardIndex);
    }
   return;
  }




  useEffect(() => {
  }, [valuesOfInterestCurrentLimits]);

  useEffect(() => {
    const handleValuesOfInterestFetch=(valuesToCheck:string[],valuesToUpdate:number[],dashboardNumber:number,possibleWarningsNames:string[])=>{

      for(let i =0; i<valuesToCheck.length;i++){
        for(let j =0; j<possibleWarningsNames.length;j++){
        if(valuesToCheck[i]==possibleWarningsNames[j]){
            const value=possibleWarningsValues[j];
            if(typeof value !== "number"){
              const lastItem = value[value.length-1]
              valuesToUpdate[i]= lastItem.y;
              
            }else{
              valuesToUpdate[i]= value;
            }
        }
      }
      }setValuesOfInterestData(valuesToUpdate,dashboardNumber);
      return;
    }
    handleValuesOfInterestFetch(valuesOfInterest,valuesOfInterestData,dashboardIndex,possibleWarningsNames)
  }, [packetFlag,valuesOfInterest]);

  useEffect(() => {
    for(let i=0; i<valuesOfInterest.length;i++){

      if((valuesOfInterestData[i]>=valuesOfInterestCurrentLimits[`limit${i}`])&&(activeWarnings!==undefined)){
        const warningExists = activeWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )//;
        const warningIsIgnored = acknowledgedWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if ((!warningExists)&&(!warningIsIgnored)) {
        handleActiveWarnings(true,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
        handleIsWarning();
        }
      }else if((valuesOfInterestData[i]<valuesOfInterestCurrentLimits[`limit${i}`])&&(activeWarnings!==undefined)){
        const warningExists = activeWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        const warningIsIgnored = acknowledgedWarnings.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if (warningExists) {
          handleActiveWarnings(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
          handleIsWarning();
          }else if(warningIsIgnored){
            handleAcknowledgedWarnings(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
            handleIsWarning();
          }
      }
      if((valuesOfInterestData[i]<=valuesOfInterestCurrentLimitsLower[`limitLower${i}`])&&(activeWarningsLower!==undefined)){
        const warningExists = activeWarningsLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )//;
        const warningIsIgnored = acknowledgedWarningLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if ((!warningExists)&&(!warningIsIgnored)) {
        handleActiveWarningsLower(true,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimitsLower[`limitLower${i}`]);
        handleIsWarning();
        }
      }else if((valuesOfInterestData[i]>valuesOfInterestCurrentLimitsLower[`limitlower${i}`])&&(activeWarningsLower!==undefined)){
        const warningExists = activeWarningsLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        const warningIsIgnored = acknowledgedWarningLower.some(
          (warning) => warning.newWarning === valuesOfInterest[i]
        )
        if (warningExists) {
          handleActiveWarningsLower(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
          handleIsWarning();
          }else if(warningIsIgnored){
            handleAcknowledgedWarningsLower(false,valuesOfInterest[i],valuesOfInterestData[i],valueOfInterestUnits[i],valuesOfInterestCurrentLimits[`limit${i}`]);
            handleIsWarning();
          }
      }
    }
  }, [valuesOfInterest.length, valuesOfInterestData,valuesOfInterestCurrentLimits,valuesOfInterestGreaterThanWarning,valuesOfInterestCurrentLimitsLower]);

  let selectedComponent;

  // Conditionally render one of the four components based on the number
  switch (dashboardIndex) {
    case 1:
      selectedComponent = <GeneralGrid throttleStream={throttleStream} brakeStream={brakeStream} speedStream={speedStream} suggestedGear={suggestedGear} currentGear={currentGear} frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp} lastLapTime={lastLapTime} bestLapTime={bestLapTime} lapTimer={lapTimer} track={track} distanceInLap={distanceInLap} handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningLower} valuesOfInterest={valuesOfInterest} valueOfInterestUnits={valueOfInterestUnits} valuesOfInterestData={valuesOfInterestData} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower} valuesOfInterestGreaterThanWarning={valuesOfInterestGreaterThanWarning} setValuesOfInterest={setValuesOfInterest} setValuesOfInterestData={setValuesOfInterestData} setValuesOfInterestDefualtLimits={setValuesOfInterestDefualtLimits} setValuesOfInterestUnits={setValuesOfInterestUnits} setValuesOfInterestCurrentLimits={setValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={setValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag}    valuesOfInterestUnits={valueOfInterestUnits}  handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits}   handleSetLimitsLower={handleSetLimitsLower}  />;
      break;
    case 2:
      selectedComponent = <EngineGrid  valuesOfInterestUnits={valueOfInterestUnits}  handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits}   handleSetLimitsLower={handleSetLimitsLower}  handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningLower} valuesOfInterest={valuesOfInterest} valueOfInterestUnits={valueOfInterestUnits} valuesOfInterestData={valuesOfInterestData} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower} valuesOfInterestGreaterThanWarning={valuesOfInterestGreaterThanWarning} setValuesOfInterest={setValuesOfInterest} setValuesOfInterestData={setValuesOfInterestData} setValuesOfInterestDefualtLimits={setValuesOfInterestDefualtLimits} setValuesOfInterestUnits={setValuesOfInterestUnits} setValuesOfInterestCurrentLimits={setValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={setValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag} throttleStream={throttleStream} oilTempStream={oilTempStream} rpmStream={rpmStream} turboBoost={turboBoost} oilPressureStream={oilPressureStream} minAlertRPM={minAlertRPM} maxAlertRPM={maxAlertRPM} fuelStartLap={fuelStartLap} gasLevel={gasLevel} lastLapTime={lastLapTime} gasCapacity={gasCapacity} calculatedMaxSpeed={calculatedMaxSpeed} transmissionTopSpeed={transmissionTopSpeed} waterTempStream={waterTempStream} lapTimer={lapTimer}  />;
      break;
    case 3:
      selectedComponent = <TyresSuspensionGrid  valuesOfInterestUnits={valueOfInterestUnits}  handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits}   handleSetLimitsLower={handleSetLimitsLower}  handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningLower} valuesOfInterest={valuesOfInterest} valueOfInterestUnits={valueOfInterestUnits} valuesOfInterestData={valuesOfInterestData} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower} valuesOfInterestGreaterThanWarning={valuesOfInterestGreaterThanWarning} setValuesOfInterest={setValuesOfInterest} setValuesOfInterestData={setValuesOfInterestData} setValuesOfInterestDefualtLimits={setValuesOfInterestDefualtLimits} setValuesOfInterestUnits={setValuesOfInterestUnits} setValuesOfInterestCurrentLimits={setValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={setValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag} tireFL_SurfaceTemperature={tireFL_SurfaceTemperature} tireRL_SurfaceTemperature={tireRL_SurfaceTemperature} tireFR_SurfaceTemperature={tireFR_SurfaceTemperature} tireRR_SurfaceTemperature={tireRR_SurfaceTemperature} tireFL_SusHeight={tireFL_SusHeight} tireFR_SusHeight={tireFR_SusHeight} tireRL_SusHeight={tireRL_SusHeight} tireRR_SusHeight={tireRR_SusHeight} tireFL_TireRadius={tireFL_TireRadius} tireFR_TireRadius={tireFR_TireRadius} tireRL_TireRadius={tireRL_TireRadius} tireRR_TireRadius={tireRR_TireRadius} wheelFL_RevPerSecond={wheelFL_RevPerSecond} wheelFR_RevPerSecond={wheelFR_RevPerSecond} wheelRL_RevPerSecond={wheelRL_RevPerSecond} wheelRR_RevPerSecond={wheelRR_RevPerSecond} frontLeftTemp={frontLeftTemp} frontRightTemp={frontRightTemp} rearLeftTemp={rearLeftTemp} rearRightTemp={rearRightTemp}  />;
      break;
    case 4:
      selectedComponent = <GearboxGrid  valuesOfInterestUnits={valueOfInterestUnits}  handleSetWarning={handleSetNewWarning} handleSetLimits={handleSetLimits}   handleSetLimitsLower={handleSetLimitsLower}  handleIsWarning={handleIsWarning} handleActiveWarnings={handleActiveWarnings} handleSuppressedWarnings={handleSuppressedWarnings} handleAcknowledgedWarnings={handleAcknowledgedWarnings} activeWarnings={activeWarnings} acknowledgedWarnings={acknowledgedWarnings} handleActiveWarningsLower={handleActiveWarningsLower} handleAcknowledgedWarningsLower={handleAcknowledgedWarningsLower} activeWarningsLower={activeWarningsLower} acknowledgedWarningLower={acknowledgedWarningLower} valuesOfInterest={valuesOfInterest} valueOfInterestUnits={valueOfInterestUnits} valuesOfInterestData={valuesOfInterestData} valuesOfInterestDefaultLimits={valuesOfInterestDefaultLimits} valuesOfInterestCurrentLimits={valuesOfInterestCurrentLimits} valuesOfInterestCurrentLimitsLower={valuesOfInterestCurrentLimitsLower} valuesOfInterestGreaterThanWarning={valuesOfInterestGreaterThanWarning} setValuesOfInterest={setValuesOfInterest} setValuesOfInterestData={setValuesOfInterestData} setValuesOfInterestDefualtLimits={setValuesOfInterestDefualtLimits} setValuesOfInterestUnits={setValuesOfInterestUnits} setValuesOfInterestCurrentLimits={setValuesOfInterestCurrentLimits} setValuesOfInterestCurrentLimitsLower={setValuesOfInterestCurrentLimitsLower} packetFlag={packetFlag} currentGearStream={currentGearStream} suggestedGearStream={suggestedGearStream} rpmStream={rpmStream} rpmClutchToGearboxStream={rpmClutchToGearboxStream} clutchPedalStream={clutchPedalStream} clutchEngagementStream={clutchEngagementStream} lapTimer={lapTimer} inLapShifts={inLapShifts}  />;
      break;
    default:
      // Handle any other cases or set a default component
      selectedComponent = <Box>Hi</Box>;
      break;
  }
  return (
    <>{selectedComponent}</>
  );
};