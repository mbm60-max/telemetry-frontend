const isNewLapCheck=(lapCount:number,previousLapCount:number)=>{
    if((lapCount >0)&&(lapCount>previousLapCount)){
        return true;
    }return false;
};

export default isNewLapCheck;