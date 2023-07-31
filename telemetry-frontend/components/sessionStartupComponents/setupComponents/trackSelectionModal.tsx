import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackSelection from './trackSelection';
import ImageBox from '../../homepageTrack';
import { useEffect, useState } from 'react';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height:'75%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Add this to enable vertical scrolling when content overflows
  display: 'flex',
 justifyContent:'center'
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

  const handleExit=()=>{
    handleClose();
  }

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
          <TrackSelection onSelectTrack={handleTrackSelection} onExit={handleExit} />
        </Box>
      </Modal>
    </>
  );
}
