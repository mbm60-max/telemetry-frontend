import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import * as React from 'react';
import Button from '@mui/material/Button';


interface CarouseltArrowProps {
onClick?:string[];
}
export default function CarouselRightArrow({onClick}: CarouseltArrowProps) {

    return (
    <Button  sx={{ color: "white",fontSize:22 }}><ArrowForwardIosIcon></ArrowForwardIosIcon></Button>           
    );
}
export function CarouselLeftArrow({onClick}: CarouseltArrowProps) {

    return (
    <Button  sx={{ color: "white",fontSize:22 }}><ArrowBackIosIcon></ArrowBackIosIcon></Button>           
    );
}