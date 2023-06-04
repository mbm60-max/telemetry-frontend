import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const ThrottleMonitor: React.FC = () => {
  const [throttleValue, setThrottleValue] = useState<number | null>(null);

  useEffect(() => {
    const hubUrl = 'http://localhost:5000/throttlehub';
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(hubUrl)
      .configureLogging(signalR.LogLevel.Information)
      .build();

    connection.start()
      .then(() => {
        console.log('SignalR connection established.');
         
        try {
          let name = "max";
          connection.send("SendMessage", name);
          //connection.on('ReceiveThrottleValue', (receivedValue: string) => {
        //console.log(receivedValue);
        //setThrottleValue(receivedValue);
        //console.log(receivedValue);
      //});
        } catch (err) {
          console.error(err);
        }
      })
      .catch((error) => {
        console.error('SignalR connection error:', error);
      });

      

    return () => {
      connection.stop();
    };
  }, []);
//connection.on('ReceiveThrottleValue', (receivedValue: number) => {
        //console.log(receivedValue);
        //setThrottleValue(receivedValue);
        //console.log(receivedValue);
      //});
  return (
    <div>
      <h1>Throttle Monitor</h1>
      {throttleValue !== null ? (
        <p>Current throttle value: {throttleValue}</p>
      ) : (
        <p>Waiting for throttle value... {throttleValue}</p>
      )}
    </div>
  );
};

export default ThrottleMonitor;
