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
      <Button  className={"warningButton"} variant='contained' onClick={handleOpen} sx={{height:'40px'}}><RemoveIcon/></Button>
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