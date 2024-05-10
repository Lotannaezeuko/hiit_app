import * as workouts from './workouts.js';

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

// Define UI elements
const ui = {};

// Define templates
const templates = {};

// Helper function to get handles on main UI elements
function getHandles() {
  ui.footer = document.querySelector('footer > nav'); // Update this line
  ui.main = document.querySelector('main');
  // this will store references to each screen element once they are created
  ui.screens = {};
  // helper function to get an array of all the screen elements
  ui.getScreens = () => Object.values(ui.screens);
  // helper function to get an array of all the nav buttons
  ui.getButtons = () => Object.values(ui.buttons);
  templates.screen = document.querySelector('#tmp-screen');
}

// Helper function to build screens/pages
function buildScreens() {
  const template = templates.screen;
  for (const page of pages) {
    const section = template.content.cloneNode(true).firstElementChild;
    const title = section.querySelector('.title');
    title.textContent = page.title;

    section.dataset.id = `sect-${page.screen}`;
    section.dataset.name = page.screen;

    ui.main.append(section);
    ui.screens[page.screen] = section;
  }
}

// Helper function to set up navigation
function setupNav() {
  ui.buttons = {};
  for (const page of pages) {
    // Skip creating buttons for "active-workout" and "hiit" screens
    if (page.screen === 'error' || page.screen === 'active-workout' || page.screen === 'hiit') {
      continue;
    }
    const button = document.createElement('button');
    button.textContent = page.title;
    button.dataset.screen = page.screen;
    button.addEventListener('click', show);
    button.addEventListener('click', storeState);
    ui.footer.append(button);
    ui.buttons[page.screen] = button;
  }
}

// Helper function to fetch screen content
async function fetchScreenContent(s) {
  const url = `/screens/${s}.inc`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.text();
  } else {
    return `sorry, a ${response.status} error ocurred retrieving section data for: <pre>${url}</pre>`;
  }
}

// Helper function to get content for all screens
async function getContent() {
  for (const page of pages) {
    const content = await fetchScreenContent(page.screen);
    const article = document.createElement('article');
    article.innerHTML = content;
    ui.screens[page.screen].append(article);
  }
}

// Helper function to hide all screens
function hideAllScreens() {
  for (const screen of ui.getScreens()) {
    hideElement(screen);
  }
}

// Helper function to enable all buttons
function enableAllButtons() {
  for (const button of ui.getButtons()) {
    button.removeAttribute('disabled');
  }
}

function show(event) {
  ui.previous = ui.current;
  let screen = event?.target?.dataset?.screen ?? 'home';

  // Handle the cases where the screen name is "active-workout" or "hiit"
  if (screen === 'active-workout' || screen === 'hiit') {
    // Perform any necessary actions or transitions for these screens
    // For example, you can navigate to a different screen or show a modal
    screen = 'home'; // Change this to the desired screen or action
  }

  showScreen(screen);
}

// Helper function to show a screen
export function showScreen(name) {
  hideAllScreens();
  enableAllButtons();
  if (!ui.screens[name]) {
    name = 'error';
  }
  showElement(ui.screens[name]);
  ui.current = name;
  document.title = `Utopia Fitness | ${name}`;
  if (name !== 'error') {
    const button = ui.buttons[name];
    if (button) {
      button.disabled = 'disabled';
    }
  }
}

// Helper function to store state in History API
/*
   Store the app's state in the History API to allow the back button
   to work
  */
function storeState() {
  history.pushState(ui.current, ui.current, `/app/${ui.current}`);
}

// Helper function to read path from address bar
function readPath() {
  const path = window.location.pathname.slice(5);
  if (path) {
    return path;
  }
  return 'home';
}

// // Helper function to refresh UI with changes
// function refreshUI(user) {
//   // Implement this function
// }

// Helper function to show element
function showElement(e) {
  e.classList.remove('hidden');
}

/*
    Utility function to hide the specified element
    */
function hideElement(e) {
  e.classList.add('hidden');
}

function loadInitialScreen() {
  ui.current = readPath();
  showScreen(ui.current);
}

/*
    The main function for our app once it runs.
    */
async function main() {
  getHandles();
  buildScreens();
  setupNav();
  await getContent();
  window.addEventListener('popstate', loadInitialScreen);
  loadInitialScreen();
  workouts.pageLoaded();
}

// Start the fitness app
main();
