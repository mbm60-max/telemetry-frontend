import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses } from "@mui/material";
import { fuelMapObject } from "../../utils/relativeFuelCalculations";

interface FuelDataProps{
FuelObjectMaps:fuelMapObject[];
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
  
const FuelDataDisplay = ({FuelObjectMaps}: FuelDataProps) => {
    return (
        <Box sx={{ padding: 0.5 }}>
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
                  <StyledTableCell align="right">{row.powerPercentage}</StyledTableCell>
                  <StyledTableCell align="right">{row.consumptionPercentage}</StyledTableCell>
                  <StyledTableCell align="right">{row.fuelConsumedPerLap}</StyledTableCell>
                  <StyledTableCell align="right">{row.lapsRemainingOnCurrentFuel}</StyledTableCell>
                  <StyledTableCell align="right">{row.timeRemainingOnCurrentFuel}</StyledTableCell>
                  <StyledTableCell align="right">{row.lapTimeDiff}</StyledTableCell>
                  <StyledTableCell align="right">{row.lapTimeExpected}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
    );
};

export default FuelDataDisplay;