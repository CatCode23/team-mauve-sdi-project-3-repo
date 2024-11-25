import { useState, useEffect } from "react";

const UserProfile = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8081/workouts")
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => {
        console.error("Error fetching workout data:", error);
      });
  }, []);

  return (
    <div>
      <h1>Workouts</h1>
      {workouts.length > 0 ? (
        <ul>
          {workouts.map((workout) => (
            <li key={workout.id}>
              <p>
                <strong>Date:</strong>
                {new Date(workout.activity_day).toLocaleDateString()}
              </p>
              <p>
                <strong>Type:</strong> {workout.workout_type}
              </p>
              <p>
                <strong>Distance:</strong> {workout.distance} km
              </p>
              <p>
                <strong>Calories:</strong> {workout.calories} kcal
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No workouts available.</p>
      )}
    </div>
  );
};

export default UserProfile;
