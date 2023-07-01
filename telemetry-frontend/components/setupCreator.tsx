import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../data/gtCarList';
import './carSelectionTable/carSelectionTable.css';
import SetupCreatorModal from './setupCreatorModal';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

interface GridProps {
  onSelectCar: (car: string) => void;
}

export default function SetupTable() {
  const [setupData, setSetupData] = React.useState([
    { id: 1, name: 'Abarth' },
    { id: 2, name: 'Abarth' }
  ]);
  const newIdRef = React.useRef(setupData.length + 1);

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'name', headerName: 'Name', width: 150, headerClassName: 'custom-header' },
      {
        width: 350,
        headerClassName: 'removed',
        renderHeader: () => (
          <SetupCreatorModal onSubmit={handleAddToList}/>
        )
      }
    ],
    []
  );

  const rows = React.useMemo(() => setupData, [setupData]);

  const handleSelectionChange = (selectionModel: any) => {
    if (selectionModel.length > 0) {
      const selectedRow = rows.find((row) => row.id === selectionModel[0]);
      if (selectedRow) {
        const setup = selectedRow.name;
      }
    }
  };
  
  const handleAddToList = (name: string) => {
    const newId = newIdRef.current;
    newIdRef.current += 1;
    const newRow = { id: newId, name: name };
    setSetupData(prevData => [...prevData, newRow]);
  };

  return (
    <Box
      sx={{
        height: 400,
        width: 1,
        '& .custom-header': {
          backgroundColor: '#DA2E22',
          color: '#F6F6F6',
        },
        '& .MuiSvgIcon-root': {
          fill: '#F6F6F6',
        },
        '& .removed': {
          backgroundColor: '#DA2E22',
          color: '#F6F6F6',
        },
        '& .removed .MuiDataGrid-sortIcon': {
          display: 'none',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        rowSelectionModel={[]}
        onRowSelectionModelChange={handleSelectionChange}
      />
    </Box>
  );
}
