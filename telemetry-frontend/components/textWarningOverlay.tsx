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
  textColour:string,
  textSize:number,
  fontFamily:string,
  fontWeight:string,
}

const TextWarningOverlay = ({
  height,
  width,
  icon: IconComponent,
  color,
  headerText,
  text,
  colorLight,
  textColour,
  textSize,
  fontFamily,
  fontWeight,
}: CustomBoxProps) => {
  return (
    <Box
      sx={{
        border: "1px solid black",
        borderRadius: 1.5,
        boxShadow: "0px 0px 9px rgba(0, 0, 0, 0.5)",
        height:"100%",
       
      }}
    >
      <Grid container spacing={0}>
        <Grid item xs={1}>
          <div
            style={{
              background: color,
              width: "100%",
              height: "100%",
             minHeight:'200px',
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
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
                minHeight:'200px',
                padding:2
              }}
            >
          <Grid container spacing={2}>
           
              <Grid item xs={1}>
                <IconComponent
                 sx={{mt:1,color:textColour,fontSize:textSize}} 
                />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="h5" sx={{ flex: 1,mt:1,color:textColour }} fontSize={textSize} fontFamily={fontFamily} fontWeight={fontWeight}>
                  {headerText} <Typography variant="body1" sx={{fontSize:(textSize-10)}}>{text}</Typography>
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
