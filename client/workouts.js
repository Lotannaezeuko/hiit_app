import { showScreen } from './script.js';

let workouts;

async function addHIIT() {
  // Get input values from the form
  const name = document.querySelector('#folderName').value;
  const description = document.querySelector('#folderDescription').value;


  // Create an object representing the new HIIT
  const newHIIT = {
    name,
    description,
  };

  // Make an HTTP POST request to the server endpoint to add the new HIIT
  const response = await fetch('/hiit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newHIIT),
  });

  // Check if the request was successful
  if (response.ok) {
    // Clear input fields
    document.querySelector('#folderName').value = '';
    document.querySelector('#folderDescription').value = '';

    // Retrieve the created HIIT from the server response
    const createdHIIT = await response.json();
    console.log('New HIIT created:', createdHIIT);
    showHiitPopup(createdHIIT); // Pass the HIIT name to the showPopup function
    getHIITs(); // Optionally, update the UI
    openHIIT(createdHIIT.id, name);
    showScreen('hiit');

    // Optionally, perform additional actions such as updating the UI
  } else {
    // Handle error if the request was not successful
    console.error('Failed to add HIIT:', response.statusText);
  }
}
async function getHIITs() {
  try {
    const response = await fetch('/hiit');
    if (!response.ok) {
      throw new Error('Failed to fetch HIITs');
    }
    const hiits = await response.json();
    // Do something with the HIITs data, such as displaying them on the UI
    console.log('HIITs:', hiits);
    localStorage.setItem('hiits', JSON.stringify(hiits));
    renderHIITs(hiits);
  } catch (error) {
    console.error('Error fetching HIITs:', error);
  }
}

