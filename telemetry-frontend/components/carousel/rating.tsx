import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarsIcon from '@mui/icons-material/Stars';
import * as React from 'react';
import Button from '@mui/material/Button';

import StarHalfIcon from '@mui/icons-material/StarHalf';
import Star from './star';


interface CarouselRatingProps {
rating:number;
}
export default function CarouselRating({rating}: CarouselRatingProps) {
    const numStars = Math.floor(rating);
    const hasHalfStar = rating - numStars >= 0.5;

    const renderStars = () => {
        const stars = [];
        for (let i = 0; i < numStars; i++) {
          stars.push(<Star key={i} filled />);
        }
        if (hasHalfStar) {
          stars.push(<Star key={numStars} filled={false} />);
        }
        return stars;
      };
    
      return (
        <div>
          {renderStars()}
          <ArrowForwardIosIcon />
        </div>
      );
    };

