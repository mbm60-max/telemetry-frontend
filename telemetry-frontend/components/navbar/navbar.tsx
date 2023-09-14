import { Button, Grid, Typography,Box } from "@mui/material";
import Link from "next/link";
import ImageBox from "../homepageTrack";
import './navbar.css';
import '../../fonts/fonts.css';
import { useContext } from "react";
import { AuthContext } from "../authProvider";
import SvgRenderer from "../avatar/svgRenderer";

const NavBar = () => {
    const {  userName,pfpSVG20,pfpSVG40,pfpSVG60 } = useContext(AuthContext);
    return (
        <div >

            <Box className="parallelogramContainer">
                <Grid container spacing={2}>
                <Grid item xs={12} sm={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href={"/"}>
                            <Typography fontSize={30} fontFamily={'TestFont'} sx={{ color: '#F6F6F6' }}>GTeam</Typography></Link></Button>
                    </Grid>
                     <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                     <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}  href={"/account"}><Grid container spacing={4}><Grid item xs={6} sx={{display:'flex',alignItems:'center'}}><SvgRenderer svgString={pfpSVG40} className="svg-container" /></Grid><Grid item xs={6} sx={{display:'flex',alignItems:'center'}}>{userName}</Grid></Grid></Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}  href={"/"}>Home</Link></Button>
                        <Button className="parallelogram-button" ><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/session-startup"}>Start Session</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/recommended"}>Recomended</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/review"}>Review</Link></Button>
                        <Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/settings"}>settings</Link></Button>
                        <Button className="parallelogram-buttonCTA"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/login"}>Logout</Link></Button>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
};
export default NavBar