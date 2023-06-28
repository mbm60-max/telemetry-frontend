import ApexCharts, { ApexOptions }  from "apexcharts"
import React, { useEffect, useState } from "react"
import Chart from "react-apexcharts"
import SignalRService from '../utils/signalrEndpoint';
import StopButton from '../components/stopButton';
import ExtendedPacket from "../interfaces/extendedPacketInterface";


export default function BasicChart() {
  const signalRService = new SignalRService();

  useEffect(() => {
    signalRService.startConnection();

    return () => {
      signalRService.stopConnection();
    };
  }, []);
  const[dataStream, setDataStream] = React.useState([
    {x:0, y:0}
  ]);
  const series = [{
    name: 'Throttle',
    data: dataStream
  },
];
const options:ApexOptions ={
  chart:{
    id: 'realtime',
    type: 'line',
    animations:{
      enabled:true,
      easing: 'linear',
      dynamicAnimation: {
        speed:100
      },
}, 
toolbar:{
  show:true
}},dataLabels:{
  enabled:false
},
stroke:{
   curve:'smooth'
},
title:{
  text: 'Data',
  align:'left'
},
markers:{
  size:2
},
xaxis:{
  range:30,
  type: 'numeric',
  tickAmount: 'dataPoints',
  tickPlacement: 'on'
},
yaxis:{
  min:-1,
  max:255
}}

function handlePacket(receivedExtendedPacket:ExtendedPacket) {
  console.log('Received FullPacketMessage:', receivedExtendedPacket);
  console.log("hi");
  console.log(receivedExtendedPacket);
  console.log(JSON.stringify(receivedExtendedPacket, null, 2));
  var jsonString = JSON.stringify(receivedExtendedPacket);
  var parsedObject = JSON.parse(jsonString);
  var throttleValue = parsedObject.throttle;
  console.log(throttleValue);

  console.log(JSON.stringify(receivedExtendedPacket.Throttle));
  if (throttleValue!== undefined) {
    appendData(throttleValue); // Update the throttle value
    console.log("bye");
  }
}
useEffect(() => {
  signalRService.setHandleFullPacket(handlePacket); // Set the handlePacket function in SignalRService

  return () => {
    signalRService.removeHandleFullPacket(); // Remove the handlePacket function when unmounting
  };
}, []);
async function appendData(dataPoint: number){
  setDataStream(oldArray => {
    const prev = oldArray[oldArray.length - 1];
    const newArray = [...oldArray, { x: prev.x + 1, y: dataPoint }];
    return newArray.slice(-30);
  });
}
 
  return (
    <>
   <Chart series={series} options={options} height={250}></Chart>
   <StopButton signalRService={signalRService} />
   </>
  );
}