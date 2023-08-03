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
  noOfLines:number
  lineFontSizes:number[]
  lineFontColors:string[]
  lineContent:string[]|string;
  lineMR:number[]
  lineML:number[]
  lineMT:number[]
  lineWhiteSpace: string[];
  lineTextAlign: 'left' | 'center' | 'right'; 
  lineFonts:string[];
  fontWeights:string[];
}
export default function BasicCard({ml,mt,mr,noOfLines,lineFontSizes,lineFontColors,lineContent,lineML,lineMR,lineMT,lineWhiteSpace,  lineTextAlign,lineFonts,fontWeights}:BasicCardProps) {
  return (
    <Card sx={{ ml:ml, mt:mt, mr:mr,width: '100%', borderRadius:0,backgroundColor:'rgba(132, 126, 126, 0)',boxShadow: 'none', display:'flex',justifyContent:'right',alignItems:'center' }}>
      <CardContent sx={{ overflow: 'scroll' }}>
        {noOfLines === 1 ? (
          <Typography fontWeight={'bold'} fontFamily={lineFonts[0]}
            sx={{
              fontSize: lineFontSizes[0] || 16,
              color: lineFontColors[0] || '#F6F6F6',
              ml: lineML[0] || 0,
              mr: lineMR[0] || 0,
              mt: lineMT[0] || 0,
              whiteSpace: lineWhiteSpace[0] || 'initial',
            }}
          >
            {Array.isArray(lineContent) ? lineContent.join(' ') : lineContent}
          </Typography>
        ) : (
          Array.from({ length: noOfLines }, (_, index) => (
            <Typography
              key={index}
              fontFamily={lineFonts[index]}
              fontWeight={fontWeights[index]}
              sx={{
                fontSize: lineFontSizes[index] || 16,
                color: lineFontColors[index] || '#F6F6F6',
                ml: lineML[index] || 0,
                mr: lineMR[index] || 0,
                mt: lineMT[index] || 0,
                whiteSpace: lineWhiteSpace[index] || 'initial',
                textAlign: lineTextAlign,
              }}
            >
              {Array.isArray(lineContent) ? lineContent[index] || '' : lineContent}
            </Typography>
          ))
        )}
      </CardContent>
    </Card>
  );
}