import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, Rating,Slide } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CarouselRightArrow, { CarouselLeftArrow } from './carouselArrows';
import CarouselRating from './rating';
interface BasicCarouselProps {
CarouselHeader:string[];
BodyContent:string[];
Ratings:number[];
}
export default function BasicCarousel({CarouselHeader,BodyContent,Ratings }: BasicCarouselProps) {
    const [currentIndex,setCurrentIndex]=React.useState(0);
    const [direction, setDirection] = React.useState<'left' | 'right' | undefined>(undefined);
    const [exitDirection, setExitDirection] = React.useState<'left' | 'right' | undefined>(undefined);

    const handleClick = (isBackClick: boolean) => {
        if (isBackClick) {
          setCurrentIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : BodyContent.length - 1));
          setDirection('left');
          setExitDirection('right');
        } else {
          setCurrentIndex((prevIndex) => (prevIndex === BodyContent.length - 1 ? 0 : prevIndex + 1));
          setDirection('right');
          setExitDirection('left');
        }
      };
const handleExit = () => {
    // Set exit direction to the opposite of entrance direction
    setExitDirection(direction === 'left' ? 'right' : 'left');
  };
    return (
        <Box sx={{ height: '400px', width: '100%', backgroundColor: 'rgba(100, 10, 56, 1)' }}>
            <Grid container spacing={2} sx={{ minWidth: '300px' }}>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
                     <CarouselLeftArrow onClick={handleClick}/>
</Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ minWidth: '300px' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                
                        {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={750} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit}
                   // Call this function when the slide is exited
                >
                  <Typography fontSize={29} sx={{ color: "white" }}>{CarouselHeader[currentIndex]}</Typography>
                </Slide>
              ))}
                    
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={750} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit} // Call this function when the slide is exited
                  style={{width:"100%"}}
                >
                  <Typography fontSize={22} sx={{ color: 'white' }}>
                    {content}
                  </Typography>
                </Slide>
              ))}
          
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
               
                        {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={750} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit}
                   // Call this function when the slide is exited
                >
                  <Typography fontSize={29} sx={{ color: "white" }}> <CarouselRating rating={Ratings[currentIndex]}/></Typography>
                </Slide>
              ))}
                </Grid>
            </Grid>

            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center' }}>
            <CarouselRightArrow onClick={handleClick}/>
            </Grid>
            </Grid>
        </Box>
    );
}
