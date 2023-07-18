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
  label: string;
  expectedMinValue: number;
  expectedMaxValue: number;
  expectedMinValueTwo: number;
  expectedMaxValueTwo: number;
  seriesOneLapOne: number[];
  seriesTwoLapOne: number[];
  seriesOneLapTwo: number[];
  seriesTwoLapTwo: number[];
  height:number;
  numberOfStreams:number;
  curves:string[];
  leftLabel:string;
  rightLabel:string;
  numberOfLaps:number;
  stream1IsSpecial:boolean;
  stream2IsSpecial:boolean;
  XAxisData:number[];
  XAxisDataLap2:number[];
}

export default function ReviewChart({ label, expectedMaxValue, expectedMinValue, height, expectedMaxValueTwo, expectedMinValueTwo, seriesOneLapOne, seriesTwoLapOne,seriesOneLapTwo, seriesTwoLapTwo, numberOfStreams,curves, leftLabel,rightLabel,numberOfLaps,stream1IsSpecial,stream2IsSpecial,XAxisData,XAxisDataLap2 }: ReviewChartProps) {
    const [series, setSeries] = useState<any[]>([]);
    const [seriesLap2, setSeriesLap2] = useState<any[]>([]);
    const curveMap: Record<string, 'smooth' | 'straight' | 'stepline'> = {
  straight: 'straight',
  stepline: 'stepline',
  smooth:'smooth',
};
const [secondChartIsNeeded,setSecondChartIsNeeded] = useState(false);

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

const addLapDistanceSeriesToData = (dataStream: string | number | any[], InLapDistance:number[]) => {
  const data = [];
  const formattedLabels: string[] = [];
  let min =0;
  let max=0;
  console.log(dataStream)
  if (typeof dataStream === "object") {
    for(let i=0; i<InLapDistance.length; i++){
      data.push([InLapDistance[i], dataStream[i]]);
    }
  }
  return {data, formattedLabels, min, max};
};

const title = {
  text: label,
  style: {
    color: '#F6F6F6' // Set the font color to blue
  }
}

    const [options, setOptions] = useState<ApexOptions>({
      chart: {
        type: 'line',
        toolbar: {
          show: false,
        }
      },
      tooltip: {
        shared: false,
        intersect: true,
        x: {
          show: false,
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
      },
      title: {
        text: 'No label provided',
        align: 'left',
        style: {
          color: '#F6F6F6' // Set the font color to blue
        }
      },
      markers: {
        size: 6
      },
      xaxis: {
        type: 'numeric',
        tickPlacement: 'on',
        labels: {
          style: {
            colors: '#F6F6F6' // Set the font color of x-axis labels to blue
          },
        },
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
  const [optionsLap2, setOptionsLap2] = useState<ApexOptions>({
    chart: {
      type: 'line',
      toolbar: {
        show: false,
      }
    },
    tooltip: {
      shared: false,
      intersect: true,
      x: {
        show: false,
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
      size: 6
    },
    xaxis: {
      type: 'numeric',
      tickPlacement: 'on',
      labels: {
        style: {
          colors: '#F6F6F6' // Set the font color of x-axis labels to blue
        },
      },
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
          },
          labels: {
            style: {
              colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
            }},
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
          },labels: {
            style: {
              colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
            }},
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
 
      const yaxis16Streams = [...yaxis1LeftLabel,...extraStreamOne,...extraStreamOne,...extraStreamOne,...yaxis1RightLabel,...extraStreamTwo,...extraStreamTwo,...extraStreamTwo,];
      setSecondChartIsNeeded(false);
      if((!stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] != "object")&&(typeof seriesOneLapTwo[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")){
      if ((numberOfStreams === 1)&& numberOfLaps === 1) {
        console.log(addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data)
        setSeries([
          {
            name: leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data
          }
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
      } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
        setSeries([
          {
            name: leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data,
            
          },
          {
            name: rightLabel,
            data: addLapDistanceSeriesToData(seriesTwoLapOne,XAxisData).data
          },
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
      }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
        setSecondChartIsNeeded(true);
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data,
            
          },
          {
            name: 'Lap 1'+rightLabel,
            data: addLapDistanceSeriesToData(seriesTwoLapOne,XAxisData).data
          }
        ]);
        setSeriesLap2([
          {
            name: 'Lap 2'+leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapTwo,XAxisDataLap2).data,
            
          },
          {
            name: 'Lap 2'+rightLabel,
            data: addLapDistanceSeriesToData(seriesTwoLapTwo,XAxisDataLap2).data
          },
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
        setOptionsLap2((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
      }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
        setSecondChartIsNeeded(true);
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data,
            
          }])
          console.log(seriesOneLapTwo)
          console.log(XAxisDataLap2)
          setSeriesLap2([
          {
            name: 'Lap 2'+leftLabel,
            data: addLapDistanceSeriesToData(seriesOneLapTwo,XAxisDataLap2).data,
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
        setOptionsLap2((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },title: title
        }));
      }}
      else if((stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: "FL "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] != "object")) {
          setSeries([
            {
              name: "FL "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR "+" " +leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
            {
              name: rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne,XAxisData).data
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis2StreamsSpecialFirst,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")&&(typeof seriesTwoLapTwo[0] != "object")&&(typeof seriesTwoLapOne[0] != "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: "FL "+" " +leftLabel+ "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
            {
              name: rightLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne,XAxisData).data
            }
          ]);
          setSeriesLap2([
            {
              name: "FL "+" " +leftLabel + "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR "+" " +leftLabel + "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL "+" " +leftLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR "+" " +leftLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[3],XAxisDataLap2).data
            },
            {
              name: rightLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo,XAxisDataLap2).data
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: testExtended,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: testExtended,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: "FL "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR "+" " +leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            }
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: test,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setSeriesLap2([
            {
              name: "FL "+" " +leftLabel + "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR "+" " +leftLabel + "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL "+" " +leftLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR "+ " " + leftLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[3],XAxisDataLap2).data
            },
          ]);
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: test,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }
      }else if ((!stream1IsSpecial && stream2IsSpecial)&&(typeof seriesOneLapOne[0] != "object")){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] == "object")) {
          setSeries([
            {
              name: leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data
            },
            {
              name: "FL"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[0],XAxisData).data
            },
            {
              name: "FR"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[1],XAxisData).data
            },
            {
              name: "RL"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[2],XAxisData).data
            },
            {
              name: "RR"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[3],XAxisData).data
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: test2,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] != "object")&&(typeof seriesTwoLapTwo[0] == "object")&&(typeof seriesTwoLapOne[0] == "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: leftLabel + "Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data
            },
            {
              name: "FL"+rightLabel+ "Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[0],XAxisData).data
            },
            {
              name: "FR"+rightLabel+ "Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[1],XAxisData).data
            },
            {
              name: "RL"+rightLabel+ "Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[2],XAxisData).data
            },
            {
              name: "RR"+rightLabel+ "Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[3],XAxisData).data
            } 
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: custom,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setSeriesLap2([
            {
              name: leftLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo,XAxisDataLap2).data
            },
            {
              name: "FL"+rightLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR"+rightLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL"+rightLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR"+rightLabel+ "Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[3],XAxisDataLap2).data
            },
          ]);
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: custom,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] != "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: 'Lap 1'+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne,XAxisData).data,
              
            }
          ]);
          setSeriesLap2([
            {
              name: 'Lap 2'+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapTwo,XAxisDataLap2).data,
              
            }
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }
      }else if ((stream1IsSpecial && stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis1LeftLabel,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        } else if (((numberOfStreams === 2)&& numberOfLaps == 1)&&(typeof seriesTwoLapOne[0] == "object")) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR"+leftLabel,
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
            {
              name: "FL"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[0],XAxisData).data
            },
            {
              name: "FR"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[1],XAxisData).data
            },
            {
              name: "RL"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[2],XAxisData).data
            },
            {
              name: "RR"+rightLabel,
              data: addLapDistanceSeriesToData(seriesTwoLapOne[3],XAxisData).data
            },
            
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: left3right3,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 2)&& numberOfLaps == 2)&&(typeof seriesTwoLapOne[0] == "object")&&(typeof seriesOneLapTwo[0] == "object")&&(typeof seriesTwoLapTwo[0] == "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: "FL"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            },
            {
              name: "FL"+rightLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[0],XAxisData).data
            },
            {
              name: "FR"+rightLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[1],XAxisData).data
            },
            {
              name: "RL"+rightLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[2],XAxisData).data
            },
            {
              name: "RR"+rightLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesTwoLapOne[3],XAxisData).data
            }
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis16Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setSeriesLap2([
            {
              name: "FL"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[3],XAxisDataLap2).data
            },
            {
              name: "FL"+rightLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR"+rightLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL"+rightLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR"+rightLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesTwoLapTwo[3],XAxisDataLap2).data
            }
          ]);
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: yaxis16Streams,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }else if (((numberOfStreams === 1)&& numberOfLaps == 2)&&(typeof seriesOneLapTwo[0] == "object")){
          setSecondChartIsNeeded(true);
          setSeries([
            {
              name: "FL"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[0],XAxisData).data
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[1],XAxisData).data
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[2],XAxisData).data
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: addLapDistanceSeriesToData(seriesOneLapOne[3],XAxisData).data
            }
          ]);
          setOptions((prevOptions) => ({
            ...prevOptions,
            yaxis: test,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
          setSeriesLap2([
            {
              name: "FL"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[0],XAxisDataLap2).data
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[1],XAxisDataLap2).data
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[2],XAxisDataLap2).data
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: addLapDistanceSeriesToData(seriesOneLapTwo[3],XAxisDataLap2).data
            },
          ]);
          setOptionsLap2((prevOptions) => ({
            ...prevOptions,
            yaxis: test,
            stroke: {
              curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
            },title: title
          }));
        }
      }
    }, [numberOfStreams, seriesOneLapOne, seriesTwoLapOne, expectedMinValue, expectedMaxValue, expectedMinValueTwo, expectedMaxValueTwo, leftLabel, rightLabel, stream1IsSpecial, stream2IsSpecial, numberOfLaps, curves, seriesOneLapTwo, seriesTwoLapTwo,XAxisData]);
  
    return (
      <>
        <Box sx={{ backgroundColor: 'black' }}>
          <Box sx={{ p: 1 }}>
            <DynamicReviewChart series={series} options={options} height={height} label={label} />
            {secondChartIsNeeded && (
             <DynamicReviewChart series={seriesLap2} options={optionsLap2} height={height} label={label} />
            )}
          </Box>
        </Box>
      </>
    );
  }