const express = require('express');
const Workout = require('../models/Workout');  

const router = express.Router();


router.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();  
    res.status(200).json(workouts); 
  } catch (error) {
    res.status(500).json({ message: 'Error fetching workout data', error });
  }
});

router.post('/workouts', async (req, res) => {
    const { userId, exercise, duration } = req.body;
  
    if (!userId || !exercise || !duration) {
      return res.status(400).json({ message: 'UserId, exercise, and duration are required' });
    }
  
    try {
      const newWorkout = new Workout({ userId, exercise, duration });  
      await newWorkout.save();  
      res.status(201).json(newWorkout);  
    } catch (error) {
      res.status(500).json({ message: 'Error creating workout data', error });
    }
  });

  router.put('/workouts/:id', async (req, res) => {
    const { id } = req.params;
    const { exercise, duration } = req.body;
  
    try {
      const updatedWorkout = await Workout.findByIdAndUpdate(
        id, 
        { exercise, duration },
        { new: true }  
      );
  
      if (!updatedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      res.status(200).json(updatedWorkout);  
    } catch (error) {
      res.status(500).json({ message: 'Error updating workout data', error });
    }
  });
  
  router.delete('/workouts/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const deletedWorkout = await Workout.findByIdAndDelete(id);  
  
      if (!deletedWorkout) {
        return res.status(404).json({ message: 'Workout not found' });
      }
  
      res.status(200).json({ message: 'Workout removed successfully' });  
    } catch (error) {
      res.status(500).json({ message: 'Error removing workout data', error });
    }
  });
