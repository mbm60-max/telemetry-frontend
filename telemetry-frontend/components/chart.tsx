import React, { useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from "apexcharts";
import SignalRService from '../utils/signalrEndpoint';
import StopButton from '../components/stopButton';
import ExtendedPacket from "../interfaces/extendedPacketInterface";
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
  targetAttribute: string;
  signalrservice: SignalRService;
}

export default function BasicChart({ label, expectedMaxValue, expectedMinValue, targetAttribute, signalrservice }: BasicChartProps) {
 // const signalRService = new SignalRService();

  const [dataStream, setDataStream] = useState([{ x: 0, y: 0 }]);
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
        show: true
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'smooth'
    },
    title: {
      text: label || 'No label provided',
      align: 'left',
      style: {
        color: '#F6F6F6' // Set the font color to blue
      }
    },
    markers: {
      size: 2
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
    yaxis: {
      min: expectedMinValue,
      max: expectedMaxValue,
      labels: {
        style: {
          colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
        }
      }
    }
  };

    function handlePacket(receivedExtendedPacket: ExtendedPacket) {
      //console.log('Received FullPacketMessage:', receivedExtendedPacket);
      //console.log(JSON.stringify(receivedExtendedPacket, null, 2));
      var jsonString = JSON.stringify(receivedExtendedPacket);
      var parsedObject = JSON.parse(jsonString);
      var attributeValue = parsedObject[targetAttribute];
      //console.log(attributeValue);
      
      if (attributeValue !== undefined && typeof attributeValue === "number") {
        appendData(attributeValue); // Update the throttle value
      }
    };
    useEffect(() => {
    signalrservice.setHandleFullPacket(handlePacket);

    return () => {
      signalrservice.removeHandleFullPacket();
    };
  }, []);

  const appendData = (dataPoint: number) => {
    setDataStream(oldArray => {
      const prev = oldArray[oldArray.length - 1];
      const newArray = [...oldArray, { x: prev.x + 1, y: dataPoint }];
      if (newArray.length > 30) {
        return newArray.slice(1);
      }
      return newArray;
    });
  };

  return (
    <>
    <Box sx={{ backgroundColor: 'black' }}>
      <Box sx={{ p: 1 }}>
        <DynamicChart series={series} options={options} height={250} label={label} />
        <StopButton signalRService={signalrservice} />
      </Box>
    </Box>
    </>
  );
}
