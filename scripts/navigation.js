import * as utils from './utils.js';
import * as hiitModule from './hiit.js';
import { showScreen } from './content.js';

// Define UI elements
const ui = {};

// Helper function to set up navigation
function setupNav() {
  ui.footer = document.querySelector('footer > nav');
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
    button.addEventListener('click', utils.storeState);
    ui.footer.append(button);
    ui.buttons[page.screen] = button;
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

export { setupNav };