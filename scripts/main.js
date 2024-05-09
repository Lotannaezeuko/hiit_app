import * as uiModule from './ui.js';
import * as navigationModule from './navigation.js';
import * as contentModule from './content.js';
import * as hiitModule from './hiit.js';
import * as timerModule from './timer.js';
import * as utils from './utils.js';

// Define pages configuration
const pages = [
  {
    screen: 'home',
    title: 'Home',
  },
  {
    screen: 'hiit',
    title: 'hiit',
  },
  {
    screen: 'create-hiit',
    title: 'Create HIIT',
  },
  {
    screen: 'saved',
    title: 'Saved HIITs',
  },
  {
    screen: 'active-workout',
    title: 'Active Workout',
  },
];

function loadInitialScreen() {
  const currentPath = utils.readPath();
  contentModule.showScreen(currentPath);
}

function main() {
  uiModule.getHandles();
  uiModule.buildScreens();
  navigationModule.setupNav();
  contentModule.getContent();
  window.addEventListener('popstate', loadInitialScreen);
  loadInitialScreen();
  hiitModule.pageLoaded();
}

// Start the fitness app
main();
