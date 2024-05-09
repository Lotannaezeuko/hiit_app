import * as utils from './utils.js';

// Define UI elements
const ui = {};

// Helper function to fetch screen content
async function fetchScreenContent(s) {
  const url = `/screens/${s}.inc`;
  const response = await fetch(url);
  if (response.ok) {
    return await response.text();
  } else {
    return `sorry, a ${response.status} error occurred retrieving section data for: <pre>${url}</pre>`;
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
    utils.hideElement(screen);
  }
}

// Helper function to enable all buttons
function enableAllButtons() {
  for (const button of ui.getButtons()) {
    button.removeAttribute('disabled');
  }
}

// Helper function to show a screen
export function showScreen(name) {
  hideAllScreens();
  enableAllButtons();
  if (!ui.screens[name]) {
    name = 'error';
  }
  utils.showElement(ui.screens[name]);
  ui.current = name;
  document.title = `Utopia Fitness | ${name}`;
  if (name !== 'error') {
    const button = ui.buttons[name];
    if (button) {
      button.disabled = 'disabled';
    }
  }
}

export { getContent };