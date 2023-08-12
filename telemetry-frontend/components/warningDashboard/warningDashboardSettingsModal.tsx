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
  width: '75%',
  height:'75%',
  bgcolor: 'rgba(8, 13, 56, 0.5)',
  border: '2px solid white',
  borderRadius:15,
  boxShadow: 24,
  p: 4,
  overflowY: 'auto', // Add this to enable vertical scrolling when content overflows
      display: 'flex',
     justifyContent:'center'  // Add this to make sure the children are wrapped and the container becomes scrollable
       // Set the direction to 'column' to wrap the children vertically
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
      <Button className={"warningButton"} variant='contained' onClick={handleOpen} sx={{height:'40px'}}><SettingsIcon/></Button>
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
