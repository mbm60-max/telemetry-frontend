'use client'
import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import BasicChart from './chart';
import './sessiontab.css'
import Homepage from './background/background';
import styled from '@emotion/styled';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Button, Link } from '@mui/material';
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
        <Box sx={{ p: 3 }}>
          <Typography >{children}</Typography>
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const WhiteTextTab = styled(Tab)({
    color: '#F6F6F6',
    backgrounColor: '#847E7E',
    '&:hover': {
      backgroundColor: '#DA2E22',
      color: '#F6F6F6',
    },
  });
  const theme = createTheme({
    palette: {
      primary: {
        main: '#F6F6F6', // Replace with your desired primary color
      },
      secondary: {
        main: '#DA2E22', // Replace with your desired secondary color
      },
    },
  });
  return (
    
    <Homepage style={'homepage-alt'}>
    <Box className='header'><Button><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Exit Session</Link></Button></Box>
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
      <ThemeProvider theme={theme}>
        <Tabs value={value} textColor="primary" indicatorColor="secondary" onChange={handleChange} aria-label="basic tabs example" centered >
        <WhiteTextTab label="General" {...a11yProps(0)} />
        <WhiteTextTab label="Engine" {...a11yProps(1)} />
        <WhiteTextTab label="Gearbox" {...a11yProps(2)} />
        <WhiteTextTab label="Tyres/Suspension" {...a11yProps(3)} />
        </Tabs>
        </ThemeProvider>
      </Box>
      <TabPanel value={value} index={0} >
      <Box sx={{ width: '50%' }}>
      <BasicChart />
      </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        Item Two
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
      <TabPanel value={value} index={3}>
        Item Four<h1>hi</h1>
      </TabPanel>
    </Box>
    </Homepage>
  );
}