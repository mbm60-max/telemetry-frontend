import * as signalR from "@microsoft/signalr";
import ExtendedPacket from "../interfaces/extendedPacketInterface";


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
  class SignalRService {
    private connection: signalR.HubConnection | null = null;
    private handleFullPacketCallback: ((receivedExtendedPacket: ExtendedPacket) => void) | null = null; // Callback function for handleFullPacket


    public  startConnection = async () => {
      try {
        this.connection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5000/server")
          .configureLogging(signalR.LogLevel.Information)
          .withAutomaticReconnect()
          .build();
        
        this.connection.on("fullpacketmessage", this.handleFullPacket) 
        

        await this.connection.start();
        console.log("SignalR connection established.");
      } catch (error) {
        console.error("Error establishing SignalR connection: ", error);
        // Retry after 3 seconds
        setTimeout(this.startConnection, 200000);//3000 before
      }
    };
    // Set the callback function for handleFullPacket
  public setHandleFullPacket = (callback: (receivedExtendedPacket: ExtendedPacket) => void) => {
    this.handleFullPacketCallback = callback;
  };

  // Remove the callback function for handleFullPacket
  public removeHandleFullPacket = () => {
    this.handleFullPacketCallback = null;
  };
    public handleFullPacket = (receivedExtendedPacket: ExtendedPacket) => {
        //console.log('Received FullPacketMessage:', receivedExtendedPacket);
        if (this.handleFullPacketCallback) {
            this.handleFullPacketCallback(receivedExtendedPacket);
          }
    };

    public stopConnection = () => {
        if(this.connection){
            this.connection.stop();
        }
    };
    
}
export default SignalRService;