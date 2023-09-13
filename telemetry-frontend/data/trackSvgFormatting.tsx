// Define a type for the common props
    interface ImageProps {
    position: PositionType;
    top: string;
    left: string;
    zIndex: number;
    transform: string;
    transformOrigin: string;
    width:string;
    height:string;
    objectFit: ObjectFitType; 
  }
  
  enum ObjectFitType {
    Fill = 'fill',
    Contain = 'contain',
    Cover = 'cover',
    None = 'none',
    ScaleDown = 'scale-down',
  }
  enum PositionType {
    Static = 'static',
    Relative = 'relative',
    Absolute = 'absolute',
    Sticky = 'sticky',
    Fixed = 'fixed',
  }

  // Define a type for the specific props related to track names
  interface TrackProps {
    top: string;
    left: string;
    transform: string;
    transformOrigin: string;
    width:string;
    height:string;
  }
  
  // Define the dictionary type that maps track names to their specific props
  interface TrackPropsDictionary {
    [trackName: string]: {
      imageProps: ImageProps;
      trackProps: TrackProps;
    };
  }

  
  // Create the dictionary with specific props for each track name
  const trackPropsDict: TrackPropsDictionary = {
    spa: {
      imageProps: {
        position: PositionType.Absolute,
  top: '60%',
  left: '60%',
  transform: 'translate(-72%, -50%)rotate(91deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
  objectFit: ObjectFitType.Fill,
  zIndex: 1,
      },
      trackProps: {
        top: '-3%',
  left: '-0%',
  transform: 'rotate(90deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
      },
    },
    legunaSeca: {
      imageProps: {
        position: PositionType.Absolute,
  top: '60%',
  left: '57%',
  transform: 'translate(-72%, -50%)rotate(91deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
  objectFit: ObjectFitType.Fill,
  zIndex: 1,
      },
      trackProps: {
        top: '10%',
  left: '-15%',
  transform: 'rotate(90deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
      },
    },
    sainteCroixC: {
      imageProps: {
        position: PositionType.Absolute,
  top: '60%',
  left: '57%',
  transform: 'translate(-72%, -50%)rotate(91deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
  objectFit: ObjectFitType.Fill,
  zIndex: 1,
      },
      trackProps: {
        top: '10%',
  left: '-15%',
  transform: 'rotate(90deg)',
  transformOrigin: 'center',
  width: '100%',
  height: '100%',
      },
    },
    // Add more track names and their specific props here
  };

  export default trackPropsDict;