// Function to check if a HIIT is customisable
async function isCustomisableHIIT(hiitId) {
  try {
    // Make a fetch request to the server to get the details of the HIIT
    const response = await fetch(`/hiit/${hiitId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch HIIT details');
    }
    const hiitData = await response.json();
    // Check if the HIIT is customisable based on the customisable property
    const isCustomisable = hiitData.customisable === 1;
    return isCustomisable;
  } catch (error) {
    console.error('Error checking if HIIT is customisable:', error);
    return false; // Return false in case of error
  }
}

function showHiitPopup(hiitName) {
  const popup = document.querySelector('#createHiitPopup');
  const popupMessage = document.querySelector('#createHiitPopupMessage');
  popupMessage.textContent = `${hiitName} HIIT successfully created!`;
  popup.classList.remove('hidden');
  setTimeout(() => {
    popup.classList.add('hidden');
  }, 3000); // 3 seconds
}

function renderHIITs(hiits) {
  const hiitsContainer = document.querySelector('#hiitsContainer');
  const bookmarksContainer = document.querySelector('#bookmark');

  hiitsContainer.innerHTML = ''; // Clear existing content
  bookmarksContainer.innerHTML = ''; // Clear existing content in the bookmarks container

  hiits.forEach(hiit => {
    const hiitCard = document.createElement('div');
    hiitCard.classList.add('hiit-card');

    const hiitName = document.createElement('h3');
    hiitName.textContent = hiit.name;
    hiitCard.appendChild(hiitName);

    const hiitDescription = document.createElement('p');
    hiitDescription.textContent = hiit.description;
    hiitCard.appendChild(hiitDescription);

    // Add click event listener to open the HIIT details
    hiitCard.addEventListener('click', () => {
      openHIIT(hiit.id, hiit.name);
      showScreen('hiit');
    });

    // Check if the HIIT is customisable
    if (hiit.customisable === 1) {
      // If customisable, render in the bookmarks container
      bookmarksContainer.appendChild(hiitCard);
      addDeleteButtons(hiitCard, hiit.id, hiit.name);
    } else {
      // If not customisable, render in the home container
      hiitsContainer.appendChild(hiitCard);
    }
  });
}

async function addDeleteButtons(hiitCard, hiitId, hiitName) {
  // Check if the HIIT is customisable
  const isCustomisable = await isCustomisableHIIT(hiitId);

  if (isCustomisable) {
    // Create delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent card click event
      deleteHIIT(hiitId);
      console.log('Delete HIIT:', hiitId, hiitName);
    });
    hiitCard.appendChild(deleteButton);
  }
}

async function addToHiit(workout, hiitId, hiitName) {
  const durationInput = document.querySelector(`#duration${workout.id}`);
  const duration = durationInput.value;

  // Make a fetch request to add the workout to HIIT
  try {
    const response = await fetch('/hiit/workouts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hiitId, workoutId: workout.id, duration }),
    });

    if (!response.ok) {
      throw new Error('Failed to add workout to HIIT');
    }

    // Optionally, update the UI to indicate success
    console.log(`Workout ${workout.name} added to HIIT with duration ${duration} seconds`);
    openHIIT(hiitId, hiitName);
    showWorkoutPopup(workout.name);
  } catch (error) {
    console.error('Error adding workout to HIIT:', error);
  }
}

function showWorkoutPopup(workoutName) {
  const popup = document.querySelector('#addWorkoutPopup');
  const popupMessage = document.querySelector('#addWorkoutPopupMessage');
  popupMessage.textContent = `${workoutName} added to HIIT!`;

  // Show the popup
  popup.classList.remove('hidden');
  setTimeout(() => {
    // Hide the popup after 3 seconds
    popup.classList.add('hidden');
  }, 3000);
}

function renderWorkouts(workouts, isCustomisable, hiitId, hiitName) {
  const hiitDisplay = document.querySelector('#hiitDisplay');
  workouts.forEach(workout => {
    const workoutItem = document.createElement('div');
    workoutItem.classList.add('workout-item');

    const workoutName = document.createElement('h4');
    workoutName.textContent = workout.name;
    workoutItem.appendChild(workoutName);

    const workoutDescription = document.createElement('p');
    workoutDescription.textContent = workout.description;
    workoutItem.appendChild(workoutDescription);

    const workoutDuration = document.createElement('p');
    workoutDuration.textContent = `Duration: ${workout.duration} seconds`;
    workoutItem.appendChild(workoutDuration);

    if (isCustomisable) {
      // Add edit and delete buttons for customisable HIITs
      addWorkoutDeleteButtons(workoutItem, hiitId, workout.id, hiitName);
    }

    hiitDisplay.appendChild(workoutItem); // Append workout item directly to body
  });
}

function addWorkoutDeleteButtons(workoutItem, hiitId, workoutId, hiitName) {
  // Create delete button
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.classList.add('delete-btn');
  workoutItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', () => {
    deleteWorkoutInHiit(hiitId, workoutId);
    openHIIT(hiitId, hiitName);
    console.log('Delete workout:', workoutId);
  });

  // Return the buttons
  return [deleteButton];
}

