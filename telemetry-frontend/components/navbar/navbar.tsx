import { Button, Grid, Typography,Box, useMediaQuery } from "@mui/material";
import Link from "next/link";
import ImageBox from "../homepageTrack";
import './navbar.css';
import '../../fonts/fonts.css';
import { useContext } from "react";
import { AuthContext } from "../authProvider";
import SvgRenderer from "../avatar/svgRenderer";

const NavBar = () => {
    const {  userName,pfpSVG20,pfpSVG40,pfpSVG60 } = useContext(AuthContext);
    const isMobile = useMediaQuery('(max-width:1200px)')
    return (
        <div >

            <Box className="parallelogramContainer">
                <Grid container spacing={2}>
                <Grid item xs={12} sm={isMobile ? 3:4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                        <Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href={"/"}>
                            <Typography fontSize={30} fontFamily={'TestFont'} sx={{ color: '#F6F6F6' }}>GTeam</Typography></Link></Button>
                    </Grid>
                     <Grid item xs={12} sm={8} sx={{ display: 'flex', justifyContent: 'right', alignItems: 'center' }}>
                     <Grid container spacing={isMobile ? 3:2} columns={isMobile ? 12:14}>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}  href={"/profile"}><Grid item xs={12} sx={{display:'flex',alignItems:'center'}}>PROFILE<SvgRenderer svgString={pfpSVG20} className="svg-container" /></Grid></Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto' }}  href={"/"}>Home</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button" ><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto' }} href={"/session-startup"}> Session</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto'}} href={"/recommended"}>Recommended</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto' }} href={"/review"}>Review</Link></Button></Grid>
                     <Grid item xs={isMobile ? 3:2}><Button className="parallelogram-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto'}} href={"/settings"}>settings</Link></Button></Grid>
                     <Grid item xs={isMobile ? 4:2}><Button className="parallelogram-buttonCTA"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi',whiteSpace:'nowrap',overflow:'auto'}} href={"/login"}>Logout</Link></Button></Grid>

                     </Grid>
                   </Grid>
                </Grid>
            </Box>
        </div>
    );
};
export default NavBar