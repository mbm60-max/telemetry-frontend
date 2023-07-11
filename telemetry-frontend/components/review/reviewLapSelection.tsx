import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListSubheader } from '@mui/material';

interface ReviewLapSelectionProps{
  onSelectLap: (lap: string, lapNumber:string) => void;
  lapNumber:string;
  availableLaps:string[];
}
export default function ReviewLapSelection({onSelectLap,lapNumber,availableLaps}:ReviewLapSelectionProps) {
  const [field, setField] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value as string);
    onSelectLap(event.target.value as string,lapNumber);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Field</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={field}
          label="Field"
          onChange={handleChange}
        >
          {availableLaps.map((lap, index) => (
    <MenuItem key={index} value={lap}>{lap}</MenuItem>
  ))}
        </Select>
      </FormControl>
    </Box>
  );
}
