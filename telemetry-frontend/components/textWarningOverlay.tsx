import React, { ReactNode } from "react";
import { Box, Grid, SvgIconTypeMap, Typography } from "@mui/material";
import { JsxElement } from "typescript";
import { OverridableComponent } from "@mui/material/OverridableComponent";

interface CustomBoxProps {
  height: number;
  width: number;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & { muiName: string; }
  color: string;
  colorLight: string;
  headerText: string;
  text: string;
}

const TextWarningOverlay = ({
  height,
  width,
  icon: IconComponent,
  color,
  headerText,
  text,
  colorLight,
}: CustomBoxProps) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",
        height:"100%"
      }}
    >
      <Grid container spacing={0}sx={{height:'100%'}}>
        <Grid item xs={1}>
          <div
            style={{
              background: color,
              width: "100%",
              height: "100%",
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              padding:0.1
            }}
          >
            
          </div>
        </Grid>
        <Grid item xs={11}sx={{height:'100%'}}>
        <Box
              sx={{
                background: colorLight,
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
                height:'100%',
                padding:2
              }}
            >
          <Grid container spacing={2}>
           
              <Grid item xs={1}>
                <IconComponent
                 sx={{mt:1}}
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h5" sx={{ flex: 1,mt:1 }}>
                  {headerText} <Typography variant="body1" sx={{fontSize:14}}>{text}</Typography>
                </Typography>
              </Grid>
          </Grid>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TextWarningOverlay;
