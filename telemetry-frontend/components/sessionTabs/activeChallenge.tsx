import { Box, Grid, Typography } from "@mui/material";
import axios, { AxiosResponse } from "axios";
import { useState, useEffect } from "react";

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

    const [challengeData, setChallengeData] = useState<ChallengeContent[]>([]); 
    const [allChallengesArray, setAllChallengesArray] = useState<any[]>([]);
    const [challengeDataFetched,setChallengeDataFetched]= useState(false);
    const [lapsCompletedArray,setLapsCompletedArray]= useState(['']);


    useEffect(()=>{
        let arrayToPush=[];
        for(let i=0;i<lapsCompleted;i++){
            arrayToPush.push('green');
        }
        for(let i=targetLaps;i>lapsCompleted;i--){
            arrayToPush.push('grey');
        }
        setLapsCompletedArray(arrayToPush);
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
 