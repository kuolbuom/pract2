import { isNotNumber } from "./utils.ts";

export const calculateBmi = (height: number, weight: number) => {
  const heightInMeters = height / 100;
  const bmi = weight / (heightInMeters * heightInMeters);

  if (bmi < 18.5) {
    return "Under weight";
  } else if (bmi < 25) {
    return "Normal weight";
  } else if (bmi < 30) {
    return "Over weight";
  } else {
    return "Obese";
  }
};

// ------------------------------
// COMMAND LINE PART
// ------------------------------
// export const isNotNumber = (argument: any): boolean => {
//   return isNaN(Number(argument));
// };

try {
  //remove "node", and "bmiCalculator.ts" from process.args and remain 180 91
  const args = process.argv.slice(2);

  // whether one is missing from 180 and 91
  if (args.length < 2) {
    throw new Error("Too less arguments");
  }

  //checks whether extra. fore example, "node","bmiCalculator.ts", "180", "91","extra"
  if (args.length > 4) {
    throw new Error("Too many arguments");
  }

  if (args.some(isNotNumber)) {
    //check any string assertion
    throw new Error("Arguments must be numbers");
  }

  //remaining from slice
  const height = Number(args[0]);
  const weight = Number(args[1]);

  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  if (error instanceof Error) {
    console.log("Error:", error.message);
  }
}

// console.log(calculateBmi(180, 91));

// const calculateBmi = (height: number, weight: number) => {
//   const heightInMeters = height / 100;
//   const bmi = weight / (heightInMeters * heightInMeters);

//   if (bmi < 18.5) {
//     return "Under weight";
//   } else if (bmi < 25) {
//     return "Normal weight";
//   } else if (bmi < 30) {
//     return "Over weight";
//   } else {
//     return "Obese";
//   }
// };

// console.log(calculateBmi(180, 74));
