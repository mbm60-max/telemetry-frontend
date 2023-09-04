import { Box, TableContainer, Paper, Table, TableHead, TableRow, TableBody, styled, TableCell, tableCellClasses, Typography, Grid, Button, Divider, Container } from "@mui/material";
import React, { useContext, useEffect, useRef } from "react";
import { fuelMapObject } from "../../../utils/relativeFuelCalculations";
import roundTo1DP, { roundTo3SF } from "../../../utils/roudning";
import { SettingsContext } from "../../authProviderSettings";
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
tabIndex:number;
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
 


const DefaultWarningDataTable = ({WarningData,hasDivider,targetSetting,tabIndex}: DefaultWarningDataTableProps) => {
  const {setAlerts,alerts} = useContext(SettingsContext);
  const readyFlagRef = useRef(0);
  const selectedLimitsRef = useRef<{ [key: string]: number }>({});
  const selectedLimitsLowerRef = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const newSelectedLimits: { [key: string]: number } = {};
    WarningData.forEach((warning, index) => {
      // Use the index as the key (assuming it starts from 0)
      newSelectedLimits[`limit${index}`] = warning.upperLimit;
    });
    selectedLimitsRef.current = newSelectedLimits;
  }, []);
  useEffect(() => {
    const newSelectedLimits: { [key: string]: number } = {};
    WarningData.forEach((warning, index) => {
      // Use the index as the key (assuming it starts from 0)
      newSelectedLimits[`limitLower${index}`] = warning.lowerLimit;
    });
    selectedLimitsLowerRef.current = newSelectedLimits;
  }, []);

  console.log(WarningData)
  function extractValuesToArray(obj: { [key: string]: number }): number[] {
    const valuesArray = [];
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        valuesArray.push(obj[key]);
      }
    }
    return valuesArray;
  }
  
  // Usage
 
const handleAlertEdit=(targetAttribute:string,dashboardIndex:number,newValue:{})=>{
  const newAlertsValue = { ...alerts };
  console.log("test")
  console.log(newValue)
console.log(extractValuesToArray(newValue))
    switch(targetAttribute){
      case "alertDefaultWarningsUpperLimits":
        newAlertsValue.alertDefaultWarningsUpperLimits[dashboardIndex] = extractValuesToArray(newValue);
        break;
      case "alertDefaultWarningsLowerLimits":
        newAlertsValue.alertDefaultWarningsLowerLimits[dashboardIndex]= extractValuesToArray(newValue);
      break;
  }
  setAlerts(newAlertsValue)
}

useEffect(() => {
  readyFlagRef.current += 1;
}, [WarningData]);

//uselessIndex being kept to match original interface
//edit to actualy remove instead of setting it to the value to be removed 
//add the addition version and check both work with weird array limit of the existing code
  const handleDeleteWarning = (uselessIndex: number, itemIndex: number)=>{
    console.log("yarp")
    console.log(tabIndex)
    console.log(itemIndex)
    const previousAlertsValue = { ...alerts };
    previousAlertsValue.alertDefaultWarningsUpperLimits[tabIndex] = previousAlertsValue.alertDefaultWarningsUpperLimits[tabIndex].splice(itemIndex, 1);
    previousAlertsValue.alertDefaultWarningsLowerLimits[tabIndex] = previousAlertsValue.alertDefaultWarningsLowerLimits[tabIndex].splice(itemIndex, 1);
    previousAlertsValue.alertDefaultWarningsNames[tabIndex] = previousAlertsValue.alertDefaultWarningsNames[tabIndex].splice(itemIndex, 1);
    previousAlertsValue.alertDefaultWarningsUnits[tabIndex] = previousAlertsValue.alertDefaultWarningsUnits[tabIndex].splice(itemIndex, 1);
    console.log(previousAlertsValue.alertDefaultWarningsUpperLimits[tabIndex])
    console.log(previousAlertsValue.alertDefaultWarningsLowerLimits[tabIndex])
    console.log(previousAlertsValue.alertDefaultWarningsNames[tabIndex])
    console.log(previousAlertsValue.alertDefaultWarningsUnits[tabIndex])
    //setAlerts(previousAlertsValue);
  }


  const handleLimitSelection = (
    limit: number,
    limitLower: number,
    index: string
  ) => {
    if (limit == -1) {
      selectedLimitsLowerRef.current = {
        ...selectedLimitsLowerRef.current,
        [`limitLower${index}`]: limitLower,
      };
      handleAlertEdit("alertDefaultWarningsLowerLimits",tabIndex,selectedLimitsLowerRef.current);
    }
    if (limitLower == -1) {
      selectedLimitsRef.current = {
        ...selectedLimitsRef.current,
        [`limit${index}`]: limit,
      };
      handleAlertEdit("alertDefaultWarningsUpperLimits",tabIndex,selectedLimitsRef.current);
    }
    if (limitLower != -1 && limit != -1) {
      selectedLimitsLowerRef.current = {
        ...selectedLimitsLowerRef.current,
        [`limitLower${index}`]: limitLower,
      };
      selectedLimitsRef.current = {
        ...selectedLimitsRef.current,
        [`limit${index}`]: limit,
      };
      handleAlertEdit("alertDefaultWarningsLowerLimits",0,selectedLimitsLowerRef.current);
      handleAlertEdit("alertDefaultWarningsUpperLimits",0,selectedLimitsRef.current);
    }
  };

const fillAllWarningsArray=(WaringData:WarningDataObject[])=>{
  const AllWarningsArray = [];
  for(const item in WarningData){
    AllWarningsArray.push(WarningData[item].name)
  }return AllWarningsArray;

}
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
          } } allWarnings={[]}></KeyWarningsAddModal><KeyWarningsDeleteModal handleDeleteWarning={handleDeleteWarning} allWarnings={fillAllWarningsArray(WarningData)}></KeyWarningsDeleteModal></Grid>
      {hasDivider && <Grid item xs={12}>
       <StyledHorizontalDivider/>
       </Grid>}
     
    </Grid>
  </Box>
    );
};

export default DefaultWarningDataTable;