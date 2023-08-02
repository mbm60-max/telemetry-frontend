import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
interface BasicCardProps{
  ml:number
  mt:number
  mr:number
  width:number
  noOfLines:number
  lineFontSizes:number[]
  lineFontColors:string[]
  lineContent:string[]
  lineMR:number[]
  lineML:number[]
  lineMT:number[]
  lineWhiteSpace: string[];

}
export default function BasicCard({ml,mt,mr,width,noOfLines,lineFontSizes,lineFontColors,lineContent,lineML,lineMR,lineMT,lineWhiteSpace}:BasicCardProps) {
  return (
    <Card sx={{ ml:ml, mt:mt, mr:mr,width: '100%', borderRadius:0,backgroundColor:'rgba(132, 126, 126, 0)',boxShadow: 'none'  }}>
      <CardContent>
      {Array.from({ length: noOfLines }, (_, index) => (
  <Typography
    key={index}
    sx={{
      fontSize: lineFontSizes[index] || 16, // Default font size: 16 if not provided
      color: lineFontColors[index] || '#F6F6F6', // Default color: black if not provided
      ml: lineML[index] || 0, // Default margin-left: 0 if not provided
      mr: lineMR[index] || 0, // Default margin-right: 0 if not provided
      mt: lineMT[index] || 0, // Default margin-top: 0 if not provided
      whiteSpace: lineWhiteSpace[index] || 'initial',// Use lineWhiteSpace prop or default to 'initial'
    }}
  >
    {lineContent[index] || ''} {/* Empty string if content is not provided */}
  </Typography>
))} 
      </CardContent>
    </Card>
  );
}