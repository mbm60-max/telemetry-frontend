import { Button, FormControl, Grid, InputLabel, MenuItem,Box, Paper, Select, SelectChangeEvent, styled, Typography} from "@mui/material";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import WarningInstance from "../../interfaces/warningInterface";
import TextWarningOverlay from "../textWarningOverlay";
import WarningIcon from '@mui/icons-material/Warning';
import BoxedNumber from "../boxedNumber";
import HorizontalBanner from "../horizontalBanner/horizontalBanner";
import ClearIcon from '@mui/icons-material/Clear';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  alignText:'center',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: '#FB9536',
  boxShadow: 'none', // Override the shadow effect
  borderRadius:20,
  maxWidth:'900px',
  minWidth:'150px',
  width:'100%',
  display:'flex',
}));
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
    
   <Box sx={{ width: '100vw', height: '100%'}}>
       <Button className="parallelogram-buttonBlueXS" onClick={handleIgnore} sx={{postion:'absolute',top:0,left:'80%'}}>Ignore<ClearIcon/></Button>
   <Button className="parallelogram-buttonBlueXS" onClick={handleSupress} sx={{postion:'absolute',top:0,left:'80%'}}>Clear<ClearIcon/></Button>
  <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner
        GridContent={isHigherWarning ? (
          [`Limit exceeded ! ${activeWarning.newWarning} is above the limit you set.`]
        ) : (
          [`Limit exceeded ! ${activeWarning.newWarning} is below the limit you set.`]
        )}


        fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={true} /></Item></Grid>
  <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"This value has breached a limit you put in place, there may be an issue with your car, it is recommended to investigate."} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
           
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["CURRENT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}} className="textBoxXG"><BoxedNumber  width={"80%"} targetAttribute={"Limit:"} targetAttributeValue={activeWarning.newWarningLimit} toolTipContent={"The current limit for the attribute"} stringValue={activeWarning.newWarningUnits}/></Grid>
               <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}} className="textBoxXG"><BoxedNumber width={"80%"} targetAttribute={"Current:"} toolTipContent={"The most recently recieved value for the attribute"}  targetAttributeValue={activeWarning.newWarningValue} stringValue={activeWarning.newWarningUnits}/></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["SUPPRESS"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["IGNORE"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
 Ignored warnings will not be shown again, suppressing suspends warnings for a preset time, alter this in your setings.
            </Typography></Grid>
            <Grid item xs={6}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleSupress} >SUPRESS WARNING</Box></Button></Grid>
            <Grid item xs={6}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleIgnore} >IGNORE WARNING</Box></Button></Grid>
            <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
            
            </Grid>
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