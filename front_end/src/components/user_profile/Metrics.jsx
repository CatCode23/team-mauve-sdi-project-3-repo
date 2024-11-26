import { useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function MetricsChart({ workouts }) {
  useEffect(() => {
    if (!workouts.length) return;

    const dates = workouts.map((workout) =>
      new Date(workout.activity_day).toLocaleDateString()
    );
    const workoutName = workouts.map((workout) => workout.workout_type)
    const speed = workouts.map((workout) => workout.avg_speed);
    const heartRate = workouts.map((workout) => workout.avg_heart_rate);
    const cadences = workouts.map((workout) => workout.avg_cadence);

    //make speed chart
    const speedChart = new Chart(document.getElementById("speedChart"), {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Average Speed (km/h)",
            data: speed,
            borderColor: "#4090ba",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Speed Over Time",
          },
        },
      },
    });

    //make heart rate chart
    const heartRateChart = new Chart(
      document.getElementById("heartRateChart"),
      {
        type: "line",
        data: {
          labels: dates,
          datasets: [
            {
              label: "Average Heart Rate (BPM)",
              data: heartRate,
              borderColor: "#e74c3c",
              tension: 0.1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            title: {
              display: true,
              text: "Heart Rate Over Time",
            },
          },
        },
        
      }
    );

    //make cadence chart
    const cadenceChart = new Chart(document.getElementById("cadenceChart"), {
      type: "line",
      data: {
        labels: dates,
        datasets: [
          {
            label: "Average Cadence (SPM)",
            data: cadences,
            borderColor: "#2ecc71",
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          title: {
            display: true,
            text: "Cadence Over Time",
          },
        },
      },
    });

    return () => {
      speedChart.destroy();
      heartRateChart.destroy();
      cadenceChart.destroy();
    };
  }, [workouts]);

  return (
    <div className="metrics-chart">
      <h3>Workout Metrics</h3>
      <div className="charts-container">
        <div className="chart">
          <canvas id="speedChart" />
        </div>
        <div className="chart">
          <canvas id="heartRateChart" />
        </div>
        <div className="chart">
          <canvas id="cadenceChart" />
        </div>
      </div>
    </div>
  );
}
