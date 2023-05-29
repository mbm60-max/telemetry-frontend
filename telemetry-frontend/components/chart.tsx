import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const DynamicChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartWrapper = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div id="chart">
      {isClient && (
        <DynamicChartComponent />
      )}
    </div>
  );
};

const DynamicChartComponent = () => {
  const options = {
    chart: {
      type: 'line' as 'line',
    },
    series: [{
      name: 'sales',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
    }],
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
    },
  };

  return (
    <DynamicChart options={options} series={options.series} type="line" height={350} />
  );
};

export default ChartWrapper;
