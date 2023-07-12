import React, { useCallback, useEffect, useState } from "react";
import dynamic from 'next/dynamic';
import ApexCharts, { ApexOptions } from "apexcharts";
import SignalRService from '../../utils/signalrEndpoint';
import StopButton from '../bin/stopButton';
import ExtendedPacket from "../../interfaces/extendedPacketInterface";
import { noSSR } from 'next/dynamic';
import { Box } from "@mui/material";

const DynamicReviewChart = dynamic(() => import('react-apexcharts'), { 
  loader: () => import('react-apexcharts'),
  ssr: false 
});

interface ReviewChartProps {
  label?: string;
  expectedMinValue: number;
  expectedMaxValue: number;
  expectedMinValueTwo: number;
  expectedMaxValueTwo: number;
  seriesOneLapOne: number[];
  seriesTwoLapOne: number[];
  seriesOneLapTwo: number[];
  seriesTwoLapTwo: number[];
  height?:number
  numberOfStreams:number;
  curves:string[];
  leftLabel:string;
  rightLabel:string;
  numberOfLaps:number;
  stream1IsSpecial:boolean;
  stream2IsSpecial:boolean;
}

export default function ReviewChart({ label, expectedMaxValue, expectedMinValue, height, expectedMaxValueTwo, expectedMinValueTwo, seriesOneLapOne, seriesTwoLapOne,seriesOneLapTwo, seriesTwoLapTwo, numberOfStreams,curves, leftLabel,rightLabel,numberOfLaps,stream1IsSpecial,stream2IsSpecial }: ReviewChartProps) {
    const [series, setSeries] = useState<any[]>([]);
    const curveMap: Record<string, 'smooth' | 'straight' | 'stepline'> = {
  straight: 'straight',
  stepline: 'stepline',
  smooth:'smooth',
};

const flattenArray = (array: string[]): string[] => {
  const flattenedArray: string[] = [];
  for (const item of array) {
    if (item && typeof item === 'string') {
      if(item.charAt(0)=='['){
        const innerArray = item.slice(1, -1).split(',');
        flattenedArray.push(...innerArray);
      }else{
        flattenedArray.push(item);
      }
    }
  }
  return flattenedArray;
};



    const [options, setOptions] = useState<ApexOptions>({
      chart: {
        type: 'line',
        toolbar: {
          show: true
        }
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
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
        range: 10,
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
        min: 0,
        max: 10,
        labels: {
          style: {
            colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
          }
        }
      },colors: [  '#FF0000',  '#00FF00',  '#0000FF',  '#FFFF00',  '#FF00FF',  '#00FFFF',  '#FFA500',  '#800080',  '#008000',  '#FF4500',  '#FFC0CB',  '#A52A2A',  '#00CED1',  '#FFD700',  '#800000',  '#008080'],
    });
  
    useEffect(() => {
      const yaxis2Streams = [
        {
          seriesName: 'Column A',
          min: expectedMinValue,
          max: expectedMaxValue,
          axisTicks: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          axisBorder: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          title: {
            text: leftLabel,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          }
        },
        {
          opposite: true,
          seriesName: 'Column B',
          min: expectedMinValueTwo,
          max: expectedMaxValueTwo,
          axisTicks: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          axisBorder: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          title: {
            text: rightLabel,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          }
        }
      ]
      const yaxis1Stream = [
        {
          seriesName: 'Column A',
          min: expectedMinValue,
          max: expectedMaxValue,
          axisTicks: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          axisBorder: {
            show: true,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          },
          title: {
            text: leftLabel,
            style: {
                color: '#F6F6F6' // Set the font color to blue
              }
          }
        },
        
      ]
      if(!stream1IsSpecial && !stream2IsSpecial){
      if ((numberOfStreams === 1)&& numberOfLaps === 1) {
        setSeries([
          {
            name: leftLabel,
            data: seriesOneLapOne
          }
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1Stream,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
        }));
      } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
        setSeries([
          {
            name: leftLabel,
            data: seriesOneLapOne,
            
          },
          {
            name: rightLabel,
            data: seriesTwoLapOne
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
        }));
      }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: seriesOneLapOne,
            
          },
          {
            name: 'Lap 1'+rightLabel,
            data: seriesTwoLapOne
          },
          {
            name: 'Lap 2'+leftLabel,
            data: seriesOneLapTwo,
            
          },
          {
            name: 'Lap 2'+rightLabel,
            data: seriesTwoLapTwo
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
        }));
      }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: seriesOneLapOne,
            
          },
          {
            name: 'Lap 2'+leftLabel,
            data: seriesOneLapTwo,
            
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1Stream,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
        }));
      }}//will not work if the tyre temps are 1 value so be careful
      else if((stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")&&(typeof seriesOneLapOne[1] == "object")&&(typeof seriesOneLapOne[2] == "object")&&(typeof seriesOneLapOne[3] == "object")){
       // console.log(seriesOneLapOne[1])
        //console.log(seriesOneLapOne[2])
        //console.log(seriesOneLapOne[3])
       // console.log(flattenArray(curves).map((curve: string) => curveMap[curve]))
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          console.log(typeof seriesOneLapOne[0])
        console.log(numberOfStreams)
        console.log(numberOfLaps)
        console.log(leftLabel)
        console.log(seriesOneLapOne)
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel,
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel,
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel,
              data: seriesOneLapOne[3]
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel,
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel,
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel,
              data: seriesOneLapOne[3]
            },
            {
              name: rightLabel,
              data: seriesTwoLapOne
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel + "Lap 1",
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel + "Lap 1",
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel + "Lap 1",
              data: seriesOneLapOne[3]
            },
            {
              name: rightLabel + "Lap 1",
              data: seriesTwoLapOne
            },
            {
              name: "FL"+leftLabel + "Lap 2",
              data: seriesOneLapTwo[0]
            },
            {
              name: "FR"+leftLabel + "Lap 2",
              data: seriesOneLapTwo[1]
            },
            {
              name: "RL"+leftLabel+ "Lap 2",
              data: seriesOneLapTwo[2]
            },
            {
              name: "RR"+leftLabel+ "Lap 2",
              data: seriesOneLapTwo[3]
            },
            {
              name: rightLabel+ "Lap 2",
              data: seriesTwoLapTwo
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel + "Lap 1",
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel + "Lap 1",
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel + "Lap 1",
              data: seriesOneLapOne[3]
            },
            {
              name: "FL"+leftLabel + "Lap 2",
              data: seriesOneLapTwo[0]
            },
            {
              name: "FR"+leftLabel + "Lap 2",
              data: seriesOneLapTwo[1]
            },
            {
              name: "RL"+leftLabel+ "Lap 2",
              data: seriesOneLapTwo[2]
            },
            {
              name: "RR"+leftLabel+ "Lap 2",
              data: seriesOneLapTwo[3]
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }
      }else if (!stream1IsSpecial && stream2IsSpecial){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: leftLabel,
              data: seriesOneLapOne
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
          setSeries([
            {
              name: leftLabel,
              data: seriesTwoLapOne
            },
            {
              name: "FL"+rightLabel,
              data: seriesTwoLapOne[0]
            },
            {
              name: "FR"+rightLabel,
              data: seriesTwoLapOne[1]
            },
            {
              name: "RL"+rightLabel,
              data: seriesTwoLapOne[2]
            },
            {
              name: "RR"+rightLabel,
              data: seriesTwoLapOne[3]
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
          setSeries([
            {
              name: leftLabel + "Lap 1",
              data: seriesTwoLapOne
            },
            {
              name: "FL"+rightLabel+ "Lap 1",
              data: seriesTwoLapOne[0]
            },
            {
              name: "FR"+rightLabel+ "Lap 1",
              data: seriesTwoLapOne[1]
            },
            {
              name: "RL"+rightLabel+ "Lap 1",
              data: seriesTwoLapOne[2]
            },
            {
              name: "RR"+rightLabel+ "Lap 1",
              data: seriesTwoLapOne[3]
            },
            {
              name: leftLabel+ "Lap 2",
              data: seriesTwoLapTwo
            },
            {
              name: "FL"+rightLabel+ "Lap 2",
              data: seriesTwoLapTwo[0]
            },
            {
              name: "FR"+rightLabel+ "Lap 2",
              data: seriesTwoLapTwo[1]
            },
            {
              name: "RL"+rightLabel+ "Lap 2",
              data: seriesTwoLapTwo[2]
            },
            {
              name: "RR"+rightLabel+ "Lap 2",
              data: seriesTwoLapTwo[3]
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
          setSeries([
            {
              name: 'Lap 1'+leftLabel,
              data: seriesOneLapOne,
              
            },
            {
              name: 'Lap 2'+leftLabel,
              data: seriesOneLapTwo,
              
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }
      }else if (stream1IsSpecial && stream2IsSpecial){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel,
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel,
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel,
              data: seriesOneLapOne[3]
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel,
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel,
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel,
              data: seriesOneLapOne[3]
            },
            {
              name: "FL"+rightLabel,
              data: seriesTwoLapOne[0]
            },
            {
              name: "FR"+rightLabel,
              data: seriesTwoLapOne[1]
            },
            {
              name: "RL"+rightLabel,
              data: seriesTwoLapOne[2]
            },
            {
              name: "RR"+rightLabel,
              data: seriesTwoLapOne[3]
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
          setSeries([
            {
              name: "FL"+leftLabel +"Lap 1",
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: seriesOneLapOne[3]
            },
            {
              name: "FL"+rightLabel +"Lap 1",
              data: seriesTwoLapOne[0]
            },
            {
              name: "FR"+rightLabel +"Lap 1",
              data: seriesTwoLapOne[1]
            },
            {
              name: "RL"+rightLabel +"Lap 1",
              data: seriesTwoLapOne[2]
            },
            {
              name: "RR"+rightLabel +"Lap 1",
              data: seriesTwoLapOne[3]
            },
            {
              name: "FL"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[0]
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[1]
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[2]
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[3]
            },
            {
              name: "FL"+rightLabel +"Lap 2",
              data: seriesTwoLapTwo[0]
            },
            {
              name: "FR"+rightLabel +"Lap 2",
              data: seriesTwoLapTwo[1]
            },
            {
              name: "RL"+rightLabel +"Lap 2",
              data: seriesTwoLapTwo[2]
            },
            {
              name: "RR"+rightLabel +"Lap 2",
              data: seriesTwoLapTwo[3]
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
          setSeries([
            {
              name: "FL"+leftLabel +"Lap 1",
              data: seriesOneLapOne[0]
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: seriesOneLapOne[1]
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: seriesOneLapOne[2]
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: seriesOneLapOne[3]
            },
            {
              name: "FL"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[0]
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[1]
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[2]
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: seriesOneLapTwo[3]
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1Stream,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }
      }
    }, [numberOfStreams, seriesOneLapOne, seriesTwoLapOne, expectedMinValue, expectedMaxValue, expectedMinValueTwo, expectedMaxValueTwo, leftLabel, rightLabel, stream1IsSpecial, stream2IsSpecial, numberOfLaps, curves, seriesOneLapTwo, seriesTwoLapTwo]);
  
    return (
      <>
        <Box sx={{ backgroundColor: 'black' }}>
          <Box sx={{ p: 1 }}>
            <DynamicReviewChart series={series} options={options} height={height} label={label} />
          </Box>
        </Box>
      </>
    );
  }