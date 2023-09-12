import { Button, Grid, Paper, styled, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HorizontalBanner from "../horizontalBanner/horizontalBanner";
import ClearIcon from '@mui/icons-material/Clear';
import '../navbar/navbar.css'
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
interface WarningDashboardSettingsProps {
  onSelectLimit: (limit: number,limitLower: number, index:number) => void;
  index:number
  valueOfInterest:string;
  valueOfInterestUnits:string;
  onClose:()=>void;
}

const WarningDashboardSettings = ({ onSelectLimit,index,valueOfInterest,valueOfInterestUnits, onClose }: WarningDashboardSettingsProps) => {
  const [limitValue, setLimitValue] = useState<number>(-1);
  const [limitValueLower, setLimitValueLower] = useState<number>(-1);
  const prevLimit = useRef<number>(limitValue);
  const previousLimitValue = useRef<number>(0);
  const prevLimitLower = useRef<number>(limitValueLower);
  const previousLimitValueLower = useRef<number>(0);
  const [upperLimitError,setUpperLimitError] = useState("");
  const [lowerLimitError,setLowerLimitError] = useState("");
  const handleTextFieldChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setLimitValue(isNaN(newValue) ? 0 : Math.max(0, newValue));
  };
  const handleTextFieldChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
    setLimitValueLower(isNaN(newValue) ? 0 : Math.max(0, newValue));
  };
 

const handleClick = () => {
  if((limitValueLower!=-1)||(limitValue!=-1)){
    onSelectLimit(limitValue,limitValueLower,index)
  }
  else{
    setLowerLimitError("At least one limit must be set to a value");
    setUpperLimitError("At least one limit must be set to a value");
  }
};
useEffect(() => {
  previousLimitValue.current = prevLimit.current; // Update previousLimitValue whenever prevLimit.current changes
  prevLimit.current = limitValue;
}, [limitValue]);
useEffect(() => {
  previousLimitValueLower.current = prevLimitLower.current; // Update previousLimitValue whenever prevLimit.current changes
  prevLimitLower.current = limitValueLower;
}, [limitValueLower]);

const handleClose=()=>{
  onClose();
}

  return (
    <Box sx={{ width: '100vw', height: '100%'}}>
       <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
      <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={[`Changing limit for ${valueOfInterest} !`]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Item></Grid>
      <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"By changing these limits previosuly set limits are removed, this will alter when you see warnings"} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
               
                <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["UPPER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
                <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["LOWER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Grid>
                <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
        id="outlined-basic"
        label="Upper Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValue}
        onChange={handleTextFieldChange}
        error={Boolean(upperLimitError)}
        helperText={upperLimitError}
      /></Grid>
                <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
        id="outlined-basic"
        label="Lower Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={limitValueLower}
        onChange={handleTextFieldChangeLower}
        error={Boolean(lowerLimitError)}
        helperText={lowerLimitError}
      /></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
 Only limits that are not -1 will be put in place.
                </Typography></Grid>
                <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleClick} >CONFIRM NEW LIMITS</Box></Button></Grid>
                <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
                </Grid>
    </Box>
  );
};

export default WarningDashboardSettings;