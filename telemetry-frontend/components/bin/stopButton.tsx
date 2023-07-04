import React from "react";
import SignalRService from "../../utils/signalrEndpoint";

interface StopButtonProps {
  signalRService: SignalRService;
}

const StopButton: React.FC<StopButtonProps> = ({ signalRService }) => {
  const handleStopConnection = () => {
    signalRService.stopConnection();
  };

  return (
    <button onClick={handleStopConnection}>Stop Connection</button>
  );
};

export default StopButton;
