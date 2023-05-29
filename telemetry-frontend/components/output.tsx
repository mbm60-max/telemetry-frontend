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

    connection.on('ReceiveThrottleValue', (receivedValue: number) => {
      setThrottleValue(receivedValue);
    });

    connection.start()
      .then(() => {
        console.log('SignalR connection established.');
      })
      .catch((error) => {
        console.error('SignalR connection error:', error);
      });

    return () => {
      connection.stop();
    };
  }, []);

  return (
    <div>
      <h1>Throttle Monitor</h1>
      {throttleValue !== null ? (
        <p>Current throttle value: {throttleValue}</p>
      ) : (
        <p>Waiting for throttle value...</p>
      )}
    </div>
  );
};

export default ThrottleMonitor;
