import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import './App.css';

export default function Home() {
    return (
        <section>
          <h2>Welcome to Fitness Hub</h2>
          <p>Choose from various workout plans to suit your fitness goals.</p>
          <Link to="/set-goal">Set Your Step Goal</Link> {/* Link to StepGoal route */}
        </section>
      );
}
