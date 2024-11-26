import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from 'react-router-dom';
import './App.css';


function Home() {
  return (
    <section>
      <h2>Welcome to Fitness Hub</h2>
      <p>Choose from various workout plans to suit your fitness goals.</p>
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
