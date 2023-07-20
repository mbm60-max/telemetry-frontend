import React, { createContext, ReactNode, useState } from "react";
import WarningInstance from "../interfaces/warningInterface";

export const WarningContext = createContext({
  valuesOfInterest: ["test", "test2", "test3", "brah"],
  setValuesOfInterest: (value: string[]) => {},
  valueOfInterestUnits: ["KPH", "RPM", "M/S", "KG"],
  setValuesOfInterestUnits: (value: string[]) => {},
  valuesOfInterestData: [1, 5, 3, 4],
  setValuesOfInterestData: (value: number[]) => {},
  valuesOfInterestDefaultLimits: [0, 105, 0, 100],
  setValuesOfInterestDefaultLimits: (value: number[]) => {},
  valuesOfInterestCurrentLimits: {},
  setValuesOfInterestCurrentLimits: (value: { [key: string]: number }) => {},
  isWarning: false,
  setIsWarning: (value: boolean) => {},
  activeWarnings: [] as WarningInstance[],
  setActiveWarnings: (warnings: WarningInstance[]) => {},
  suppressedWarnings: [] as WarningInstance[],
  setSuppressedWarnings: (warnings: WarningInstance[]) => {},
  acknowledgedWarnings: [] as WarningInstance[],
  setAcknowledgedWarnings: (warnings: WarningInstance[]) => {},
});
interface WarningProviderProps {
  children: ReactNode;
}
export const WarningProvider = ({ children }: WarningProviderProps) => {
  const [valuesOfInterest, setValuesOfInterest] = useState([
    "test",
    "test2",
    "test3",
    "brah",
  ]);
  const [valueOfInterestUnits, setValuesOfInterestUnits] = useState([
    "KPH",
    "RPM",
    "M/S",
    "KG",
  ]);
  const [valuesOfInterestData, setValuesOfInterestData] = useState([
    1, 5, 3, 4,
  ]);
  const [valuesOfInterestDefaultLimits, setValuesOfInterestDefaultLimits] =
    useState([0, 105, 0, 100]);
  const [valuesOfInterestCurrentLimits, setValuesOfInterestCurrentLimits] =
    React.useState<{
      [key: string]: number;
    }>({});
  const [isWarning, setIsWarning] = useState(false);
  const [activeWarnings, setActiveWarnings] = useState<WarningInstance[]>([]);
  const [suppressedWarnings, setSuppressedWarnings] = useState<
    WarningInstance[]
  >([]);
  const [acknowledgedWarnings, setAcknowledgedWarnings] = useState<
    WarningInstance[]
  >([]);

  return (
    <WarningContext.Provider
      value={{
        valuesOfInterest,
        setValuesOfInterest,
        valueOfInterestUnits,
        setValuesOfInterestUnits,
        valuesOfInterestData,
        setValuesOfInterestData,
        valuesOfInterestDefaultLimits,
        setValuesOfInterestDefaultLimits,
        valuesOfInterestCurrentLimits,
        setValuesOfInterestCurrentLimits,
        isWarning,
        setIsWarning,
        activeWarnings,
        setActiveWarnings,
        suppressedWarnings,
        setSuppressedWarnings,
        acknowledgedWarnings,
        setAcknowledgedWarnings,
      }}
    >
      {children}
    </WarningContext.Provider>
  );
};
