import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
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

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFromData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleFormData = (event) => {
    setFromData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    let response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
      credentials: 'include',
    })
      .then((response) =>
        !response.ok ? Promise.reject(new Error('Failed to login')) : response.json()
      )
      .catch((error) => {
        console.log(error.message);
      });

    if (response) {
      console.log(response);
      setIsAuthenticated(true);
      navigate('/');
    }
  };

  return (
    <div>
      <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input type="text" name="username" value={formData.username} onChange={handleFormData} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" value={formData.password} onChange={handleFormData} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div className="app-container">
        <div className="app-header">
          <h1>Fitness Hub</h1>
        </div>

        <nav className="navbar">
          {isAuthenticated ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/workouts">Workouts</Link>
            </>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </nav>

        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/"
            element={isAuthenticated ? <Home /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/workouts"
            element={isAuthenticated ? <Workouts /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
          <Route
            path="/set-goal"
            element={isAuthenticated ? <StepGoal /> : <Login setIsAuthenticated={setIsAuthenticated} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
