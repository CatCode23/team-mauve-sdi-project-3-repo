import React, { useState } from 'react';
import './App.css';

export default function StepGoal() {
    const [stepGoal, setStepGoal] = useState('');  // Make this an empty string initially
    const [currentSteps, setCurrentSteps] = useState(0);
  
    // Handle step goal change
    const handleGoalChange = (event) => {
      const value = event.target.value;
      // Only allow numeric values or empty input
      if (value === '' || !isNaN(value)) {
        setStepGoal(value);  // Update the step goal if it's a valid number or empty
      }
    };
  
    // Increment steps (for testing purposes)
    const incrementSteps = () => {
      setCurrentSteps(currentSteps + 100);  // Increment by 100 steps
    };
  
    return (
      <div className="step-goal-container">
        <div className="goal-section">
          <h2>Set Your Daily Step Goal</h2>
          <input
            type="number"
            value={stepGoal}
            onChange={handleGoalChange}
            placeholder="Enter step goal"
            min="0"
          />
          <p>Current Goal: {stepGoal ? stepGoal : 'Not Set'}</p>
        </div>
  
        <div className="step-tracker">
          <h2>Current Steps</h2>
          <p>{currentSteps} steps</p>
          <button onClick={incrementSteps}>Increment Steps</button>
        </div>
  
        <div className="progress">
          <h3>Goal Progress</h3>
          <p>
            {currentSteps >= stepGoal ? 'Goal Achieved!' : `You need ${stepGoal - currentSteps} more steps`}
          </p>
        </div>
      </div>
    );
}
