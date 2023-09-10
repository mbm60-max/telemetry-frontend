import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import ImageBox from '../components/homepageTrack';
interface SplitImageBannerProps{
  children:React.ReactNode;
  imageSrc:string;
  hasOverlay:boolean;
  minWidth:string;
  minHeight:string;
}
const SplitImageBanner = ({children,imageSrc,hasOverlay,minWidth,minHeight}:SplitImageBannerProps) => {
    return (
        <Box sx={{width:'100%', display:'flex',justifyContent:'center'}}>
            <Grid container spacing={0} sx={{minWidth:minWidth,minHeight:minHeight}}>
                <Grid item xs={12}><ImageBox imageSrc={imageSrc} Width={"100%"} Height={"100%"} MarginRight={""} MarginLeft={""} MarginTop={""} objectFit={"cover"} borderRadius={100} hasOverlay={hasOverlay} >{children}</ImageBox></Grid>
                </Grid></Box>
    );
  };
export default SplitImageBanner