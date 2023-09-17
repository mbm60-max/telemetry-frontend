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

  export function convertTimeToSeconds(timeString: string) {
    const timeParts = timeString.split(":");
    
    if (timeParts.length !== 3) {
      return 0; // Invalid time format
    }
    
    const hours = parseInt(timeParts[0], 10);
    const minutes = parseInt(timeParts[1], 10);
    const seconds = parseInt(timeParts[2], 10);
    
    // Calculate total seconds without milliseconds
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    
    return totalSeconds;
  }

  export default convertSecondsToTime;