import React, { useContext, useState } from 'react';
import axios,{ AxiosResponse } from 'axios';
import { TextField, Button, Divider, Grid, Typography, Box } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import ImageBox from '../components/homepageTrack';
import IconBox from '../components/iconBox';
import BadgeIcon from "@mui/icons-material/Badge";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { AuthContext } from '../components/authProvider';
import '../fonts/fonts.css'
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
        console.log(Token)
        console.log(username)
        console.log(email)
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
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div className="elevatedBox">
          <Grid
            container
            rowSpacing={0}
            columnSpacing={{ xs: 1, sm: 2, md: 0 }}
          >
            <Grid
              item
              xs={6}
              sx={{
                justifyContent: "center",
                display: "flex",
                backgroundColor: "#F6F6F6",
                height: "610px",
                width:'30vw'
              }}
            >
              <div style={{ marginTop: 100,width:'100%'}}>
                <Box sx={{display:'flex',justifyContent:'center'}}>
                <Grid
            container spacing={2}>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'center'}}><Box sx={{width:'90%',overflow:"scroll"}}><Typography fontFamily={"Yapari"} fontWeight={"bold"} fontSize={30} >Email Verification</Typography> </Box></Grid>
                <Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'#524c4b'}}>You have submitted a request for a new email, or requested to verify your email, if you wish to complete this action please click the button below.</Typography>
                  </Box></Grid>
                <Grid item xs={12}sx={{display:'flex',justifyContent:'center'}}><Button
                    type="submit"
                    variant="contained"
                    onClick={verifyEmail}
                  >
                    <Typography fontFamily={"Satoshi"} fontSize={20}>Verify Email</Typography>
                  </Button></Grid>
                  
                  <Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'#524c4b'}}>If this was not you please contact us at support-gteam@gmail.com</Typography>
                  </Box></Grid>
                  {failedToVerify &&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'red'}}>Verification failed, please try a new link.</Typography>
                  </Box></Grid>}
                  {errorMessage&&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'red'}}>{errorMessage}</Typography>
                  </Box></Grid>}
                  {verified &&<Grid item xs={12} sx={{display:'flex',justifyContent:'left',ml:3}}><Box sx={{width:'90%'}}><Typography fontFamily={"Satoshi"} fontWeight={"bold"} fontSize={18} sx={{color:'green'}}>Verification successfull.</Typography>
                  </Box></Grid>}
            </Grid>
                  </Box>
              </div>
            </Grid>
            <Grid item xs={6} sx={{ height: "610px" }}>
              <ImageBox
                Width={"475px"}
                Height={"610px"}
                MarginRight={"0px"}
                MarginLeft={"0px"}
                MarginTop={"0px"}
                objectFit={"cover"}
                imageSrc="/images/max-bottinger-0k_dCKxyIHc-unsplash.jpg"
                borderRadius={0} hasOverlay={false}                >
                  </ImageBox>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default EmailVerifyForm;