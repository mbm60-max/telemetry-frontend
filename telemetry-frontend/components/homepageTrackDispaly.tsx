'use client'

import { Box, Button, Grid, Link, Paper, styled } from "@mui/material";
import { useEffect, useState } from "react";
import trackData from "../data/trackData";
import BasicCard from "./card";
import ImageBox from "./homepageTrack";
import './navbar/navbar.css';

interface HomePageTrackProps {

}

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
    backgroundColor: 'rgba(8, 13, 56, 0.5)',
    boxShadow: 'none', // Override the shadow effect
    borderTopLeftRadius:130,
    borderBottomLeftRadius:130,
}));
const ItemInner = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: 'rgba(8, 13, 56, 0)',
    boxShadow: 'none', // Override the shadow effect
}));
const ItemInnerTopAligned = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    backgroundColor: 'rgba(8, 13, 56, 0)',
    boxShadow: 'none', // Override the shadow effect
}));
function HomepageTrack({ }: HomePageTrackProps) {
    const Card1Fonts = [28]
    const Card2Fonts = [22, 22,22,22,22, 22,22,22]
    const Card1Colors = ["#F6F6F6"]
    const Card2Colors = ["#F6F6F6"]

    type TrackData = {
        distance: number;
        title: string;
        elevationChange: number | string;
        corners: number | string;
        longestStraight: number | string;
    };
    function getRandomNumber(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    function splitAndCapitalise(input: string): string {
        const words = input.split(/(?=[A-Z])/); // Split at capital letters
        const capitalizedWords = words.map((word) => {
            const firstLetter = word.charAt(0).toUpperCase();
            const restOfWord = word.slice(1).toUpperCase();
            return firstLetter + restOfWord;
        });
        return capitalizedWords.join(' ');
    }
    const checkForNaValues = (data: string | number) => {
        if (typeof data == "string") {
            return "N/A"
        }
        return data + " M"
    }
    const [randomTrackData, setRandomTrackData] = useState(["null"]);
    const [trackTitle, setTrackTitle] = useState(["null"]);
    const [trackSvgPath, setTrackSvgPath] = useState('');
    const removeReverseFromString = (pathString: string) => {
        return pathString.replace(/Reverse$/, '');
    }
    useEffect(() => {
        const randomIndex = getRandomNumber(0, trackData.length - 1);
        const { distance, title, elevationChange, corners, longestStraight } = trackData[randomIndex];

        // Assign values to string array
        const trackInfo = [
            `DISTANCE:`,
            `${checkForNaValues(distance)}`,
            `ELEVATION CHANGE:`,
            `${checkForNaValues(elevationChange)}`,
            `CORNERS:`,
            ` ${corners}`,
            `LONGEST STRAIGHT:`,
             `${checkForNaValues(longestStraight)} `,
        ];
        const trackTitle = [
            `${splitAndCapitalise(title)}`,
        ];
        setRandomTrackData(trackInfo);
        setTrackTitle(trackTitle);

        // Assign track SVG path
        const path = `/images/${removeReverseFromString(title)}.svg`;
        setTrackSvgPath(path);
    }, []);

    return (
        <Box sx={{width:'100%', display:'flex',justifyContent:'right'}}>
            <Box sx={{width:'80%'}}>
            <Grid container spacing={0} sx={{minWidth:'300px'}}>
                <Grid item xs={12}>
                    <Item>
                        <Grid container spacing={0}  >
                        <Grid item xs={12} >
                           
                            <BasicCard ml={0} mt={0} mr={1} fontWeights={['Bold', 'Regular']} noOfLines={1} lineFontSizes={Card1Fonts} lineFontColors={Card2Colors} lineFonts={["Yapari"]} lineContent={trackTitle} lineML={[]} lineMR={[]} lineMT={[]} lineTextAlign={'center'} lineWhiteSpace={['initial',
                                        'pre-line']} justifyContent={"right"}></BasicCard></Grid>
                            <Grid item xs={6}>
                                <ImageBox
                                Width={'100%'}
                                Height={'400px'}
                                MarginRight={'0px'}
                                MarginLeft={'0px'}
                                MarginTop={'0px'}
                                imageSrc={trackSvgPath}
                                objectFit={'fill'}
                                borderRadius={0}
                                ><></></ImageBox>
                            </Grid>
                            <Grid item xs={6}>
                    <ItemInner><BasicCard ml={0} mt={0} mr={0} fontWeights={['Regular', 'Regular']} noOfLines={8} lineFontSizes={Card2Fonts} lineFontColors={Card2Colors} lineContent={randomTrackData} lineML={[]} lineMR={[]} lineMT={[]} lineTextAlign={'right'} lineWhiteSpace={['initial',
                                        'pre-line']} lineFonts={["Yapari", "Yapari", "Yapari", "Yapari"]} justifyContent={"right"}></BasicCard></ItemInner>
                </Grid><Grid item xs={12} > <ItemInnerTopAligned><div style={{ display: 'flex', justifyContent:'right' }}><div  ><Button className="parallelogram-buttonCTA-LG" sx={{positon:'absolute', top:-80}}><Link style={{ color: '#F6F6F6', textDecoration: 'none' }}href="/session-startup">Start Session</Link></Button></div></div></ItemInnerTopAligned></Grid>
                        </Grid>
                    </Item>
                </Grid>
            </Grid>
        </Box>
        </Box>
    );
}

export default HomepageTrack;