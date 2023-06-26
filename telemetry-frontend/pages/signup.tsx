import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { TextField, Button, Typography } from "@mui/material";
import Link from "next/link";
import "../pagesCss/signup.css";
import Grid from "@mui/material/Grid";
import ImageBox from "../components/homepageTrack";
import IconBox from "../components/iconBox";
import BadgeIcon from "@mui/icons-material/Badge";
import Divider from "@mui/material/Divider";

const SignUpForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Send the data to the server
      await axios.post("/api/registerapi", { username, password });

      // Clear the form
      setUsername("");
      setPassword("");

      // Redirect to the login page
      router.push("/login");
    } catch (error) {
      console.error("Error submitting form:", error);
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
                    <IconBox icon={BadgeIcon}></IconBox>
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
                      href={"/login"}
                    >
                      Login
                    </Link>
                  </Button>
                </form>
                <Divider sx={{ width: "350px", mt:6, fontSize:17}} >or</Divider>
                
                <Button variant="contained" sx={{ width: "350px", mt: 6 }}>
                  Sign in with Google
                </Button>
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
                imageSrc="/images/max-bottinger-0k_dCKxyIHc-unsplash.jpg"
              />
            </Grid>
          </Grid>{" "}
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
