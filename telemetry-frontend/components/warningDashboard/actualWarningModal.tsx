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

interface ActualWarningModalProps {
  activewarning: WarningInstance;
  handleActiveWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
  handleAcknowledgedWarnings:(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number) => void;
  isHigherWarning:boolean;
}

export default function ActualWarningModal({activewarning,handleActiveWarnings,handleAcknowledgedWarnings,isHigherWarning}: ActualWarningModalProps) {
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

  const handleIgnore = (add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number)=>{
    handleActiveWarnings(add,newWarning,newWarningValue,newWarningUnits,newWarningLimit);
  }
  const handleAddToIgnoredWarnings=(add: boolean, newWarning: string, newWarningValue: number, newWarningUnits: string, newWarningLimit: number)=>{
    handleAcknowledgedWarnings(add,newWarning,newWarningValue,newWarningUnits,newWarningLimit);
  }

  return (
    <>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <ActualWarning onClose={closeFunction} activeWarning={activewarning} handleActiveWarnings={handleIgnore} handleAcknowledgedWarnings={handleAddToIgnoredWarnings} isHigherWarning={isHigherWarning}/>
        </Box>
      </Modal>
    </>
  );
}