import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import KeyWarningsSettingsDelete from './keyWarningsSettingsDelete';
import RemoveIcon from '@mui/icons-material/Remove';

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
  handleDeleteWarning:(LimitsIndex: number, valuesIndex: number) => void;
  allWarnings:string[];
}

export default function KeyWarningsAddModal({ handleDeleteWarning,allWarnings }: KeyWarningsModalProps) {
  const [open, setOpen] = useState(false);
  const [valuesIndex, setValuesIndex] = useState(0);
  const [limitsIndex, setLimitsIndex] = useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleDeleletion = () => {
    handleDeleteWarning(limitsIndex,valuesIndex,);
    handleClose();
  };
  
  const closeFunction = ()=>{
    handleClose();
  }

  const valueIndexChange = (valueIndex:number)=>{
    setValuesIndex(valueIndex)
  }
  const limitsIndexChange = (limitsIndex:number)=>{
    setLimitsIndex(limitsIndex)
  }

  return (
    <>
      <Button variant='contained' onClick={handleOpen}><RemoveIcon/></Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <KeyWarningsSettingsDelete handleDeletion={handleDeleletion}  valuesIndexChange={valueIndexChange} limitsIndexChange={limitsIndexChange} onClose={closeFunction} allWarnings={allWarnings} />
        </Box>
      </Modal>
    </>
  );
}