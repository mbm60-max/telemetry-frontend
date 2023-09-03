import React, { useState } from 'react';
import { createContext, ReactNode } from 'react';
import WarningInstance from '../interfaces/warningInterface';

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
  const [dashboardWarningsCurrentLimits, setDashboardWarningsCurrentLimits] =
    React.useState<{ [key: string]: { [key: string]: number } }>({
      dashboard1: { limit0: 106, limit1: 105, limit2: 105, limit3: 105 },
      dashboard2: { limit0: 0, limit1: 0, limit2: 0, limit3: 0, limit4: 0, limit5: 0 },
      dashboard3: { limit0: 3000, limit1:3000 },
      dashboard4: { limit0: 100, limit1: 100, limit2: 100, limit3: 100,limit4:10,limit5:10,limit6:10,limit7:10},
    });

  const [dashboardWarningsCurrentLimitsLower, setDashboardWarningsCurrentLimitsLower] =
    React.useState<{ [key: string]: { [key: string]: number } }>({
      dashboard1: { limitLower0: 5, limitLower1: 0, limitLower2: 0, limitLower3: 0 },
      dashboard2: { limitLower0: 0, limitLower1: 0, limitLower2: 0, limitLower3: 0, limitLower4: 0, limitLower5: 0},
      dashboard3: { limitLower0: 0, limitLower1:0 },
      dashboard4: { limitLower0: 0, limitLower1: 0, limitLower2: 0, limitLower3: 0, limitLower4: 0, limitLower5: 0, limitLower6: 0 , limitLower7:0 },
    });
    const [dashboardWarningsNames, setDashboardWarningsNames] =
    React.useState<{ [key: string]: { [key: string]: string } }>({
      dashboard1: { name0: 'Front Left Temp', name1: 'Front Right Temp', name2: 'Rear Left Temp', name3: 'Rear Right Temp' },
      dashboard2: { name0: "Oil Temperature", name1: "RPM", name2: "Turbo Boost Pressure", name3: "Oil Pressure", name4: "Fuel Level", name5: "Water Temperature"},
      dashboard3: { name0: "RPM", name1:"RPM To Clutch" },
      dashboard4: { name0: "Front Left Suspension Height", name1: "Front Right Suspension Height", name2: "Rear Left Suspension Height", name3: "Rear Right Suspension Height", name4: "Front Left RPS", name5: "Front Right RPS", name6: "Rear Left RPS" , name7:"Rear Right RPS" },
    });
    const [dashboardWarningsUnitsTest, setDashboardWarningsUnitsTest] =
    React.useState<{ [key: string]: { [key: string]: string } }>({
      dashboard1: { name0: '°C', name1: '°C', name2: '°C', name3: '°C', },
      dashboard2: { name0: '°C', name1: 'RPM', name2: 'Bar', name3: 'Bar', name4: '%', name5: '°C' },
      dashboard3: { name0: 'RPM', name1:'RPM' },
      dashboard4: { name0: 'mm', name1: 'mm', name2: 'mm', name3: 'mm', name4: 'RPS', name5: 'RPS', name6: 'RPS' , name7:'RPS'},
    });
    const [activeWarnings, setActiveWarnings] = useState<WarningInstance[]>([]);
    const [acknowledgedWarnings, setAcknowledgedWarnings] = useState<WarningInstance[]>([]);
    const [activeWarningsLower, setActiveWarningsLower] = useState<WarningInstance[]>([]);
    const [acknowledgedWarningsLower, setAcknowledgedWarningsLower] = useState<WarningInstance[]>([]);
  
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
