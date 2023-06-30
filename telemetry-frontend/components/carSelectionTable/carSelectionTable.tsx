import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../../data/gtCarList';
import './carSelectionTable.css'
const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

interface GridProps{
  onSelectCar: (car: string) => void; 
}
export default function QuickFilteringGrid({onSelectCar}:GridProps) {


  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'brand', headerName: 'Brand', width: 150, headerClassName: 'custom-header'},
      { field: 'name', headerName: 'Name', width: 250 , headerClassName: 'custom-header'},
      { field: 'category', headerName: 'Category', width: 150 , headerClassName: 'custom-header'},
    ],
    [],
  );
  const rows = React.useMemo(() => carData, []);
  const handleSelectionChange = (selectionModel: any) => {
    if (selectionModel.length > 0) {
      const selectedRow = rows.find((row) => row.id === selectionModel[0]);
      if (selectedRow) {
        const brand = selectedRow.brand;
        const name = selectedRow.name;
        const car = brand + " " +  name;
        onSelectCar(car);
        console.log(car);
      }
    }
  };

  return (
    <Box sx={{ height: 400, width: 1,'& .custom-header': {
      backgroundColor: '#DA2E22',
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
            // Hide the Export Data button
          },
        }}
        rowSelectionModel={[]}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
}