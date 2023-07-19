import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import SettingsIcon from '@mui/icons-material/Settings';
import WarningDashboardSettings from './warningDashSettings';
import KeyWarningsSettings from './keyWarningsSettings';

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

interface KeyWarningsModalProps {
  hanldeDeleteWarning:(LimitsIndex: number, valuesIndex: number) => void;
  handleAddWarning:(newLimit: number, newUnits: string, newWaring: string) => void;
  allWarnings:string[];
}

export default function KeyWarningsModal({ hanldeDeleteWarning,handleAddWarning,allWarnings }: KeyWarningsModalProps) {
  const [open, setOpen] = useState(false);
  const [newUnits, setNewUnits] = useState("");
  const [newWarning, setNewWarning] = useState("");
  const [newLimit, setNewLimit] = useState(0);
  const [valuesIndex, setValuesIndex] = useState(0);
  const [limitsIndex, setLimitsIndex] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddition = () => {
    handleAddWarning(newLimit,newUnits,newWarning);
    handleClose();
  };

  const handleDeleletion = () => {
    hanldeDeleteWarning(limitsIndex,valuesIndex,);
    handleClose();
  };
  
  const closeFunction = ()=>{
    handleClose();
  }
  const newLimitChange = (newLimit:number)=>{
    setNewLimit(newLimit)
  }
  const newUnitsChange = (newUnits:string)=>{
    setNewUnits(newUnits)
  }
  const newWarningChange = (newWarning:string)=>{
    setNewWarning(newWarning)
  }
  const valueIndexChange = (valueIndex:number)=>{
    setValuesIndex(valueIndex)
  }
  const limitsIndexChange = (limitsIndex:number)=>{
    setLimitsIndex(limitsIndex)
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
          <KeyWarningsSettings hanldeAddition={handleAddition} handleDeletion={handleDeleletion} newUnitsChange={newUnitsChange} newWarningChange={newWarningChange} newLimitChange={newLimitChange} valuesIndexChange={valueIndexChange} limitsIndexChange={limitsIndexChange} onClose={closeFunction} allWarnings={allWarnings} />
        </Box>
      </Modal>
    </>
  );
}