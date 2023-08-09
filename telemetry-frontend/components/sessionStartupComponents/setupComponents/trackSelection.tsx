import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import { itemData } from "../../../data/imageData";
import { GridRowId } from "@mui/x-data-grid";
import splitAndCapitalise from "../../../utils/splitAndCapitalise";

interface TrackSelectionProps {
  onSelectTrack: (track: string) => void;
  onExit: () => void; 
}

const TrackSelection = ({ onSelectTrack,onExit}: TrackSelectionProps) => {

  const handleClick = (item: { img: string; title: string }) => {
    onSelectTrack(item.title);
  };
  
  const handleImageClick = (item: { img: string; title: string }) => {
    return () => {
      handleClick(item);
    };
  };
  const handleExit=()=>{
    onExit();
  }

  return (
    <Box  sx={{ width: '100%', height: '700px', overflow: 'auto' }}>
      <Button className="parallelogram-buttonCTA-XLG" ><Box style={{ color: '#F6F6F6', textDecoration: 'none',fontFamily:'Satoshi' }}onClick={handleExit} >EXIT</Box></Button>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={2} gap={10} rowHeight={250}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <div className="text-container">{splitAndCapitalise(item.title)}</div>
            <div className="image-container">
              <Image
                src={item.img}
                alt={item.title}
                loading="lazy"
                width="400"
                height="250"
                onClick={handleImageClick(item)}
              />
            </div>
          </ImageListItem>
        ))}
      </ImageList>
      <style jsx>{`
        .image-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 100%;
          overflow: hidden;
          margin-top: 0px;
          background-color: black; /* Set background color to red */
          border-radius: 0px 0px 10px 10px; /* Rounded bottom corners */
          box-sizing: border-box;
          border: 1px solid transparent;
        }

        .image-container:hover {
          background-color:rgba(251, 149, 54, 0.85);
        }
        .text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 30px;
          overflow: hidden;
          margin-top: 0px;
          background-color: rgba(8, 13, 56, 0.5);
  border: 1px solid transparent;
  border-radius: 10px 10px 0px 0px; 
          box-sizing: border-box;
          color:white;
        }
      `}</style>
    </Box>
  );
};

export default TrackSelection;
