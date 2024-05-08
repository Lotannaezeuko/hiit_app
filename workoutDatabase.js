import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

// Initialize the database
export async function initDatabase() {
  const db = await open({
    filename: './database.sqlite',
    driver: sqlite3.Database,
    verbose: true,
  });
  await db.migrate({ migrationsPath: './migrations-sqlite' });
  return db;
}

// Function to list all HIIT workouts
export async function getHIIT() {
  const db = await initDatabase();
  return db.all('SELECT * FROM HIIT');
}

// Function to get HIIT by ID
export async function getHIITById(id) {
  const db = await initDatabase();
  return db.get('SELECT * FROM HIIT WHERE id = ?', id);
}

// Function to add HIIT
export async function addHIIT(name, description) {
  const db = await initDatabase();
  const result = await db.run('INSERT INTO hiit (name, description, customisable) VALUES (?, ?, 1)', [name, description]);
  const newHiitId = result.lastID; // Get the ID of the newly created HIIT

  // Return an object representing the new HIIT
  return {
    id: newHiitId,
    name,
    description,
    customisable: 1,
  };
}

// Function to get workouts

export async function getWorkouts() {
  const db = await initDatabase();
  return db.all('SELECT * FROM workouts');
}

// Function to add workouts to Hiit
export async function addWorkoutToHIIT(hiitId, workoutId, duration) {
  const db = await initDatabase();
  await db.run('INSERT INTO HIIT_workouts (hiit_id, workout_id, duration) VALUES (?, ?, ?)', hiitId, workoutId, duration);
}

export async function deleteHIIT(hiitId) {
  const db = await initDatabase();
  await db.run('DELETE FROM HIIT WHERE id = ?', hiitId);
}

// Database function to edit HIIT name and description by ID
export async function editHIIT(hiitId, name, description) {
  const db = await initDatabase();
  await db.run('UPDATE HIIT SET name = ?, description = ? WHERE id = ?', [name, description, hiitId]);
}

// Database function to delete workout from HIIT
export async function deleteWorkoutFromHIIT(hiitId, workoutId) {
  const db = await initDatabase();
  await db.run('DELETE FROM HIIT_workouts WHERE hiit_id = ? AND workout_id = ?', hiitId, workoutId);
}

// Function to fetch all the workouts in a HIIT
export async function getWorkoutsInHIIT(hiitId) {
  const db = await initDatabase();
  return db.all(`
    SELECT w.id, w.name, w.description, hw.duration
    FROM hiit_workouts hw
    INNER JOIN workouts w ON hw.workout_id = w.id
    WHERE hw.hiit_id = ?
  `, hiitId);
}
