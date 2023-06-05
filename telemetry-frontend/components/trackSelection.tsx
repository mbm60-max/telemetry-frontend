import { Button, Grid } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";
import React from "react";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Image from "next/image";

const trackSelection = () => {
    const itemData = [
        {
          img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
          title: 'Breakfast',
        },
        {
          img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
          title: 'Burger',
        },
        {
          img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
          title: 'Camera',
        },
        {
          img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
          title: 'Coffee',
        },
        {
          img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
          title: 'Hats',
        },
        {
          img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
          title: 'Honey',
        },
        {
          img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
          title: 'Basketball',
        },
        {
          img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
          title: 'Fern',
        },
        {
          img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
          title: 'Mushrooms',
        },
        {
          img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
          title: 'Tomato basil',
        },
        {
          img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
          title: 'Sea star',
        },
        {
          img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
          title: 'Bike',
        },
      ];
      const handleClick = (item: { img: string; title: string }) => {
        console.log(`${item.title} clicked!`);
      };
      const handleImageClick = (item: { img: string; title: string }) => {
        return () => {
          handleClick(item);
        };
      };
    return (
        <div style={{ width:'100%'}}>
        <ImageList sx={{ width: '100%', height: '100%'  }} cols={3}gap={10} rowHeight={150}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
            
            <div className="image-container">
              <Image
                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                alt={item.title}
                loading="lazy"
                width="370"
                height="170"
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
          margin-top: 10px;
         
          border: 3px solid black;
          border-radius: 2px;
          box-sizing: border-box;
        }

        .image-container:hover{
            border: 3px solid white;
        }
      `}</style>
      </div>
    );
  };
export default trackSelection;
