
  
  export interface AppearanceSettings {
    lightModeEnabled:boolean;
    language:string;
    type: string;
  }
  
  export interface AlertSettings {
   alertDefaultWarningsNames:string[][];
   alertDefaultWarningsUpperLimits:number[][];
   alertDefaultWarningsLowerLimits:number[][];
   alertDefaultWarningsUnits:string[][];
   alertWarningInterval:number;
   type: string;
  }

  export interface DataSettings {
    allowML: boolean;
    reviewLapLimit: number;
    optInToDataPushing:boolean;
    type: string;
  }
  export interface DefaultsSettings {
    defaultUnitsMetric:boolean;
    defualtIPAddress:string;
    type: string;
  }
  
  export default interface SettingsObject {
    data: DataSettings;
    alerts: AlertSettings;
    appearance: AppearanceSettings;
    defaults: DefaultsSettings;
  }
  
  
  
