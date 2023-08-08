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
Names:string[];
}
export default function BasicCarousel({CarouselHeader,BodyContent,Ratings,Names }: BasicCarouselProps) {
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
        <Box sx={{ height: '100%', width: '100%', backgroundColor: '#FB9536',borderRadius:10}}>
            <Grid container spacing={2} sx={{ width: '100%',height:'400px'}}>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center'  }}>
                     <CarouselLeftArrow onClick={handleClick}/>
</Grid>
            <Grid item xs={8} sx={{ display: 'flex', justifyContent: 'center' }}>
            <Grid container spacing={2} sx={{ minWidth: '100%' }}>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                
                        {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={550} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit}
                   // Call this function when the slide is exited
                ><Box sx={{ minHeight: '70px', minWidth: '350px',display:'flex',justifyContent:'center',alignItems:'center',mb:1,mt:1}}>
                  <Typography fontFamily={'Yapari'} fontSize={29} sx={{ color: "white" }}>{CarouselHeader[currentIndex]}</Typography>
                  </Box>
                </Slide>
              ))}
                    
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
                  {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={550} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit} // Call this function when the slide is exited
                >
                    <Box sx={{ minHeight: '150px', minWidth: '350px',maxWidth:'350px',display:'flex',justifyContent:'center',textAlign:'left'}}>
                    <Box sx={{ minHeight: '150px', minWidth: '250px',maxWidth:'250px',display:'flex',justifyContent:'center',textAlign:'left'}}>
                  <Typography   fontFamily={"Satoshi"} fontSize={22} sx={{ color: 'white' }}>
                    {content}
                  </Typography>
                  </Box>
                  </Box>
                </Slide>
              ))}
          
                </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
               
               {BodyContent.map((content, index) => (
       <Slide
         key={index}
         direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
         in={index === currentIndex}
         timeout={550} // Adjust this value to control the animation speed
         mountOnEnter
         unmountOnExit
         onExited={handleExit}
          // Call this function when the slide is exited
       ><Box sx={{ minHeight: '30px', minWidth: '350px', display:'flex',justifyContent:'center'}}>
         <Typography fontFamily={"Satoshi"} fontSize={22} sx={{ color: "white" }}>{Names[currentIndex]}</Typography>
         </Box>
       </Slide>
     ))}
       </Grid>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }}>
               
                        {BodyContent.map((content, index) => (
                <Slide
                  key={index}
                  direction={index === currentIndex ? direction : exitDirection} // Set exit direction when exiting
                  in={index === currentIndex}
                  timeout={550} // Adjust this value to control the animation speed
                  mountOnEnter
                  unmountOnExit
                  onExited={handleExit}
                   // Call this function when the slide is exited
                ><Box sx={{ minHeight: '30px', minWidth: '350px', display:'flex',justifyContent:'center'}}>
                  <Typography  fontSize={29} sx={{ color: "white" }}> <CarouselRating rating={Ratings[currentIndex]}/></Typography>
                  </Box>
                </Slide>
              ))}
                </Grid>
            </Grid>

            </Grid>
            <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center',alignItems:'center' }}>
            <CarouselRightArrow onClick={handleClick}/>
            </Grid>
            </Grid>
        </Box>
    );
}
