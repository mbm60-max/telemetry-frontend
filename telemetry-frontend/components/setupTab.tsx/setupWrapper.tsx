import { Grid } from '@mui/material';
import React, { useState } from 'react';
import SetupCarDisplay from './setupCarDisplay';
import SetupController from './setupController';
import SetupFeedback from './setupFeedback';
import SetupSelectedFieldDisplay from './setupSelectedFieldDisplay';


interface SetupWrapperProps {
name:string;
}
const setupFeedbackConditions = ['Oversteer','Understeer','Instability','No traction','Throttle Response']


const SetupWrapper = ({ name }: SetupWrapperProps) => {
 
  return (
    <><Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={3} sx={{minWidth:'100px'}}><SetupController/></Grid><Grid item xs={12} sm={9} ><Grid container spacing={4} alignItems="center">
          <Grid item xs={12}><SetupSelectedFieldDisplay conditions={[]} field={'Suspension'}/></Grid><Grid item xs={12} ><SetupCarDisplay name={'hi'}/></Grid> <Grid item xs={12}><SetupFeedback conditions={setupFeedbackConditions}/></Grid></Grid></Grid></Grid></>
     )
     }

     export default SetupWrapper