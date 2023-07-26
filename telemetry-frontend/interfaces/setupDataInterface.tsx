interface SetupDataInterface {
    "Power Level": {
      Value: string;
      Units: string;
    };
    "Weight Reduction Level": {
      Value: string;
      Units: string;
    };
    "Power Ratio": {
      Value: string;
      Units: string;
    };
    "Weight Reduction Ratio": {
      Value: string;
      Units: string;
    };
    "Traction Control": {
      Value: string;
      Units: string;
    };
    "Brake Balance": {
      Value: string;
      Units: string;
    };
    "Ride Height": {
      Value: [string, string];
      Units: string;
    };
    "Natural Frequency": {
      Value: [string, string];
      Units: string;
    };
    "Anti Roll Bar": {
      Value: [string, string];
      Units: string;
    };
    "Damping Ratio Compression": {
      Value: [string, string];
      Units: string;
    };
    "Damping Ratio Rebound": {
      Value: [string, string];
      Units: string;
    };
    "Camber Angle": {
      Value: [string, string];
      Units: string;
    };
    "Toe Angle": {
      Value: [string, string];
      Units: string;
    };
    Downforce: {
      Value: [string, string];
      Units: string;
    };
    "Differntial Gear": {
      Value: string;
      Units: string;
    };
    "LSD Initial Torque": {
      Value: [string, string];
      Units: string;
    };
    "LSD Acceleration Sensitivity": {
      Value: [string, string];
      Units: string;
    };
    "LSD Braking Sensitivity": {
      Value: [string, string];
      Units: string;
    };
    "Front Rear Torque Distribution": {
      Value: string;
      Units: string;
    };
    "Transmission Type": {
      Value: string;
      Units: string;
    };
    "Max Speed (Auto Set)": {
      Value: string;
      Units: string;
    };
    "Gear Ratios": {
      Value: [string, string];
      Units: string;
    };
    "Final Gear Ratio": {
      Value: string;
      Units: string;
    };
  }

  export default SetupDataInterface;
  