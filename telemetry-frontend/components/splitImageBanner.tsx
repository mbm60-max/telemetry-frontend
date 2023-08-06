import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import { JsxElement } from "typescript";
import ImageBox from '../components/homepageTrack';
interface SplitImageBannerProps{
  children:React.ReactNode;
}
const SplitImageBanner = ({children}:SplitImageBannerProps) => {
    return (
      <ImageBox imageSrc={""} Width={"500px"} Height={"500px"} MarginRight={""} MarginLeft={""} MarginTop={""}  objectFit={"cover"}/>
    );
  };
export default SplitImageBanner