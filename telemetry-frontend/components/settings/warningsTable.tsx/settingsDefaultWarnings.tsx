//const [dashboardWarnings, setDashboardWarnings] = React.useState<{ [key: string]: string[] }>({
    //dashboard1: ['Front Left Temp', 'Front Right Temp', 'Rear Left Temp', 'Rear Right Temp'],
   // dashboard2: ["Oil Temperature","RPM","Turbo Boost Pressure","Oil Pressure","Fuel Level","Water Temperature"],
   //dashboard3: ["RPM","RPM To Clutch"],
   // dashboard4: ['Front Left Suspension Height', 'Front Right Suspension Height', 'Rear Left Suspension Height', 'Rear Right Suspension Height','Front Left RPS', 'Front Right RPS', 'Rear Left RPS', 'Rear Right RPS'],
  //});
  //const [dashboardWarningsUnits, setDashboardWarningsUnits] = React.useState<{ [key: string]: string[] }>({
   // dashboard1: ['°C', '°C', '°C', '°C'],
   // dashboard2: ['°C','RPM','bar','bar','%','°C'],
   // dashboard3: ['RPM','RPM'],
   // dashboard4: ['mm','mm','mm','mm','RPS','RPS','RPS','RPS'],
  //});
  //const [dashboardWarningsData, setDashboardWarningsData] = React.useState<{ [key: string]: number[] }>({
   // dashboard1: [1, 5, 3, 4],
   // dashboard2: [0,0,0,0,0,0],
    //dashboard3: [0,0],
    //dashboard4: [100,100,100,100,10,10,10,10],
 // });
  //const [dashboardWarningsDefaultLimits, setDashboardWarningsDefaultLimits] = React.useState<{ [key: string]: number[] }>({
    //dashboard1: [105, 105, 105, 105],
    //dashboard2: [0,0,0,0,0,0],
    //dashboard3: [3000,3000],
    //dashboard4: [0,0,0,0,0,0,0,0],
 // });

import { ThemeProvider } from "@emotion/react"
import { Box, createTheme, styled, Tab, Tabs, useMediaQuery } from "@mui/material"
import React, { useContext, useEffect } from "react";
import Homepage from "../../background/background"
import DefaultWarningDataTable, { WarningDataObject } from "./defaultWarningDataTable";
import { WarningContext } from '../../authProviderWarnings';
interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 1 }}>
            {children}
          </Box>
        )}
      </div>
    );
  }
  
  function a11yProps(index: number) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

interface SettingsDefaultWarningsTabSelectorProps{

}


const SettingsDefaultWarningsTabSelector= ({}: SettingsDefaultWarningsTabSelectorProps) => {
    const warningContext = useContext(WarningContext);
    const {
      dashboardWarningsCurrentLimits,
      setDashboardWarningsCurrentLimits,
      dashboardWarningsCurrentLimitsLower,
      setDashboardWarningsCurrentLimitsLower,
      activeWarnings,
      activeWarningsLower,
      acknowledgedWarnings,
      acknowledgedWarningsLower,
      updateWarningsArray,
      setAcknowledgedWarnings,
      setAcknowledgedWarningsLower,
      setActiveWarnings,
      setActiveWarningsLower,
      dashboardWarningsNames,
      setDashboardWarningsNames,
      dashboardWarningsUnitsTest,
      setDashboardWarningsUnitsTest
    } = warningContext;

    const [value, setValue] = React.useState(0);
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
      setValue(newValue);
    };

    const theme = createTheme({
        palette: {
          primary: {
            main: '#F6F6F6', // Replace with your desired primary color
          },
          secondary: {
            main: '#FB9536', // Replace with your desired secondary color
          },
        },
      });

      const WhiteTextTab = styled(Tab)({
        color: '#F6F6F6',
        backgrounColor: 'red',
        maxWidth:'100%',
        '&:hover': {
          backgroundColor: '#FB9536',
          color: '#F6F6F6',
        },
      });
      const isMobile = useMediaQuery('(max-width:750px)')
    
      

      const fillWarningData = (index: number) => {
        let WarningDataMaps: WarningDataObject[] = [];
      
        // Construct the key for the dashboard
        const dashboardKey = `dashboard${index}`;
      
        // Check if the dashboard exists in the limits objects
        if (dashboardKey in dashboardWarningsCurrentLimits && dashboardKey in dashboardWarningsCurrentLimitsLower) {
          console.log(dashboardWarningsNames[dashboardKey])
          const dashboardLimits = dashboardWarningsCurrentLimits[dashboardKey];
          const dashboardLowerLimits = dashboardWarningsCurrentLimitsLower[dashboardKey];
          const dashboardNames = dashboardWarningsNames[dashboardKey];
          const dashboardUnits = dashboardWarningsUnitsTest[dashboardKey];
          // Iterate through each limit and create a warning object
          let innerIndex = 0;
          for (const limitKey in dashboardLimits) {
            
            if (dashboardLimits.hasOwnProperty(limitKey)) {
              const singleWarning = new WarningDataObject();
              singleWarning.name = dashboardNames[`name${innerIndex}`];
              console.log( singleWarning.name )
              singleWarning.units = dashboardUnits[`name${innerIndex}`];
              singleWarning.upperLimit = dashboardLimits[limitKey];
              singleWarning.lowerLimit = dashboardLowerLimits[`limitLower${innerIndex}`];
              WarningDataMaps.push(singleWarning);
            }innerIndex+=1;
          }
        } else {
          console.error(`Dashboard ${index} does not exist in the limits objects.`);
        }
      
        return WarningDataMaps;
      };
  
  return (
    <>
    <ThemeProvider theme={theme}>
    <Tabs value={value} textColor="primary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example" centered orientation={isMobile ? 'vertical' : 'horizontal'}>
      <WhiteTextTab label="General" {...a11yProps(0)} />
      <WhiteTextTab label="Engine" {...a11yProps(1)} />
      <WhiteTextTab label="Gearbox" {...a11yProps(2)} />
      <WhiteTextTab label="Tyres/Suspension" {...a11yProps(3)} />
      </Tabs>
      </ThemeProvider>
     
      
    <TabPanel value={value} index={0} >
   <DefaultWarningDataTable WarningData={fillWarningData(1)} hasDivider={true} targetSetting={"Change Default Warnings"}></DefaultWarningDataTable>
    </TabPanel>
    <TabPanel value={value} index={1}>
    <DefaultWarningDataTable WarningData={fillWarningData(2)} hasDivider={true} targetSetting={"Change Default Warnings"}></DefaultWarningDataTable>
    </TabPanel>
    <TabPanel value={value} index={2}>
    <DefaultWarningDataTable WarningData={fillWarningData(3)} hasDivider={true} targetSetting={"Change Default Warnings"}></DefaultWarningDataTable>
    </TabPanel>
    <TabPanel value={value} index={3}>
    <DefaultWarningDataTable WarningData={fillWarningData(4)} hasDivider={true} targetSetting={"Change Default Warnings"}></DefaultWarningDataTable>
    </TabPanel>
    </>
     );
     };

     export default SettingsDefaultWarningsTabSelector;
