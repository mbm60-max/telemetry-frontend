import { Button, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Typography} from "@mui/material";
import { Box} from "@mui/system";
import React from "react";
import WarningInstance from "../../interfaces/warningInterface";
interface KeyWarningsSettingsIgnoredProps {
  onClose:()=>void;
  ignoredWarnings:WarningInstance[];
}

const KeyWarningsSettingsIgnored = ({onClose,ignoredWarnings}: KeyWarningsSettingsIgnoredProps) => {
  

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
      </Table>
    </TableContainer>
    </Box>
    <Button onClick={handleClose}>Exit</Button>
    </Box>
  );
};

export default KeyWarningsSettingsIgnored