import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackSelection from './trackSelection';
import ImageBox from './homepageTrack';
import { useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1000,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface TrackSelectionModalProps {
  onSubmit: (name: string) => void;
}

export default function SetupCreatorModal({ onSubmit }: TrackSelectionModalProps) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTrackSelection = () => {
    onSubmit(name); 
    handleClose();
  };
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  return (
    <>
      <Button onClick={handleOpen}>Select Track</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <TextField id="name" label="Name" variant="outlined"  onChange={handleNameChange} />
        <Button onClick={handleTrackSelection}>Submit</Button>
        </Box>
      </Modal>
    </>
  );
}

