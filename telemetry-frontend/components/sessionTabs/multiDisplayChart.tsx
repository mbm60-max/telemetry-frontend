import React, { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from "apexcharts";
import { noSSR } from 'next/dynamic';
import { Box } from "@mui/material";

const DynamicChart = dynamic(() => import('react-apexcharts'), { 
  loader: () => import('react-apexcharts'),
  ssr: false 
});

interface MultiDisplayChartProps {
  label: string;
  expectedMinValue: number;
  expectedMaxValue: number;
  dataStream1: { x: number; y: number; }[];
  dataStream2: { x: number; y: number; }[];
  dataStream3: { x: number; y: number; }[];
  dataStream4: { x: number; y: number; }[];
  height:number;
}

export default function MultiDisplayChart({ label, expectedMaxValue, expectedMinValue, dataStream1,dataStream2,dataStream3,dataStream4,height }: MultiDisplayChartProps) {
  const series = [{
    name: 'FL'+label,
    data: dataStream1
  },{
    name: 'FR'+label,
    data: dataStream2
  },{
    name: 'RL'+label,
    data: dataStream3
  },{
    name: 'RR'+label,
    data: dataStream4
  }];

  const basicYAxis =[{
    min: expectedMinValue,
    max: expectedMaxValue,
    labels: {
      style: {
        colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
      }
    }
  }]
  const extraStreamOne = [
    {
      min: expectedMinValue,
      max: expectedMaxValue,
      labels: {
        show: false // Hide the data values
      }
    },
  ];
  const options: ApexOptions = {
    chart: {
      id: 'realtime',
      type: 'line',
      animations: {
        enabled: true,
        easing: 'linear',
        dynamicAnimation: {
          speed: 100
        }
      },
      toolbar: {
        show: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: ['straight','straight','straight','straight']
    },
    title: {
      text: label || 'No label provided',
      align: 'left',
      style: {
        color: '#F6F6F6' // Set the font color to blue
      }
    },
    markers: {
      size: 0
    },
    xaxis: {
      range: 30,
      type: 'numeric',
      tickAmount: 'dataPoints',
      tickPlacement: 'on',
      labels: {
        style: {
          colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
        }
      }
    },
    yaxis: [...basicYAxis,...extraStreamOne]
  };
  

  return (
    <>
    <Box sx={{ backgroundColor: 'black' }}>
      <Box sx={{ p: 1 }}>
        <DynamicChart series={series} options={options} height={height} label={label} />
      </Box>
    </Box>
    </>
  );
}