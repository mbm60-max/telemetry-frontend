import React from 'react';

interface ImageBoxProps{
  imageSrc:string
  Width:string
  Height:string
  MarginRight:string
  MarginLeft:string
  MarginTop:string
  objectFit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down';
}
const ImageBox = ({imageSrc,Width,Height,MarginRight,MarginLeft,MarginTop,objectFit}:ImageBoxProps) => {
  return (
    <div style={{ width: Width, height: Height, backgroundColor: '#847E7E', padding: '0px',marginRight: MarginRight,marginLeft: MarginLeft ,marginTop: MarginTop}}>
      <img src={imageSrc} alt="Image" style={{ width: '100%', height: '100%',objectFit}} />
    </div>
  );
};

export default ImageBox;
