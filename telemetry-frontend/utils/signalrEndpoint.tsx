import * as signalR from "@microsoft/signalr";
import { useContext } from "react";
import { AuthContext } from "../components/authProvider";
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
    private isFirstTimeFullPacket: boolean = false;
    private mongoWriteFailed: boolean = false;

    public  startConnection = async () => {
      try {
        this.connection = new signalR.HubConnectionBuilder()
          .withUrl("http://localhost:5000/server")
          .configureLogging(signalR.LogLevel.Information)
          .withAutomaticReconnect()
          .build();
        
        this.connection.on("fullpacketmessage", this.handleFullPacket)
        this.connection.on("mongoWriteFailmessage", this.handleMongoWriteFail) 
        

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
      const { userName } = useContext(AuthContext);
        //console.log('Received FullPacketMessage:', receivedExtendedPacket);
        if (this.handleFullPacketCallback) {
          
          if (!this.isFirstTimeFullPacket) {
            if (this.connection) {
              // Send the response back to the server
              this.connection.invoke("SendResponse", userName)
                  .catch(error => console.error("Error sending response:", error));
             this.isFirstTimeFullPacket = true;
         } else {
              console.error("SignalR connection is null.");
        }
          }
          this.handleFullPacketCallback(receivedExtendedPacket);
          }
    };

    public handleMongoWriteFail = () => {
      this.mongoWriteFailed = true;
    };
    public stopConnection = () => {
        if(this.connection){
            this.connection.stop();
        }
    };
    
}
export default SignalRService;