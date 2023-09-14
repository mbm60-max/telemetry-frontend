import { roundTo3SF } from "./roudning";

const convertMpsToMph = (dataPoint: number)=>{
    if (dataPoint < 0){
        return -1;
    }
    return Math.round(dataPoint * 2.23694);
  }

  export default convertMpsToMph;

  export const convertNegativeToZero= (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return dataPoint;
  }


  export const convertMpsToKMH = (dataPoint: number) => {
    if (dataPoint < 0){
        return -1;
    }
    return Math.round(dataPoint * 3.6);
  }

  export const convertCelciusToFahrenheit = (dataPoint: number) => {
    if (dataPoint < 0){
        return -1;
    }
    return Math.round((dataPoint * 9/5) + 32);
  };

  export const convertMMToInches = (dataPoint: number) => {
    if (dataPoint < 0){
        return -1;
    }
    return roundTo3SF(dataPoint / 25.4);
  };

  export const convertMetresToFeet = (dataPoint: number) => {
    if (dataPoint < 0){
        return -1;
    }
    return roundTo3SF(dataPoint * 3.28084);
  };

  export const convertBarsToPsi = (dataPoint: number) => {
    if (dataPoint < 0){
        return -1;
    }
    return roundTo3SF(dataPoint * 14.5038);
  };

  export const convertToPercentage = (dataPoint:number, maxValue:number) => {
    if (dataPoint < 0 || maxValue <= 0) {
     return 0;
    }
  
    return Math.round((dataPoint / maxValue) * 100);
  };
  
  export const convertKPAToPSI = (dataPoint:number) => {
    if (dataPoint < 0){
        return -1;
    }
    return roundTo3SF(dataPoint * 0.14503773773375); // 1 kPa ≈ 0.14503773773375 psi
  };

  export const convertLitresToGallons = (dataPoint:number) => {
    if (dataPoint < 0){
        return -1;
    }
    return roundTo3SF(dataPoint * 0.264172); // 1 liter ≈ 0.264172 gallons
  };

  export const getXAxisLabel=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }

  export const getTempUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getSpeedUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getPressureUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getVolumeUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getPressureUnitsBar=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getMMDistanceUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getMDistanceUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
 