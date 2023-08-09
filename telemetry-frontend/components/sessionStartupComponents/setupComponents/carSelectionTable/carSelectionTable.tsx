import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridRowId, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../../../../data/gtCarList';
import './carSelectionTable.css'

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

interface GridProps{
  onSelectCar: (car: string) => void; 
  selectedRowId: GridRowId | null;
  onRowSelectionModelChange: (selectionModel: any) => void;
  onSelectedRowIdChange:(id:GridRowId| null)=>void;
}
export default function QuickFilteringGrid({onSelectCar,selectedRowId,onRowSelectionModelChange,onSelectedRowIdChange}:GridProps) {


  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'brand', headerName: 'Brand', flex: 1, headerClassName: 'custom-header'},
      { field: 'name', headerName: 'Name',flex: 1, headerClassName: 'custom-header'},
      { field: 'category', headerName: 'Category',flex: 1, headerClassName: 'custom-header'},
    ],
    [],
  );
  const rows = React.useMemo(() => carData, []);
  const gridRef = React.useRef<any>(null); 
  const handleSelectionChange = React.useCallback((selectionModel: any) => {
    if (selectionModel.length > 0) {
      const selectedRow = rows.find((row) => row.id === selectionModel[0]);

      if (selectedRow) {
        onSelectedRowIdChange(selectionModel[0]);
        const brand = selectedRow.brand;
        const name = selectedRow.name;
        const car = brand + ' ' + name;
        onSelectCar(car);
      }
    } else {
      onSelectedRowIdChange(null);
    }
  }, [onSelectCar, rows]);


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
        onRowSelectionModelChange={onRowSelectionModelChange} // Use the prop for handling row selection change
        getRowClassName={(params) => (params.id === selectedRowId ? 'MuiDataGrid-row.Mui-selected' : '')} // Add the selected-row class to the selected row
      />
    </Box>
  );
}