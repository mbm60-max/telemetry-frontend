import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses, Typography, Grid } from "@mui/material";
import { fuelMapObject } from "../../utils/relativeFuelCalculations";
import roundTo1DP, { roundTo3SF } from "../../utils/roudning";

interface FuelDataProps{
FuelObjectMaps:fuelMapObject[];
gasLevel:number;
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
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
const FuelDataDisplay = ({FuelObjectMaps,gasLevel}: FuelDataProps) => {
    return (
        <Box sx={{ padding: 0.5 }}>
          <Grid container spacing={4} >
          <Grid item xs={12} >
      <TableContainer sx={{ maxHeight: 423 }} component={Paper}>
        <Table sx={{ minWidth: 700, maxHeight: 200 }} aria-label="customized table">
          
            <TableHead>
              <TableRow>
                <StyledTableCell>Fuel Lvl</StyledTableCell>
                <StyledTableCell align="right">Power %</StyledTableCell>
                <StyledTableCell align="right">Consumption %</StyledTableCell>
                <StyledTableCell align="right">Fuel Cons</StyledTableCell>
                <StyledTableCell align="right">Laps Rem</StyledTableCell>
                <StyledTableCell align="right">Time Rem</StyledTableCell>
                <StyledTableCell align="right">Time Diff</StyledTableCell>
                <StyledTableCell align="right">Expected Lap Time</StyledTableCell>
              </TableRow>
            </TableHead>
         
          <TableBody>
            
              {FuelObjectMaps.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.mixtureSetting}
                  </StyledTableCell>
                  <StyledTableCell align="right">{roundTo3SF(row.powerPercentage)}</StyledTableCell>
                  <StyledTableCell align="right">{roundTo3SF(row.consumptionPercentage)}</StyledTableCell>
                  <StyledTableCell align="right">{roundTo1DP(row.fuelConsumedPerLap)}</StyledTableCell>
                  <StyledTableCell align="right">{roundTo1DP(row.lapsRemainingOnCurrentFuel)}</StyledTableCell>
                  <StyledTableCell align="right">{row.timeRemainingOnCurrentFuel}</StyledTableCell>
                  <StyledTableCell align="right">{roundTo1DP(row.lapTimeDiff)}</StyledTableCell>
                  <StyledTableCell align="right">{row.lapTimeExpected}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
      <Grid item xs={12} >
      <Grid container spacing={2} >
      <Grid item xs={12} sm={4}>
      <Box style={{ display: 'flex', alignItems: 'center',backgroundColor: "rgba(8, 13, 56, 0)",
        borderRadius: 1.5,minHeight:'80px',overflow:'auto',
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",border: "6px solid rgba(8, 13, 100, 0.6)" }}>
  <Typography fontFamily={"Yapari"}  variant="body1" style={{ marginRight: '8px',marginLeft:'8px',fontSize:25,whiteSpace:'nowrap'}}>
    Fuel Remaining:
  </Typography>
  <Typography  fontFamily={"Satoshi"} variant="body1" style={{fontWeight: 'bold',fontSize:30}}>
    {gasLevel}
  </Typography>
</Box>
</Grid>
<Grid item xs={12} sm={4}>
      <Box style={{ display: 'flex', alignItems: 'center',backgroundColor: "rgba(8, 13, 56, 0)",
        borderRadius: 1.5,minHeight:'80px',overflow:'auto',
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",border: "6px solid rgba(8, 13, 100, 0.6)"  }}>
  <Typography fontFamily={"Yapari"}  variant="body1" style={{ marginRight: '8px',marginLeft:'8px',fontSize:25,whiteSpace:'nowrap'}}>
    Time Remaining:
  </Typography>
  <Typography  fontFamily={"Satoshi"} variant="body1" style={{fontWeight: 'bold',fontSize:30}}>
    {FuelObjectMaps[5].timeRemainingOnCurrentFuel}
  </Typography>
</Box>
</Grid>
<Grid item xs={12} sm={4}>
      <Box style={{ display: 'flex', alignItems: 'center',backgroundColor: "rgba(8, 13, 56, 0)",
        borderRadius: 1.5,minHeight:'80px',overflow:'auto',
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.1)",border: "6px solid rgba(8, 13, 100, 0.6)" }}>
  <Typography fontFamily={"Yapari"}  variant="body1" style={{ marginRight: '8px',marginLeft:'8px',fontSize:25,whiteSpace:'nowrap'}}>
    Laps Remaining:
  </Typography>
  <Typography  fontFamily={"Satoshi"} variant="body1" style={{fontWeight: 'bold',fontSize:30}}>
    {roundTo1DP(FuelObjectMaps[5].lapsRemainingOnCurrentFuel)}
  </Typography>
</Box>
</Grid>
</Grid>
</Grid>
</Grid>
    </Box>
    );
};

export default FuelDataDisplay;