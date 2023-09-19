import React, { useContext, useState } from 'react';
import axios,{ AxiosResponse } from 'axios';
import { TextField, Button, Divider, Grid, Typography, Box, useMediaQuery } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageBox from '../components/homepageTrack';
import IconBox from '../components/iconBox';
import BadgeIcon from "@mui/icons-material/Badge";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AuthContext } from '../components/authProvider';
import '../fonts/fonts.css'
import '../components/sessionStartupComponents/setupComponents/setupStyles.css'
const EmailVerifyForm: React.FC = () => {
  const [failedToVerify,setfailedToVerify]=useState(false);
  const [errorMessage,setErrorMessage]=useState("");
  const [verified,setVerified]=useState(false);
  const router = useRouter();


  const checkTokenMatch= async (token:string,username:string)=>{
    try {
        const checkOriginalDataResponse: AxiosResponse = await axios.get('/api/checktokenapi', {
          params: { username},
        });
        
        console.log('Response:', checkOriginalDataResponse);
        if(checkOriginalDataResponse.data.token==token){
          return true;
        }else{
          return false;
        }
        
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    if(token=="match"){
        return true;
    }
    return false;
  }
  const handleUpdate = async (value:string|boolean,userName:string,targetValue:string)=>{
    const newValue=value;
    const target=targetValue;
    try {
      await axios.post("/api/changeuserdataapi", {newValue,userName,target});
   }
   catch (error) {
     console.error("Error checking for user:", error);
   }
  }


     const verifyEmail= async()=>{
        const { Token,username,email } = router.query;
        if (Token&&username&&email) {
            if(typeof Token === "string"&&typeof username === "string"&&typeof email === "string"){
                const tokenMatch= await checkTokenMatch(Token,username);
                if(tokenMatch){
                 setVerified(true);
                 handleUpdate(email,username,"email");
                 handleUpdate(true,username,"emailIsVerified");
                }
                else{
                 setfailedToVerify(true);
                 setErrorMessage("Token does not match verification token, please login and re-request verification to continue")
                }
            }
        }else{
            setfailedToVerify(true);
            setErrorMessage("No token provided, please login and request verification")
        }
    }
    const isMobile = useMediaQuery('(max-width:1000px)')
  return (
   
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    ><Box sx={{minHeight:'900px',height:'100vh',width:'100%'}}><ImageBox
    Width={"100%"}
    Height={"100%"}
    MarginRight={"0px"}
    MarginLeft={"0px"}
    MarginTop={"0px"}
    objectFit={"cover"}
    imageSrc="/images/test3.jpg"
    borderRadius={0} hasOverlay={true}><>  <Box sx={{display: "flex",
    justifyContent: "center",
    alignItems: "center",width:'100%',height:'100%'}}><form onSubmit={verifyEmail}>
    
    <Grid
    container
    rowSpacing={0}
    columnSpacing={{ xs: 0, sm: 0, md: 0 }}
    sx={{display:'flex',justifyContent:'center',alignItems:'center',height:'100%',width:'100%'}}
    >
    <Grid
      item
      xs={8}
      sx={{
        justifyContent: "center",
        display: "flex",
        backgroundColor: "rgba(9, 27, 119, 0.5)",
        height: "600px",
        minWidth:'400px',
        overflow:'auto',
        borderRadius:5,
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Grid
    container spacing={0}>
      <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Box sx={{width:'100%',overflow:"scroll",display:'flex',justifyContent:'center',alignItems:'center'}}><Typography fontFamily={"Yapari"} fontWeight={"bold"} fontSize={45} sx={{color:'white'}}>Email Verification</Typography> </Box></Grid>
      
      <Grid
      item
      xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25} sx={{color:'white'}}>You have submitted a request for a new email, or requested to verify your email, if you wish to complete this action please click the button below.</Typography>
      </Box></Grid>
      <Grid
      item
      xs={isMobile ?12:12}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Grid container spacing={0}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'left',alignItems:'center',ml:3}}>
        <Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={25} sx={{color:'white'}}>If this was not you please contact us at support-gteam@gmail.com</Typography>
                  </Box></Grid>
          </Grid>
          </Grid>
          <Grid
      item
      xs={isMobile ?12:12} sx={{display:'flex',justifyContent:isMobile?'center':'center',ml:isMobile ?0:0}}><Button className={'textBox'}variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'50%',height:'55px',border:'1px solid white'}}
      onClick={verifyEmail}
      >
     VERIFY EMAIL
      </Button>
      </Grid>
      
    </Grid>

    
      
    
    </Grid>
    <Grid item xs={12}>{failedToVerify &&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'red'}}>Verification failed, please try a new link.</Typography>
                  </Box></Grid>}
                  {errorMessage&&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'red'}}>{errorMessage}</Typography>
                  </Box></Grid>}
                  {verified &&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'green'}}>Verification successfull.</Typography>
                  </Box></Grid>}</Grid>
          </Grid>
    </Grid>
    </Grid>
    
    </form>
    </Box></>
    </ImageBox>
    </Box>
      </div>
  );
};

export default EmailVerifyForm;