const workoutPlans = {
  EXTRA: {
    week: {
      Monday: [
        { exercise: "Dumbbell Bench Press", sets: 5, reps: 10 },
        { exercise: "Incline Dumbbell Bench Press", sets: 4, reps: 10 },
        { exercise: "Dumbbell Floor Press", sets: 3, reps: 10 },
        { exercise: "Standing Dumbbell Press", sets: 4, reps: 10 },
        { exercise: "Dumbbell Lateral Raise", sets: 3, reps: 10 },
        { exercise: "Dumbbell Tricep Kickback", sets: 3, reps: 10 },
      ],
      Tuesday: [
        { exercise: "Dumbbell Goblet Squat", sets: 4, reps: 10 },
        { exercise: "Dumbbell Stiff Leg Deadlift", sets: 4, reps: 10 },
        { exercise: "Dumbbell Rear Lunge", sets: 4, reps: 10 },
        { exercise: "Dumbbell Frog Squat", sets: 3, reps: 10 },
        { exercise: "Dumbbell Calf Raise", sets: 4, reps: 20 },
        { exercise: "Weighted Crunch", sets: 3, reps: 20 },
        { exercise: "Side Planks", sets: 3, reps: "20 Secs Each" },
      ],
      Wednesday: [
        { exercise: "Dumbbell Bent Over Row", sets: 4, reps: 10 },
        { exercise: "Tripod Dumbbell Row", sets: 4, reps: 10 },
        { exercise: "Dumbbell Pullover", sets: 3, reps: 10 },
        { exercise: "Reverse Grip Dumbbell Row", sets: 4, reps: 10 },
        { exercise: "Dumbbell Bicep Curl", sets: 3, reps: 15 },
        { exercise: "Dumbbell Hammer Curl", sets: 3, reps: 15 },
      ],
      Friday: [
        { exercise: "Dumbbell Squat", sets: 4, reps: 10 },
        { exercise: "Dumbbell Deadlift", sets: 4, reps: 10 },
        { exercise: "Dumbbell Split Squat", sets: 3, reps: 10 },
        { exercise: "Dumbbell Hip Thrust", sets: 4, reps: 15 },
        { exercise: "Dumbbell Calf Raise", sets: 4, reps: 20 },
        { exercise: "Dumbbell Side Bends", sets: 3, reps: 15 },
        { exercise: "Plank", sets: 3, reps: "20 Secs" },
      ],
      Saturday: [
        { exercise: "One Arm Dumbbell Rows", sets: 4, reps: 10 },
        { exercise: "Dumbbell Arnold Press", sets: 4, reps: 10 },
        { exercise: "Incline Dumbbell Bench Press", sets: 4, reps: 10 },
        { exercise: "Chest Supported Dumbbell Row", sets: 3, reps: 10 },
        { exercise: "Dumbbell Pinwheel Curl", sets: 2, reps: 10 },
        { exercise: "Overhead Dumbbell Tricep Extension", sets: 3, reps: 10 },
        { exercise: "Dumbbell Shrug", sets: 3, reps: 10 },
      ],
    },
  },
  SEDENTARY: {
    week: {
      Wednesday: [
        { exercise: "Squats", sets: 3, reps: 10 - 12 },
        { exercise: "Push-Ups", sets: 3, reps: 10 - 15 },
        { exercise: "Bent Over Dumbbell Rows", sets: 3, reps: 10 - 12 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 10 - 12 },
        { exercise: "Plank", sets: 3, duration: "30s-1min" },
        { exercise: "Hyperextensions", sets: 3, reps: 12 - 15 },
      ],
    },
  },
  MILDLY: {
    week: {
      Wednesday: [
        { exercise: "Squats", sets: 3, reps: 10 - 12 },
        { exercise: "Push-Ups", sets: 3, reps: 10 - 15 },
        { exercise: "Bent Over Dumbbell Rows", sets: 3, reps: 10 - 12 },
        { exercise: "Dumbbell Shoulder Press", sets: 3, reps: 10 - 12 },
        { exercise: "Plank", sets: 3, duration: "30s-1min" },
        { exercise: "Hyperextensions", sets: 3, reps: 12 - 15 },
      ],
    },
  },
};

export default workoutPlans;
