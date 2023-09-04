import axios, { AxiosResponse } from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';
import  { AlertSettings, AppearanceSettings, DataSettings, DefaultsSettings } from '../interfaces/defaultSettingsInterface';
import { AuthContext } from './authProvider';


interface SettingsContextType {
  data:DataSettings,
  setData:(dataValue: DataSettings) => void;
  alerts: AlertSettings;
  setAlerts:(alertsValue: AlertSettings) => void;
  appearance: AppearanceSettings;
  setAppearance:(appearanceValue: AppearanceSettings) => void;
  defaults: DefaultsSettings;
  setDefaults:(defaultValue: DefaultsSettings) => void;
  
}

export const SettingsContext = createContext<SettingsContextType>({
    data: {} as DataSettings,
    setData: () => {},
    alerts: {} as AlertSettings,
    setAlerts: () => {},
    appearance: {} as AppearanceSettings,
    setAppearance: () => {},
    defaults: {} as DefaultsSettings,
    setDefaults: () => {},
  });

interface SettingsProviderProps {
  children: ReactNode;
}


export const SettingsProvider = ({ children }: SettingsProviderProps) => {
    const setDefaultsHandler = (defaultValue: DefaultsSettings) => {
        console.log("setDefaults is called:", defaultValue);
        setDefaults(defaultValue);
      };
   const { userName} = useContext(AuthContext);
   const [initialFetchHasHappened,setInitialFetchHasHappened]=useState(false);
    const [data, setData] = useState<DataSettings>({
        allowML: false,
        reviewLapLimit: 5,
        optInToDataPushing: true,
        type: "DataSettings",
    });
   
      const [alerts, setAlerts] = useState<AlertSettings>({
        alertDefaultWarningsNames: [["1"],[],[],[]],
        alertDefaultWarningsUpperLimits: [[0],[],[],[]],
        alertDefaultWarningsLowerLimits: [[0],[],[],[]],
        alertDefaultWarningsUnits: [["mm"],[],[],[]],
        alertWarningInterval: 10,
        type: "AlertSettings",
      });
    
      const [appearance, setAppearance] = useState<AppearanceSettings>({
        lightModeEnabled: true,
        language: 'en',
        type: "AppearanceSettings",
      });
    
      const [defaults, setDefaults] = useState<DefaultsSettings>({
        defaultUnitsMetric: true,
        defualtIPAddress: '192.168.0.1',    
      type: "DefaultSettings",
      });
      useEffect(() => {
        // Fetch the matching settings from the API
        const handleGetSettings= async () => {
            const username=userName
            const settingsname="Default Settings"
            try {
              const settingsResponse: AxiosResponse = await axios.get('/api/retrieveusersettingsapi', {
                params: { username, settingsname },
              });
              
              //console.log('Settings response:', settingsResponse.data);
              const settingsContainer= settingsResponse.data
              setData(settingsContainer.settingsData.settingsObject.data)
              setAppearance(settingsContainer.settingsData.settingsObject.appearance)
              setAlerts(settingsContainer.settingsData.settingsObject.alerts)
              setDefaults(settingsContainer.settingsData.settingsObject.defaults)
              console.log("here"+settingsContainer.settingsData.settingsObject.defaults);
              setInitialFetchHasHappened(true);
            } catch (error) {
              console.error('Error fetching setup:', error);
            }
          };
          
          handleGetSettings();
      }, [userName]);


      useEffect(() => {

        // Fetch the matching settings from the API
        const handleUpdateSettings= async () => {
            const username=userName
            const settingsname="Default Settings"
            const settingsObject = {
                data:data,
                alerts:alerts,
                appearance:appearance,
                defaults:defaults,
            }
            try {
              const settingsUpdateResponse: AxiosResponse = await axios.post("/api/editusersettingsapi", { username,settingsname , settingsObject });
              
             console.log("Settings Update Response:"+settingsUpdateResponse.status);
            } catch (error) {
              console.error('Error posting setup:', error);
            }
          };
    
          if(initialFetchHasHappened){
            handleUpdateSettings();
          }
      }, [alerts, appearance, data, defaults, initialFetchHasHappened, userName]);

      useEffect(()=>{
      },[defaults])


  return (
    <SettingsContext.Provider
      value={{
   data,
   setData,
   alerts,
   setAlerts,
   appearance,
   setAppearance,
   defaults,
   setDefaults:setDefaultsHandler,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
