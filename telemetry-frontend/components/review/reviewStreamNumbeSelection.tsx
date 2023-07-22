import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

interface ReviewStreamNumberSelectionProps{
    onSelectNumber: (numberOfStreams: number) => void;
    label:string;
}
export default function ReviewStreamNumberSelection({label,onSelectNumber}:ReviewStreamNumberSelectionProps) {

    const handleChoice = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelectNumber(Number(event.target.value));
      };
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">{label}</FormLabel>
      <RadioGroup
      row
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group"
        onChange={handleChoice}
      >
        <FormControlLabel value={1} control={<Radio />} label="One" />
        <FormControlLabel value={2} control={<Radio />} label="Two" />
      </RadioGroup>
    </FormControl>
  );
}