async function openHIIT(hiitId, hiitName) {
  try {
    const isCustomisable = await isCustomisableHIIT(hiitId);
    const hiitDisplay = document.querySelector('#hiitDisplay');
    hiitDisplay.innerHTML = '';

    const hiitDetailsContainer = document.createElement('div');
    hiitDetailsContainer.classList.add('hiit-details');

    // Display the HIIT name as a title
    const hiitTitle = document.createElement('h2');
    hiitTitle.textContent = hiitName;
    hiitDetailsContainer.appendChild(hiitTitle);

    // Making the start HIIT Button
    const startHIITButton = document.createElement('button');
    startHIITButton.textContent = 'Start HIIT';
    startHIITButton.addEventListener('click', () => {
      addRecentHiit({ id: hiitId, name: hiitName });
      startTimer(workouts);
      showScreen('active-workout');
    });
    hiitDetailsContainer.appendChild(startHIITButton);
    hiitDisplay.appendChild(hiitDetailsContainer);

    // Fetch workouts for the selected HIIT
    const workouts = await fetchWorkoutsInHIIT(hiitId);
    // Render the fetched workouts
    renderWorkouts(workouts, isCustomisable, hiitId, hiitName);

    // Check if the HIIT is customisable
    if (isCustomisable) {
      appendWorkoutSection();
    }

    // Add event listener to the add to Hiit button for every HIIT
    const searchButton = document.querySelector('.searchButton');
    if (searchButton) {
      searchButton.addEventListener('click', () => searchWorkouts(hiitId, hiitName));
    }
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
}

function appendWorkoutSection() {
  const hiitDetailsContainer = document.querySelector('.hiit-details');

  const addWorkoutSection = document.createElement('section');
  addWorkoutSection.classList.add('addWorkout');

  // Create and append the Add Workout title
  const addWorkoutTitle = document.createElement('h2');
  addWorkoutTitle.textContent = 'Add Workout and Rests';
  addWorkoutSection.append(addWorkoutTitle);

  // Create and append the search input
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.classList.add('searchInput');
  searchInput.placeholder = 'Search for workouts';
  addWorkoutSection.append(searchInput);

  // Create and append the search button
  const searchButton = document.createElement('button');
  searchButton.textContent = 'Search';
  searchButton.classList.add('searchButton');
  addWorkoutSection.append(searchButton);

  // Create and append the container for searched workouts
  const searchedWorkoutsContainer = document.createElement('div');
  searchedWorkoutsContainer.classList.add('searchedWorkouts');
  addWorkoutSection.append(searchedWorkoutsContainer);

  // Append the Add Workout section to the hiit details container
  hiitDetailsContainer.append(addWorkoutSection);
}

let timerInterval; // Define timerInterval outside of the function
let isPaused = false; // Add a flag to track if the timer is paused

function startTimer(workouts) {
  let currentExerciseIndex = 0;
  let currentDuration = workouts[currentExerciseIndex].duration;
  const timerDisplay = document.querySelector('#timerDisplay');
  const timerButtonsDisplay = document.querySelector('#timerButtons');
  const instructionDisplay = document.querySelector('#instructionDisplay');
  const workoutNameDisplay = document.querySelector('#workoutNameDisplay');
  const nextWorkoutDisplay = document.querySelector('#nextWorkoutDisplay');

  const instructionsList = document.createElement('ul');
  instructionDisplay.appendChild(instructionsList);

  // Create the Pause and Restart buttons
  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('timer-buttons');

  const pauseButton = document.createElement('button');
  pauseButton.textContent = 'Pause';
  pauseButton.id = 'pauseTimer';
  buttonContainer.appendChild(pauseButton);

  const restartButton = document.createElement('button');
  restartButton.textContent = 'Restart';
  restartButton.id = 'restartTimer';
  buttonContainer.appendChild(restartButton);

  timerButtonsDisplay.append(buttonContainer);

  // Update the next workout display and instructions initially
  updateNextWorkoutDisplay(currentExerciseIndex, workouts, nextWorkoutDisplay);
  updateInstructions(workouts[currentExerciseIndex].instructions, instructionsList);

  // Function to update the timer display and handle workout progress
  function updateTimer() {
    if (!isPaused) {
      const minutes = Math.floor(currentDuration / 60);
      const seconds = currentDuration % 60;
      timerDisplay.textContent = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

      if (currentDuration <= 0) {
        clearInterval(timerInterval);
        timerDisplay.textContent = '00:00'; // Set the timer display to 00:00 when finished
        currentExerciseIndex++;
        if (currentExerciseIndex < workouts.length) {
          workoutNameDisplay.textContent = workouts[currentExerciseIndex].name;
          currentDuration = workouts[currentExerciseIndex].duration;

          updateNextWorkoutDisplay(currentExerciseIndex, workouts, nextWorkoutDisplay);
          updateInstructions(workouts[currentExerciseIndex].instructions, instructionsList);

          startNextTimer();
        } else {
          timerDisplay.textContent = '00:00'; // Set the timer display to 00:00 when all workouts are finished
          console.log('All workouts finished!');
          document.body.classList.add('workouts-finished'); // Add a class to the body when workouts are finished
        }
      }

      currentDuration--;
    }
  }

  // Function to start the timer
  function startNextTimer() {
    currentDuration = workouts[currentExerciseIndex].duration;
    timerInterval = setInterval(updateTimer, 1000);
    isPaused = false;
  }

  // Pause timer functionality
  pauseButton.addEventListener('click', () => {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
  });

  // Restart timer functionality
  restartButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    currentExerciseIndex = 0;
    currentDuration = workouts[currentExerciseIndex].duration;
    updateInstructions(workouts[currentExerciseIndex].instructions, instructionsList);
    workoutNameDisplay.textContent = workouts[currentExerciseIndex].name;
    timerDisplay.textContent = '00:00'; // Set the timer display to 00:00 when restarting
    isPaused = false;
    updateNextWorkoutDisplay(currentExerciseIndex, workouts, nextWorkoutDisplay);
    startNextTimer();
    document.body.classList.remove('workouts-finished'); // Remove the class when restarting
  });

  // Manually update the initial workout information and start the first timer
  workoutNameDisplay.textContent = workouts[currentExerciseIndex].name;
  startNextTimer();
}

