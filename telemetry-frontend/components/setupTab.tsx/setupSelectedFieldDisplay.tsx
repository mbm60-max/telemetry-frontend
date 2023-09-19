import { Box, Grid, Slider, SvgIconProps, Typography } from '@mui/material';
import React, { ReactNode, useState } from 'react';
import Image from 'next/image';
import InfoToolTip from '../helperTooltip.tsx/infoTooltip';
import SetupFeedbackSlider from './setupFeedbackSlider';
import SetupDataDisplay from './setupDataDisplay';
import splitAndCapitalise from '../../utils/splitAndCapitalise';
import { SettingsContext } from '../authProviderSettings';
type SetupObject = {
  [key: string]: any;
};
interface MUIIcon {
  icon: ReactNode; // You can also use `React.ReactElement` if needed
  props?: SvgIconProps; // Optional props specific to Material-UI SvgIcon
}
interface IconList {
  icons: MUIIcon[];
}
interface SetupSelectedFieldDisplayProps {
conditions:string[];
setupName:string;
selectedField:string;
fieldData:SetupObject;
icons:IconList | undefined;
}



const SetupSelectedFieldDisplay= ({ conditions,fieldData,setupName,selectedField,icons }: SetupSelectedFieldDisplayProps) => {
      const {appearance} = React.useContext(SettingsContext);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        backgroundColor: appearance.lightModeEnabled ? "white" :"rgba(6, 14, 55, 0.9)",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.3)",
        border: appearance.lightModeEnabled ? "3px solid rgba(8, 13, 100, 0.3)" :" 3px solid white",
      }}
    >
    <Box sx={{ width: '100%', height: '100%',position:'relative' }}>
    <Grid container spacing={2} alignItems="center">
          <Grid item xs={12}><Grid container spacing={2} alignItems="center"><Grid item xs={12} sx={{ display: "flex",ml:1 }}><Typography variant="h6" sx={{fontSize:30,color:appearance.lightModeEnabled ? "black" :"white"}} fontFamily={"Yapari"}  fontWeight="bold">{selectedField}</Typography></Grid></Grid></Grid><Grid item xs={12} sx={{ display: "flex",ml:1 }}><Typography  variant="body2" sx={{fontSize:20,color:appearance.lightModeEnabled ? "black" :"white"}} fontFamily={"Satoshi"}>{splitAndCapitalise(setupName)}</Typography></Grid>
          <Grid item xs={12}><Box></Box></Grid>
          <Grid item xs={12}>
          <Grid container columnSpacing={0} rowSpacing={4} alignItems="center">
          {fieldData && Object.keys(fieldData).map((fieldName, index) => (
            <React.Fragment key={index}>
              <Grid item xs={4}>
                <SetupDataDisplay name={fieldName} value={fieldData[fieldName].Value} units={fieldData[fieldName].Units} icon={icons?.icons[index]} />
              </Grid>
            </React.Fragment>
          ))}
      </Grid>
      </Grid>
      </Grid>
    </Box>
     </Box>
     )
     }

     export default SetupSelectedFieldDisplay