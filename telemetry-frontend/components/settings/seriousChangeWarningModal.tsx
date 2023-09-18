import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Grid, FormControl, InputLabel, Select, MenuItem, FormHelperText, styled, Paper } from '@mui/material';
import HorizontalBanner from '../horizontalBanner/horizontalBanner';
import TextWarningOverlay from '../textWarningOverlay';
import ClearIcon from '@mui/icons-material/Clear';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import '../sessionStartupComponents/setupComponents/setupStyles.css'
 
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

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    alignText:'center',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: '#FB9536',
    boxShadow: 'none', // Override the shadow effect
    borderRadius:20,
    maxWidth:'900px',
    minWidth:'150px',
    width:'100%',
    display:'flex',
  }));

interface SeriousActionModalProps {
 action:string;
 triggerActionMethod: () => void;
}

export default function SeriousActionModal({action,triggerActionMethod}: SeriousActionModalProps) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleConfirm = () => {
    triggerActionMethod();
    handleClose();
  };

  const closeFunction = ()=>{
    handleClose();
  }


  return (
    <>
      <Button className={"warningButton"} variant='contained' onClick={handleOpen} sx={{height:'40px'}}>Confirm</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Box sx={{ width: '100vw', height: '100%'}}>
   <Button className="parallelogram-buttonBlueXS" onClick={handleClose} sx={{postion:'absolute',top:0,left:'90%'}}>Clear<ClearIcon/></Button>
  <Grid container spacing={6}><Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}>  <Item><HorizontalBanner GridContent={["WARNING"]} fontSizes={[35]} needsBackground={false} fontFamilies={["Yapari"]} fontWeights={["Bold"]} fontColour={["white"]} isMutliStage={false} marginLeftValue={[]} isBannerInterface={false} /></Item></Grid>
  
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'100%',maxWidth:'920px'}}><TextWarningOverlay height={100} width={100} icon={PriorityHighIcon} color={"#B98D6D"} colorLight={"#D2B29A"} headerText={"Alert"} text={`You are about to proceed with ${action}`} textColour={"white"} textSize={29} fontFamily={"Satoshi"} fontWeight={"Bold"}/></Box></Grid>
          
            <Grid item xs={6} sx={{display:'flex',justifyContent:'center'}}></Grid><Grid item xs={12} sx={{display:'flex',justifyContent:'center',color:'white'}}><Typography id="input-slider" gutterBottom sx={{fontSize:25,color:'white'}} fontFamily={"Satoshi"}>
This action cannot be directly undone
            </Typography></Grid>
            <Grid item xs={12}  sx={{display:'flex',justifyContent:'center'}}> <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleConfirm} >Confirm {action}</Box></Button></Grid>
            <Grid item xs={12}><Box sx={{height:'25px'}}></Box></Grid>
            </Grid>
</Box>
        </Box>
      </Modal>
    </>
  );
}