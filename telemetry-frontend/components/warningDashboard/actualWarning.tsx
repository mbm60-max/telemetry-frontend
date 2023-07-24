import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import WarningInstance from "../../interfaces/warningInterface";
import TextWarningOverlay from "../textWarningOverlay";
import WarningIcon from '@mui/icons-material/Warning';
import BoxedNumber from "../boxedNumber";
interface ActualWarningProps {
  onClose:()=>void;
  activeWarning: WarningInstance;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
  isHigherWarning:boolean;
}

const ActualWarning = ({onClose,activeWarning,handleActiveWarnings,handleAcknowledgedWarnings,isHigherWarning}: ActualWarningProps) => {
  
  const handleIgnore=()=>{
    handleActiveWarnings(false,activeWarning.newWarning,activeWarning.newWarningValue,activeWarning.newWarningUnits,activeWarning.newWarningLimit);
    handleAcknowledgedWarnings(true,activeWarning.newWarning,activeWarning.newWarningValue,activeWarning.newWarningUnits,activeWarning.newWarningLimit);
    onClose();
  }

  const handleSupress=()=>{
    onClose();
  }

  return (
     <Box sx={{ width: '50vh', height: '50%'}}>
     <Grid container spacing={2}><Grid item xs={12}>  <Typography id="input-slider" gutterBottom>
        {isHigherWarning && (
          <>
        <Typography id="input-slider" gutterBottom sx={{fontSize:20}}>
          Limit exceeded !
        </Typography>
        <Typography id="input-slider" gutterBottom sx={{fontSize:15}}>
        {activeWarning.newWarning} is above the limit you set.
      </Typography>
      </>)}
      {!isHigherWarning && (
        <>
        <Typography id="input-slider" gutterBottom sx={{fontSize:20}}>
          Limit exceeded !
        </Typography>
        <Typography id="input-slider" gutterBottom sx={{fontSize:15}}>
        {activeWarning.newWarning} is below the limit you set.
      </Typography>
      </>
      )}
                </Typography></Grid>
               
               <Grid item xs={12} sx={{height:'100%'}}><TextWarningOverlay height={100} width={100} icon={WarningIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Warning"} text={"This value has breached a limit you put in place, there may be an issue with your car, it is recommended to investigate."}/></Grid>
               <Grid item xs={12}><Grid container spacing={2}><Grid item xs={6}><BoxedNumber width={"80%"} targetAttribute={"Limit:"} targetAttributeValue={activeWarning.newWarningLimit} toolTipContent={"The current limit for the attribute"} stringValue={activeWarning.newWarningUnits}/></Grid><Grid item xs={6}><BoxedNumber width={"80%"} targetAttribute={"Current:"} toolTipContent={"The most recently recieved value for the attribute"}  targetAttributeValue={activeWarning.newWarningValue} stringValue={activeWarning.newWarningUnits}/></Grid></Grid></Grid>
               <Grid item xs={6}><Button onClick={handleSupress}>Supress</Button></Grid>
               <Grid item xs={6}> <Button onClick={handleIgnore}>Ignore</Button></Grid></Grid>
       
               
      
   
      
   

   </Box>
  );
};

export default ActualWarning
         //+ {activeWarning.newWarningValue

       //  <Typography id="input-slider" gutterBottom sx={{fontSize:15}} >
         //       Limit: {activeWarning.newWarningLimit}&nbsp;
          //{activeWarning.newWarningUnits}
          //Current Value: {activeWarning.newWarningValue}
            //   </Typography>