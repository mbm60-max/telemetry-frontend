import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import WarningIcon from '@mui/icons-material/Warning';
import FormHelperText from '@mui/material/FormHelperText';
import './keyWarningsDelete.css'
interface KeyWarningsSettingsDeleteProps {
  handleDeletion:() => void;
  valuesIndexChange:(valuesIndex: number) => void;
  limitsIndexChange:(limitsIndex: number) => void;
  onClose:()=>void;
  allWarnings:string[];
}

const KeyWarningsSettingsDelete = ({handleDeletion,valuesIndexChange,limitsIndexChange,onClose,allWarnings}: KeyWarningsSettingsDeleteProps) => {
    const [valuesIndex, setValuesIndex] = useState(0);
    const [limitsIndex, setLimitsIndex] = useState(0);
    const [deleteError,setDeleteError]= useState("");
    const [selectedWarning, setSelectedWarning] = useState("");
  const handleDelete = () => {
    if(selectedWarning!==""){
      handleDeletion();
      return;
    }setDeleteError("You must select a warning to be deleted")
  };

   const handleValuesIndexChange = (index:number) => {
    valuesIndexChange(index);
    setValuesIndex(index);
   };
   const handleLimitsIndexChange = (index:number) => {
    limitsIndexChange(index);
    setLimitsIndex(index);
   };
   const handleSelectedWarning = (event: SelectChangeEvent<string>, child: ReactNode) => {
    setSelectedWarning(event.target.value)
    const index = parseInt(event.target.value);
    //for some reason it acts as both a string and a number in different cases so watch out
    handleLimitsIndexChange(index)
    handleValuesIndexChange(index)
    setDeleteError("")
   };

  const handleClose=()=>{
    onClose();
  }

  return (
    <>
     <Box sx={{ width: '50vh', height: '50%'}}>
     <Grid container spacing={2}><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:20}}>
     {(allWarnings[selectedWarning as unknown as number]===undefined) ? "You are about to delete an item" : "You are about to delete " + allWarnings[selectedWarning as unknown as number]}

                </Typography></Grid><Grid item xs={12}><Typography id="input-slider" gutterBottom sx={{fontSize:15}} >
This action cannot be directly undone
               </Typography></Grid>
               <Grid item xs={12} sx={{height:'100%'}}><TextWarningOverlay height={100} width={100} icon={WarningIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Warning"} text={"Once deleted you will no longer recieve warnings for this property"} textColour={""} textSize={0} fontFamily={""} fontWeight={""}/></Grid>
               <Grid item xs={12}><FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Delete Warning</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedWarning}
          label="Select Warning"
          onChange={handleSelectedWarning}
          error={(Boolean(deleteError))}
        >
          {allWarnings.map((warning, index) => (
                  <MenuItem key={index} value={index}>
                    {warning}
                  </MenuItem>))}
        </Select><FormHelperText className="red-text">{deleteError}</FormHelperText>
      </FormControl></Grid>
               <Grid item xs={6}><Button onClick={handleDelete}>Delete</Button></Grid>
               <Grid item xs={6}><Button onClick={handleClose}>Exit</Button></Grid></Grid>
   </Box>
   <Box sx={{ width: '100vw', height: '100%'}}>
   <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
  <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={[`Changing limit for ${valueOfInterest} !`]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Item></Grid>
  <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"By changing these limits previosuly set limits are removed, this will alter when you see warnings"} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
           
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["UPPER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={["LOWER LIMIT"]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} /></Grid>
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
</>
  );
};

export default KeyWarningsSettingsDelete