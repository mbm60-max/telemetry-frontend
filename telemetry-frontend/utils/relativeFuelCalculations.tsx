import { convertSecondsToTime } from "./secondsToString";

 class fuelConsumptionObject {
    fuelConsumedPerLap: number = 0;
    lapsRemaining: number = -1;
    timeRemaining: number = -1;
}

export class fuelMapObject {
    mixtureSetting: number = -5;
    powerPercentage: number = 0;
    consumptionPercentage: number = 0;
    fuelConsumedPerLap: number = 0;
    lapsRemainingOnCurrentFuel: number = 0;
    timeRemainingOnCurrentFuel: number = 0;
    lapTimeDiff: number = 0;
    lapTimeExpected: string = '';
}

const  getFuelOnConsumptionByRelativeFuelLevels=(fuelObject:fuelConsumptionObject,lastLapTime:number,gasLevel:number)=>{
    let i = -5;

    // Source:
    // https://www.gtplanet.net/forum/threads/test-results-fuel-mixture-settings-and-other-fuel-saving-techniques.369387/
    const fuelConsumptionPerLevelChange = 8;
    const powerPerLevelChange = 4;

    const relativeFuelMaps: fuelMapObject[] = [];

    while (i <= 5){
        const relativeFuelMap = new fuelMapObject();
            relativeFuelMap.mixtureSetting=i,
            relativeFuelMap.powerPercentage=(100 - i * powerPerLevelChange) / 100,
            relativeFuelMap.consumptionPercentage=(100 - i * fuelConsumptionPerLevelChange) / 100,
        

        relativeFuelMap.fuelConsumedPerLap = fuelObject.fuelConsumedPerLap * relativeFuelMap.consumptionPercentage;
        relativeFuelMap.lapsRemainingOnCurrentFuel = gasLevel /  relativeFuelMap.fuelConsumedPerLap;

        relativeFuelMap.timeRemainingOnCurrentFuel = fuelObject.timeRemaining + fuelObject.timeRemaining * (
                1 - relativeFuelMap.consumptionPercentage
        )
        relativeFuelMap.lapTimeDiff = lastLapTime * (1 - relativeFuelMap.powerPercentage)
        relativeFuelMap.lapTimeExpected = convertSecondsToTime(lastLapTime+ relativeFuelMap.lapTimeDiff)

        relativeFuelMap.powerPercentage= relativeFuelMap.powerPercentage * 100,
        relativeFuelMap.consumptionPercentage = relativeFuelMap.consumptionPercentage * 100,
        relativeFuelMaps.push(relativeFuelMap)
        i += 1
    }
    return relativeFuelMaps;
        
// return a dictionary of -5- 5 modes corresponding to +- 5 modes either side of the cu4rent mode which is unknown
//return the relative mode the relative consumption per lap the laps remaining given capacity and relative fuel use, time remaingin on fuel and time diff comapred to relative lap
};


export const calculateRemainingFuel=(fuelStartLap:number,fuelEndLap:number,lastLapTime:number)=>{
    // no fuel consumed
    let fuelObject = new fuelConsumptionObject();
    if (fuelStartLap == fuelEndLap){
        return fuelObject;
    }

        fuelObject.fuelConsumedPerLap = fuelStartLap - fuelEndLap;
        fuelObject.lapsRemaining = fuelEndLap / fuelObject.fuelConsumedPerLap;
        fuelObject.timeRemaining = fuelObject.lapsRemaining * lastLapTime;
        return fuelObject;

};


export default getFuelOnConsumptionByRelativeFuelLevels;

