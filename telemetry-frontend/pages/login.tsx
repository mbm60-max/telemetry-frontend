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
const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [emailError, setEmailError] = useState("");
  const router = useRouter();
  const { isLoggedIn,setUserLoggedIn} = useContext(AuthContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userResponse: AxiosResponse = await axios.get('/api/checkuserapi', {
      params: { username },
    });
  const loginResponse: AxiosResponse = await axios.get('/api/loginapi', {
    params: { username, password },
  });
  const pfpResponse: AxiosResponse = await axios.get('/api/retrievepfpapi', {
    params: { username},
  });

  const handleBackendLogin = () => {
    // Replace with your username value
    const usernameValue = 'example_username';

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: usernameValue }),
    })
      .then(response => response.json())
      .then(data => {
        // Handle the response from the backend
        console.log(data);
      })
      .catch(error => {
        // Handle any error that occurs during the request
        console.error('Error:', error);
      });
  };


    try {
      // get data from server
      await axios.get('/api/loginapi', {
        params: { username, password },
      });
      console.log(pfpResponse.data.pfpSVG)
      setUserLoggedIn(username,pfpResponse.data.pfpSVG20,pfpResponse.data.pfpSVG40,pfpResponse.data.pfpSVG60);
      setPasswordError('');
      setUsernameError('');
      // Clear the form
      

      // Do something after successful submission
      // e.g., redirect to a different page
      if (loginResponse.data.message === 'Success') {
        // Clear the form
        ;
        setUsername('');
        setPassword('');
        handleBackendLogin();
        router.push('/');
        return;
        // Do something after successful login
        // e.g., redirect to a different page
      } else if(userResponse.data.message === 'Success'){
        setPassword('');
        // Handle unsuccessful login
        setPasswordError("Invalid Password")
        return
      }
      setUsername('');
      setPassword('');
      setPasswordError("Invalid Username or Password")
      setUsernameError("Invalid Username or Password")
    } catch (error) {
      console.error('Error submitting form:', error);
    }
};
const handleSignupRedirect=()=>{
  router.push('/signup');
}
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
    imageSrc="/images/fluid-imagery-WviYR9d6FY4-unsplash.jpg"
    borderRadius={0} hasOverlay={true}><>  <Box sx={{display: "flex",
    justifyContent: "center",
    alignItems: "center",width:'100%',height:'100%'}}><form onSubmit={handleSubmit}>
    
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
      <Grid item xs={12}></Grid>
      <Grid
      item
      xs={12} sx={{display:'flex',justifyContent:'center'}}><Typography fontFamily={"Yapari"} fontWeight={'bold'} sx={{color:'white'}} fontSize={45}>LOGIN</Typography></Grid>
      <Grid
      item
      xs={isMobile ?12:12}>
      <Grid container spacing={2} >
        <Grid item xs={12}>
        <Grid container spacing={0} >
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}><Box sx={{mb:usernameError ? 3: 0}}><IconBox icon={BadgeIcon} onHoverText={'Your Username'}></IconBox></Box>
                  <TextField
                    label="Username"
                    variant="outlined"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={Boolean(usernameError)}
                    helperText={usernameError}
                    sx={{width:'60%'}}
                    className={'textBox'}
                  /></Grid>
        </Grid>
        </Grid>
        <Grid item xs={12}>
        <Grid container spacing={0}>
        <Grid item xs={12} sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Box sx={{mb:emailError ? 3: 0}}><IconBox icon={VpnKeyIcon} onHoverText={'Your Password'}></IconBox></Box>
                  <TextField
                  label="Password"
                  variant="outlined"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  error={Boolean(passwordError)}
                    helperText={passwordError}
                    sx={{width:'60%'}}
                    className={'textBox'}
                />
        </Grid>
        </Grid>
        </Grid>
    </Grid>

     
      
    
    </Grid>
      
    

        <Grid
      item
      xs={isMobile ?12:6} sx={{display:'flex',justifyContent:isMobile?'center':'end',ml:isMobile ?0:0}}><Button className={'textBox'}variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',border:'1px solid white'}}
      type="submit"
      >
      SUBMIT
      </Button>
      </Grid>

      <Grid
      item
      xs={isMobile ?12:6} sx={{display:'flex',justifyContent:isMobile?'center':'center'}}>
      
      <Button onClick={handleSignupRedirect}className={'textBox'}variant={'contained'}sx={{whiteSpace:'nowrap',overflow:'auto',width:'60%',height:'55px',border:'1px solid white'}}>
      
      SIGNUP
      
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

export default LoginForm;
// <Divider sx={{ width: "350px", mt:6, fontSize:17,color: "#AFAFAF"}} >or</Divider>
                
//<Button variant="contained" sx={{ width: "350px", mt: 6 }}>
//Sign in with Google
//</Button>