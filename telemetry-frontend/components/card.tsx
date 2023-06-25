import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function BasicCard() {
  return (
    <Card sx={{ ml:20, mt:20,width: 550, borderRadius:0,backgroundColor:'#847E7E',boxShadow: 'none'  }}>
      <CardContent>
        <Typography sx={{ fontSize: 32 }}component="div" color="#FC7272">
          Boost Your Learning
        </Typography>
        <Typography sx={{ fontSize: 24 }} color="#F6F6F6" gutterBottom>
        Sign-up to start a session and begin gaining every tenth available
        </Typography>
      </CardContent>
    </Card>
  );
}