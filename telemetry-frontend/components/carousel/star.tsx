import React from 'react';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
interface StarProps{
filled:boolean;
key:number;
}
const Star = ({key,filled}:StarProps) => {
  return filled ? <StarIcon /> : <StarHalfIcon />;
};

export default Star;