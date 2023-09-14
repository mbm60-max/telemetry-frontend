import { Button, FormControl,Box, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Typography} from "@mui/material";
import React, { ReactNode, useState } from "react";
import TextField from '@mui/material/TextField';
import TextWarningOverlay from "../textWarningOverlay";
import WarningIcon from '@mui/icons-material/Warning';
import FormHelperText from '@mui/material/FormHelperText';
import './keyWarningsDelete.css';
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
   <Box sx={{ width: '100vw', height: '100%'}}>
   <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
  <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={[`${(allWarnings[selectedWarning as unknown as number] === undefined) ? "You are about to delete an item" : "You are about to delete " + allWarnings[selectedWarning as unknown as number]}`]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={true} /></Item></Grid>
  <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={"Once deleted you will no longer recieve warnings for this property"} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
           
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',overflow:"auto"}}><HorizontalBanner GridContent={[`${(selectedWarning === "")?"SELECTED WARNING":allWarnings[selectedWarning as unknown as number]}`]} needsBackground={false} fontSizes={[35]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={true} /></Grid>
            
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'50%'}}><FormControl fullWidth className="textBoxXG">
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
      </FormControl></Box></Grid>
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
This action cannot be directly undone
            </Typography></Grid>
            <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleDelete} >Remove Selected Warning</Box></Button></Grid>
            <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
            </Grid>
</Box>
  );
};

export default KeyWarningsSettingsDelete