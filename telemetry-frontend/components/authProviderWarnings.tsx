import React, { useContext, useEffect, useState } from 'react';
import { createContext, ReactNode } from 'react';
import WarningInstance from '../interfaces/warningInterface';
import { mapMetricToImperial } from '../utils/converters';
import { SettingsContext } from './authProviderSettings';

interface WarningContextType {
  dashboardWarningsCurrentLimits: { [key: string]: { [key: string]: number } };
  setDashboardWarningsCurrentLimits: (
    value: { [key: string]: { [key: string]: number } }
  ) => void;
  dashboardWarningsCurrentLimitsLower: { [key: string]: { [key: string]: number } };
  setDashboardWarningsCurrentLimitsLower: (
    value: { [key: string]: { [key: string]: number } }
  ) => void;
  dashboardWarningsNames: { [key: string]: { [key: string]: string } };
  setDashboardWarningsNames: (
    value: { [key: string]: { [key: string]: string } }
  ) => void;
  dashboardWarningsUnitsTest: { [key: string]: { [key: string]: string } };
  setDashboardWarningsUnitsTest: (
    value: { [key: string]: { [key: string]: string } }
  ) => void;
  activeWarnings: WarningInstance[];
  setActiveWarnings: React.Dispatch<React.SetStateAction<WarningInstance[]>>;
  acknowledgedWarnings: WarningInstance[];
  setAcknowledgedWarnings: React.Dispatch<React.SetStateAction<WarningInstance[]>>;
  activeWarningsLower: WarningInstance[];
  setActiveWarningsLower: React.Dispatch<React.SetStateAction<WarningInstance[]>>;
  acknowledgedWarningsLower: WarningInstance[];
  setAcknowledgedWarningsLower: React.Dispatch<React.SetStateAction<WarningInstance[]>>;
  updateWarningsArray: (
    add: boolean,
    newWarning: string,
    newWarningValue: number,
    newWarningUnits: string,
    newWarningLimit: number,
    setWarnings: React.Dispatch<React.SetStateAction<WarningInstance[]>>,
  ) => void;
}

export const WarningContext = createContext<WarningContextType>({
  dashboardWarningsCurrentLimits: {},
  setDashboardWarningsCurrentLimits: () => {},
  dashboardWarningsCurrentLimitsLower: {},
  setDashboardWarningsCurrentLimitsLower: () => {},
  dashboardWarningsNames: {},
  setDashboardWarningsNames: () => {},
  activeWarnings: [],
  setActiveWarnings: () => {},
  acknowledgedWarnings: [],
  setAcknowledgedWarnings: () => {},
  activeWarningsLower: [],
  setActiveWarningsLower: () => {},
  acknowledgedWarningsLower: [],
  setAcknowledgedWarningsLower: () => {},
  updateWarningsArray: () => {},
  setDashboardWarningsUnitsTest: () => {},
  dashboardWarningsUnitsTest: {},
});




interface WarningProviderProps {
  children: ReactNode;
}

interface WarningState {
  activeWarnings: WarningInstance[];
  acknowledgedWarnings: WarningInstance[];
  activeWarningsLower: WarningInstance[];
  acknowledgedWarningsLower: WarningInstance[];
}

