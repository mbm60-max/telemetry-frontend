import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import WarningDashboardSettings from './warningDashSettings';
import KeyWarningsSettingsAdd from './keyWarningsSettings';
import AddIcon from '@mui/icons-material/Add';

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

interface KeyWarningsAddModalProps {
  handleAddWarning:(newLimit: number, newLimitLower: number, newUnits: string, newWarning: string) => void
  allWarnings:string[];
}

export default function KeyWarningsAddModal({ handleAddWarning,allWarnings }: KeyWarningsAddModalProps) {
  const [open, setOpen] = useState(false);
  const [newUnits, setNewUnits] = useState("");
  const [newWarning, setNewWarning] = useState("");
  const [newLimit, setNewLimit] = useState(0);
  const [newLimitLower, setNewLimitLower] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddition = () => {
    handleAddWarning(newLimit,newLimitLower,newUnits,newWarning);
    handleClose();
  };

  const closeFunction = ()=>{
    handleClose();
  }
  const newLimitChange = (newLimit:number)=>{
    setNewLimit(newLimit)
  }
  const newLimitChangeLower = (newLimitLower:number)=>{
    setNewLimitLower(newLimitLower)
  }
  const newUnitsChange = (newUnits:string)=>{
    setNewUnits(newUnits)
  }
  const newWarningChange = (newWarning:string)=>{
    setNewWarning(newWarning)
  }

  return (
    <>
      <Button variant='contained' onClick={handleOpen}><AddIcon/></Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <KeyWarningsSettingsAdd handleAddition={handleAddition}newUnitsChange={newUnitsChange} newWarningChange={newWarningChange} newLimitChange={newLimitChange} onClose={closeFunction} allWarnings={allWarnings} newLimitChangeLower={newLimitChangeLower}/>
        </Box>
      </Modal>
    </>
  );
}