import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses, Typography, Grid } from "@mui/material";
import { fuelMapObject } from "../../utils/relativeFuelCalculations";
import roundTo1DP, { roundTo3SF } from "../../utils/roudning";

export class WarningDataObject {
    name:string = "NUll";
    upperLimit:number = -1;
    lowerLimit:number = -1;
}

interface DefaultWarningDataTableProps{
WarningData:WarningDataObject[];
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
  
const DefaultWarningDataTable = ({WarningData}: DefaultWarningDataTableProps) => {
    return (
        <Box sx={{ padding: 0.5 }}>
          <Grid container spacing={4} >
          <Grid item xs={12} >
      <TableContainer sx={{ maxHeight: 423 }} component={Paper}>
        <Table sx={{ minWidth: 700, maxHeight: 200 }} aria-label="customized table">
          
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Upper Limit</StyledTableCell>
                <StyledTableCell align="right">Lower Limit</StyledTableCell>
              </TableRow>
            </TableHead>
         
          <TableBody>
            
              {WarningData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{roundTo3SF(row.upperLimit)}</StyledTableCell>
                  <StyledTableCell align="right">{roundTo1DP(row.lowerLimit)}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
</Grid>
    </Box>
    );
};

export default DefaultWarningDataTable;