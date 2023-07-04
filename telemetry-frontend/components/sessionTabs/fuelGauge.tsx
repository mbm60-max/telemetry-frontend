import React from 'react';

interface FuelGaugeProps {
  gasLevel: number;
  gasCapacity: number;
  targetSrc:string;
}

const FuelGauge = ({ gasLevel, gasCapacity, targetSrc }: FuelGaugeProps) => {
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
      <img src={targetSrc} alt="Fuel" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      <img
        src={"/images/fuelMark.svg"}
        alt="Fuel Mark"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: `translate(-60%, -63%) rotate(${rotationDegrees}deg)`,
          transformOrigin: 'center',
          width: '75%',
          height: '75%',
          objectFit: 'cover',
          zIndex: 1,
          //border: '2px solid red', // Add a red border around the center point
          //borderRadius: '50%', 
        
        }}
      />
    </div>
  );
};

export default FuelGauge;


