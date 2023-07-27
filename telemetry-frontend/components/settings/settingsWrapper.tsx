import { Button, Divider, Grid, styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import SettingsController from "./settingsFieldSelection";
import SettingsTitle from "./settingsTitle";
interface SettingsWrapperProps {}
const SettingsWrapper = ({}: SettingsWrapperProps) => {
  const StyledVerticalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "2px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    height: "100%",
  }));
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: "95vh",
          width: "95vw",
          display: "flex",
          backgroundColor: "#D8DDF5",
          borderRadius: 10,
        }}
      >
        <Grid container spacing={0}>
          <Grid item xs={5.5}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <SettingsTitle title={"Settings"} fontSize={30} />
              </Grid>
              <Grid item xs={12}>
                <Box
                  sx={{
                    height: "50vh",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <SettingsController
                    onClick={function (field: string): void {
                      throw new Error("Function not implemented.");
                    }}
                  />
                </Box>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={1}
            sx={{
              justifyContent: "center",
              display: "flex",
              height: "94.2vh",
            }}
          >
            <StyledVerticalDivider orientation="vertical" />
          </Grid>

          <Grid item xs={5.5}>
            <Grid container spacing={0} direction="row">
              <Grid item xs={12}>
                <SettingsTitle title={"Account Settings"} fontSize={30} />
              </Grid>
              <Button variant="contained" disabled>
                Change Username
              </Button>
              <Button variant="contained" disabled>
                Change Password
              </Button>
              <Button variant="contained" disabled>
                Light Mode vs Dark Mode
              </Button>
              <Button variant="contained" disabled>
                Delete Account
              </Button>
              <Button variant="contained" disabled>
                Reset Account Data
              </Button>
              <Button variant="contained" disabled>
                Opt ouf of lap data pusing
              </Button>
              <Button variant="contained" disabled>
                Alter review lap limit 10-100
              </Button>
              <Button variant="contained" disabled>
                set defualt units imperial vs metric
              </Button>
              <Button variant="contained" disabled>
                opt in to ml and stategy
              </Button>
              <Button variant="contained" disabled>
                Alter Default IP
              </Button>
              <Button variant="contained" disabled>
                Alter Default warnings
              </Button>
              <Button variant="contained" disabled>
                Alter warning interval
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default SettingsWrapper;
