// Helper function to store state in History API
export function storeState() {
  history.pushState(ui.current, ui.current, `/app/${ui.current}`);
}

// Helper function to read path from address bar
export function readPath() {
  const path = window.location.pathname.slice(5);
  if (path) {
    return path;
  }
  return 'home';
}

// Helper function to show element
export function showElement(e) {
  e.classList.remove('hidden');
}

// Helper function to hide element
export function hideElement(e) {
  e.classList.add('hidden');
}
