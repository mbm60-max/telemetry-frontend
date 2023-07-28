import { Button, Divider, Grid, styled } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React, { useState } from "react";
import { JsxElement } from "typescript";
import SettingsDisplay from "./settingsDisplay";
import SettingsController from "./settingsFieldSelection";
import SettingsTitle from "./settingsTitle";
interface SettingsWrapperProps {}
const SettingsWrapper = ({}: SettingsWrapperProps) => {
  const StyledVerticalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "2px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    height: "100%",
  }));
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "2px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
  width:'90%',
  }));
  const [field, setField] = useState("");
  const handleFieldSelection = (field: string) => {
    setField(field);
  };
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
                  <SettingsController onClick={handleFieldSelection} />
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
                <Grid container spacing={0} direction="row">
                  <Grid item xs={12}>
                    <SettingsTitle title={field+" "+"Settings"} fontSize={30} />
                  </Grid>
                  <Grid item xs={12}>
                  <StyledHorizontalDivider />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <SettingsDisplay field={field} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};
export default SettingsWrapper;
