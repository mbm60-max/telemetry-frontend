import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses, Typography, Grid, Button, Divider, Container } from "@mui/material";
import React, { useEffect, useRef } from "react";
import { fuelMapObject } from "../../../utils/relativeFuelCalculations";
import roundTo1DP, { roundTo3SF } from "../../../utils/roudning";
import KeyWarningsDeleteModal from "../../warningDashboard/keyWarningsDeleteModal";
import KeyWarningsAddModal from "../../warningDashboard/keyWarningsModal";
import WarningDashboardSettingsModal from "../../warningDashboard/warningDashboardSettingsModal";
import WarningDashboardSettings from "../../warningDashboard/warningDashSettings";

export class WarningDataObject {
    name:string = "NUll";
    upperLimit:number = -1;
    lowerLimit:number = -1;
    units:string = "NUll";
}

interface DefaultWarningDataTableProps{
WarningData:WarningDataObject[];
hasDivider:boolean;
targetSetting:string;
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
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
  width:'99%',
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
 


const DefaultWarningDataTable = ({WarningData,hasDivider,targetSetting}: DefaultWarningDataTableProps) => {
  const readyFlagRef = useRef(0);
  const [selectedLimits, setSelectedLimits] = React.useState<{ [key: string]: number }>({});
  useEffect(() => {
    const newSelectedLimits: { [key: string]: number } = {};
    WarningData.forEach((warning, index) => {
      // Use the index as the key (assuming it starts from 0)
      newSelectedLimits[`limit${index}`] = warning.upperLimit;
    });
    setSelectedLimits(newSelectedLimits);
  }, []);


useEffect(() => {
  readyFlagRef.current += 1;
}, [WarningData]);

  const [selectedLimitsLower, setSelectedLimitsLower] = React.useState<{ [key: string]: number }>({});
  useEffect(() => {
    setSelectedLimitsLower(selectedLimitsLower);
  }, []);


  useEffect(() => {
    console.log(selectedLimits)
  }, [selectedLimits]);

  const handleLimitSelection = (
    limit: number,
    limitLower: number,
    index: string
  ) => {
    if (limit == -1) {
      setSelectedLimitsLower((prevFields) => ({
        ...prevFields,
        [`limitLower${index}`]: limitLower,
      }));
    }
    if (limitLower == -1) {
      setSelectedLimits((prevFields) => ({
        ...prevFields,
        [`limit${index}`]: limit,
      }));
    }
    if (limitLower != -1 && limit != -1) {
      setSelectedLimitsLower((prevFields) => ({
        ...prevFields,
        [`limitLower${index}`]: limitLower,
      }));
      setSelectedLimits((prevFields) => ({
        ...prevFields,
        [`limit${index}`]: limit,
      }));
    }
  };


    return (
        
    <Box sx={{ width:'200%',height: "100%", position: "relative" }}>
    <Grid container spacing={2}>
      <Grid item xs={12} >

        <Typography sx={{ fontSize: 30,overflow:'scroll',maxWidth:'50%',whiteSpace:'nowrap' }} fontWeight="Bold" >
          {targetSetting}
        </Typography>

      </Grid>
      
     
      <Grid item xs={6}>
        
          
          <Grid container spacing={2}  >
            <Grid item xs={12}>
            <Box sx={{ padding: 0.5 }}>
          <Grid container spacing={4} >
          <Grid item xs={12} >
      <TableContainer sx={{ maxHeight: 423 }} component={Paper}>
        <Table sx={{ minWidth: 700, maxHeight: 200 }} aria-label="customized table">
          
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell>Upper Limit</StyledTableCell>
                <StyledTableCell>Lower Limit</StyledTableCell>
                <StyledTableCell>Units</StyledTableCell>
              </TableRow>
            </TableHead>
         
          <TableBody>
            
              {WarningData.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row"><Grid container spacing={0}>
                  <Grid item xs={10} sx={{display:'flex',alignItems:'center'}}>
                    {row.name}</Grid><Grid item xs={2} ><WarningDashboardSettingsModal onSelectLimit={handleLimitSelection} index={index} valueOfInterest={row.name} valueOfInterestUnits={row.units}></WarningDashboardSettingsModal></Grid></Grid>
                  </StyledTableCell>
                  <StyledTableCell >{roundTo3SF(row.upperLimit)}</StyledTableCell>
                  <StyledTableCell >{roundTo1DP(row.lowerLimit)}</StyledTableCell>
                  <StyledTableCell >{row.units}</StyledTableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      </Grid>
</Grid>
    </Box>
            </Grid>
          </Grid>

      </Grid>
      <Grid item xs={12}><KeyWarningsAddModal handleAddWarning={function (newLimit: number, newLimitLower: number, newUnits: string, newWarning: string): void {
            throw new Error("Function not implemented.");
          } } allWarnings={[]}></KeyWarningsAddModal><KeyWarningsDeleteModal handleDeleteWarning={function (LimitsIndex: number, valuesIndex: number): void {
              throw new Error("Function not implemented.");
            } } allWarnings={[]}></KeyWarningsDeleteModal></Grid>

      {hasDivider && <Grid item xs={12}>
       <StyledHorizontalDivider/>
       </Grid>}
     
    </Grid>
  </Box>
    );
};

export default DefaultWarningDataTable;