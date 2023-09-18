import React, { MouseEventHandler, useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { TextField, Button, Typography, styled, Box, useMediaQuery } from "@mui/material";
import Link from "next/link";
import "../pagesCss/signup.css";
import Grid from "@mui/material/Grid";
import ImageBox from "../components/homepageTrack";
import IconBox from "../components/iconBox";
import BadgeIcon from "@mui/icons-material/Badge";
import EmailIcon from '@mui/icons-material/Email';
import SensorsIcon from '@mui/icons-material/Sensors';
import Divider from "@mui/material/Divider";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsObject from "../interfaces/defaultSettingsInterface";
import validatePassword from "../utils/validatePassword";
import { generateToken } from "../utils/emailSender";
import SvgRenderer from "../components/avatar/svgRenderer";
import UserAvatar from "../components/avatar/userAvatar";
import ReactDOMServer from "react-dom/server";
import '../fonts/fonts.css'
import '../components/sessionStartupComponents/setupComponents/setupStyles.css'
const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [IPAddress, setIPAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [ipAddressError,setIPAddressError]= useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [pfpSVG20, setPfpSVG20] = useState("");
  const [pfpSVG40, setPfpSVG40] = useState("");
  const [pfpSVG60, setPfpSVG60] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
   
    
    try {
      let Failed = false;
       //Send the data to the server
       const userResponse: AxiosResponse = await axios.get('/api/checkuserapi', {
        params: { username },
      });console.log(userResponse.data.message);
      const emailResponse: AxiosResponse = await axios.get('/api/checkemailapi', {
        params: { email },
      });
      
      if (userResponse.data.message === 'Success') {
        //username taken
        setUsernameError("This Username is already taken")
        Failed = true;
      }
      if(emailResponse.data.message === "Success"){
        setEmailError("This Email is already taken")
        Failed = true;
      }
      if(username==""){
        setUsernameError("Username required")
        Failed = true;
      }
      if(password != confirmPassword){
        setConfirmPasswordError("Must match password")
        Failed = true;
      }
      if(validateEmail(email)==false){
        setEmailError("Invalid Email")
        Failed = true;
      }
      if(validatePassword(password)==false){
        setPasswordError("Password Required")
        Failed = true;
      }
      if(validateIP(IPAddress)==false){
        setIPAddressError("Valid IP Address Required");
        Failed = true;
      }
      if(Failed==true){
        return
      }
      const router = useRouter();
      const token = generateToken(10);
      const emailIsVerified = false;
      const completedChallenges = [false,false,false];
      await axios.post("/api/registerapi", { username, email, password, token, emailIsVerified, pfpSVG20,pfpSVG40,pfpSVG60,completedChallenges});
      const settingsname = "Default Settings"
      const settingsObject: SettingsObject = {
        data: {
            allowML: false,
            reviewLapLimit: 10,
            optInToDataPushing:false,
            type: "DataSettings"
        },
        appearance: {
            lightModeEnabled:true,
            language:"en",
            type: "AppearanceSettings"
        },
        alerts: {

            alertDefaultWarningsNames:[["Front Left Temp","Front Right Temp","Rear Left Temp","Rear Right Temp"],
                                       ['"Oil Temperature"','RPM','Turbo Boost Pressure','Oil Pressure','Fuel Level','Water Temperature'],
                                       ['RPM','RPM To Clutch'],
                                       ['Front Left Suspension Height','Front Right Suspension Height','Rear Left Suspension Height','Rear Right Suspension Height','Front Left RPS','Front Right RPS','Rear Left RPS','Rear Right RPS']],
            alertDefaultWarningsUpperLimits:[[ 106,  105,  105,  105 ],
                                             [ 0,  0,  0,  0,  0,  0 ],
                                             [ 3000, 3000 ],
                                             [ 100,  100,  100,  100,10,10,10,10]],
            alertDefaultWarningsLowerLimits:[[ 5,  0,  0,  0 ],
                                             [ 0,  0,  0,  0,  0,  0],
                                             [ 0, 0 ],
                                             [ 0,  0,  0,  0,  0,  0,  0 , 0 ]],
            alertDefaultWarningsUnits:[[ '°C',  '°C',  '°C',  '°C', ],
                                             [ '°C', 'RPM',  'Bar',  'Bar',  '%',  '°C' ],
                                             [ 'RPM', 'RPM' ],
                                             [ 'mm',  'mm',  'mm',  'mm',  'RPS',  'RPS',  'RPS' , 'RPS']],
            alertWarningInterval:5000,
            type: "AlertSettings"
        },
        defaults: {
            defaultUnitsMetric:true,
            defualtIPAddress:IPAddress,
            type: "DefaultSettings"
        },
      
      };
      await axios.post("/api/editusersettingsapi", { username,settingsname , settingsObject });
      // Clear the form
      setUsername("");
      setPassword("");
      setEmail("");
      setConfirmPassword("");
      setIPAddress("");

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };
  //split this up
  
  //find an api to do this better
  const validateEmail = (str: string) => {
    const regex = /.*@.*/;
  
    if (!regex.test(str)) {
      return false;
    }
  
    return true;
  };

  const validateIP = (ip: string) => {
    const ipRegex = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // The IP regex checks for the following pattern:
    // - Four parts separated by periods (e.g., 192.168.0.1)
    // - Each part can have values from 0 to 255
  
    return ipRegex.test(ip);
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setUsernameError(""); // Clear username error on change
  };
  
  

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    if (validatePassword(password)) {
      setPasswordError("");
      return
    } else {
      setPasswordError("Password does not meet the criteria");
    }
     // Clear password error on change
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    if (validateEmail(email)) {
      setEmailError("");
      return
    } else {
      setEmailError("Invalid Email")
    }
  };

 
  const handleIPChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIPAddress(e.target.value);
    setIPAddressError(""); // Clear username error on change
  };
  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
    setConfirmPasswordError(""); // Clear confirm password error on change
  };

  useEffect(()=>{
    handleCreateAvatar();
  },[])
  const handleLoginRedirect=()=>{
    router.push('/login');
  }
  const handleCreateAvatar = () => {
    const token=generateToken(10);
    const avatarComponent20 = (
      <UserAvatar
        name={token}
        variant="beam"
        size={20}
      />
    );
    const avatarComponent40 = (
      <UserAvatar
        name={token}
        variant="beam"
        size={40}
      />
    );
    const avatarComponent60 = (
      <UserAvatar
        name={token}
        variant="beam"
        size={60}
      />
    );
    setPfpSVG20(ReactDOMServer.renderToString(avatarComponent20))
    setPfpSVG40(ReactDOMServer.renderToString(avatarComponent40))
    setPfpSVG60(ReactDOMServer.renderToString(avatarComponent60))
  };
  const isMobile = useMediaQuery('(max-width:1000px)')
  return (
    <>
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
      imageSrc="/images/milan-csizmadia-pYmH0eTpr70-unsplash.jpg"
      borderRadius={0} hasOverlay={true}><>  <Box sx={{display: "flex",
      justifyContent: "center",
      alignItems: "center",width:'100%',height:'100%'}}><form onSubmit={handleSubmit}>
      
      <Grid
      container
      rowSpacing={0}
      columnSpacing={{ xs: 1, sm: 2, md: 0 }}
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
          boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 1)",
        }}
      >
        <Grid
      container spacing={0}>
        <Grid item xs={12}><Box sx={{height:'5px'}}></Box></Grid>
        <Grid
        item
        xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontWeight={'bold'} sx={{color:'white'}} fontSize={45}>SIGN UP</Typography></Grid>
        <Grid
        item
        xs={isMobile ?12:6}>
        <Grid container spacing={2} >
          <Grid item xs={12}>
          <Grid container spacing={0} >
            {isMobile && <Grid item xs={12}><Box sx={{height:'50px'}}></Box></Grid>}
          <Grid
        item
        xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontWeight={'bold'} sx={{color:'white'}} fontSize={25}>BASICS</Typography></Grid>
        
          <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Box sx={{mb:usernameError ? 3: 0}}><IconBox icon={BadgeIcon} onHoverText={"Must not already be taken"}></IconBox></Box><TextField
              label="Username"
              variant="outlined"
              value={username}
              onChange={handleUsernameChange}
              error={Boolean(usernameError)}
              helperText={usernameError}
              sx={{width:'60%'}}
              className="textBox"
            /></Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={0}>
          <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box sx={{mb:emailError ? 3: 0}}><IconBox icon={EmailIcon} onHoverText={"Must contain at least two charcters seperated by an @"}></IconBox></Box><TextField
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={handleEmailChange}
              error={Boolean(emailError)}
              helperText={emailError}
              sx={{width:'60%'}}
              className="textBox"
            />
          </Grid>
          </Grid>
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={0}>
          <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box sx={{mb:passwordError ? 3: 0}}><IconBox icon={VpnKeyIcon} onHoverText={"Must be at least six characters long, with at least one upper and lower character"}></IconBox></Box><TextField
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
              helperText={passwordError}
              sx={{width:'60%'}}
              className="textBox"
            />
          </Grid>
          </Grid> 
          </Grid>
          <Grid item xs={12}>
          <Grid container spacing={0}>
          <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box sx={{mb:confirmPasswordError ? 3: 0}}><IconBox icon={VpnKeyIcon} onHoverText={"Must match your password"}></IconBox></Box><TextField
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={Boolean(confirmPasswordError)}
              helperText={confirmPasswordError}
              sx={{width:'60%'}}
              className="textBox"
            />
          </Grid>
          </Grid>
          </Grid>
      </Grid>
        </Grid>
        {isMobile && <Grid item xs={12}><Box sx={{height:'50px'}}></Box></Grid>}
        <Grid
        item
        xs={isMobile ?12:6}> <Grid container spacing={0}>
        <Grid
      item
      xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontWeight={'bold'} sx={{color:'white'}} fontSize={25}>SPECIFICS</Typography></Grid>
      <Grid xs={12}>
      <Grid container spacing={0}>
      <Grid xs={12}><Grid container spacing={2}>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
              <Box
              display="flex"
              alignItems="center"
              border="1px solid #ccc"
              padding="8px"
              width="100px"
              height="38px"
              justifyContent='center'
              sx={{mr:1,backgroundColor:'rgba(9, 27, 119, 0.5)',borderRadius:5}}>
                <SvgRenderer svgString={pfpSVG40}/>
            </Box>
            <Button className={'textBox'}variant={'contained'}onClick={handleCreateAvatar} sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',border:'1px solid white'}}>Generate New Avatar</Button>
            </Grid>
            <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
          <Box sx={{mb:confirmPasswordError ? 3: 0}}><IconBox icon={SensorsIcon} onHoverText={"Must contain four number between 0 and 256 seperate by 4 .'s eg 123.123.123.123"}></IconBox></Box>
        <TextField
        label="IP Address"
        variant="outlined"
        type="password"
        value={IPAddress}
        onChange={handleIPChange}
        error={Boolean(ipAddressError)}
        helperText={ipAddressError}
        sx={{width:'60%'}}
        className="textBox"
        
        />
          </Grid>
        </Grid>
     </Grid>
      </Grid>
      </Grid>
       
        
      
      </Grid>
        
      </Grid>
      {isMobile && <Grid item xs={12}><Box sx={{height:'50px'}}></Box></Grid>}
          <Grid
        item
        xs={isMobile ?12:6} sx={{display:'flex',justifyContent:isMobile?'center':'end',ml:isMobile ?0:-4}}><Button className={'textBox'}variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',border:'1px solid white'}}
        type="submit"
        >
        Submit
        </Button>
        </Grid>
        {isMobile && <Grid item xs={12}><Box sx={{height:'50px'}}></Box></Grid>}
        <Grid
        item
        xs={isMobile ?12:6} sx={{display:'flex',justifyContent:isMobile?'center':'end'}}>
        
        <Button onClick={handleLoginRedirect}className={'textBox'}variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',border:'1px solid white'}}>
        
        Login
        
        </Button>
        </Grid>
      </Grid>
      
         
       
      </Grid>
      
      </Grid></form></Box></>
      </ImageBox>
      </Box>
        </div>
    
    </>
  );
};

export default SignUpForm;