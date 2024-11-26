import { useState, useEffect } from "react";
import BasicInfo from "../components/user_profile/BasicInfo";
import Metrics from "../components/user_profile/Metrics";
import Workouts from "../components/user_profile/Workouts";
import Goals from "../components/user_profile/Goals";
import "../components/user_profile/components.css";

const UserProfile = ({ userId = 1 }) => {
  
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8081/users/${userId}/workouts`)
      .then((response) => response.json())
      .then((data) => setWorkouts(data))
      .catch((error) => {
        console.error("Error fetching user workout data:", error);
      });
  }, [userId]);
  console.log(workouts);

  return (
    <div className="user-profile-container">
      <div className="left-section">
        <BasicInfo
          name={"Airman Snuffy"}
          age={"23"}
          gender={"male"}
          rank={"E-3"}
          team={"Mauve"}
        />
        <Workouts workouts={workouts} />
      </div>
      <div className="metrics-chart">
      <Metrics workouts={workouts} />
      </div>

      <div className="goals-section">
        <Goals goals={"placeholder"} />
      </div>
    </div>
  );
};

export default UserProfile;
