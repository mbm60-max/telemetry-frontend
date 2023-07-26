import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';
import { carData } from '../../../data/gtCarList';
import './carSelectionTable/carSelectionTable.css';
import SetupCreatorModal from './setupCreatorModal';
import axios, { AxiosResponse } from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../../authProvider';

const VISIBLE_FIELDS = ['name', 'rating', 'country', 'dateCreated', 'isAdmin'];

interface SetupTableProps {
  onSelectSetup: (setup: string) => void;
}

export default function SetupTable({onSelectSetup}:SetupTableProps) {
  const { isLoggedIn,userName} = useContext(AuthContext);
  const username = userName;
  const [setupData, setSetupData] = React.useState<{ id: number; setupname: string }[]>([]);
  const newIdRef = React.useRef(setupData.length + 1);

  // Otherwise filter will be applied on fields such as the hidden column id
  const columns = React.useMemo(
    () => [
      { field: 'setupname', headerName: 'Name', flex: 1, headerClassName: 'custom-header' },
      {
        flex: 1,
        headerClassName: 'removed',
        renderHeader: () => (
          <SetupCreatorModal onSetupAddition={forceFetchData} />
        )
      }
    ],
    []
  );

  const rows = React.useMemo(() => setupData, [setupData]);
console.log(rows)
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
    fetchData();
  };

  
  const fetchData = React.useCallback(async () => {
    try {
      const setupResponse: AxiosResponse = await axios.get('/api/getsetuplistapi', {
        params: { username },
      });
      const data = setupResponse.data;
      
      const rowsWithId = data.setups.map((setup: any, index: number) => (console.log(setup.setupname),{ setupname: setup.setupname, id: index + 1 }));
      console.log(rowsWithId)
      setSetupData(rowsWithId);
    } catch (error) {
      console.error('Error fetching setup data:', error);
    }
  }, [username]);

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);
  
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
