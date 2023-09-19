import React from 'react';
import { SettingsContext } from './authProviderSettings';

interface ImageBoxProps{
  imageSrc:string
  Width:string
  Height:string
  MarginRight:string|number
  MarginLeft:string|number
  MarginTop:string|number
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  borderRadius:number|string;
  children:React.ReactNode;
  hasOverlay:boolean;
}
const ImageBox = ({imageSrc,Width,Height,MarginRight,MarginLeft,MarginTop,objectFit,borderRadius,children,hasOverlay}:ImageBoxProps) => {
  const {appearance} = React.useContext(SettingsContext);
  return (
    <div style={{ position: 'relative', width: Width, height: Height, backgroundColor: 'rgba(8, 13, 56, 0)', padding: '0px', marginRight: MarginRight, marginLeft: MarginLeft, marginTop: MarginTop }}>
    <img src={imageSrc} alt="Image" style={{ width: '100%', height: '100%', objectFit, borderRadius: borderRadius
   }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',zIndex:10}}>{children}</div>
    {hasOverlay&&<div
        style={{
          position: 'absolute',
          content: "''", // The ::before pseudo-element content
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: appearance.lightModeEnabled ? 'linear-gradient(rgba(255, 255, 255, 0.75), rgba(255, 255, 255, 0))' :'linear-gradient(rgba(4, 11, 48, 0.9), rgba(4, 11, 48, 0.4))',
          pointerEvents: 'none',
          backgroundSize: '100% 100%',
          borderRadius: borderRadius // Adjust the background-size to control the gradient's starting point
        }}
      ></div>}
  </div>
  );
};

export default ImageBox;
