import React from "react";

export default function BasicInfo({ name, age, gender, rank, team }) {
  return (
    <div className="basic-info">
      <div className="profile-image"></div>
      <div className="info-details">
        <h2>{name}</h2>
        <p>Age: {age}</p>
        <p>Gender: {gender}</p>
        <p>Rank: {rank}</p>
        <p>Team: {team}</p>
      </div>
    </div>
  );
}
