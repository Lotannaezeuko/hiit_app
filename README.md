# HIIT up2091770

## About Utopia Fitness
As the creator of this dynamic fitness app, I am driven by a passion for empowering individuals to take control of their health and fitness journeys. 
With a keen understanding of the needs of intermediate-level users, I've crafted an intuitive platform that seamlessly integrates customizable workouts while also providing a wealth of sample HIIT routines for beginners.
My dedication to user-centric design ensures that every feature serves a purpose, from the intuitive timer interface to the comprehensive workout history and analytics. 
With a focus on simplicity and effectiveness, my goal is to provide users with the tools they need to achieve their fitness goals with confidence and convenience.

## Key features

### Creating custom HIITs
- Our app empowers users to craft personalized HIITs effortlessly. 
- Simply head to the "Create HIIT" page, name your session, and add a brief description. 
- Search for a wide range of workouts, set a duration and add it to your HIIT.
- Repeat this till you are done with customising your HIIT.
- Start your HIIT!

### Starting your workouts
- Click on the start HIIT button.
- Users are taken to the active-workout page.
- A countdown timer, timer buttons, workout instructions, and next workout name is displayed.
- The time of the workouts are accurately kept.
- Users are kept informed about what they are meant to do, and when to change workouts,

### Record keeping
- On the home page, there is a recent HIITs section that shows users their six most recently performed HIITs.

### Visual cues
-vUsers can toggle the instructions and next workout from showing which makes the timer bigger. 
- Users screen colours change upon the transition of a workout so they can see it is time to do the next activity. 

### Persistent Workout Data Storage
-cUsers can access their custom workouts anywhere and anytime from any device with an internet connection. 

## Installation
These are the basic steps that you have to follow to run the application.
1. Install NPM packages
   ```sh
   npm install
   ```
2. Start the Application 
    ```sh
    npm run start
    ```
3. Click the link to go to the application
    https://localhost:8080

## How To Use

### Using Github
  1. Clone the repository to your local machine.
  2. Run `npm install` to install the necessary dependencies.
  3. Run `npm run start` to start the app.
  4. Open `http://localhost:8080` in your web browser.
  5. Create a new HIIT in the create a HIIT page.
  6. Start adding workouts.
  7. Start your HIIT.

#### Download Zip

  1. Download the zip folder
  2. Unzip the folder
  3. Open the folder in your terminal
  4. Run `npm install` to start the app.
  5. Run `npm start` to start the app.
  6. Open `http://localhost:8080` in your web browser.
  7. Create a new HIIT in the create a HIIT page.
  8. Start adding workouts.
  9. Start your HIIT.



## Design and Usability

### Clean UI
The app has a clean, minimalistic UI to help users focus on the core functionality.

### Responsive
Designed for optimal viewing across devices - desktop, tablet, and mobile.

### Easy Navigation
Intuitive bottom navigation bar with labeled buttons for quick access to different sections.

### Familiar Patterns
Uses common UI elements and patterns for a smooth learning curve.

### Visual Hierarchy
Clear distinction between sections, content types, and interactive elements through typography, spacing, and color.

### Accessibility
Follows accessibility best practices, including proper contrast, alt text, and keyboard navigation.

### User Feedback
Provides clear success/error messages, loading indicators, and progress bars.
The aim is to offer an enjoyable and efficient experience for creating and managing HIITs.

## Improvements from last prototype
### What changed
- I updated my html page and css to give my users a better visual and usable experience.
- I added routing and navigations to make my app a single page app.
- I modularised my code to make it more functional and easier to read.
- I added pause and restart buttons to my timer.
- I fixed bugs relating to the accessing of my HIITs and workouts.
- I added a history section to show the past HIITs of my users.

## Future Work
- While our app currently offers a robust set of features designed to elevate your fitness experience, there's always room for improvement and expansion. One area we're committed to enhancing in future iterations is user verification. Although we couldn't finalize its implementation in this version, rest assured that our database infrastructure is primed and ready to seamlessly integrate advanced user verification protocols when the time comes. By prioritizing security and user privacy, we aim to provide peace of mind while ensuring a smooth and secure user experience. 

- We plan to implement the sharing of workouts between users so they can participate in the exact same workouts as their friends. 

- We also frequently update our servers with new HIITs and workouts to choose from and explore.

## AI

### CSS Styling
A sequence of prompts helped me develop this feature:

>  Prompt that was sent to chat bot
Change the styling of my app to used some shades of green.


### Modularisation
For the modularisation of my code, i requested the chat bot to give an example module of how i can structure my code

> Give me the structure to modularise my code.

### Database Mock Data population 
The prompt sent to the chat bot.

> Make me a table called workouts with an id, name, description and instructions field and fill it with dummy data.

### Timer Bugs

> Please help me fix my timer and make it show the details of the next workout.

### README

> Please help generate the design section of the read me based on my css code.

### Acknowledgements
For the one page design - Matt Dennis (simple-one-page) https://github.com/portsoc/simple-one-page

ChatGPT
OpenAI. (2023). GPT-4 Technical Report. ArXiv:2303.08774 [Cs]. https://arxiv.org/abs/2303.08774