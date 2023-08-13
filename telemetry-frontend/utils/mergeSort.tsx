

function MergeSort(array: Array<any>): Array<any> {
    let length = array.length;
    if (length <= 1) {
      return array;
    }
    let halfway = Math.floor(array.length / 2);
    let arrayLeft = array.slice(0, halfway);
    let arrayRight = array.slice(halfway, array.length);
    arrayLeft = MergeSort(arrayLeft); // Recursive call to sort the left subarray
    arrayRight = MergeSort(arrayRight); // Recursive call to sort the right subarray
  
    return Merge(arrayLeft, arrayRight, (a, b) => {
        if (typeof a === 'string' && typeof b === 'string') {
          return a.localeCompare(b);
        } else {
          return a.toString().localeCompare(b.toString());
        }
      });
  }
  
  function Merge(leftArray: Array<any>, rightArray: Array<any>, compareFn: (arg0: any, arg1: any) => number): Array<any> {
    let mergedArray: Array<any> = [];
    let l = 0;
    let r = 0;
  
    while (l < leftArray.length && r < rightArray.length) {
        const leftItem = leftArray[l];
        const rightItem = rightArray[r];

        if (
          leftItem.hasOwnProperty('lapTime') &&
          rightItem.hasOwnProperty('lapTime')
        ) {
          if (compareFn(leftItem.lapTime, rightItem.lapTime) <= 0) {
            mergedArray.push(leftItem);
            l++;
          } else {
            mergedArray.push(rightItem);
            r++;
          }
        } else {
          if (compareFn(leftItem, rightItem) <= 0) {
            mergedArray.push(leftItem);
            l++;
          } else {
            mergedArray.push(rightItem);
            r++;
          }
        }
      }
  
    // Append any remaining elements from leftArray
    while (l < leftArray.length) {
      mergedArray.push(leftArray[l]);
      l++;
    }
  
    // Append any remaining elements from rightArray
    while (r < rightArray.length) {
      mergedArray.push(rightArray[r]);
      r++;
    }
  
    return mergedArray;
  }

  export default MergeSort;
 