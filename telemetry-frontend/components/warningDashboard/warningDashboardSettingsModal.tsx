import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningDashboardSettings from './warningDashSettings';

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

interface WarningDashboardSettingsModalProps {
  onSelectLimit: (limit: number,limitLower:number, index:string) => void;
  index:number;
  valueOfInterest:string;
  valueOfInterestUnits:string;
}

export default function WarningDashboardSettingsModal({ onSelectLimit,index,valueOfInterest,valueOfInterestUnits }: WarningDashboardSettingsModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLimitSelection = (limit: number,limitLower:number, index:number) => {
    onSelectLimit(limit,limitLower,index.toString()); 
    handleClose();
  };
  
  const closeFunction = ()=>{
    handleClose();
  }

  return (
    <>
      <Button variant='contained' onClick={handleOpen}><SettingsIcon/></Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <WarningDashboardSettings onSelectLimit={handleLimitSelection} index={index} valueOfInterest={valueOfInterest} valueOfInterestUnits={valueOfInterestUnits} onClose={closeFunction}/>
        </Box>
      </Modal>
    </>
  );
}
