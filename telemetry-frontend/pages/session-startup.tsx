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
import QuickFilteringGrid from '../components/carSelectionTable/carSelectionTable';
const SessionStartup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { isLoggedIn,setUserLoggedIn} = useContext(AuthContext);
  const [selectedCar, setSelectedBrand] = useState('');
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  

    try {
      
    } catch (error) {
      console.error('Error submitting form:', error);
    }
};
const handleBrandSelection = (brand: string) => {
  setSelectedBrand(brand);
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
        <div style={{justifyContent: "center",
        display: "flex",
        backgroundColor: "#F6F6F6",
        height: "610px",width:600}}>
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
                
                <QuickFilteringGrid onSelectCar={handleBrandSelection}></QuickFilteringGrid>
                <div>{selectedCar}</div>
              </div>
        </div>
      </div>
    </>
  );
};

export default SessionStartup;