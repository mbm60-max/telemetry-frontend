import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import SignalRService from '../../utils/signalrEndpoint';
import { useEffect, useState } from 'react';
import ExtendedPacket from '../../interfaces/extendedPacketInterface';
import MergeSort from '../../utils/mergeSort';


interface smallLapTableProps{
    lastLapTime:string;
    bestLapTime:string;
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

function createData(
  lapTime: string,
  delta: number,
  compound: string,
  setup: string,
) {
  return { lapTime, delta, compound, setup};
}



export default function SmallLapTable({lastLapTime,bestLapTime}:smallLapTableProps) {
    const [rows, setRows] = useState<Array<any>>([])
    const [prevLap, setPrevLap] = useState('')
      /* won't work if the lap times are indentical */ 
      //add sorting and check for time of -1second
      useEffect(() => {
        if (prevLap !== lastLapTime) {
          const newRow = createData(lastLapTime, 0.1, 'Hard', 'Basic');
      setRows(prevRows => {
        const updatedRows = [...prevRows, newRow];
        const sortedRows = MergeSort(updatedRows);
        return sortedRows;
      });
      setPrevLap(lastLapTime);
        }
      }, [lastLapTime, bestLapTime, prevLap, rows, MergeSort]);

      
      

  return (
    <Box sx={{ padding: 0.5 }}>
      <TableContainer sx={{ maxHeight: 423 }} component={Paper}>
        <Table sx={{ minWidth: 700, maxHeight: 200 }} aria-label="customized table">
          {rows.length > 0 ? (
            <TableHead>
              <TableRow>
                <StyledTableCell>Lap Time</StyledTableCell>
                <StyledTableCell align="right">Delta</StyledTableCell>
                <StyledTableCell align="right">Compound</StyledTableCell>
                <StyledTableCell align="right">Setup</StyledTableCell>
              </TableRow>
            </TableHead>
          ) : (
            <TableHead>
              <TableRow>
                <StyledTableCell>Lap Time</StyledTableCell>
              </TableRow>
            </TableHead>
          )}
          <TableBody>
            {rows.length > 0 ? (
              rows.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {row.lapTime}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.delta}</StyledTableCell>
                  <StyledTableCell align="right">{row.compound}</StyledTableCell>
                  <StyledTableCell align="right">{row.setup}</StyledTableCell>
                </StyledTableRow>
              ))
            ) : (
              <StyledTableRow>
                <StyledTableCell
                  style={{
                    height: 'calc(100vh)',
                    fontSize: '18px',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'normal',
                    justifyContent: 'left',
                  }}
                >
                  No data available
                </StyledTableCell>
              </StyledTableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};