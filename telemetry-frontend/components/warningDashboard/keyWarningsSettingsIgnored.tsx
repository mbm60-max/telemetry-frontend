import { Button, FormControl, Grid, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React from "react";
import ClearIcon from '@mui/icons-material/Clear';
import WarningInstance from "../../interfaces/warningInterface";

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

const KeyWarningsSettingsIgnored = ({onClose,ignoredWarnings,ignoredWarningsLower}: KeyWarningsSettingsIgnoredProps) => {
  

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
    <>
    <Box sx={{ width: '100%', height: '50%'}}>
       <Box sx={{padding:0.5,width: '100%'}}>
    <TableContainer sx={{width: '100%', maxHeight: 210 }} component={Paper}>
      <Table sx={{minWidth:150 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Currently Ignored Warnings</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {ignoredWarnings.map((value, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {value.newWarning}
                  </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
        <TableBody>
        {ignoredWarningsLower.map((value, index) => (
              <StyledTableRow key={index}>
                <StyledTableCell component="th" scope="row">
                  {value.newWarning}
                  </StyledTableCell>
              </StyledTableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Box>
    <Button onClick={handleClose}>Exit</Button>
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

export default KeyWarningsSettingsIgnored