import React, { useState } from "react";
import axios, { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { TextField, Button, Typography, styled } from "@mui/material";
import Link from "next/link";
import "../pagesCss/signup.css";
import Grid from "@mui/material/Grid";
import ImageBox from "../components/homepageTrack";
import IconBox from "../components/iconBox";
import BadgeIcon from "@mui/icons-material/Badge";
import Divider from "@mui/material/Divider";
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import SettingsObject from "../interfaces/defaultSettingsInterface";
import validatePassword from "../utils/validatePassword";

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
  const router = useRouter();

  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "grey", // You can change the color to any valid CSS color value
  width:'99%',
  }));
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
      await axios.post("/api/registerapi", { username, email, password });
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
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <IconBox icon={BadgeIcon}></IconBox>
                    <TextField
                      label="Username"
                      variant="outlined"
                      value={username}
                      onChange={handleUsernameChange}
                      error={Boolean(usernameError)}
                      helperText={usernameError}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "43px",
                        width: "310px",
                      }}
                    />
                  </div>
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <IconBox icon={VpnKeyIcon}></IconBox>
                    <TextField
                      label="Email"
                      variant="outlined"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      error={Boolean(emailError)}
                      helperText={emailError}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "43px",
                        width: "310px",
                      }}
                    />
                  </div>
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <IconBox icon={VpnKeyIcon}></IconBox>
                    <TextField
                      label="Password"
                      variant="outlined"
                      type="password"
                      value={password}
                      onChange={handlePasswordChange}
                      error={Boolean(passwordError)}
                      helperText={passwordError}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "43px",
                        width: "310px",
                      }}
                    />
                  </div>
                  <div style={{ position: "relative", marginBottom: 24 }}>
                    <IconBox icon={VpnKeyIcon}></IconBox>
                    <TextField
                      label="Confirm Password"
                      variant="outlined"
                      type="confirm password"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      error={Boolean(confirmPasswordError)}
                      helperText={confirmPasswordError}
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: "43px",
                        width: "310px",
                      }}
                    />
                  </div>
                  <Grid
            container
            rowSpacing={2}
          > <Grid item xs={12} ><StyledHorizontalDivider/></Grid><Grid item xs={12} ><div style={{ position: "relative" }}>
          <IconBox icon={VpnKeyIcon}></IconBox>
          <TextField
            label="IP Address"
            variant="outlined"
            type="IP Address"
            value={IPAddress}
            onChange={handleIPChange}
            error={Boolean(ipAddressError)}
            helperText={ipAddressError}
            sx={{
              position: "absolute",
              top: 0,
              left: "43px",
              width: "310px",
            }}
          />
        </div></Grid><Grid item xs={12} ><StyledHorizontalDivider/></Grid><Grid item xs={12} ><Button
          type="submit"
          variant="contained"
          sx={{ mr: 2, width: "167px" }}
        >
          Submit
        </Button>
        <Button variant="contained" sx={{ width: "167px" }}>
          <Link
            style={{ color: "#F6F6F6", textDecoration: "none" }}
            href={"/login"}
          >
            Login
          </Link>
        </Button></Grid></Grid>
                  
                  
                </form>
                <Typography sx={{ fontSize: 12, mt: 2, color: "#AFAFAF" }}>
                  Image Credit: Max Böttinger
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
                imageSrc="/images/Coffee.jpg"
                borderRadius={0} hasOverlay={false}                ><></></ImageBox>
            </Grid>
          </Grid>{" "}
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
