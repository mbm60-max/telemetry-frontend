import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import WarningDashboardSettings from './warningDashSettings';
import KeyWarningsSettingsAdd from './keyWarningsSettings';
import AddIcon from '@mui/icons-material/Add';
import ActualWarning from './actualWarning';
import WarningInstance from '../../interfaces/warningInterface';

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

interface ActualWarningModalProps {
  activewarning: WarningInstance;
}

export default function ActualWarningModal({activewarning}: ActualWarningModalProps) {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);

  const activeWarningCheck=()=>{
    if(activewarning){
      setOpen(true);
    }
  }
  const closeFunction = ()=>{
    handleClose();
  }
  React.useEffect(() => {
    activeWarningCheck();
  }, []);

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ActualWarning onClose={closeFunction} activeWarning={activewarning}/>
        </Box>
      </Modal>
    </>
  );
}