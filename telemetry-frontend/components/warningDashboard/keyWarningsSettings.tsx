import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import HorizontalBanner from "../horizontalBanner/horizontalBanner";
import ClearIcon from '@mui/icons-material/Clear';

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
interface KeyWarningsSettingsAddProps {
  handleAddition:() => void;
  newUnitsChange: (newUnits: string) => void;
  newWarningChange: (newWarning: string) => void;
  newLimitChange:(newLimit: number) => void;
  newLimitChangeLower:(newLimitLower: number) => void;
  onClose:()=>void;
}

const KeyWarningsSettingsAdd = ({ handleAddition,newUnitsChange,newWarningChange,newLimitChange,onClose,newLimitChangeLower}: KeyWarningsSettingsAddProps) => {
    const [newUnits, setNewUnits] = useState("");
    const [newWarning, setNewWarning] = useState("");
    const [newLimit, setNewLimit] = useState(-1);
    const [newLimitLower, setNewLimitLower] = useState(-1);
    const [limitError, setLimitError] = useState("");
    const [limitLowerError, setLimitLowerError] = useState("");
    const [warningError, setWarningError] = useState("");
    const [unitsError, setUnitsError] = useState("");

  const handleAdd = () => {
    setUnitsError("")
    setWarningError("")
    setLimitError("")
    setLimitLowerError("")
    if(newUnits===""){
        setUnitsError("You must provide units")
    }
    if(newWarning===""){
        setWarningError("You must select a new attribute")
    }
    if(newLimit===-1){
        setLimitError("You must provide a warning limit")
    }
    if(newLimitLower===-1){
      setLimitLowerError("You must provide a lower warning limit")
  }
    if((newLimitLower!==-1)&&(newLimit!==-1)&&(newWarning!=="")&&(newUnits!=="")){
        handleAddition();
    }
    return;
  };

  const handleNewUnitsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value
    newUnitsChange(updatedValue);
    setNewUnits(updatedValue);
   };
   const handleNewWarningChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const updatedValue = event.target.value
    newWarningChange(updatedValue);
    setNewWarning(updatedValue);
   };
   const handleNewLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
   const newValue = parseInt(event.target.value);
      setNewLimit(isNaN(newValue) ? 0 : Math.max(0, newValue));
      newLimitChange(newValue);
   };
   const handleNewLimitChangeLower = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(event.target.value);
       setNewLimitLower(isNaN(newValue) ? 0 : Math.max(0, newValue));
       newLimitChangeLower(newValue);
    };

  const handleClose=()=>{
    onClose();
  }

  return (

  <Box sx={{ width: '100vw', height: '100%'}}>
  <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
 <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={[` You are adding a new warning !`]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Item></Grid>
 <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
           <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"Adding a new warning will alter when you see warnings"} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
          
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["UPPER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["LOWER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
      id="outlined-basic"
      label="Set Upper Limit"
      variant="outlined"
      type="number" // Set input type to 'number'
      inputProps={{
        min: 0, // Set minimum value to 0
      }}
      value={newLimit}
      onChange={handleNewLimitChange}
        error={Boolean(limitError)}
        helperText={limitError}
    /></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
        id="outlined-basic"
        label="Set Lower Limit"
        variant="outlined"
        type="number" // Set input type to 'number'
        inputProps={{
          min: 0, // Set minimum value to 0
        }}
        value={newLimitLower}
        onChange={handleNewLimitChangeLower}
        error={Boolean(limitLowerError)}
        helperText={limitLowerError}
      /></Grid>
           <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
Only limits that are not -1 will be put in place.
           </Typography></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["NAME"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["UNITS"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
           <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
        id="outlined-basic"
        label="Set Warning"
        variant="outlined"
        value={newWarning}
        onChange={handleNewWarningChange}
        error={Boolean(warningError)}
        helperText={warningError}
      /></Grid>
              <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}><TextField className="textBoxXG"
      id="outlined-basic"
      label="Set Units"
      variant="outlined"
      value={newUnits}
      onChange={handleNewUnitsChange}
      error={Boolean(unitsError)}
      helperText={unitsError}
    /></Grid>
       <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleAdd} >CONFIRM NEW WARNING</Box></Button></Grid>
           <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
           
           </Grid>
</Box>
  );
};

export default KeyWarningsSettingsAdd