import React from "react";
import workoutPlans from "../data/workoutPlans";

function Workout() {
  // Parse activity from localStorage
  const userActivity = JSON.parse(localStorage.getItem("restOfData")).activity;
  console.log(userActivity);

  // Get the workout plan based on user's activity
  const userWorkoutPlan = workoutPlans[userActivity];

  return (
    <div className="container my-5">
      <h1 className="display-3 text-center mb-4">Weekly Training</h1>
      {Object.entries(userWorkoutPlan.week).map(([day, exercises]) => (
        <div key={day} className="card mb-4">
          <div className="card-header bg-primary text-white">
            <h2 className="mb-0">{day}</h2>
          </div>
          <ul className="list-group list-group-flush">
            {exercises.map((exercise, index) => (
              <li key={index} className="list-group-item">
                <strong className="text-uppercase">{exercise.exercise}</strong>{" "}
                - {exercise.sets} sets of {exercise.reps} reps
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Workout;
