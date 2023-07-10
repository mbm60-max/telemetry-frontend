import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { ListSubheader } from '@mui/material';

interface ReviewFieldSelectionProps{
  onSelectField: (field: string, fieldNumber:string) => void;
  fieldNumber:string;
}
export default function ReviewFieldSelection({onSelectField,fieldNumber}:ReviewFieldSelectionProps) {
  const [field, setField] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setField(event.target.value as string);
    onSelectField(event.target.value as string,fieldNumber);
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
          <MenuItem value={"General"}>General</MenuItem>
          <MenuItem value={"Engine"}>Engine</MenuItem>
          <MenuItem value={"Gearbox"}>Gearbox</MenuItem>
          <MenuItem value={"Tyres/Suspension"}>Tyres/Suspension</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
