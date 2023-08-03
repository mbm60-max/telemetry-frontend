import { Button, Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import ImageBox from "../homepageTrack";
import './navbar.css';
import '../../fonts/fonts.css';

const NavBar = () => {
    return (
        <div >

            <Box className="parallelogramContainer">
                <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href={"/"}>
                            <Typography fontSize={30} fontFamily={'TestFont'} sx={{ color: '#F6F6F6' }}>GTeam</Typography></Link></Button>
                    </Grid>
                     <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}  href={"/"}>Home</Link></Button>
                        <Button className="parallelogram-button" ><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/session-startup"}>Start Session</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/"}>Recomended</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/review"}>Review</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/settings"}>settings</Link></Button>
                        <Button className="parallelogram-buttonCTA"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/login"}>Login</Link></Button>


                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
export default NavBar