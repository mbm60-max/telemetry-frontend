import { Button, createTheme, Divider, Grid, Paper, styled, Typography, useMediaQuery } from "@mui/material";
import { Box, Container } from "@mui/system";
import axios, { AxiosResponse } from "axios";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import Homepage from "../background/background";
import Footer from "../footer/footer";
import NavBar from "../navbar/navbar";
import YouTubePlayerComponent from "./videoPlayer.tsx/playercomponent";
import ChallengeBanner from "./challengeBanner";

interface RecommendedWrapperProps {}

const ItemPlayer = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'left',
  display:'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.text.secondary,
  backgroundColor: ' #FB9536',
  boxShadow: 'none', // Override the shadow effect
  paddingTop:20,
  paddingBottom:20,
  borderRadius:15
}));

interface VideoContent{
  url:string;
  title:string;
  postedBy:string;
}

interface ChallengeContent{
  Track:string;
  Car:string;
  Target:number;
}


const RecommendedWrapper = ({}: RecommendedWrapperProps) => {

  const [allVideosArray, setAllVideosArray] = useState<any[]>([]); // Specify the type for allVideosArray
  const [challengeData, setChallengeData] = useState<ChallengeContent[]>([]); 
  const [allChallengesArray, setAllChallengesArray] = useState<any[]>([]);
  const [videoData, setVideoData] = useState<VideoContent[]>([]); // Specify the type for videoData
  const [dataFetched, setDataFetched] = useState(false);
  const [challengeDataFetched,setChallengeDataFetched]= useState(false);
  const [loadMore,setLoadMore] = useState(false);
  const [videoIndex, setVideoIndex] = useState(0);
  const [hasMoreVideos, setHasMoreVideos]= useState(true);
  const challengeTypes = ["Consistency","Pace","Endurance"]
  const challengeLetters = ["Challenge A","Challenge B","Challenge C"]
  const challengeImages = ["/images/matthew-dockery-s99-JP8P3Hg-unsplash.jpg","images/sander-trooijen-gcGqnjTO1i8-unsplash.jpg","/images/test1.jpg"]
  const [lastUpdatedDate,setLastUpdatedDate]=useState('');
  // Function to add a new video to the videoData array

  const observer = useRef<IntersectionObserver | null>(null);
  
  const thirdLastVideoElement = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMoreVideos) {
          setLoadMore((prevLoadMore) => !prevLoadMore);
        }
      });

      if (node) observer.current.observe(node);
    },
    [observer,hasMoreVideos]
  );


  
  const handleVideosUpdate=(originalIndex:number)=>{
    const videoArray: VideoContent[] = [];
        for (let i = videoIndex; i < originalIndex; i++) {
          if (allVideosArray[videoIndex]) {
            let itemObject: VideoContent = {
              url: allVideosArray[i].VideoId,
              title: allVideosArray[i].Title,
              postedBy: allVideosArray[i].Creator,
            };
            videoArray.push(itemObject);
            
          }
        }setVideoData((prevVideoData) => [...prevVideoData, ...videoArray]);
        
        setVideoIndex(originalIndex);
  }


  useEffect(() => {
  const handleChallengeUpdate=(originalIndex:number)=>{
    const challengeArray: ChallengeContent[] = [];
        for (let i = 0; i < originalIndex; i++) {
          if (allChallengesArray[i]) {
            let itemObject: ChallengeContent = {
              Track: allChallengesArray[i].Track,
              Car: allChallengesArray[i].Car,
              Target: allChallengesArray[i].Target,
            };
            challengeArray.push(itemObject);
            
          }
        }setChallengeData((prevChallengeData) => [...prevChallengeData, ...challengeArray]);
        
  }
  handleChallengeUpdate(3);
  
}, [allChallengesArray, challengeDataFetched]);

  useEffect(() => {
    
    let originalIndex = videoIndex+5;
    if (allVideosArray.length > 0 && dataFetched) {
      if(originalIndex<allVideosArray.length){
        handleVideosUpdate(originalIndex);
      }else if (videoIndex <=allVideosArray.length){
        let originalIndex = videoIndex+(allVideosArray.length-videoIndex);
        handleVideosUpdate(originalIndex);
        setHasMoreVideos(false);
      }else{
        setHasMoreVideos(false);
      }
     
      
    }
  }, [allVideosArray, dataFetched,loadMore]);


 
  useEffect(() => {console.log(hasMoreVideos)},[hasMoreVideos])
  const StyledVerticalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    height: "100%",
  }));
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
    borderWidth: "1px", // Adjust the thickness of the line here
    borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
  width:'99%',
  }));

  const handleChange=()=>{
    setLoadMore(!loadMore);
  }

  const isMobile = useMediaQuery('(max-width:800px)')
  const cantShowTitle = useMediaQuery('(max-width:950px)')
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(132, 126, 126, 0)',
    boxShadow: 'none', // Override the shadow effect
  }));

  useEffect(() => {
    const fetchAvailableVideos = async () => {
      try {
        const searchQuery = "educational simulator racing (technique)"
        const  ytQueryResponse: AxiosResponse = await axios.get('/api/fetchyoutubedataapi', {
          params: { searchQuery },
        });
        if (ytQueryResponse.data.message === 'Success') {
         setAllVideosArray(ytQueryResponse.data.data["VideoData"])
         setDataFetched(true); 
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchAvailableChallenges = async () => {
      try {
        const Type = "Challenge"
        const  challengeResponse: AxiosResponse = await axios.get('/api/retrievechallengecontentapi', {
          params: { Type },
        });
        if (challengeResponse.data.message === 'Success') {
          setAllChallengesArray(challengeResponse.data.data["ChallengeData"])
          setChallengeDataFetched(true); 
         //handle dataychallengeResponse.data.data["VideoData"])
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
    const fetchLastDate = async () => {
      try {
        const collectionName = "LastUpdatedChallenge"
        const  lastUpdateDateResponse: AxiosResponse = await axios.get('/api/getlastupdateapi', {
          params: { collectionName },
        });
        if (lastUpdateDateResponse.data.message === 'Success') {
          setLastUpdatedDate(lastUpdateDateResponse.data.data["lastUpdatedDate"]);
        }
      } catch (error) {
        console.error('Error fetching challenges:', error);
      }
    };
    fetchAvailableVideos();
    fetchAvailableChallenges();
    fetchLastDate();
  }, []);
  
  return (<>
    <Homepage style={'navbar-container'}>
                <Item><NavBar /></Item>
              </Homepage>
              <Box sx={{ width: '100%' }}>
    <Homepage style={isMobile ? 'homepage-container300' : 'homepage-container100'}>
    </Homepage>
    <Homepage style={'homepage-specail'}>
      <Box  sx={{
        width: "100%",
        height: "100%",display:'flex',justifyContent:'center'}}>
    
      <Grid container spacing={4}>
          <Grid item xs={12}sm={isMobile ? 12 : 8} sx={{minWidth:'500px',}}>
           <ItemPlayer><Box sx={{width:'95%', backgroundColor:'white',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}> <Box sx={{width:'95%', backgroundColor:'white',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}><Grid container spacing={0} sx={{height:'1105px',overflow:'scroll'}}>
           <Grid item xs={12}>
          {videoData.map((item, index) => (
            index === videoData.length - 1 ? (
              <Grid container spacing={0} key={index} sx={{mb:2,paddingLeft:0,paddingTop:1,paddingBottom:0}}>
              <Grid item xs={cantShowTitle ? 12:9}    >
                <div ref={thirdLastVideoElement}>
              <YouTubePlayerComponent  videoId={item.url} /></div>
              </Grid>
              {cantShowTitle ? null : (
  <Grid item xs={3} >
    <Box sx={{display:'flex',justifyContent:'start',paddingLeft:2}}><Box sx={{display:'flex',justifyContent:'start'}}><Grid container spacing={1}><Grid item xs={12}><Typography sx={{ color: 'black' }} fontSize={20} fontFamily={"Satoshi"} fontWeight={"bold"}>{item.title}</Typography></Grid><Grid item xs={12}><Typography sx={{ color: 'grey' }} fontSize={15} fontFamily={"Satoshi"} fontWeight={"bold"}>{item.postedBy}</Typography></Grid></Grid></Box></Box>
    
  </Grid>
)}</Grid>):<Grid container spacing={0} key={index} sx={{mb:2,paddingLeft:0,paddingTop:1,paddingBottom:0}}>
<Grid item xs={cantShowTitle ? 12:9}   >
<YouTubePlayerComponent  videoId={item.url} />
</Grid>
{cantShowTitle ? null : (
<Grid item xs={3} >
<Box sx={{display:'flex',justifyContent:'start',paddingLeft:2}}><Box sx={{display:'flex',justifyContent:'start'}}><Grid container spacing={1}><Grid item xs={12}><Typography sx={{ color: 'black' }} fontSize={20} fontFamily={"Satoshi"} fontWeight={"bold"}>{item.title}</Typography></Grid><Grid item xs={12}><Typography sx={{ color: 'grey' }} fontSize={15} fontFamily={"Satoshi"} fontWeight={"bold"}>{item.postedBy}</Typography></Grid></Grid></Box></Box>

</Grid>
)}</Grid>
            
            
          ))}</Grid>
        </Grid></Box></Box></ItemPlayer>
         
        </Grid>
        
        <Grid item xs={12}sm={isMobile ? 12 : 4} ><ItemPlayer><Box sx={{width:'95%', backgroundColor:'white',height:'100%',borderRadius:5,display:'flex',justifyContent:'center'}}> 
        <Grid container spacing={0} sx={{height:'1105px',overflow:'scroll',mb:1}}>
        {challengeData.map((item, index) => (
          <Grid item xs={12}  key={index}sx={{maxHeight:'550px',display:'flex',justifyContent:'center',mt:2}}>
          <ChallengeBanner challengeName={challengeTypes[index]} isCompleted={false} image={challengeImages[index]} trackName={item.Track} carName={item.Car} letterName={challengeLetters[index]} targetValue={item.Target} lastUpdatedDate={lastUpdatedDate}></ChallengeBanner>
        </Grid>
        ))}
         
          </Grid></Box>
        </ItemPlayer>
        </Grid>
        </Grid>
        </Box>
       
      </Homepage></Box>
      <Homepage style='homepage-container-reverse-short'></Homepage>
              <Homepage style={'navbar-container-reverse'}>
                <Item><Footer /></Item>
              </Homepage>
            
     
    </>
  );
};
export default RecommendedWrapper;