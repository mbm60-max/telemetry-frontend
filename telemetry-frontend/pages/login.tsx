import React, { useContext, useState } from 'react';
import axios,{ AxiosResponse } from 'axios';
import { TextField, Button, Divider, Grid, Typography } from '@mui/material';
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
  const router = useRouter();
  const { isLoggedIn,setUserLoggedIn} = useContext(AuthContext);
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  const response: AxiosResponse = await axios.get('/api/loginapi', {
    params: { username, password },
  });

    try {
      // get data from server
      await axios.get('/api/loginapi', {
        params: { username, password },
      });
      setUserLoggedIn(username)
      // Clear the form
      

      // Do something after successful submission
      // e.g., redirect to a different page
      if (response.data.message === 'Success') {
        // Clear the form
        ;
        setUsername('');
        setPassword('');
        console.log(isLoggedIn);
        router.push('/');
        // Do something after successful login
        // e.g., redirect to a different page
      } else {
        setUsername('');
        setPassword('');
        // Handle unsuccessful login
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
};

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
              }}
            >
              <div style={{ marginTop: 100 }}>
                <form onSubmit={handleSubmit}>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <IconBox icon={BadgeIcon}></IconBox>
                    <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "43px",
                        width: "310px",
                      }}
                    />
                  </div>
                  <div style={{ position: "relative", marginBottom: 14 }}>
                    <IconBox icon={VpnKeyIcon}></IconBox>
                    <TextField
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: "43px",
                      width: "310px",
                    }}
                  />
                  </div>

                  <Button
                    type="submit"
                    variant="contained"
                    sx={{ mr: 2, width: "167px" }}
                  >
                    Submit
                  </Button>
                  <Button variant="contained" sx={{ width: "167px" }}>
                    <Link
                      style={{ color: "#F6F6F6", textDecoration: "none" }}
                      href={"/signup"}
                    >
                      Sign Up
                    </Link>
                  </Button>
                </form>
                <Divider sx={{ width: "350px", mt:6, fontSize:17,color: "#AFAFAF"}} >or</Divider>
                
                <Button variant="contained" sx={{ width: "350px", mt: 6 }}>
                  Sign in with Google
                </Button>
                <Typography sx={{ fontSize: 12, mt: 2, color: "#AFAFAF" }}>
                  Image Credit: Todd Jiang 
                </Typography>
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
              />
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default LoginForm;