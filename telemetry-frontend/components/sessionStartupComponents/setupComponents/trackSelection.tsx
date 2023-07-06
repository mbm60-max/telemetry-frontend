import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";
import { itemData } from "../../../data/imageData";

interface TrackSelectionProps {
  onSelectTrack: (track: string) => void;
}

const TrackSelection = ({ onSelectTrack }: TrackSelectionProps) => {

  const handleClick = (item: { img: string; title: string }) => {
    onSelectTrack(item.title);
  };
  
  const handleImageClick = (item: { img: string; title: string }) => {
    return () => {
      handleClick(item);
    };
  };

  return (
    <Box sx={{ width: '100%', height: '700px', overflow: 'auto' }}>
      <ImageList sx={{ width: '100%', height: '100%' }} cols={3} gap={10} rowHeight={250}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <div className="text-container">{item.title}</div>
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
          border: 3px solid grey;
          border-radius: 0px;
          box-sizing: border-box;
        }

        .image-container:hover {
          border: 3px solid red;
          background-color:green;
        }
        .text-container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 50px;
          overflow: hidden;
          margin-top: 0px;
          background-color: grey; /* Set background color to red */
          border: 1px solid grey;
          border-radius: 0px;
          box-sizing: border-box;
        }
      `}</style>
    </Box>
  );
};

export default TrackSelection;
