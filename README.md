# telemetry-frontend
This is the frontend for GTEAM a GT Sport Pitwall and Telemetry Web App


### Purpose
This project takes inspiration from ATLAS (mclaren applied technolgies) and telemetry software like Motec and track titan. The aim was to create something between the last two. The project acts as both an experiment with c# and a test of my react and next js understanding. 

It is meant to act as a proof of concept for a semi-pro sim racer or sim racing team. 
### Technology Used

Free M0 Tier mongodb Cluster - 
NodeMailer - 
BoringAvatars -
@microsoft/signalr -
@mui -
react -
apexcharts -
axios -
chroma-js - 
react-youtube -

### Languages 
typescript

### (Features and Pages)
#### Main
Custom User Auth - 
Session Page -

Recommended Page - Daily refreshed video content using the youtube data api, video content is arranged into an infinite scroll format loading more content as the user scrolls, until content is no longer available. Daily refreshed challenges, three types, consistency, endurance and pace. Each has countdown till the next challenge is available, challenges are locked on completion and at 12:00 pm as the next challenge is loaded. Each challenge starts a session with the randomly assigned car and track (these are picked as part of the daily refresh, from all available content), there is then a display to show the user the progress into the challenge, upon completion the user is redirected to the recommended page where the challenge is now locked and has a golden hue. The challenges work as such Consistency -  The user must maintain three laps in a row at a pace within the randomly allocated % (between 2-5) for example a lap time of 1:40 and 1:41 would be within 1% of each other !chedck!!!  Pace - This challenge requires the user to record a single laptime below the allocated lap time chosen from (110-200) seconds, Endurance -  Users aim to completed between 5-10 laps (randomly assigned).

Review Page - Allows users to review laps they have recorded, these are sorted by the date and time they were created with the car, track and laptime also availale. A user can have between 0 and 10 laps stored at this moment in time. This is due to limitations in size of the free mongodb cluster. There is potentialy more available from the cluster however I decided that 10 laps was a sensible limit for the short term. Longer term I aim to increase this to 100-1000. Users have two views available in this page. Each view is the same, within the view the users selects either one or two laps to compare. They can also select around !check!!! 15 data streams to compare. These are plotted as the value of the stream against the approximate distance into the lap it was recorded.
Settings Page - 
#### Other
Verify -
Session Startup -



