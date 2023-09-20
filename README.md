# telemetry-frontend
This is the frontend for GTEAM a GT Sport Pitwall and Telemetry Web App


## Purpose
This project takes inspiration from ATLAS (mclaren applied technolgies) and telemetry software like Motec and Track Titan. The aim was to create a web app with functionality between the last two. The project acts as both an experiment with c# and a test of my react and next js understanding. 

It is meant to act as a proof of concept for a semi-pro sim racer or sim racing team. It offers tools for a sim racing team and for individuals looking to improve.

## Table of Content, licesne, credit , how to use
* [Home](#Home)
* [User-Auth](#User-Auth)
* [Session-Startup](#Session-Startup)
* [Session](#Session)
* [Recommended](#Recommended)
* [Review](#Review)
* [Settings](#Settings)
* [Verify](#Verify)
* [Extras](#Extras)
* [Features](#Features/Pages)
### Technology Used

Free M0 Tier mongodb Cluster - Having briefly used mongo during my part time work (2022-23) I was inclined to experiment with it. The free tier has proved fine for my use case up till now. However I do see limitations in future particular with storing large amounts of lapdata for reviewing or for ML purposes.

NodeMailer - This is used for forgot passwords and for verifying emails, when changing emails users are sent an email to the submitted address with a link to the /verify page, this contains a verification token in the url which is matched to a token pushed to mongo to verify the email is real.

BoringAvatars - This was implemented late on during work on challenges, currently it allows users to have a random generated avatar, in future their will be more customisation and this will also be used in the profile page and for any community related content.

@microsoft/signalr - Perhaps the most important part of the application, signalr allows for the connection between the front and backend via a websocket. This is necessary beacuse of the nature of the data. Given there is a constant stream of data a websocket made the most sense for perfomances sake.

@mui - This again was something I became familiar with during my part time work. This is simply used to provide a more consistent user interface and abstract some of the raw css/html to allow for a quicker overall development cycle.

react - Once again something I had some experience with, I wanted to push myself to fully understand the framework, this project has definetly done that allowing me to get to grips with providers, context, apis, useEffects, useRefs, memo etc... Using react again mainly helped to abstract lower level concepts to allow me to work on the UI and UX and reduce development time.

apexcharts - A simple yet responsive chart library again used to abstract the naunce of chart building.

axios - Library used for HTTP requests between front and backend, with the youtube data api and with mongodb.

chroma-js - Provides utilities to do with colour. Used primarly in the tyre temperature gauge. As temperatures reach a target value from cold - target a colour of blue - green is displayed. While hotter temeperatures turn from green to red. This functionality is limited by the inherent data from the game. Initially I did not realise that the games in built tyre temperatures would remain very stable and then peak only when locking up the tyres. Then sharply fall, this leads to very sharp changes in the colour and redces the intended effect of the colours slowly changing as the tyres heat. However the difference in colours still indicates clearly the state of the tyre.

react-youtube - This is used as a small wrapper of the youtube video player api. Mostly used to help formatting for infinite scroll.

### Languages 
Typescript - Again used as a learning oppurtunity having come across it before. Given it is an industry standard it made sense to work forward in this way.

## Features/Pages

### Home

- This contains a hero container with a randomly assigned track, as well as its data + the CTA button to start a session, as users scroll they see a section explaining what the website offers, following this the user sees the (fake) partners of the app and (fake) social media of the app. Then the user sees the (fake) community reviews and another CTA for the recommended page.
![homepage](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/7a561a07-4ac3-4908-a0af-36485630107a)
![responsive-home](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/86473552-b077-4ebb-b575-cc96e14faf23)


### User-Auth 

- User Authentication was built from the ground up. There are various regex patterns used to validate things such as email and passwords. While calls to mongo allow me to check for existing users, emails etc. When all conditions are met users are uploaded to a mongo document. While other files are also created for them, such as a settings collection and setups. Settings are set to an intial object and can be changed later. Users are able to delete their full account (removes all files associated with a user and frees the username for use), delete all their account data(resets the account to all intial values, no lap data etc, username is kept for current user). As well as the option to reset password, email and username.
![login](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/ab594f0d-a048-46eb-8151-96e1627ee457)
![signup](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f932cc93-92e1-4897-8406-0f0ae8ea92a4)
![signup tooltip](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/dfa3fbd5-79f1-4137-baeb-bd8e519f6d82)

### Session-Startup 

- Used to start any session, the other way to start a session is via challenges. This however is the primary way to start a session, users can chose and search for cars, select from all tracks, select a compound to be used and create and select custom setups for the session. Setups are saved for later use and can be refered to at any point once created. This requires a track, car and compound to start a session. Once these conditions are met they are fed to the session page and a session is started. With a new signalr connection being established.
![tire selection](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/1be89159-8eae-417c-bfaa-ab9eac3ff247)
![setup-create](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/28de680d-e47f-4618-a700-25c122b27b62)
![session-start](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/70e41d5d-c59a-4489-a356-220e3e1666da)

### Session

- The main page of this application, it contains 5 tabs, each of which can be switched between easily. The first of which is General, this contains basic streams throttle,brake and speed. As well as tyre temps, a live car on track overaly, lap times (with deltas) + current and suggest gears. 
![general-on](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/9a9e0920-8918-4f47-b0fd-900055439d8d)
![live track](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/098778db-ea93-428c-8fac-3ec9a5a89af8)

The next tab is the Engine tab. It contains oil temp,water temp, oil pressure, turbo pressure, engine RPM etc + importantly the fuel map table. This build of () work. It calculates your fuel consumption based on + - 5 levels from the current level in game. The current level is not supplied by the game so + - is given so users can always see the effects of moving between levels. Each level shows fuel consumption,power, estimated lap time, time remaining on this fuel and laps remaining on the fuel mode.
![removing engine warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/b2542e28-8e1f-44e7-818b-444f96d8129b)
![engine page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/2631f7ce-95d9-4629-b56b-1e8540880cae)

The Gearbox tab contains the total shifts in the lap, the current and suggested gear (from the game), clutch data etc. This is primarly to be used to monitor gearbox health and inform drivers on protecting this. 
![gearbox page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/53932cfb-e557-4cfd-a13b-e9d79bda5ab2)

The final of the streaming pages is the Tyre/Suspension tab. This contains temperatures, revolutions per second, suspension height and tyre radius, these are all mutiline charts wherby all 4 streams are rendered on one chart, given they are heavily related.
![tyre-page](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/e3997df6-9822-487a-825f-fd38347130f2)

The only non streaming tab is the setup tab, it allows users to view the currently selected setup, drivers can then provide feedback on this. Currently this feedback does nothing but it could provide a good training set for ML to set or select setups. 

All the session tabs bar the setup tab contain an active warnings tab. These are values that can be monitored. Users can set an upper and lower limit for all values, these can be adjusted at any point, each tab can also have its warning deleted or users can add new ones. When a limit is exceeded a warning is flashed on screen, this persists across all tabs so no matter the tab the warning and the limit that triggered it is shown, allowing users to focus on data without worrying about always checking these values. 

So when the values are in a dangerous zone a user is quickly informed and can make decisions based on this. All changes are local and do not persist between sessions, however users can alter the default warnings, with all the same functionality from within settings, this allows for customisation before the session starts, these values do persist. 

All warnings can be suppressed or ignored, suppressing a warning pushes it away for a set time, this can be adjsuted in settings, betwen 5 seconds and 30 minutes, after this time it appears again. Ignoring a warning stops it being shown again even if the value changes or gets worse it is not shown again, However adjusting the limits will allow this warning to be shown again.
![first page warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/c0a73f31-a9cb-4ceb-8675-10145a2120ec)
![edit warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/c8f9a8ed-3b9f-43c3-b14d-1cfe79de78af)
![delete warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f741161b-3ed6-4cce-989f-7f990d5c1425)
![tyre-warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/e873f064-d355-49f3-8136-7467348ac2d2)

### Recommended

- Daily refreshed video content using the youtube data api, video content is arranged into an infinite scroll format loading more content as the user scrolls, until content is no longer available. Daily refreshed challenges, three types, consistency, endurance and pace. Each has countdown till the next challenge is available, challenges are locked on completion and at 12:00 pm as the next challenge is loaded. Each challenge starts a session with the randomly assigned car and track (these are picked as part of the daily refresh, from all available content), there is then a display to show the user the progress into the challenge, upon completion the user is redirected to the recommended page where the challenge is now locked and has a golden hue. The challenges work as such Consistency -  The user must maintain three laps in a row at a pace within the randomly allocated % (between 2-5) for example a lap time of 1:40 and 1:41 would be within 1% of each other !chedck!!!  Pace - This challenge requires the user to record a single laptime below the allocated lap time chosen from (110-200) seconds, Endurance -  Users aim to completed between 5-10 laps (randomly assigned).
![challenge-waiting](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/1f068fdb-2479-40df-9638-fd9ab784e242)
![inifintelow](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/04b01bf9-979c-4935-ab4e-884c6d546dc3)

### Review

- Allows users to review laps they have recorded, these are sorted by the date and time they were created with the car, track and laptime also availale. A user can have between 0 and 10 laps stored at this moment in time. This is due to limitations in size of the free mongodb cluster. There is potentialy more available from the cluster however I decided that 10 laps was a sensible limit for the short term. Longer term I aim to increase this to 100-1000. Users have two views available in this page. Each view is the same, within the view the users selects either one or two laps to compare. They can also select around !check!!! 15 data streams to compare. These are plotted as the value of the stream against the approximate distance into the lap it was recorded. 
![review-show](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/ddd3ef45-a2a4-4131-a35b-aab06cc7107f)
![graph-pick](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/df452cef-65f0-4f86-a311-e69cecfff2b3)

### Settings 

- This page contains data related to the users account (eg deletion), user data (eg opting in and out of lap pushing to mongo), alerts (altering the values of warnings and warning refresh rate), defaults (change IP address of the console and a toggle between imperial and metric data) as well as the appearance tab which allows users to switch between light and dark mode.
![settings-limits](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/24cf40ab-129f-4fba-8281-7cebb4085a05)
![serious-warning](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/30107fc6-ce9e-4962-ac97-75a736161324)
![moresettings](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/f899b7be-c6d5-4424-937f-7555a6512528)


### Verify
Verify - Simply used in the email verification process to allow users to confirm, or provide alerts as to why this has failed.
![email-verify](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/38718415-db3d-4531-8ec4-f79210a0c1aa)

## Extras
- All pages have a fully responsive design, allowing for users to still access the same functionality while resizing the tabs in case other tabs are needed at the same time.
  ![test](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/830b98a1-014c-4304-b92b-080daa49de50)
  ![session-startup-responsive](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/8f60dbf6-04c3-4e71-8608-982583ad0a7f)
- Light/Dark mode, all pages are responsive to the mode selection and content is configured to match.
![footer-lightmode](https://github.com/mbm60-max/telemetry-frontend/assets/118545306/10babc12-5946-4ed3-bf6d-7090d08224be)






