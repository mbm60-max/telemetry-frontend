import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import Button from '@mui/material/Button';


interface CarouseltArrowProps {
onClick:(isBackClick: boolean) => void;
}
export default function CarouselRightArrow({onClick}: CarouseltArrowProps) {

   const  handleLeftClick=()=>{
        onClick(false);
    }
    return (
    <Button  sx={{ color: "white",fontSize:22 }} onClick={handleLeftClick}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>           
    );
}
export function CarouselLeftArrow({onClick}: CarouseltArrowProps) {
    const handleRightClick=()=>{
        onClick(true);
    }
    return (
    <Button  sx={{ color: "white",fontSize:22 }} onClick={handleRightClick}><ArrowBackIosIcon></ArrowBackIosIcon></Button>           
    );
}