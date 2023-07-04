
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
  
interface ExtendedPacket {
  distanceFromStart?: number;
  DateReceived?: string;
  GameType?: SimulatorInterfaceGameType;
  Position?: string[];
  Velocity?: string[];
  Rotation?: string[];
  RelativeOrientationToNorth?: number;
  AngularVelocity?: string[];
  BodyHeight?: number;
  EngineRPM?: number;
  GasLevel?: number;
  GasCapacity?: number;
  MetersPerSecond?: number;
  TurboBoost?: number;
  OilPressure?: number;
  WaterTemperature?: number;
  OilTemperature?: number;
  TireFL_SurfaceTemperature?: number;
  TireFR_SurfaceTemperature?: number;
  TireRL_SurfaceTemperature?: number;
  TireRR_SurfaceTemperature?: number;
  PacketId?: number;
  LapCount?: number;
  LapsInRace?: number;
  BestLapTime?: string;
  LastLapTime?: string;
  TimeOfDayProgression?: string;
  PreRaceStartPositionOrQualiPos?: number;
  NumCarsAtPreRace?: number;
  MinAlertRPM?: number;
  MaxAlertRPM?: number;
  CalculatedMaxSpeed?: number;
  Flags?: SimulatorFlags;
  CurrentGear?: number;
  SuggestedGear?: number;
  Throttle: number;
  Brake?: number;
  Empty_0x93?: number;
  RoadPlane?: string[];
  RoadPlaneDistance?: number;
  WheelFL_RevPerSecond?: number;
  WheelFR_RevPerSecond?: number;
  WheelRL_RevPerSecond?: number;
  WheelRR_RevPerSecond?: number;
  TireFL_TireRadius?: number;
  TireFR_TireRadius?: number;
  TireRL_TireRadius?: number;
  TireRR_TireRadius?: number;
  TireFL_SusHeight?: number;
  TireFR_SusHeight?: number;
  TireRL_SusHeight?: number;
  TireRR_SusHeight?: number;
  ClutchPedal?: number;
  ClutchEngagement?: number;
  RPMFromClutchToGearbox?: number;
  TransmissionTopSpeed?: number;
  GearRatios?: number[];
  CarCode?: number;
  LapTimer?:string;
}
export default ExtendedPacket;
