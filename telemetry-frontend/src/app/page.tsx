'use client'
import React from 'react';
import DynamicChart from '../../components/chart';
import ThrottleMonitor from '../../components/output';

const Home = () => {
  return (
    <div>
      <h1>
        <DynamicChart />
        <ThrottleMonitor/>
      </h1>
    </div>
  );
};

export default Home;