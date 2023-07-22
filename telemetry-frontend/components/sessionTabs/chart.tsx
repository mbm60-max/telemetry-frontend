import React, { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from "apexcharts";
import SignalRService from '../../utils/signalrEndpoint';
import StopButton from '../bin/stopButton';
import ExtendedPacket from "../../interfaces/extendedPacketInterface";
import { noSSR } from 'next/dynamic';
import { Box } from "@mui/material";

const DynamicChart = dynamic(() => import('react-apexcharts'), { 
  loader: () => import('react-apexcharts'),
  ssr: false 
});

interface BasicChartProps {
  label?: string;
  expectedMinValue: number;
  expectedMaxValue: number;
  dataStream: { x: number; y: number; }[];
  units:string;
  labelXaxis:string;
}

export default function BasicChart({ label, expectedMaxValue, expectedMinValue, dataStream,units,labelXaxis }: BasicChartProps) {

  const series = [{
    name: 'Throttle',
    data: dataStream
  }];

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
        show: false,
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
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
      },title: {
        text: labelXaxis,
        style: {
            color: '#F6F6F6' // Set the font color to blue
          }
      },
    },
    yaxis: {
      seriesName: 'Column A',
      min: expectedMinValue,
      max: expectedMaxValue,
      axisTicks: {
        show: true,
        color: '#F6F6F6', // Set the font color to blue
      },
      axisBorder: {
        show: true,
        color: '#F6F6F6', // Set the font color to blue
      },
      title: {
        text: label +" "+ units,
        style: {
            color: '#F6F6F6' // Set the font color to blue
          }
      },
      labels: {
        style: {
          colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
        }},
    },
  };

  return (
    <>
    <Box sx={{ backgroundColor: 'black' }}>
      <Box sx={{ p: 1 }}>
        <DynamicChart series={series} options={options} height={400} label={label} />
      </Box>
    </Box>
    </>
  );
}
//<StopButton signalRService={signalrservice} />