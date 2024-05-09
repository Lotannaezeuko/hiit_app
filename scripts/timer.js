import * as utils from './utils.js';
import * as hiitModule from './hiit.js';

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

export { startTimer, updateNextWorkoutDisplay, updateInstructions };
