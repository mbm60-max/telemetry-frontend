import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Rating } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselRightArrow, { CarouselLeftArrow } from './carouselArrows';
import CarouselRating from './rating';
interface BasicCarouselProps {
CarouselHeader?:string[];
}
export default function BasicCarousel({CarouselHeader }: BasicCarouselProps) {

    return (
        <Box sx={{ height: '400px', width: '100%', backgroundColor: 'rgba(100, 10, 56, 1)' }}>
            <Grid container spacing={2} sx={{ minWidth: '300px' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography fontSize={29} sx={{ color: "white" }}>Wow</Typography>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={0}>
                        <Grid item xs={2}>
                           <CarouselLeftArrow/>
                        </Grid>
                        <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
                            <Typography fontSize={22} sx={{ color: "white" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In tempus mauris non augue congue efficitur. Donec sed velit lacinia justo rutrum fringilla. </Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <CarouselRightArrow/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  <CarouselRating rating={3.5}/>
                </Grid>
            </Grid>
        </Box>
    );
}