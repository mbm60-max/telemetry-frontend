import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackSelection from './trackSelection';
import ImageBox from './homepageTrack';
import { useEffect, useState } from 'react';

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
  onSelectTrack: (track: string) => void;
}

export default function TrackSelectionModal({ onSelectTrack }: TrackSelectionModalProps) {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleTrackSelection = (track: string) => {
    onSelectTrack(track); 
    handleClose();
  };

  return (
    <div>
      <Button onClick={handleOpen}>Select Track</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TrackSelection onSelectTrack={handleTrackSelection} />
        </Box>
      </Modal>
    </div>
  );
}
