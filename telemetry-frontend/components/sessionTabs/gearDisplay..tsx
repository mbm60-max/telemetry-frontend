import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

interface TwoValueProps {
  dataValueOne: number; // current
  dataValueTwo: number;
  nameOne: string; // current
  nameTwo: string;
}


const ItemContainer = styled('div')({
  padding: '0px',
  border: '1px solid #ccc',
  overflow: 'hidden',
  wordWrap: 'break-word', // Use word-wrap to handle long texts
  textAlign: 'center',
  height: '100%',
});

const CustomContainer = styled('div')({
  height: '100%', // Set the container's height to 100%
  display: 'flex',
  flexDirection: 'column',
});

const Item = styled(Paper)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  height: '100%',
  boxSizing: 'border-box',
  width: '100%',
}));

const WrappedTypography = styled(Typography)(({ theme }) => ({
  overflow: 'hidden',
  wordWrap: 'break-word', // Use word-wrap to handle long texts
  textAlign: 'center',
}));

export default function TwoValueDisplay({ dataValueOne, dataValueTwo, nameOne, nameTwo }: TwoValueProps) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
      <ItemContainer>
      <Grid container spacing={0}>
      <Grid item xs={12} sm={12}> <Typography sx={{fontSize:35}}variant="body1" fontFamily={"Yapari"}>{nameOne}</Typography></Grid>
      <Grid item xs={12} sm={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{backgroundColor:'#FB9536',color:'white',width:'50%',borderRadius:'30px'}}>
              <Typography sx={{ overflow: "scroll", textAlign:'center' }}fontFamily={"Satoshi"} fontSize={29}fontWeight="bold">
              {dataValueOne}
            </Typography>
            </Box></Grid>
      </Grid>
        </ItemContainer>
      </Grid>
      <Grid item xs={12} sm={12}>
      <ItemContainer>
      <Grid container spacing={0}>
      <Grid item xs={12} sm={12}> <Typography sx={{fontSize:35}}variant="body1" fontFamily={"Yapari"}>{nameTwo}</Typography></Grid>
      <Grid item xs={12} sm={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{backgroundColor:'#FB9536',color:'white',width:'50%',borderRadius:'30px'}}>
              <Typography sx={{ overflow: "scroll", textAlign:'center' }}fontFamily={"Satoshi"} fontSize={29}fontWeight="bold">
              {dataValueTwo}
            </Typography>
            </Box></Grid>
      </Grid>
        </ItemContainer>
      </Grid>
    </Grid>
  );
};
