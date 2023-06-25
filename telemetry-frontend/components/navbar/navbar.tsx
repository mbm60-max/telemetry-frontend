import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import ImageBox from "../homepageTrack";
import './navbar.css';

const NavBar = () => {
    return (
        <div >
            
            <Box className="parallelogramContainer">
          

            <ImageBox Width={'300px'} Height={'100px'} MarginRight={'180px'} MarginLeft={'20px'} MarginTop={'20px'} imageSrc="/images/Screenshot 2023-06-25 at 11.19 1.svg"></ImageBox>
                <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Home</Link></Button>
                <Button className="parallelogram-button" ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Start Session</Link></Button>
                <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Recomended</Link></Button>
                <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Review</Link></Button>
                <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Settings</Link></Button>
                <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href={"/"}>Account</Link><div className="triangle"></div></Button>
                
            </Box>
        </div>
      );
};
export default NavBar