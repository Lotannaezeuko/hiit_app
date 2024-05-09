import * as utils from './utils.js';

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
