import React, { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import ExtendedPacket from "../interfaces/extendedPacketInterface";
interface Vector3 {
  x: number;
  y: number;
  z: number;
}


const ThrottleComponent: React.FC = () => {
  const [throttleValue, setThrottleValue] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  enum SimulatorInterfaceGameType {
    GT6 = "GT6",
    GTSport = "GTSport",
    GT7 = "GT7"
  }
  enum SimulatorFlags {
    None = 0,
    CarOnTrack = 1 << 0,
    Paused = 1 << 1,
    LoadingOrProcessing = 1 << 2,
    InGear = 1 << 3,
    HasTurbo = 1 << 4,
    RevLimiterBlinkAlertActive = 1 << 5,
    HandBrakeActive = 1 << 6,
    LightsActive = 1 << 7,
    HighBeamActive = 1 << 8,
    LowBeamActive = 1 << 9,
    ASMActive = 1 << 10,
    TCSActive = 1 << 11
  }
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
        connection.on("positionMessage", (receivedPosition: string[]) => {
          console.log('Received Position:', receivedPosition);
          
        });
        connection.on('fullPacketMessage', (receivedExtendedPacket: ExtendedPacket) => {
          console.log('Received FullPacketMessage:', receivedExtendedPacket);
        });
        connection.on('stringMessage', (receivedExtendedPacket: string) => {
          console.log('Received string', receivedExtendedPacket);
        });
        connection.on('floatMessage', (receivedExtendedPacket: number) => {
          console.log('Received float', receivedExtendedPacket);
        });
        connection.on('simGameMessage', (receivedExtendedPacket: SimulatorInterfaceGameType ) => {
          console.log('Received type', receivedExtendedPacket);
        });
        connection.on('intMessage', (receivedExtendedPacket: number) => {
          console.log('Received int', receivedExtendedPacket);
        });
        connection.on('shortMessage', (receivedExtendedPacket: number) => {
          console.log('Received short', receivedExtendedPacket);
        });
        connection.on('flagsMessage', (receivedExtendedPacket: SimulatorFlags) => {
          console.log('Received flags', receivedExtendedPacket);
        });
        connection.on('floatArrMessage', (receivedExtendedPacket: number[]) => {
          console.log('Received floatArr', receivedExtendedPacket);
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
        </>
      )}
    </div>
  );
};

export default ThrottleComponent;