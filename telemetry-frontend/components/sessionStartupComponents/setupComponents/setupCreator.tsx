import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridRowId, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../../../data/gtCarList';
import './carSelectionTable/carSelectionTable.css';
import SetupCreatorModal from './setupCreatorModal';
import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../authProvider';
import './carSelectionTable/carSelectionTable.css'

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

interface SetupTableProps {
  onSelectSetup: (setup: string) => void;
  selectedRowId: GridRowId | null;
  onRowSelectionModelChange: (selectionModel: any) => void;
  onSelectedRowIdChange:(id:GridRowId| null)=>void;
  fetchDataCallback:()=>void;
}

export default function SetupTable({onSelectSetup,selectedRowId,onRowSelectionModelChange,onSelectedRowIdChange,fetchDataCallback}:SetupTableProps) {
  const { isLoggedIn,userName} = useContext(AuthContext);
  const username = userName;
  const [setupData, setSetupData] = React.useState<{ id: number; setupname: string }[]>([]);

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'setupname', headerName: 'Name', flex: 1, headerClassName: 'custom-header' },
      {
        field: 'addButton', // Add a unique field name for the column
        flex: 1,
        headerClassName: 'removed',
        renderHeader: () => (
          <SetupCreatorModal onSetupAddition={forceFetchData} />
        ),
      }
    ],
    []
  );

  const rows = React.useMemo(() => setupData, [setupData]);


  const handleSelectionChange = (selectionModel: any) => {
    if (selectionModel.length > 0 && rows.length > 0) {
      const selectedRow = rows.find((row) => row.id === selectionModel[0]);
      if (selectedRow) {
        const setup = selectedRow.setupname;
        onSelectSetup(setup);
      }
    }
  };
  const forceFetchData = () => {
    fetchDataCallback();
    fetchData();
  };

  
  const fetchData = React.useCallback(async () => {
    try {
      const setupResponse: AxiosResponse = await axios.get('/api/getsetuplistapi', {
        params: { username },
      });
      const data = setupResponse.data;
      
      const rowsWithId = data.setups.map((setup: any, index: number) => ({ setupname: setup.setupname, id: index + 1 }));
      setSetupData(rowsWithId);
    } catch (error) {
      console.error('Error fetching setup data:', error);
    }
  }, [username]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return (
    <Box className="my-grid-container"
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
        rowSelectionModel={selectedRowId? [selectedRowId] : []}
        onRowSelectionModelChange={onRowSelectionModelChange} // Use the prop for handling row selection change
        getRowClassName={(params) => (params.id === selectedRowId? 'MuiDataGrid-row.Mui-selected' : '')}
      />
    </Box>
  );
}
