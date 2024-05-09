--Up

CREATE TABLE users (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL
);

INSERT INTO users (id, name) VALUES 
('1', 'Alice'),
('2', 'Bob'),
('3', 'Lotanna');

CREATE TABLE HIIT (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    customisable BOOLEAN
);

INSERT INTO HIIT (id, name, description, customisable) VALUES
    ('1', 'High-Intensity Interval Training', 'A form of interval training that involves short bursts of intense exercise followed by periods of rest or lower-intensity exercise.', 0),
    ('2', 'Tabata', 'A high-intensity workout protocol that consists of 20 seconds of intense exercise followed by 10 seconds of rest, repeated for a total of 8 rounds.', 0),
    ('3', 'Circuit Training', 'A workout routine that involves performing a series of exercises in a circuit, with minimal rest between exercises.', 0);

CREATE TABLE workouts (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    instructions TEXT
);

INSERT INTO workouts (id, name, description, instructions) VALUES
    ('1', 'Squats', 'Lower body exercise that targets the quadriceps, hamstrings, and glutes.', '1. Stand with your feet shoulder-width apart.\n2. Lower your body as if you were sitting back into a chair, keeping your chest upright and your knees behind your toes.\n3. Push through your heels to return to the starting position.\n4. Repeat for the desired number of repetitions.'),
    ('2', 'Push-ups', 'Upper body exercise that targets the chest, shoulders, and triceps.', '1. Start in a plank position with your hands slightly wider than shoulder-width apart.\n2. Lower your body until your chest nearly touches the floor, keeping your elbows close to your body.\n3. Push through your palms to return to the starting position.\n4. Repeat for the desired number of repetitions.'),
    ('3', 'Plank', 'Core exercise that strengthens the abdominal muscles and improves posture.', '1. Start in a push-up position with your elbows bent and your weight resting on your forearms.\n2. Keep your body in a straight line from head to heels, engaging your core muscles.\n3. Hold this position for as long as possible, maintaining proper form.\n4. Repeat for the desired duration.'),
    ('4', 'Jumping Jacks', 'Full-body exercise that increases heart rate and improves cardiovascular fitness.', '1. Stand with your feet together and your arms at your sides.\n2. Jump while simultaneously raising your arms above your head and spreading your legs.\n3. Land softly with your feet shoulder-width apart while lowering your arms to your sides.\n4. Repeat for the desired number of repetitions.'),
    ('5', 'Burpees', 'Full-body exercise that combines squats, push-ups, and jumps for a high-intensity workout.', '1. Start in a standing position.\n2. Lower your body into a squat position, placing your hands on the floor in front of you.\n3. Jump your feet back into a plank position.\n4. Perform a push-up, then jump your feet back to the squat position.\n5. Explosively jump into the air, reaching your arms overhead.\n6. Land softly and immediately lower back into the squat position to begin the next repetition.'),
    ('6', 'Rest', 'Period of rest or lower-intensity exercise.', 'Take a break and focus on controlled breathing to recover before the next exercise.');

CREATE TABLE user_HIIT (
    user_id TEXT,
    HIIT_id TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (HIIT_id) REFERENCES HIIT(id)
);

INSERT INTO user_HIIT (user_id, HIIT_id) VALUES
    ('1', '1'),
    ('2', '2'),
    ('3', '3'),
    ('1', '2'),
    ('2', '4'),
    ('3', '5');

CREATE TABLE HIIT_workouts (
    HIIT_id TEXT,
    workout_id TEXT,
    duration INTEGER,
    FOREIGN KEY (HIIT_id) REFERENCES HIIT(id),
    FOREIGN KEY (workout_id) REFERENCES workouts(id)
);

INSERT INTO HIIT_workouts (HIIT_id, workout_id, duration) VALUES
    ('1', '1', 30),
    ('1', '2', 20),
    ('1', '3', 60),
    ('2', '2', 20),
    ('2', '4', 30),
    ('2', '5', 45),
    ('3', '1', 30),
    ('3', '3', 60),
    ('3', '5', 45),
    ('3', '6', 15),
    ('1', '6', 30),
    ('2', '6', 30),
    ('3', '6', 30);

