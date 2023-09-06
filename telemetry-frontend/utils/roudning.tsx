const roundTo1DP =(input:number)=>{
    return Math.round(input * 10) / 10;
};
export const roundTo3DP = (input:number) => {
  return Math.round(input * 1000) / 1000;
};

export const roundTo3SF = (input:number) => {
    // Convert the number to a string to count significant figures
    const numString = input.toString();
  
    // Find the position of the first non-zero digit
    const firstNonZeroIndex = numString.search(/[1-9]/);
  
    // Calculate the number of decimal places needed to achieve 3 significant figures
    const decimalPlaces = 3 - firstNonZeroIndex;
  
    // Use toFixed to round to the calculated number of decimal places
    return Number(input.toFixed(decimalPlaces));
  };

export default roundTo1DP;
