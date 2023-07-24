import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import KeyWarningsSettingsDelete from './keyWarningsSettingsDelete';
import WarningIcon from '@mui/icons-material/Warning';
import KeyWarningsSettingsIgnored from './keyWarningsSettingsIgnored';
import WarningInstance from '../../interfaces/warningInterface';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  height:'50%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Add this to enable vertical scrolling when content overflows
  display: 'flex',
 justifyContent:'center'
};

interface KeyWarningsIgnoredModalProps {
    ignoredWarnings:WarningInstance[];
    ignoredWarningsLower:WarningInstance[];
}

export default function KeyWarningsIgnoredModal({ignoredWarnings,ignoredWarningsLower }: KeyWarningsIgnoredModalProps) {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  
  const closeFunction = ()=>{
    handleClose();
  }


  return (
    <>
      <Button variant='contained' onClick={handleOpen}><WarningIcon/></Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <KeyWarningsSettingsIgnored onClose={closeFunction} ignoredWarnings={ignoredWarnings} ignoredWarningsLower={ignoredWarningsLower} />
        </Box>
      </Modal>
    </>
  );
}