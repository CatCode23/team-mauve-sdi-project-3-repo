import React, {useState} from "react";

export default function Workouts({ workouts }) {
  const [expanded, setExpanded] = useState(null); 

  const toggleDetails = (index) => {
    setExpanded(expanded === index ? null : index); 
  };

  return (
    <div className="workouts-section">

      <h2>Workouts</h2>
      <ul>
        {workouts.map((workout, index) => (
          <li key={index}>
            <div
              className="workout-type" 
              onClick={() => toggleDetails(index)}>
              {workout.workout_type}
            </div>
            {expanded === index && (
              <div>
                <p>Date: {new Date(workout.activity_day).toLocaleDateString()}</p>
                <p>Distance: {workout.distance} km</p>
                <p>Time: {workout.time} min</p>
                <p>Calories: {workout.calories} kcal</p>
                <p>Average Speed: {workout.avg_speed} km/h</p>
                <p>Average heart Rate: {workout.avg_heart_rate} BPM</p>
                <p>Average Cadence: {workout.avg_cadence} SPM</p>
              </div>
            )}
          </li>
        ))}
      </ul>
   </div>
  );
}
