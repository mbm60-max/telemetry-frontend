import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, TextField, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import WarningInstance from "../../interfaces/warningInterface";
import HorizontalBanner from "../horizontalBanner/horizontalBanner";
import TextWarningOverlay from "../textWarningOverlay";
import MergeSort from "../../utils/mergeSort";

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
interface KeyWarningsSettingsIgnoredProps {
  onClose:()=>void;
  ignoredWarnings:WarningInstance[];
  ignoredWarningsLower:WarningInstance[];
}
interface WarningObject {
  upper: string | "-";
  lower: string | "-";
}

const KeyWarningsSettingsIgnored = ({onClose,ignoredWarnings,ignoredWarningsLower}: KeyWarningsSettingsIgnoredProps) => {
  

const sortAndSetArray=(ignoredWarnings:WarningInstance[],ignoredWarningsLower:WarningInstance[])=>{
  const upperWarningsNames = ignoredWarnings.map(warning => warning.newWarning);
  const lowerWarningsNames = ignoredWarningsLower.map(warning => warning.newWarning);
const sortedUpperWarnings = MergeSort(upperWarningsNames);
const sortedLowerWarnings = MergeSort(lowerWarningsNames);

const resultDict: Record<string, WarningObject> = {};

  for (const upperItem of sortedUpperWarnings) {
    const indexInLower = sortedLowerWarnings.indexOf(upperItem);
    
    if (indexInLower !== -1) {
      const lowerItem = sortedLowerWarnings.splice(indexInLower, 1)[0];
     
      resultDict[upperItem] = { upper: upperItem, lower: lowerItem };
    } else {
      resultDict[upperItem] = { upper: upperItem, lower: "-" };
    }
  }

  for (const lowerItem of sortedLowerWarnings) {
    resultDict[lowerItem] = { upper: "-", lower: lowerItem };
  }
  return resultDict;
};
  const handleClose=()=>{
    onClose();
  }
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    '&:hover': {
      backgroundColor: 'red',
      cursor: 'pointer',
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  return (
    
    <Box sx={{ width: '100vw', height: '100%'}}>
    <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
   <Grid container spacing={4}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={[`Ignored Warnings`]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Item></Grid>
   <Grid item xs={12}><Box sx={{height:'0px'}}></Box></Grid>
            
            
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{padding:0.5,width: '100%'}}>
             <TableContainer sx={{ width: '100%', maxHeight: 500 }} component={Paper}>
  <Table sx={{ minWidth: 150 }} aria-label="customized table">
    <TableHead>
      <TableRow>
        <StyledTableCell><HorizontalBanner GridContent={["UPPER LIMITS"]} needsBackground={false} fontSizes={[29]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></StyledTableCell>
        <StyledTableCell><HorizontalBanner GridContent={["LOWER LIMITS"]} needsBackground={false} fontSizes={[29]} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></StyledTableCell>
      </TableRow>
    </TableHead>
    <TableBody>
    {Object.values(sortAndSetArray(ignoredWarnings, ignoredWarningsLower)).map((value, index) => (
    <StyledTableRow key={index}>
      <StyledTableCell component="th" scope="row">
        {value.upper !== '-' ? value.upper : '-'}
      </StyledTableCell>
      <StyledTableCell component="th" scope="row">
        {value.lower !== '-' ? value.lower : '-'}
      </StyledTableCell>
    </StyledTableRow>
  ))}
    </TableBody>
    
  </Table>
</TableContainer>
    </Box></Grid>
             <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
Limits not shown or listed as - will still show active warnings if exceeded.
             </Typography></Grid>
             <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleClose} >Exit</Box></Button></Grid>
             <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
             </Grid>
 </Box>
  );
};

export default KeyWarningsSettingsIgnored