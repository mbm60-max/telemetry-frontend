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


#### Responsive 

![test](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/830b98a1-014c-4304-b92b-080daa49de50)
![session-startup-responsive](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/8f60dbf6-04c3-4e71-8608-982583ad0a7f)
![tire selection](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/1be89159-8eae-417c-bfaa-ab9eac3ff247)
![setup-create](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/28de680d-e47f-4618-a700-25c122b27b62)
![session-start](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/70e41d5d-c59a-4489-a356-220e3e1666da)
![review-show](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/ddd3ef45-a2a4-4131-a35b-aab06cc7107f)
![settings-limits](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/24cf40ab-129f-4fba-8281-7cebb4085a05)
![serious-warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/30107fc6-ce9e-4962-ac97-75a736161324)
![moresettings](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f899b7be-c6d5-4424-937f-7555a6512528)
![footer-lightmode](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/10babc12-5946-4ed3-bf6d-7090d08224be)
![homepage](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/7a561a07-4ac3-4908-a0af-36485630107a)
![login](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/ab594f0d-a048-46eb-8151-96e1627ee457)
![signup](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f932cc93-92e1-4897-8406-0f0ae8ea92a4)
![challenge-waiting](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/1f068fdb-2479-40df-9638-fd9ab784e242)
![responsive-home](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/86473552-b077-4ebb-b575-cc96e14faf23)
![graph-pick](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/df452cef-65f0-4f86-a311-e69cecfff2b3)
![email-verify](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/38718415-db3d-4531-8ec4-f79210a0c1aa)
![signup tooltip](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/dfa3fbd5-79f1-4137-baeb-bd8e519f6d82)
![inifintelow](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/04b01bf9-979c-4935-ab4e-884c6d546dc3)
![first page warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/c0a73f31-a9cb-4ceb-8675-10145a2120ec)
![edit warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/c8f9a8ed-3b9f-43c3-b14d-1cfe79de78af)
![delete warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f741161b-3ed6-4cce-989f-7f990d5c1425)
![general-on](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/9a9e0920-8918-4f47-b0fd-900055439d8d)
![removing engine warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/b2542e28-8e1f-44e7-818b-444f96d8129b)
![engine page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/2631f7ce-95d9-4629-b56b-1e8540880cae)
![gearbox page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/53932cfb-e557-4cfd-a13b-e9d79bda5ab2)
![live track](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/098778db-ea93-428c-8fac-3ec9a5a89af8)

![tyre-page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/e3997df6-9822-487a-825f-fd38347130f2)
![tyre-warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/e873f064-d355-49f3-8136-7467348ac2d2)

