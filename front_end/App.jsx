import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import './App.css';

// StepGoal Component
function StepGoal() {
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

function Home() {
  return (
    <section>
      <h2>Welcome to Fitness Hub</h2>
      <p>Choose from various workout plans to suit your fitness goals.</p>
      <Link to="/set-goal">Set Your Step Goal</Link> {/* Link to StepGoal route */}
    </section>
  );
}

function Workouts() {
  return (
    <section>
      <h2>Workouts</h2>
      <p>Choose from various workout plans to suit your fitness goals.</p>
    </section>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <div className="app-header">
          <h1>Fitness Hub</h1>
        </div>

        <nav className="navbar">
          <Link to="/">Home</Link>
          <Link to="/workouts">Workouts</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/set-goal" element={<StepGoal />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


export default App;
