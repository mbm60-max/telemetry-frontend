
  
  export interface AppearanceSettings {
    lightModeEnabled:boolean;
    language:string;
  }
  
  export interface AlertSettings {
   alertDefaultWarnings:string[];
   alertWarningInterval:number;
  }
  export interface DataSettings {
    allowML: boolean;
    reviewLapLimit: number;
    optInToDataPushing:boolean;
  }
  export interface DefaultsSettings {
    defaultUnitsMetric:boolean;
    defualtIPAddress:string;
  }
  
  export default interface SettingsObject {
    data: DataSettings;
    alerts: AlertSettings;
    appearance: AppearanceSettings;
    defaults: DefaultsSettings;
  }
  
  
  