// Helper function to update the next workout display
function updateNextWorkoutDisplay(currentIndex, workouts, nextWorkoutDisplay) {
  const nextWorkoutIndex = currentIndex + 1;

  if (nextWorkoutIndex < workouts.length) {
    nextWorkoutDisplay.textContent = `Next: ${workouts[nextWorkoutIndex].name}`;
  } else if (currentIndex === 0) {
    nextWorkoutDisplay.textContent = 'Get ready for your first workout!';
  } else {
    nextWorkoutDisplay.textContent = 'No workouts left!'; // Display '00:00' instead of 'All workouts completed!'
  }
}

// Function to update the instructions list
function updateInstructions(instructions, instructionsList) {
  // Clear the existing instructions
  instructionsList.innerHTML = '';

  // Split the instructions by the newline character '\n'
  const instructionLines = instructions.split('\\n');

  // Create a list item for each instruction line
  instructionLines.forEach((line) => {
    if (line.trim() !== '') {
      const listItem = document.createElement('li');
      listItem.textContent = line.trim();
      instructionsList.appendChild(listItem);
    }
  });
}

async function fetchWorkoutsInHIIT(hiitId) {
  try {
    const response = await fetch(`/hiit/${hiitId}/workouts`);
    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }
    const workoutsInHIIT = await response.json();
    console.log('Workouts in HIIT:', workoutsInHIIT);
    return workoutsInHIIT;
  } catch (error) {
    console.error('Error fetching workouts:', error);
    return [];
  }
}

async function getWorkouts() {
  try {
    const response = await fetch('/workouts');
    if (!response.ok) {
      throw new Error('Failed to fetch workouts');
    }
    const workouts = await response.json();
    // Do something with the workouts data, such as displaying them on the UI
    // console.log('Workouts:', workouts);
    return workouts;
  } catch (error) {
    console.error('Error fetching workouts:', error);
  }
}

function searchWorkouts(hiitId, hiitName) {
  const input = document.querySelector('.searchInput').value;
  const filteredWorkouts = workouts.filter(workout => workout.name.toLowerCase().includes(input.toLowerCase()));

  if (filteredWorkouts.length === 0) {
    displayNoSearchResultsMessage();
  } else {
    displaySearchedWorkouts(filteredWorkouts, hiitId, hiitName);
  }

  return filteredWorkouts;
}

function displayNoSearchResultsMessage() {
  const searchedWorkoutsContainer = document.querySelector('.searchedWorkouts');
  searchedWorkoutsContainer.innerHTML = '<p>No workouts found, we are adding more workouts soon. Try searching for another!</p>';
}

