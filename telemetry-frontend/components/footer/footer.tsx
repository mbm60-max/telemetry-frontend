import { Button, Divider, Grid, styled, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import '../navbar/navbar.css';
import '../../fonts/fonts.css';
import ExternalLinkButton from "../externalLink";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
const StyledVerticalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px",
    borderColor: "white", 
    height: "170px",
  }));
const Footer= () => {
    return (
        <div >

            <Box sx={{width:'102%',display:'flex',alignItems:'center',backgroundColor:'rgba(9, 27, 90,1 )'}}>
                <Grid container spacing={2}>
                <Grid item xs={3} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} >
                <Grid container spacing={2}>
                <Grid item xs={10}sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}} ><Button ><Link style={{ color: '#F6F6F6', textDecoration: 'none' }} href={"/"}>
                            <Typography fontSize={30} fontFamily={'TestFont'} sx={{ color: '#F6F6F6' }}>GTeam</Typography></Link></Button></Grid>
                <Grid item xs={2}  sx={{display: 'flex', justifyContent: 'end', alignItems: 'center'}} ><StyledVerticalDivider/></Grid>
                        
                            
                    </Grid>
                    </Grid>
                    <Grid item xs={6} sm={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Grid container rowSpacing={2} columnSpacing={2} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Button className="basic-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}  href={"/"}>Home</Link></Button></Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Button className="basic-button" ><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/session-startup"}>Start Session</Link></Button></Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Button className="basic-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/"}>Recomended</Link></Button></Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}><Button className="basic-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }} href={"/review"}>Review</Link></Button></Grid>
                    <Grid item xs={6}sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}} ><Button className="basic-button"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/settings"}>settings</Link></Button></Grid>
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Button className="parallelogram-buttonCTA"><Link style={{ color: '#F6F6F6', textDecoration: 'none' ,fontFamily:'Satoshi'}} href={"/login"}>Login</Link></Button></Grid>
                       
                       
                        
                        
                       </Grid><StyledVerticalDivider/>
                        
                        </Grid>
                     <Grid item xs={3} sm={3} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' , }}>
                     <Grid container spacing={2}>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>  <Typography fontSize={19} fontFamily={"Satoshi"} sx={{color:'white',display:'flex',alignItems:'center',overflow:'auto'}}> <EmailIcon/>mbm60@bath.ac.uk</Typography></Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <Typography fontSize={19} fontFamily={"Satoshi"} sx={{color:'white',display:'flex',alignItems:'center',overflow:'auto'}}><LocalPhoneIcon/>+44 07495 2455847</Typography></Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <ExternalLinkButton url="https://github.com/mbm60-max" label="Github" /></Grid>
                        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}> <ExternalLinkButton url="https://www.linkedin.com/in/max-byng-maddick-a609751a4" label="Linkedin" /></Grid>

                        </Grid>
                    </Grid>
                    <Grid item xs={6}><Box sx={{height:'100%',width:'100%'}}><Typography fontSize={12} fontFamily={"Satoshi"} sx={{color:'white',display:'flex',alignItems:'center',overflow:'auto'}}>Use of this site constitutes  acceptance of our Privacy Policy and User Agreement Policy</Typography> </Box></Grid>
                    <Grid item xs={6}><Box sx={{height:'100%',width:'95%',display:'flex',justifyContent:'right'}}> <Typography fontSize={12} fontFamily={"Satoshi"} sx={{color:'white',display:'flex',alignItems:'center',overflow:'auto'}}>Copyright Max Byng-Maddick 2023</Typography></Box></Grid>
                </Grid>
            </Box>
        </div>
    );
};
export default Footer