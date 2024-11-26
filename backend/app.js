// app.js

// Import necessary packages
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const teamRoutes = require('./routes/teamRoutes');
const knex = require('./knex'); // Use centralized knex
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRoutes.js");

const app = express();
const port = 8081;

// Middleware
const knex = require("knex")(
  require("./knexfile.js")[process.env.NODE_ENV || "development"]
);

app.use(cors());
app.use(express.json());
app.use(express.Router());
app.use(cookieParser());

// Auth Routes
app.use('/api/auth', authRoutes);
//Auth Routes
app.use("/api/auth", authRouter);

// User and Team Routes
app.use('/users', userRoutes);
app.use('/teams', teamRoutes);

// General Route
app.get('/', (request, response) => {
  response.send('Application is up and running');
//////////////////////////WORKOUT DATA HTTP METHODS///////////////////////////////////////
app.get("/", (request, response) => {
  response.send("Application is up and running");
});

// Workout Routes
app.get('/workouts', (request, response) => {
  knex('workout_data')
    .select('*')
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.error(err);
      response.status(404).json({
        message: 'The data you are looking for could not be found.',
      });
    });
app.get("/workouts", (request, response) => {
  knex("workout_data")
    .select("*")
    .then((data) => {
      response.json(data);
    })
    .catch((err) => {
      console.error(err);
      response.status(404).json({
        message: "The data you are looking for could not be found.",
      });
    });
});

app.get('/workouts/:id', (request, response) => {
  knex('workout_data')
    .select('*')
    .where('id', request.params.id)
    .then((data) => {
      response.json(data);
    })
    .catch((err) =>
      response.status(500).json({
        message: 'Requested workout does not exist',
      })
app.get("/workouts/:id", (request, response) => {
  knex("workout_data")
    .select("*")
    .where("id", request.params.id)
    .then((data) => {
      response.json(data);
    })
    .catch((err) =>
      response.status(500).json({
        message: "Requested workout does not exist",
      })
    );
});

app.post('/workouts', (request, response) => {
  const workoutData = {
    ...request.body,
  };
  
  knex('workout_data')
    .insert(workoutData)
    .returning('*')
    .then((data) => {
      response.status(201).json({
        message: 'Workout entry created successfully.',
        workout: data[0],
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({
        message: 'Entry could not be created.',
      });
    });
app.post("/workouts", (request, response) => {
  const {
    activity_day,
    workout_type,
    distance,
    time,
    calories,
    total_steps,
    avg_speed,
    avg_cadence,
    max_cadence,
    avg_pace,
    max_pace,
    min_pace,
    avg_heart_rate,
    max_heart_rate,
    min_heart_rate,
    vo2_max,
    aerobic,
    anaerobic,
    intensive,
    light,
  } = request.body;

  const workoutData = {
    activity_day: activity_day || null,
    workout_type: workout_type || null,
    distance: distance || null,
    time: time || null,
    calories: calories || null,
    total_steps: total_steps || null,
    avg_speed: avg_speed || null,
    avg_cadence: avg_cadence || null,
    max_cadence: max_cadence || null,
    avg_pace: avg_pace || null,
    max_pace: max_pace || null,
    min_pace: min_pace || null,
    avg_heart_rate: avg_heart_rate || null,
    max_heart_rate: max_heart_rate || null,
    min_heart_rate: min_heart_rate || null,
    vo2_max: vo2_max || null,
    aerobic: aerobic || null,
    anaerobic: anaerobic || null,
    intensive: intensive || null,
    light: light || null,
  };
  knex("workout_data")
    .insert(workoutData)
    .returning("*")
    .then((data) => {
      response.status(201).json({
        message: "Workout entry created successfully.",
        workout: data[0],
      });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({
        message: "Entry could not be created.",
      });
    });
});

app.delete('/workouts/:id', (request, response) => {
  knex('workout_data')
    .where('id', request.params.id)
    .del()
    .returning('*')
    .then((deletedWorkout) =>
      response.json({
        message: `Workout entry with id ${request.params.id} deleted successfully.`,
        deletedWorkout: deletedWorkout[0],
      })
    )
    .catch(() =>
      response.status(500).json({
        message: 'Workout could not be deleted or does not exist.',
      })
app.delete("/workouts/:id", (request, response) => {
  knex("workout_data")
    .where("id", request.params.id)
    .del()
    .returning("*")
    .then((deletedWorkout) =>
      response.json({
        message: `Workout entry with id ${request.params.id} deleted successfully.`,
        deletedWorkout: deletedWorkout[0],
      })
    )
    .catch(() =>
      response.status(500).json({
        message: "workout could not be deleted or does not exist.",
      })
    );
});

app.patch('/workouts/:id', (request, response) => {
  knex('workout_data')
    .where('id', request.params.id)
    .update(request.body)
    .returning('*')
    .then((updatedWorkout) => response.json(updatedWorkout))
    .catch((err) =>
      response.status(500).json({
        message: 'Requested workout does not exist',
      })
app.patch("/workouts/:id", (request, response) => {
  knex("workout_data")
    .where("id", request.params.id)
    .update(request.body)
    .returning("*")
    .then((updatedWorkout) => response.json(updatedWorkout))
    .catch((err) =>
      response.status(500).json({
        message: "Requested workout does not exist",
      })
    );
});
//////////////////////////WORKOUT DATA HTTP METHODS///////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////USER DATA HTTP METHODS///////////////////////////////////////
app.get("/users/:userId/workouts", (request, response) => {
  knex("user_profile")
    .join("workout_data", "user_profile.id_workout", "=", "workout_data.id")
    .select("workout_data.*")
    .where("user_profile.user_id", request.params.userId)
    .then((data) => {
      response.json(data);
    })
    .catch((err) =>
      response.status(500).json({
        message: "Error retrieving user workouts",
      })
    );
});

app.post('/users/:userId/workouts', (request, response) => {
  const { userId } = request.params;
  const workoutData = {
    ...request.body,
  };

  knex('workout_data')
    .insert(workoutData)
    .returning('*')
    .then((workout) => {
      return knex('user_profile')
        .insert({
          user_id: userId,
          id_workout: workout[0].id,
        })
        .returning('*')
        .then((userWorkout) => {
          response.status(201).json({
            message: 'Workout added to user successfully',
            workout: workout[0],
            userWorkout: userWorkout[0],
          });
        });
    })
    .catch((err) => {
      console.error(err);
      response.status(500).json({
        message: 'Entry could not be created.',
      });
    });
});

app.delete('/users/:userId/workouts/:workoutId', (request, response) => {
  knex('workout_data')
    .where('id', request.params.workoutId)
    .del()
    .then(() => {
      return knex('user_profile')
        .where({
          user_id: request.params.userId,
          id_workout: request.params.workoutId,
        })
        .del()
        .returning('*');
    })
    .then((deletedWorkout) =>
      response.json({
        message: `Workout ${request.params.workoutId} and its association with user ${request.params.userId} deleted successfully.`,
        deletedWorkout: deletedWorkout[0],
      })
    )
    .catch(() =>
      response.status(500).json({
        message: 'Workout could not be deleted or does not exist.',
      })
    );
app.delete("/users/:userId/workouts/:workoutId", (request, response) => {
  knex("workout_data")
    .where("id", request.params.workoutId)
    .del()
    .then(() => {
      return knex("user_profile")
        .where({
          user_id: request.params.userId,
          id_workout: request.params.workoutId,
        })
        .del()
        .returning("*");
    })
    .then((deletedWorkout) =>
      response.json({
        message: `Workout ${request.params.workoutId} and its association with user ${request.params.userId} deleted successfully.`,
        deletedWorkout: deletedWorkout[0],
      })
    )
    .catch(() =>
      response.status(500).json({
        message: "Workout could not be deleted or does not exist.",
      })
    );
});

// Server Listener

//////////////////////////USER DATA HTTP METHODS///////////////////////////////////////

app.listen(port, () => {
  console.log('Your Knex and Express app are running successfully');
});
