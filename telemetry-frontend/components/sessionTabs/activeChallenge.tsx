import { Box, Grid, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../authProvider";

interface ChallengeContent{
    Track:string;
    Car:string;
    Target:number;
  }
  
  interface ActiveChallengeProps{
    challenge:string|string[]
    lapsCompleted:number;
    goal:string;
    targetLaps:number;
  }
  export default function ActiveChallenge({challenge,lapsCompleted,goal,targetLaps}:ActiveChallengeProps) {
    const { userName } = useContext(AuthContext);
    const [lapsCompletedArray,setLapsCompletedArray]= useState(['']);
    const [challengeStatusArray,setChallengeStatusArray]= useState([]);
    const handleChallengeUpdate = async (newData:boolean[],userName:string)=>{
      const newValue=newData;
      const target="completedChallenges";
      try {
        await axios.post("/api/changeuserdataapi", {newValue,userName,target});
     }
     catch (error) {
       console.error("Error checking for user:", error);
     }
    }
    
    const checkChallengeStatus= async (username:string)=>{
      try {
          const checkStatusResponse: AxiosResponse = await axios.get('/api/checkuserchallengestatusapi', {
            params: {username},
          });
          
          console.log('Response:', checkStatusResponse);
          if(checkStatusResponse.data.completedChallenges){
            console.log(checkStatusResponse.data.completedChallenges)
            setChallengeStatusArray(checkStatusResponse.data.completedChallenges)
          }else{
            console.log('No Challenge Data For User')
          }
          
        } catch (error) {
          console.error('Error fetching data:', error);
        }
    }
    useEffect(()=>{
      checkChallengeStatus(userName);
          },[])
    const getNewStatusArray=(prevArray:boolean[],indexToReplace:number)=>{
      if (indexToReplace < 0 || indexToReplace >= prevArray.length) {
        throw new Error("Invalid index");
      }
      const newArray = [...prevArray];
      newArray[indexToReplace] = true;
      return newArray;
    }
    const handleChallengeCompleted=()=>{
      if(lapsCompleted>0 && targetLaps>0){
        if(lapsCompleted>=targetLaps){
          const prevArray = challengeStatusArray;
          switch(challenge){
            case 'Consistency':
              handleChallengeUpdate(getNewStatusArray(prevArray,0),userName);
                break;
            case 'Pace':
          handleChallengeUpdate(getNewStatusArray(prevArray,1),userName);
            break;
            case 'Endurance':
           handleChallengeUpdate(getNewStatusArray(prevArray,2),userName);
            break;
        }
        }
      }
    }


    useEffect(()=>{
      handleChallengeCompleted();
    },[lapsCompleted]);

    useEffect(()=>{
        let arrayToPush=[];
        for(let i=0;i<lapsCompleted;i++){
            arrayToPush.push('green');
        }
        for(let i=targetLaps;i>lapsCompleted;i--){
            arrayToPush.push('grey');
        }
        setLapsCompletedArray(arrayToPush);
        console.log(lapsCompleted)
    },[lapsCompleted]);

    useEffect(()=>{
    const setEmptyArray=()=>{
        let arrayToPush=[];
        for(let i=0;i<targetLaps;i++){
            arrayToPush.push('grey');
        }
        setLapsCompletedArray(arrayToPush);
    }
    setEmptyArray();
},[targetLaps]);

 
  return(
    <Grid container spacing={2}>
       <Grid item xs={12} sm={6}> <Grid container spacing={2}><Grid item xs={12}> <Box  sx={{backgroundColor:'black'}} ><Typography sx={{color:'white'}} fontFamily={'Yapari'} fontSize={35} fontWeight={'bold'}>{challenge} Challenge</Typography></Box></Grid><Grid item xs={12}>  <Box sx={{backgroundColor:'black'}}><Typography sx={{color:'white'}} fontFamily={'Satoshi'} fontSize={25} fontWeight={'bold'}>{goal}</Typography></Box></Grid></Grid>  </Grid>
       <Grid item xs={12} sm={6}> <Grid container spacing={2}><Grid item xs={12}> <Box sx={{backgroundColor:'black'}}><Typography sx={{color:'white'}} fontFamily={'Satoshi'} fontSize={35} fontWeight={'bold'}>Challenge Progress (Laps)</Typography></Box></Grid><Grid item xs={12}><Grid container spacing={8}> {lapsCompletedArray.map((item, index) => (<Grid item xs={1} key={index} ><Box sx={{width:'50px',height:'50px',backgroundColor:item}}></Box></Grid>))}</Grid> </Grid></Grid></Grid>
    </Grid>
    
  )};
 