export const WarningProvider = ({ children }: WarningProviderProps) => {
  const {alerts,updateFlag,defaults} = useContext(SettingsContext);
  const isMetric = defaults.defaultUnitsMetric;
  useEffect(() => {
    console.log("whaa")
   console.log(alerts.alertDefaultWarningsUpperLimits)
  }, [alerts]);

  //console.log(alerts.alertDefaultWarningsNames)
  //console.log(Object.fromEntries(alerts.alertDefaultWarningsNames[0].map((alert, index) => [`name${index}`, alert])))
  const [dashboardWarningsCurrentLimits, setDashboardWarningsCurrentLimits] =
    React.useState<{ [key: string]: { [key: string]: number } }>({
      dashboard1 : Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[0].map((alert, index) => [`limit${index}`, alert])),
      dashboard2 : Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[1].map((alert, index) => [`limit${index}`, alert])),
      dashboard3 : Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[2].map((alert, index) => [`limit${index}`, alert])),
      dashboard4 : Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[3].map((alert, index) => [`limit${index}`, alert])),
    });

  const [dashboardWarningsCurrentLimitsLower, setDashboardWarningsCurrentLimitsLower] =
    React.useState<{ [key: string]: { [key: string]: number } }>({
      dashboard1 : Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[0].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard2 : Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[1].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard3 : Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[2].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard4 : Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[3].map((alert, index) => [`limitLower${index}`, alert])), 
    });

   // const dashboard1 = Object.fromEntries(alerts.alertDefaultWarningsNames[0].map((alert, index) => [`name${index}`, alert]));
    //const dashboard2 = Object.fromEntries(alerts.alertDefaultWarningsNames[1].map((alert, index) => [`name${index}`, alert]));
    //const dashboard3 = Object.fromEntries(alerts.alertDefaultWarningsNames[2].map((alert, index) => [`name${index}`, alert]));
    //const dashboard4 = Object.fromEntries(alerts.alertDefaultWarningsNames[3].map((alert, index) => [`name${index}`, alert]));
   // useEffect(()=>{
     // console.log(dashboard1)
       //     },[dashboard1])

    const [dashboardWarningsNames, setDashboardWarningsNames] =
    React.useState<{ [key: string]: { [key: string]: string } }>({
      dashboard1 : Object.fromEntries(alerts.alertDefaultWarningsNames[0].map((alert, index) => [`name${index}`, alert])),
      dashboard2 : Object.fromEntries(alerts.alertDefaultWarningsNames[1].map((alert, index) => [`name${index}`, alert])),
      dashboard3 : Object.fromEntries(alerts.alertDefaultWarningsNames[2].map((alert, index) => [`name${index}`, alert])),
      dashboard4 : Object.fromEntries(alerts.alertDefaultWarningsNames[3].map((alert, index) => [`name${index}`, alert])),
    });
    const [dashboardWarningsUnitsTest, setDashboardWarningsUnitsTest] =
    React.useState<{ [key: string]: { [key: string]: string } }>({
      dashboard1 : Object.fromEntries(alerts.alertDefaultWarningsUnits[0].map((alert, index) => [`name${index}`, alert])),
    dashboard2 : Object.fromEntries(alerts.alertDefaultWarningsUnits[1].map((alert, index) => [`name${index}`, alert])),
    dashboard3 : Object.fromEntries(alerts.alertDefaultWarningsUnits[2].map((alert, index) => [`name${index}`, alert])),
    dashboard4 : Object.fromEntries(alerts.alertDefaultWarningsUnits[3].map((alert, index) => [`name${index}`, alert])),
  });


  useEffect(() => {
    // Update dashboardWarningsCurrentLimits
    const updatedDashboardWarningsCurrentLimits = {
      dashboard1: Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[0].map((alert, index) => [`limit${index}`, alert])),
      dashboard2: Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[1].map((alert, index) => [`limit${index}`, alert])),
      dashboard3: Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[2].map((alert, index) => [`limit${index}`, alert])),
      dashboard4: Object.fromEntries(alerts.alertDefaultWarningsUpperLimits[3].map((alert, index) => [`limit${index}`, alert])),
    };
    setDashboardWarningsCurrentLimits(updatedDashboardWarningsCurrentLimits);
  
    // Update dashboardWarningsCurrentLimitsLower
    const updatedDashboardWarningsCurrentLimitsLower = {
      dashboard1: Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[0].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard2: Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[1].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard3: Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[2].map((alert, index) => [`limitLower${index}`, alert])),
      dashboard4: Object.fromEntries(alerts.alertDefaultWarningsLowerLimits[3].map((alert, index) => [`limitLower${index}`, alert])),
    };
    setDashboardWarningsCurrentLimitsLower(updatedDashboardWarningsCurrentLimitsLower);
  
    // Update dashboardWarningsNames
    const updatedDashboardWarningsNames = {
      dashboard1: Object.fromEntries(alerts.alertDefaultWarningsNames[0].map((alert, index) => [`name${index}`, alert])),
      dashboard2: Object.fromEntries(alerts.alertDefaultWarningsNames[1].map((alert, index) => [`name${index}`, alert])),
      dashboard3: Object.fromEntries(alerts.alertDefaultWarningsNames[2].map((alert, index) => [`name${index}`, alert])),
      dashboard4: Object.fromEntries(alerts.alertDefaultWarningsNames[3].map((alert, index) => [`name${index}`, alert])),
    };
    setDashboardWarningsNames(updatedDashboardWarningsNames);
  
    // Update dashboardWarningsUnitsTest
    const updatedDashboardWarningsUnitsTest = {
      dashboard1: Object.fromEntries(alerts.alertDefaultWarningsUnits[0].map((alert, index) => [`name${index}`, isMetric ? alert : mapMetricToImperial(alert)])),
      dashboard2: Object.fromEntries(alerts.alertDefaultWarningsUnits[1].map((alert, index) => [`name${index}`,isMetric ? alert : mapMetricToImperial(alert)])),
      dashboard3: Object.fromEntries(alerts.alertDefaultWarningsUnits[2].map((alert, index) => [`name${index}`,isMetric ? alert : mapMetricToImperial(alert)])),
      dashboard4: Object.fromEntries(alerts.alertDefaultWarningsUnits[3].map((alert, index) => [`name${index}`, isMetric ? alert : mapMetricToImperial(alert)])),
    };
    setDashboardWarningsUnitsTest(updatedDashboardWarningsUnitsTest);
  }, [alerts,updateFlag,isMetric]);
  
    const [activeWarnings, setActiveWarnings] = useState<WarningInstance[]>([]);
    const [acknowledgedWarnings, setAcknowledgedWarnings] = useState<WarningInstance[]>([]);
    const [activeWarningsLower, setActiveWarningsLower] = useState<WarningInstance[]>([]);
    const [acknowledgedWarningsLower, setAcknowledgedWarningsLower] = useState<WarningInstance[]>([]);
  

    const resetAllWarningData = ()=>{
      const emptyWarningInstanceArray: WarningInstance[] = [];
      setActiveWarnings(emptyWarningInstanceArray);
      setActiveWarningsLower(emptyWarningInstanceArray);
      setAcknowledgedWarnings(emptyWarningInstanceArray);
      setAcknowledgedWarningsLower(emptyWarningInstanceArray);
      setAcknowledgedWarningsLower(emptyWarningInstanceArray);
    }
    useEffect(() => {
      resetAllWarningData();
    }, [updateFlag]);

    
    const updateWarningsArray = (
      add: boolean,
      newWarning: string,
      newWarningValue: number,
      newWarningUnits: string,
      newWarningLimit: number,
      setWarnings: React.Dispatch<React.SetStateAction<WarningInstance[]>>
    ) => {
      setWarnings((prevWarnings) => {
        if (add) {
          const warningInstance: WarningInstance = {
            newWarning,
            newWarningValue,
            newWarningUnits,
            newWarningLimit,
          };
          return [...prevWarnings, warningInstance];
        } else {
          return prevWarnings.filter(
            (warning) =>
              warning.newWarning !== newWarning ||
              warning.newWarningValue !== newWarningValue ||
              warning.newWarningUnits !== newWarningUnits
          );
        }
      });
    };

  return (
    <WarningContext.Provider
      value={{
        dashboardWarningsCurrentLimits,
        setDashboardWarningsCurrentLimits,
        dashboardWarningsCurrentLimitsLower,
        setDashboardWarningsCurrentLimitsLower,
        dashboardWarningsNames,
        setDashboardWarningsNames,
        setActiveWarnings,
        setActiveWarningsLower,
        setAcknowledgedWarningsLower,
        setAcknowledgedWarnings,
        activeWarnings,
        acknowledgedWarnings,
        activeWarningsLower,
        acknowledgedWarningsLower,
        updateWarningsArray,
        dashboardWarningsUnitsTest,
        setDashboardWarningsUnitsTest
      }}
    >
      {children}
    </WarningContext.Provider>
  );
};

