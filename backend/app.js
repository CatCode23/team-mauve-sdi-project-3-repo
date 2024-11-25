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

app.listen(port, () => {
    console.log('Your Knex and Express app are running successfully');
});
