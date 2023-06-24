import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";

interface Vector3 {
  x: number;
  y: number;
  z: number;
}

const ThrottleComponent: React.FC = () => {
  const [throttleValue, setThrottleValue] = useState<number | null>(null);
  const [position, setPosition] = useState<Vector3 | null>({ x: 0, y: 0, z: 0 });
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let connection: signalR.HubConnection | null = null;

    const startConnection = async () => {
      try {
        connection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5000/throttlehub")
          .configureLogging(signalR.LogLevel.Information)
          .withAutomaticReconnect()
          .build();
        connection.on("messageReceived", (throttleValue: number) => {
          setThrottleValue(throttleValue);
        });
        connection.on("positionMessage", (receivedPosition: Vector3) => {
          setPosition(receivedPosition);
          
        });

        await connection.start();
        console.log("SignalR connection established.");
        setError(null);
      } catch (error) {
        console.error("Error establishing SignalR connection: ", error);
        setError("Error establishing SignalR connection.");
        // Retry after 3 seconds
        setTimeout(startConnection, 200000);//3000 before
      }
    };

    startConnection();

    return () => {
      if (connection) {
        connection.stop();
      }
    };
  }, []);

  return (
    <div>
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <h1>Throttle Value: {throttleValue}</h1>
          {position !== null && (
            <h1>Position: {JSON.stringify(position)}</h1>
          )}
        </>
      )}
    </div>
  );
};

export default ThrottleComponent;

