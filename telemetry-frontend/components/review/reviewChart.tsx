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
console.log(expectedMinValueTwo)
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
      const yaxis1LeftLabel = [
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
      const yaxis1RightLabel = [
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
      const yaxis2Streams = [...yaxis1LeftLabel,...yaxis1RightLabel]
      const extraStreamOne = [
        {
          min: expectedMinValue,
          max: expectedMaxValue,
          labels: {
            show: false // Hide the data values
          }
        },
      ];
      const extraStreamTwo = [
        {
          opposite: true,
          min: expectedMinValueTwo,
          max: expectedMaxValueTwo,
          labels: {
            show: false // Hide the data values
          }
        }
      ];
      const test = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne]
      const testExtended = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...yaxis1RightLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamTwo]
      const test2 = [...yaxis1LeftLabel,...yaxis1RightLabel,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo]
      const custom = [...yaxis1LeftLabel,...yaxis1RightLabel,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo,...extraStreamOne,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo]
      const left3right3 = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...yaxis1RightLabel,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo]
      const left7 = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne]
      const yaxis2StreamsSpecialFirst = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...yaxis1RightLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamOne,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo];
      const extra2Streams =[...extraStreamOne,...extraStreamTwo];
      const yaxis4Streams = [...yaxis2Streams,...extra2Streams];
      const yaxis5Streams = [];
      const yaxis8Streams = [];
      const yaxis10Streams = [];
      const yaxis16Streams = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...yaxis1RightLabel,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo,];
      if((!stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] != "object")&&(typeof seriesOneLapTwo[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")){
      if ((numberOfStreams === 1)&& numberOfLaps === 1) {
        setSeries([
          {
            name: leftLabel,
            data: seriesOneLapOne
          }
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
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
        console.log(seriesOneLapOne)
        console.log(seriesTwoLapOne)
        console.log(seriesOneLapTwo)
        console.log(seriesTwoLapTwo)
        console.log(flattenArray(curves).map((curve: string) => curveMap[curve]))
        console.log(expectedMaxValue)
        console.log(expectedMaxValueTwo)
        console.log(expectedMinValue)
        console.log(expectedMinValueTwo)
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
          yaxis: yaxis4Streams,
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
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
        }));
      }}
      else if((stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")){
        console.log("b")
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
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] != "object")) {
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
            yaxis: yaxis2StreamsSpecialFirst,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")&&(typeof seriesTwoLapTwo[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")){
          setSeries([
            {
              name: "FL"+leftLabel+ "Lap 1",
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
            yaxis: testExtended,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")){
          setSeries([
            {
              name: "FL"+leftLabel + "Lap 1",
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
            yaxis: test,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }
      }else if ((!stream1IsSpecial && stream2IsSpecial)&&(typeof seriesOneLapOne[0] != "object")){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: leftLabel,
              data: seriesOneLapOne
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] == "object")) {
          setSeries([
            {
              name: leftLabel,
              data: seriesOneLapOne
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
            yaxis: test2,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] != "object")&&(typeof seriesTwoLapTwo[0] == "object")&&(typeof seriesTwoLapOne[0] == "object")){
          setSeries([
            {
              name: leftLabel + "Lap 1",
              data: seriesOneLapOne
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
              data: seriesOneLapTwo
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
            yaxis: custom,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] != "object")){
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
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }
      }else if ((stream1IsSpecial && stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")){
        console.log("d")
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
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] == "object")) {
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
            yaxis: left3right3,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesTwoLapOne[0] == "object")&&(typeof seriesOneLapTwo[0] == "object")&&(typeof seriesTwoLapTwo[0] == "object")){
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
            yaxis: yaxis16Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")){
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
            yaxis: test,
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