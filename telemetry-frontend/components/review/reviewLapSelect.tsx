import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowId, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../../data/gtCarList';
import '../sessionStartupComponents/setupComponents/carSelectionTable/carSelectionTable.css'
import { useState } from 'react';

interface LapSelectionTableProps{
  onSelectLap: (laps: string, lapNumber: string) => void 
  lapSelectionData:{ date: string[]; laptime: string[]; track: string[]; car: string[]; };
  lapNumber:string;
}
export default function LapSelectionTable({onSelectLap,lapSelectionData,lapNumber}:LapSelectionTableProps) {
const [selectedLap,setSelectedLap]=useState("");
const [selectedRowId,setSelectedRowId]=useState<GridRowId | null>(null);
  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'date', headerName: 'DATE ', flex: 1, headerClassName: 'custom-header'},
      { field: 'laptime', headerName: 'LAP TIME',flex: 1, headerClassName: 'custom-header'},
      { field: 'track', headerName: 'TRACK',flex: 1, headerClassName: 'custom-header'},
      { field: 'car', headerName: 'CAR',flex: 1, headerClassName: 'custom-header'},
    ],
    [],
  );
  const rows = React.useMemo(() => {
    // Assuming that all arrays (date, laptime, track, car) have the same length
    const numRows = lapSelectionData.date.length;
  
    return Array.from({ length: numRows }, (_, index) => ({
      id: index.toString(), // You can use a unique identifier here
      date: lapSelectionData.date[index],
      laptime: lapSelectionData.laptime[index],
      track: lapSelectionData.track[index],
      car: lapSelectionData.car[index],
    }));
  }, [lapSelectionData]);

  const gridRef = React.useRef<any>(null); 
  const handleSelectionChange = (selectionModel: GridRowId[])=>{
    if (selectionModel.length > 0) {
      
      setSelectedRowId(selectionModel[0]);
      const selectedRow = rows.find((row) => row.id === selectedRowId);
      console.log(selectedRowId)
      if (selectedRow) {
        const selectedLap = selectedRow.date; // Assuming laptime contains the selected lap
        setSelectedLap(selectedLap);
        console.log(lapNumber)
        onSelectLap(selectedLap, lapNumber); // Assuming lapNumber is defined somewhere
      }
    } else {
      setSelectedLap("");
      // Handle deselection logic here if needed
    }
  }


  return (
    <Box className="my-grid-container"  sx={{ height: 400, width: 1,'& .custom-header': {
      backgroundColor: '#FB9536',
      color:'#F6F6F6'
    },'& .MuiSvgIcon-root': {
      fill: '#F6F6F6', // Change the fill color of the icons
    }}}>
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        slots={{ toolbar: GridToolbar }}
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        rowSelectionModel={selectedRowId ? [selectedRowId] : []}
        onRowSelectionModelChange={handleSelectionChange} // Use the prop for handling row selection change
        getRowClassName={(params) =>
          params.id === selectedRowId ? 'MuiDataGrid-row Mui-selected' : ''
        } // Add the selected-row class to the selected row
      />
    </Box>
  );
}