import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

interface CompoundProps{
    onSelectCompound: (compound: string) => void; 
  }
export default function CompoundSelect({onSelectCompound}:CompoundProps) {
  const [compound, setCompound] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCompound(event.target.value);
   // onSelectCompound(compound);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Compound</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={compound}
          label="Compound"
          onChange={handleChange}
        >
          <MenuItem value={"Comfort: Hard (CH)"}>Comfort: Hard (CH)</MenuItem>
          <MenuItem value={"Comfort: Medium (CM)"}>Comfort: Medium (CM)</MenuItem>
          <MenuItem value={"Comfort: Soft (CS)"}>Comfort: Soft (CS)</MenuItem>
          <MenuItem value={"Sports: Hard (SH)"}>Sports: Hard (SH)</MenuItem>
          <MenuItem value={"Sports: Medium (SM)"}>Sports: Medium (SM)</MenuItem>
          <MenuItem value={"Sports: Soft (SS)"}>Sports: Soft (SS)</MenuItem>
          <MenuItem value={"Racing: Hard (RH)"}>Racing: Hard (RH)</MenuItem>
          <MenuItem value={"Racing: Medium (RM)"}>Racing: Medium (RM)</MenuItem>
          <MenuItem value={"Racing: Soft (RS)"}>Racing: Soft (RS)</MenuItem>
          <MenuItem value={"Racing: Super Soft (RSS)"}>Racing: Super Soft (RSS)</MenuItem>
          <MenuItem value={"Racing: Intermediate (RI)"}>Racing: Intermediate (RI)</MenuItem>
          <MenuItem value={"Racing: Heavy Wet (RH)"}>Racing: Heavy Wet (RH)</MenuItem>
          <MenuItem value={"Dirt Tires"}>Dirt Tires</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
