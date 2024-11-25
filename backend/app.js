const express = require('express');
const app = express();
const port = 8081;
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV || 'development']);

app.use(express.json());

app.get('/', (request, response) => {
    response.send('Application is up and running');
});

app.get('/workouts', (request, response) => {
    knex('workout_data')
        .select('*')
        .then(data => {
            response.json(data);  
        })
        .catch(err => {
            console.error(err);  
            response.status(404).json({
                message: 'The data you are looking for could not be found.',
            });
        });
});

app.get('/workouts/:id', (request, response) => {
    knex('workout_data')
        .select('*')
        .where('id', request.params.id)  
        .then(data => {
            response.json(data);  
        })
        .catch((err) => response.status(500).json({ 
            message: 'Requested workout does not exist' 
        })
    );
});

app.post('/workouts', (request, response) => {
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
        light
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
        light: light || null
    };
    knex('workout_data')
        .insert(workoutData)
        .returning('*')
        .then(data => {
            response.status(201).json({
                message: 'Workout entry created successfully.',
                workout: data[0], 
            });
        })
        .catch(err => {
            console.error(err);
            response.status(500).json({
                message: 'Entry could not be created.',
            });
        });
});

app.delete('/workouts/:id', (request, response) => {
    knex('workout_data')
        .where('id', request.params.id)
        .del()
        .returning('*')
        .then(deletedWorkout => response.json({
            message: `Workout entry with id ${request.params.id} deleted successfully.`,
            deletedWorkout: deletedWorkout[0], 
        }))
        .catch(() => response.status(500).json({ 
            message: 'workout could not be deleted or does not exist.' 
         })
    );
 });

 app.patch('/workouts/:id', (request, response) => {
    knex('workout_data')
        .where('id', request.params.id)
        .update(request.body)
        .returning('*')
        .then(updatedWorkout => response.json(updatedWorkout))
        .catch((err) => response.status(500).json({ 
            message: 'Requested workout does not exist' 
        })
    );
 });


app.listen(port, () => {
    console.log('Your Knex and Express app are running successfully');
});
