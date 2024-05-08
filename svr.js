import express from 'express';
import * as url from 'url';
import * as db from './workoutDatabase.js';

const app = express();
const port = 4999;
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/* handle calls to /app (as these are in app links, they need to be handled by index.html) */
app.get('/app/*/', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.use(express.static('client'));

// Database routes...
(async () => {
  try {
    await db.initDatabase();
    console.log('Database initialized successfully.');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1); // Exit the process if initialization fails
  }
})();


async function postHIIT(req, res) {
  const hiit = await db.addHIIT(req.body.name, req.body.description);
  res.json(hiit);
}

async function getHIIT(req, res) {
  try {
    const hiitId = req.params.id; // Assuming the ID is passed as a URL parameter
    let hiitData;

    if (hiitId) {
      hiitData = await db.getHIITById(hiitId);
    } else {
      hiitData = await db.getHIIT();
    }

    res.json(hiitData);
  } catch (error) {
    console.error('Error fetching HIIT:', error);
    res.status(500).send('Failed to fetch HIIT');
  }
}

async function getWorkouts(req, res) {
  try {
    const workouts = await db.getWorkouts();
    res.json(workouts);
  } catch (error) {
    console.error('Error fetching workouts:', error);
    res.status(500).send('Failed to fetch workouts');
  }
}

async function getWorkoutsInHIIT(req, res) {
  const workoutsInHITT = await db.getWorkoutsInHIIT(req.params.hiitId);
  console.log(workoutsInHITT);
  res.json(workoutsInHITT);
}

async function postWorkoutToHIIT(req, res) {
  const hiitWorkout = await db.addWorkoutToHIIT(req.body.hiitId, req.body.workoutId, req.body.duration);
  res.json(hiitWorkout);
}

// Server-side function to delete HIIT
export async function deleteHIIT(req, res) {
  try {
    const hiitId = req.params.id;
    await db.deleteHIIT(hiitId);
    res.json({ message: 'HIIT deleted successfully' });
    console.log('HIIT deleted successfully');
  } catch (error) {
    console.error('Error deleting HIIT:', error);
    res.status(500).send('Failed to delete HIIT');
  }
}

// Server-side function to edit HIIT name and description
export async function editHIIT(req, res) {
  try {
    const hiitId = req.params.id;
    const { name, description } = req.body;
    await db.editHIIT(hiitId, name, description);
    res.json({ message: 'HIIT edited successfully' });
  } catch (error) {
    console.error('Error editing HIIT:', error);
    res.status(500).send('Failed to edit HIIT');
  }
}

// Server-side function to delete workouts from HIIT
export async function deleteWorkoutFromHIIT(req, res) {
  try {
    const { hiitId, workoutId } = req.body;
    await db.deleteWorkoutFromHIIT(hiitId, workoutId);
    res.json({ message: 'Workout deleted from HIIT successfully' });
  } catch (error) {
    console.error('Error deleting workout from HIIT:', error);
    res.status(500).send('Failed to delete workout from HIIT');
  }
}


// Route handlers...
app.get('/hiit', getHIIT);
app.get('/hiit/:id', getHIIT);
app.get('/workouts', getWorkouts);
app.get('/hiit/:hiitId/workouts', getWorkoutsInHIIT);
app.post('/hiit', express.json(), postHIIT);
app.post('/hiit/workouts', express.json(), postWorkoutToHIIT);
app.delete('/hiit/:id', deleteHIIT);
app.put('/hiit/:id', express.json(), editHIIT);
app.delete('/hiit/:hiitId/workouts/:workoutId', express.json(), deleteWorkoutFromHIIT);
app.listen(4999);
console.log(`Listening on ${port}`);
