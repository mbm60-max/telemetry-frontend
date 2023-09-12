import React, { useState } from 'react';
import YouTube from 'react-youtube';
import Skeleton from '@mui/material/Skeleton';

interface YouTubePlayerComponentProps{
    videoId:string
}
const YouTubePlayerComponent = ({ videoId}:YouTubePlayerComponentProps) => {
  const [isReady, setIsReady] = useState(false);

    // Set up event handlers
    const onReady = (event: { target: any; }) => {
      // Access the player instance
      const player = event.target;
  
      // For example, you can automatically play the video
      //player.playVideo();
      console.log("fired")
      //setIsReady(true);
    };
  
    const onError = (error: any) => {
      console.error('YouTube Player Error:', error);
    };

    

    const containerStyle: React.CSSProperties = {
        width: '100%',
        minWidth: '300px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative', // Added relative positioning
      };
    
      const borderStyle: React.CSSProperties = {
        position: 'absolute',
        top: -5,
        left: -5,
        width: '100%',
        height: '100%',
        border: '5px solid white',
        borderRadius: '10px', // Adjust the border radius as needed
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        pointerEvents: 'none',
      };
  
      const innerStyle: React.CSSProperties = {
        
        width:'100%',
        minWidth:'300px',
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
      };
      return (
        <div style={containerStyle}>
        
          <YouTube
            videoId={videoId}
            onError={onError}
            onReady={onReady}
            style={innerStyle}
            opts={{
              width: '640', // Set your desired width
              height: '250', // Set your desired height
              playerVars: {
                allowfullscreen: 1, // Disable full-screen mode
                mute: 0,
                volume: 75,
                autoplay:0,
              },
            }}
          />
          <div style={borderStyle}></div>
          {isReady ? null : (
        // Render a skeleton component while the video is not ready
        <div style={borderStyle}>
          <Skeleton variant="rectangular" width={640} height={250} />
        </div>
      )}
        </div>
      );
  };
  
  export default YouTubePlayerComponent;