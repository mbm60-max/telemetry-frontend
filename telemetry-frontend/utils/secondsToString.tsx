const convertSecondsToTime= (seconds:number)=> {
    if (isNaN(seconds) || seconds < 0) {
        return "00:00:00"
    }
  
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
  
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(remainingSeconds).padStart(2, "0");
  
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

export function convertTimeToSeconds(timeString:string) {
    const timeParts = timeString.split(":");
    
    if (timeParts.length !== 3) {
     //"Invalid time format. Use the format 'hh:mm:ss.milliseconds'");
     return 0;
    }
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const secondsParts = timeParts[2].split(".");
    
    if (secondsParts.length !== 2) {
      //"Invalid time format. Use the format 'hh:mm:ss.milliseconds'");
     return 0;
    }
    
    const seconds = parseInt(secondsParts[0], 10);
    const milliseconds = parseInt(secondsParts[1], 10);
    
    const totalSeconds = hours * 3600 + minutes * 60 + seconds + milliseconds / 1000;
    
    return Math.round(totalSeconds);
  }

  export default convertSecondsToTime;