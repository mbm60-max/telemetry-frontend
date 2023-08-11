import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TrackSelection from './trackSelection';
import ImageBox from '../../homepageTrack';
import { useEffect, useState } from 'react';
import '../../navbar/navbar.css';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height:'75%',
  bgcolor: 'rgba(8, 13, 56, 0.8)',
  border: '2px solid white',
  borderRadius:15,
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
      <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleOpen} >Select Track</Box></Button>
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