function displaySearchedWorkouts(filteredWorkouts, hiitId, hiitName) {
  const searchedWorkoutsContainer = document.querySelector('.searchedWorkouts');
  searchedWorkoutsContainer.innerHTML = ''; // Clear existing content

  filteredWorkouts.forEach(workout => {
    const workoutItem = document.createElement('div');
    workoutItem.classList.add('workout-item');

    const workoutName = document.createElement('p');
    workoutName.textContent = `Name: ${workout.name}`;
    workoutItem.appendChild(workoutName);

    const workoutDescription = document.createElement('p');
    workoutDescription.textContent = `Description: ${workout.description}`;
    workoutItem.appendChild(workoutDescription);

    const durationLabel = document.createElement('label');
    durationLabel.setAttribute('for', `duration${workout.id}`);
    durationLabel.textContent = 'Duration:';

    const durationInput = document.createElement('input');
    durationInput.setAttribute('type', 'text');
    durationInput.setAttribute('id', `duration${workout.id}`);
    durationInput.setAttribute('placeholder', 'Enter duration in seconds');

    workoutItem.appendChild(durationLabel);
    workoutItem.appendChild(durationInput);

    const addToHiitButton = document.createElement('button');
    addToHiitButton.classList.add('add-to-hiit-button');
    addToHiitButton.textContent = 'Add to HIIT';
    addToHiitButton.addEventListener('click', () => addToHiit(workout, hiitId, hiitName));
    workoutItem.appendChild(addToHiitButton);

    searchedWorkoutsContainer.appendChild(workoutItem);
  });
}


// Function to get the six most recently played HIITs from local storage
function getRecentHiits() {
  const recentHiits = JSON.parse(localStorage.getItem('recentHiits')) || [];
  return recentHiits.slice(0, 6); // Get the latest six HIITs
}

// Function to display the six most recently played HIITs
function displayRecentHiits() {
  const recentHiitsContainer = document.querySelector('#recentHiitsContainer');
  recentHiitsContainer.innerHTML = ''; // Clear previous content

  const recentHiits = getRecentHiits();
  recentHiits.forEach(hiit => {
    const section = document.createElement('section');
    section.classList.add('hiit-card');

    const cardTitle = document.createElement('h3');
    cardTitle.textContent = hiit.name;
    section.appendChild(cardTitle);

    const cardDescription = document.createElement('p');
    cardDescription.textContent = hiit.description;
    section.appendChild(cardDescription);

    section.addEventListener('click', () => {
      openHIIT(hiit.id, hiit.name);
      showScreen('hiit');
    });

    recentHiitsContainer.appendChild(section);
  });
}

// Function to add a HIIT to the list of recently played HIITs
function addRecentHiit(hiit) {
  const recentHiits = getRecentHiits();
  recentHiits.unshift(hiit); // Add new HIIT to the beginning of the array
  localStorage.setItem('recentHiits', JSON.stringify(recentHiits));
  displayRecentHiits();
}

function updateRecentHiits(deletedHiitId) {
  const recentHiits = getRecentHiits();
  const updatedRecentHiits = recentHiits.filter(hiit => hiit.id !== deletedHiitId);
  localStorage.setItem('recentHiits', JSON.stringify(updatedRecentHiits));
  displayRecentHiits();
}

function addEventListeners() {
  document.querySelector('#createFolderButton').addEventListener('click', () => addHIIT());
}

// functions to handle the deleting, edting of a HIIT and workouts

async function deleteWorkoutInHiit(hiitId, workoutId) {
  try {
    const response = await fetch(`/hiit/${hiitId}/workouts/${workoutId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ hiitId, workoutId }),
    });
    if (!response.ok) {
      throw new Error('Failed to delete workout');
    }
    console.log('Workout deleted successfully');

    // Optionally, perform additional actions after successful deletion
  } catch (error) {
    console.error('Error deleting workout:', error);
  }
}

async function deleteHIIT(hiitId) {
  try {
    const response = await fetch(`/hiit/${hiitId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete HIIT');
    }

    // Optionally, handle success response
    console.log('HIIT deleted successfully');
    getHIITs(); // Update the list of HIITs

    // Update the recent HIITs list
    updateRecentHiits(hiitId);
  } catch (error) {
    console.error('Error deleting HIIT:', error);
  }
}

// Function to be called when the page is loaded
export async function pageLoaded() {
  workouts = await getWorkouts();
  addEventListeners();
  getHIITs();
  displayRecentHiits();
}

// pageLoaded();
