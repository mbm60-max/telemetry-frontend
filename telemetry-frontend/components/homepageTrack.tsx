import React from 'react';

interface ImageBoxProps{
  imageSrc:string
  Width:string
  Height:string
  MarginRight:string
  MarginLeft:string
  MarginTop:string
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
  borderRadius:number;
  children:React.ReactNode;
}
const ImageBox = ({imageSrc,Width,Height,MarginRight,MarginLeft,MarginTop,objectFit,borderRadius,children}:ImageBoxProps) => {
  return (
    <div style={{ position: 'relative', width: Width, height: Height, backgroundColor: 'rgba(8, 13, 56, 0)', padding: '0px', marginRight: MarginRight, marginLeft: MarginLeft, marginTop: MarginTop }}>
    <img src={imageSrc} alt="Image" style={{ width: '100%', height: '100%', objectFit, borderRadius: borderRadius }} />
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>{children}</div>
  </div>
  );
};

export default ImageBox;
