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
  XAxisData:string[];
}

export default function ReviewChart({ label, expectedMaxValue, expectedMinValue, height, expectedMaxValueTwo, expectedMinValueTwo, seriesOneLapOne, seriesTwoLapOne,seriesOneLapTwo, seriesTwoLapTwo, numberOfStreams,curves, leftLabel,rightLabel,numberOfLaps,stream1IsSpecial,stream2IsSpecial,XAxisData }: ReviewChartProps) {
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

const addTimeSeriesToData = (dataStream: string | number | any[], timeStamps: string[]) => {
  const data = [];
  let timeString = "";
  const formattedLabels: string[] = [];
  let min =0;
  let max=0;
  if (typeof dataStream === "object") {
    for (let i = 0; i< timeStamps.length; i++){
      timeString += timeStamps[i];
    }
    if(timeString !== "00:00:01"){
      const modifiedString = timeString.replace(/\[|\]/g, "");  // Remove "[" and "]" from the string
      const substrings = modifiedString.split(",");
      for (let i = 0; i < 2; i++) {
        const [hours, minutes, seconds, milliseconds] = substrings[i].split(/[:.]/);
        let totalTimeAsNumberInMilliseconds = (Number(hours)*3600*1000)+(Number(minutes)*60*1000)+(Number(seconds)*1000)+(Number(milliseconds))
        if(i==0){
          min =  totalTimeAsNumberInMilliseconds;
        }
        if(i==1){
          max = totalTimeAsNumberInMilliseconds;
        }
        if (!isNaN(totalTimeAsNumberInMilliseconds)) {
          data.push([totalTimeAsNumberInMilliseconds, dataStream[i]]);
          formattedLabels.push(formatXAxisValue(totalTimeAsNumberInMilliseconds)); 
        }
      }
    }
  }
  return {data, formattedLabels, min, max};
};
function extractTimeComponents(totalTimeInMilliseconds:number) {
  const hours = Math.floor(totalTimeInMilliseconds / (3600 * 1000));
  const minutes = Math.floor((totalTimeInMilliseconds % (3600 * 1000)) / (60 * 1000));
  const seconds = Math.floor((totalTimeInMilliseconds % (60 * 1000)) / 1000);
  const milliseconds = Math.floor(totalTimeInMilliseconds % 1000);

  return {
    hours,
    minutes,
    seconds,
    milliseconds,
  };
}
function formatXAxisValue(value: number) {
  const { hours, minutes, seconds, milliseconds } = extractTimeComponents(value);

  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');
  const formattedMilliseconds = milliseconds.toString().padStart(3, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
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
          formatter: function (value: number) {
            return formatXAxisValue(value);
          }
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
            colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
          },
        },
        min:addTimeSeriesToData(seriesOneLapOne,XAxisData).min,
        max:addTimeSeriesToData(seriesOneLapOne,XAxisData).max,
        overwriteCategories: addTimeSeriesToData(seriesOneLapOne, XAxisData).formattedLabels,
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
      const xaxisSpecial: ApexXAxis = {
        type: 'numeric',
        tickPlacement: 'on',
        labels: {
          style: {
            colors: ['#F6F6F6'] // Set the font color of x-axis labels to blue
          },
        },
        min:addTimeSeriesToData(seriesOneLapOne,XAxisData).min,
        max:addTimeSeriesToData(seriesOneLapOne,XAxisData).max,
        overwriteCategories: addTimeSeriesToData(seriesOneLapOne, XAxisData).formattedLabels,
      }
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
            data: addTimeSeriesToData(seriesOneLapOne,XAxisData).data
          }
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
          xaxis: xaxisSpecial
        }));
      } else if ((numberOfStreams === 2)&& numberOfLaps == 1) {
        setSeries([
          {
            name: leftLabel,
            data: addTimeSeriesToData(seriesOneLapOne,XAxisData).data,
            
          },
          {
            name: rightLabel,
            data: addTimeSeriesToData(seriesTwoLapOne,XAxisData).data
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis2Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
          xaxis: xaxisSpecial
        }));
      }else if ((numberOfStreams === 2)&& numberOfLaps == 2){
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: addTimeSeriesToData(seriesOneLapOne,XAxisData).data,
            
          },
          {
            name: 'Lap 1'+rightLabel,
            data: addTimeSeriesToData(seriesTwoLapOne,XAxisData).data
          },
          {
            name: 'Lap 2'+leftLabel,
            data: addTimeSeriesToData(seriesOneLapTwo,XAxisData).data,
            
          },
          {
            name: 'Lap 2'+rightLabel,
            data: addTimeSeriesToData(seriesTwoLapTwo,XAxisData).data
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis4Streams,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
          xaxis: xaxisSpecial
        }));
      }else if ((numberOfStreams === 1)&& numberOfLaps == 2){
        setSeries([
          {
            name: 'Lap 1'+leftLabel,
            data: addTimeSeriesToData(seriesOneLapOne,XAxisData).data,
            
          },
          {
            name: 'Lap 2'+leftLabel,
            data: addTimeSeriesToData(seriesOneLapTwo,XAxisData).data,
            
          },
          
        ]);
        setOptions((prevOptions) => ({
          ...prevOptions,
          yaxis: yaxis1LeftLabel,
          stroke: {
            curve: flattenArray(curves).map((curve: string) => curveMap[curve]),
          },
          xaxis: xaxisSpecial
        }));
      }}
      else if((stream1IsSpecial && !stream2IsSpecial)&&(typeof seriesOneLapOne[0] == "object")){
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne,XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: rightLabel + "Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne,XAxisData)
            },
            {
              name: "FL"+leftLabel + "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[0],XAxisData)
            },
            {
              name: "FR"+leftLabel + "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[1],XAxisData)
            },
            {
              name: "RL"+leftLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[2],XAxisData)
            },
            {
              name: "RR"+leftLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[3],XAxisData)
            },
            {
              name: rightLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo,XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel + "Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: "FL"+leftLabel + "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[0],XAxisData)
            },
            {
              name: "FR"+leftLabel + "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[1],XAxisData)
            },
            {
              name: "RL"+leftLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[2],XAxisData)
            },
            {
              name: "RR"+leftLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne,XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne,XAxisData)
            },
            {
              name: "FL"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[0],XAxisData)
            },
            {
              name: "FR"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[1],XAxisData)
            },
            {
              name: "RL"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[2],XAxisData)
            },
            {
              name: "RR"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne,XAxisData)
            },
            {
              name: "FL"+rightLabel+ "Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[0],XAxisData)
            },
            {
              name: "FR"+rightLabel+ "Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[1],XAxisData)
            },
            {
              name: "RL"+rightLabel+ "Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[2],XAxisData)
            },
            {
              name: "RR"+rightLabel+ "Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[3],XAxisData)
            },
            {
              name: leftLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo,XAxisData)
            },
            {
              name: "FL"+rightLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[0],XAxisData)
            },
            {
              name: "FR"+rightLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[1],XAxisData)
            },
            {
              name: "RL"+rightLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[2],XAxisData)
            },
            {
              name: "RR"+rightLabel+ "Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne,XAxisData),
              
            },
            {
              name: 'Lap 2'+leftLabel,
              data: addTimeSeriesToData(seriesOneLapTwo,XAxisData),
              
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
        if ((numberOfStreams === 1)&& numberOfLaps === 1) {
          setSeries([
            {
              name: "FL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel,
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: "FL"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[0],XAxisData)
            },
            {
              name: "FR"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[1],XAxisData)
            },
            {
              name: "RL"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[2],XAxisData)
            },
            {
              name: "RR"+rightLabel,
              data: addTimeSeriesToData(seriesTwoLapOne[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: "FL"+rightLabel +"Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[0],XAxisData)
            },
            {
              name: "FR"+rightLabel +"Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[1],XAxisData)
            },
            {
              name: "RL"+rightLabel +"Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[2],XAxisData)
            },
            {
              name: "RR"+rightLabel +"Lap 1",
              data: addTimeSeriesToData(seriesTwoLapOne[3],XAxisData)
            },
            {
              name: "FL"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[0],XAxisData)
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[1],XAxisData)
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[2],XAxisData)
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[3],XAxisData)
            },
            {
              name: "FL"+rightLabel +"Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[0],XAxisData)
            },
            {
              name: "FR"+rightLabel +"Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[1],XAxisData)
            },
            {
              name: "RL"+rightLabel +"Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[2],XAxisData)
            },
            {
              name: "RR"+rightLabel +"Lap 2",
              data: addTimeSeriesToData(seriesTwoLapTwo[3],XAxisData)
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
              data: addTimeSeriesToData(seriesOneLapOne[0],XAxisData)
            },
            {
              name: "FR"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[1],XAxisData)
            },
            {
              name: "RL"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[2],XAxisData)
            },
            {
              name: "RR"+leftLabel +"Lap 1",
              data: addTimeSeriesToData(seriesOneLapOne[3],XAxisData)
            },
            {
              name: "FL"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[0],XAxisData)
            },
            {
              name: "FR"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[1],XAxisData)
            },
            {
              name: "RL"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[2],XAxisData)
            },
            {
              name: "RR"+leftLabel +"Lap 2",
              data: addTimeSeriesToData(seriesOneLapTwo[3],XAxisData)
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
    }, [numberOfStreams, seriesOneLapOne, seriesTwoLapOne, expectedMinValue, expectedMaxValue, expectedMinValueTwo, expectedMaxValueTwo, leftLabel, rightLabel, stream1IsSpecial, stream2IsSpecial, numberOfLaps, curves, seriesOneLapTwo, seriesTwoLapTwo,XAxisData]);
  
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