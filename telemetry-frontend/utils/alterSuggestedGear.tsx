const alterSuggestedGearWhenAtLimit=(suggestedGear:number)=>{
    if(suggestedGear==15){
      return -1;
    }return suggestedGear;
    }
export default alterSuggestedGearWhenAtLimit;

export const alterSuggestedForGraph=(suggestedGear:number)=>{
    if(suggestedGear==15){
      return 0;
    }return suggestedGear;
    }