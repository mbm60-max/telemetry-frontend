import React, { useState } from 'react';
import './liveTrack.css';

interface TestProps {
  targetSrc: string;
  trackName: string;
  testOffset:number;
}

const Test = ({ targetSrc, trackName,testOffset }: TestProps) => {

  const handleOffsetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newOffset = Number(e.target.value);
    document.documentElement.style.setProperty('--offset', `${newOffset}%`);
  };

  const carStyle = {
    offsetDistance: `${testOffset}%`,
  };

  const getCarClass = () => `car car-${trackName}`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={targetSrc} alt="Fuel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 215 347"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-49%, -56%)',
          transformOrigin: 'center',
          width: '50%',
          height: '84%',
          objectFit: 'cover',
          zIndex: 1,
        }}
      >
        <g className="path" fill="none" stroke="#fff" strokeWidth="2">
          <path id="car-path" d={getPathByTrackName(trackName)} stroke="#FF0707" />
        </g>
        <g className={getCarClass()} style={carStyle}>
        <circle cx="11" cy="11" r="11" fill="#DA2E22"/>
        </g>
      </svg>

      
    </div>
  );
};

const getPathByTrackName = (trackName: string) => {
  switch (trackName) {
    case 'spa':
      return 'M79 16.5L48 1.5L89 71.5V86.5L83 91.5V106.5L89 125L96.5 159.5L101.5 186L89 215L67.5 233L48 242.5L26 256L7.5 279.5L1 304.5L10 317L26 322H35.5L48 304.5L53 296L64 291L79 296L89 291L96.5 273.5L109 242.5L120 227.5H148.5L159.5 236.5L164.5 273.5L174.5 304.5V317L152 334V342.5L159.5 345.5L208.5 310.5L203 291L208.5 283.5L214 273.5L174.5 141L148.5 100.5L143 80.5L131 71.5L79 16.5Z';
    case 'legunaSeca':
      return 'M0.5 129.5V184L13 191.5L20.5 184V173L16 156.5L20.5 135V116.5H34L60 124.5L93.5 129.5L101 143V191.5L93.5 230.5L84.5 263.5L101 271H116.5L193 258L205 248L213 230.5V209V184V160.5V143L218.5 124.5V114H205V101V73.5L198.5 59L185 50.5L165 59L144 66.5H123L116.5 59L84.5 0.5H79L29.5 66.5L13 95.5L0.5 129.5Z';
    default:
      return '';
  }
};

export default Test;
