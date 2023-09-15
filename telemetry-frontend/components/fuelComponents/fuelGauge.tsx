import React from 'react';

interface GaugeProps {
  gasLevel: number;
  gasCapacity: number;
  targetSrc:string;
}

const Gauge = ({ gasLevel, gasCapacity, targetSrc }: GaugeProps) => {
  function calculateFuelPercentage(gasLevel: number, gasCapacity: number) {
    const fuel =  Math.round((gasLevel / gasCapacity) * 100);
    if(isNaN(fuel)){
        return 0
    }
    else if (!isFinite(fuel)) {
        return 100;
      }
    return fuel
  }

  const fuelPercentage = calculateFuelPercentage(gasLevel, gasCapacity);
  console.log(fuelPercentage);
  const rotationDegrees = 273 + (fuelPercentage / 100) * 180;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
      <img src={targetSrc} alt="Fuel" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
      <img
        src={"/images/fuelMark.svg"}
        alt="Fuel Mark"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-60%, -63%) rotate(${rotationDegrees}deg)`,
          transformOrigin: 'center',
          width: '25vw',
          height: '75%',
          objectFit: 'contain',
          zIndex: 1,
          //border: '2px solid red', // Add a red border around the center point
          //borderRadius: '50%', 
        
        }}
      />
    </div>
  );
};

export default Gauge;


