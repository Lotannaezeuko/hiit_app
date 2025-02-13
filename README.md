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

-Reasoning: By streamlining the creation process with clear instructions and intuitive controls, we ensure that users of all skill levels can easily customize their workouts to fit their preferences and goals. This design approach prioritizes user empowerment and flexibility, allowing individuals to take ownership of their fitness journey with confidence.

### Starting your workouts
- Click on the start HIIT button.
- Users are taken to the active-workout page.
- A countdown timer, timer buttons, workout instructions, and next workout name is displayed.
- The time of the workouts are accurately kept.
- Users are kept informed about what they are meant to do, and when to change workouts.

- Reasoning: We designed this feature to provide users with a seamless transition from planning to action. By presenting relevant workout details prominently and ensuring accurate timing, we aim to keep users focused and motivated throughout their workout sessions. Clear communication and intuitive layout enhance user engagement and overall satisfaction.


### Record keeping
- On the home page, there is a recent HIITs section that shows users their six most recently performed HIITs.

- Reasoning: We incorporated this feature to facilitate easy access to users' workout history, fostering a sense of progress and accountability. 

### Visual cues
- Users can toggle the instructions and next workout from showing which makes the timer bigger. 

- Reasoning: We included this feature to accommodate different user preferences and workout environments. By providing the flexibility to customize the display based on individual needs, we empower users to optimize their workout experience for maximum efficiency and enjoyment. This design approach promotes user-centricity and enhances overall usability.

### Persistent Workout Data Storage
- Users can access their custom workouts anywhere and anytime from any device with an internet connection. 

- Reasoning: We included this feature to accommodate different user preferences and workout environments. By providing the flexibility to customize the display based on individual needs, we empower users to optimize their workout experience for maximum efficiency and enjoyment. This design approach promotes user-centricity and enhances overall usability.

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


## RESTful API Design and Backend Integration
- To facilitate the posting and retrieval of HIITs, we've implemented a RESTful API on our backend, supported by an Express server for routing. Here's an overview of how it works:

1. Express Server Setup: We've configured an Express server to handle incoming requests and route them to the appropriate endpoints.
2. API Endpoints: Our API includes endpoints for posting and retrieving HIITs. For example:
  - POST /hiits: Allows users to create and save custom HIITs by sending a POST request with the HIIT data.
  - GET /hiits: Retrieves a list of HIITs stored in the database, allowing users to access their saved workouts.
3. Backend Database Integration: We've integrated our Express server with a backend database (e.g., MongoDB) to store and retrieve HIIT data efficiently.
4. Error Handling: Our API includes robust error handling to gracefully handle invalid requests, database errors, and other potential issues, providing informative error messages to users when necessary.

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

- A bug where users toggle the information off in the active-workouts screen and then restart their workout, appears. This does allow users to see their instructions for the remaining duration of the HIIT. This would need to be fixed.

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

> Please help generate the design and reasoning section of the read me based on my css code.

### Acknowledgements
For the one page design - Matt Dennis (simple-one-page) https://github.com/portsoc/simple-one-page

ChatGPT
OpenAI. (2024). GPT-4 Technical Report. ArXiv:2303.08774 [Cs]. https://arxiv.org/abs/2303.08774