import React, { useEffect } from "react";
import { Chart } from "chart.js/auto";

export default function Goals() {
  useEffect(() => {
    //make Steps Chart
    const stepsChart = new Chart(document.getElementById("steps-chart"), {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [7000, 3000], 
            backgroundColor: ["#4caf50", "#d6d6d6"],
            hoverBackgroundColor: ["#4caf50cc", "#d6d6d6cc"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    //make Calories Chart
    const caloriesChart = new Chart(document.getElementById("calories-chart"), {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [1500, 500], 
            backgroundColor: ["#ff9800", "#d6d6d6"],
            hoverBackgroundColor: ["#ff9800cc", "#d6d6d6cc"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    //make Time Chart
    const timeChart = new Chart(document.getElementById("time-chart"), {
      type: "doughnut",
      data: {
        labels: ["Completed", "Remaining"],
        datasets: [
          {
            data: [40, 20], 
            backgroundColor: ["#2196f3", "#d6d6d6"],
            hoverBackgroundColor: ["#2196f3cc", "#d6d6d6cc"],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: "bottom",
          },
        },
      },
    });

    return () => {
      stepsChart.destroy();
      caloriesChart.destroy();
      timeChart.destroy();
    };
  }, []);

  return (
    <div className="goals-section">
      <h3>Goals</h3>
      <div className="goal-item">
        <h4>Steps</h4>
        <div style={{ height: "250px", width: "250px" }}>
          <canvas id="steps-chart"></canvas>
        </div>
      </div>
      <div className="goal-item">
        <h4>Calories</h4>
        <div style={{ height: "250px", width: "250px" }}>
          <canvas id="calories-chart"></canvas>
        </div>
      </div>
      <div className="goal-item">
        <h4>Time Spent Working Out</h4>
        <div style={{ height: "250px", width: "250px" }}>
          <canvas id="time-chart"></canvas>
        </div>
      </div>
    </div>
  );
}