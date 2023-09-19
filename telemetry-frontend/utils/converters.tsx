import roundTo1DP from "./roudning";

const convertMpsToMph = (dataPoint: number)=>{
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 2.23694);
  }


  export default convertMpsToMph;

  export const convertNegativeToZero= (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint);
  }
  // behaviour is to always convert to non negative number, fowards is a -ve input so we reverse that, while reversing is a +ve input so left unchanged, these appear the same on the graph
  export const convertWheelRPS= (dataPoint: number) => {
    if (dataPoint < 0){
      roundTo1DP(-1*dataPoint);
    }
    return roundTo1DP(dataPoint);
  }


  export const convertMpsToKMH = (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 3.6);
  }

  export const convertCelciusToFahrenheit = (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP((dataPoint * 9/5) + 32);
  };

  export const convertMMToInches = (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint / 25.4);
  };

  export const convertMetresToFeet = (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 3.28084);
  };

  export const convertBarsToPsi = (dataPoint: number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 14.5038);
  };

  export const convertToPercentage = (dataPoint:number, maxValue:number) => {
    if (dataPoint < 0 || maxValue <= 0) {
     return 0;
    }
  
    return roundTo1DP((dataPoint / maxValue) * 100);
  };
  
  export const convertKPAToPSI = (dataPoint:number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 0.14503773773375); // 1 kPa ≈ 0.14503773773375 psi
  };

  export const convertLitresToGallons = (dataPoint:number) => {
    if (dataPoint < 0){
        return 0;
    }
    return roundTo1DP(dataPoint * 0.264172); // 1 liter ≈ 0.264172 gallons
  };

  export const convertKMHToMPH = (dataPoint:number)=>{
    if (dataPoint < 0){
      return 0;
  }
  return roundTo1DP(dataPoint * 0.6213712 ); 
  }
  export const getXAxisLabel=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap Metres'
    }return 'Distance Into Lap Feet'
  }

  export const getTempUnits=(isMetric:boolean)=>{
    if(isMetric){
      return '°C'
    }return '°F'
  }
  export const getSpeedUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'KM/H'
    }return 'MPH'
  }
  export const getPressureUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'KPA'
    }return 'KPSI'
  }
  export const getVolumeUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'Distance Into Lap M'
    }return 'Distance Into Lap Feet'
  }
  export const getPressureUnitsBar=(isMetric:boolean)=>{
    if(isMetric){
      return 'bar'
    }return 'PSI'
  }
  export const getMMDistanceUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'mm'
    }return 'Inches'
  }
  export const getMDistanceUnits=(isMetric:boolean)=>{
    if(isMetric){
      return 'm'
    }return 'feet'
  }
 
  export const mapMetricToImperial = (metricUnit:string) => {
    switch (metricUnit) {
      case 'KM/h':
        return 'MPH';
      case 'mm':
        return 'in';
      case 'm':
        return 'feet';
      case 'Bar':
        return 'PSI';
      case 'KPA':
        return 'KPSI';
      case 'Litres':
        return 'Gallons';
      case '°C':
        return '°F';
      case 'Nm':
        return 'ft-lbs';
      default:
        return metricUnit; // If no mapping is available, return the metric unit itself
    }
  };