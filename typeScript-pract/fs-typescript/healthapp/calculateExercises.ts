import { isNotNumber } from "./utils.ts";

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  dailyHours: number[],
  target: number,
): Result => {
  // calculates the number of measured days
  const periodLength = dailyHours.length;

  // filter the days greater than zero and count the training days
  const trainingDays = dailyHours.filter((day) => day > 0).length;

  // calculate the total amount of hours
  const totalHours = dailyHours.reduce((sum, day) => sum + day, 0);

  // calculate the average amount of hours spent on training
  const average = totalHours / periodLength;

  // calculate whether the target was reached
  const success = average >= target;

  let rating: number;
  let ratingDescription: string;

  if (average < target * 0.75) {
    rating = 1;
    ratingDescription = "bad";
  } else if (average < target) {
    rating = 2;
    ratingDescription = "Not too bad but could be better";
  } else {
    rating = 3;
    ratingDescription = "Excellent";
  }

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// ------------------------------
// COMMAND LINE PART
// ------------------------------

try {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    throw new Error("Please provide a target and at least one exercise hour");
  }

  if (args.some(isNotNumber)) {
    throw new Error("Arguments must be numbers");
  }

  const target = Number(args[0]);

  const dailyHours = args.slice(1).map(Number);

  console.log(calculateExercises(dailyHours, target));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}

// Test 2 — no arguments
// npm run calculateExercises

// Test 2 — no arguments
// npm run calculateExercises

// Test 3 — invalid number
// npm run calculateExercises 2 1 0 hello 4

// ------------------------------
// COMMAND LINE PART
// ------------------------------
// const isNotNumber = (value: string): boolean => {
//   return isNaN(Number(value));
// };

// const args = process.argv.slice(2);

// if (args.length < 2) {
//   throw new Error("Please provide a target and at least one exercise hour");
// }

// if (args.some(isNotNumber)) {
//   throw new Error("Arguments must be numbers");
// }

// const target = Number(args[0]);

// const dailyHours = args.slice(1).map(Number);

// console.log(calculateExercises(dailyHours, target));

// interface Result {
//   periodLength: number;
//   trainingDays: number;
//   success: boolean;
//   rating: number;
//   ratingDescription: string;
//   target: number;
//   average: number;
// }

// const calculateExercises = (dailyHours: number[], target: number): Result => {
//   //calcultes the number of measured days
//   const periodLength = dailyHours.length;

//   //filter the days greater than zero or none training days and print the training days
//   const trainingDays = dailyHours.filter((day) => day > 0).length;

//   //calculate the total amount of hours from the measured days otherwise let it be zero
//   const totalHours = dailyHours.reduce((sum, day) => sum + day, 0);

//   //calculate the amount of hours spent on training
//   const average = totalHours / periodLength;

//   //calcutes whether the hours i spent is equal to the hours i suppose to spend on training or not
//   const success = average >= target;

//   let rating: number;
//   let ratingDescription: string;

//   if (average <= 1) {
//     rating = 1;
//     ratingDescription = "You need to exercise more";
//   } else if (average >= 1.5) {
//     rating = 2;
//     ratingDescription = "Not too bad but could be better";
//   } else {
//     rating = 3;
//     ratingDescription = "Excellent";
//   }

//   return {
//     periodLength,
//     trainingDays,
//     success,
//     rating,
//     ratingDescription,
//     target,
//     average,
//   };
// };

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2));
