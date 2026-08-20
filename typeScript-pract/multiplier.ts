//Multiplied 5 and NaN, the result is: NaN
//To prevent this kind of behavior, we have to validate the data given to us from the command line.

//The return value of the function has the type MultiplyValues
interface MultiplyValues {
  value1: number;
  value2: number;
}
//the function parseArguments which ensures that the parameters given to multiplicator are of the right type. If not, an exception is thrown with a descriptive error message.
const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many agguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const multiplicator = (a: number, b: number, printText: string) => {
  console.log(printText, a * b);
};

try {
  const { value1, value2 } = parseArguments(process.argv);
  multiplicator(
    value1,
    value2,
    `Multiplied ${value1} and ${value2}, the result is:`,
  );
} catch (error: unknown) {
  let errorMessge = "Something bad happened.";
  if (error instanceof Error) {
    errorMessge += " Error: " + error.message;
  }
  console.log(errorMessge);
}

const a: number = Number(process.argv[2]);
const b: number = Number(process.argv[3]);

multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

//Accessing command line arguments
// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText, a * b);
// };

// command line arguments start from process.argv[2]
// const a: number = Number(process.argv[2]);
// const b: number = Number(process.argv[3]);

// multiplicator(a, b, `Multiplied ${a} and ${b}, the result is:`);

//Since the default type of the error object in TypeScript is unknown, we have to narrow(opens in a new tab) the type to access the field:
// type Operation = "multiply" | "add" | "divide";

// const calculator = (a: number, b: number, op: Operation): number => {
//   switch (op) {
//     case "multiply":
//       return a * b;
//     case "divide":
//       if (b === 0) throw new Error("Cann't divide by 0!");
//       return a / b;
//     case "add":
//       return a + b;

//     default:
//       throw new Error("Operation is not multiply, add or divide!");
//   }
// };

// try {
//   console.log(calculator(1, 5, "divide"));
//   console.log(calculator(1, 0, "divide"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";
//   // here we can not use error.message
//   if (error instanceof Error) {
//     // the type is narrowed and we can refer to error.message
//     errorMessage += error.message;
//   }
//   // here we can not use error.message
//   console.log(errorMessage);
// }

// console.log(calculator(1, 3, "multiply"));
// console.log(calculator(1, 3, "add"));
// console.log(calculator(1, 3, "divide"));

//In this case, when there are multiple possible accepted values and all unexpected ones should result in an error, the switch...case statement suits us better than if...else in our code.
// type Operation = "multiply" | "add" | "divide";

// const calculator = (a: number, b: number, op: Operation): number => {
//   switch (op) {
//     case "multiply":
//       return a * b;
//     case "divide":
//       if (b === 0) throw new Error("Cann't divide by 0!");
//       return a / b;
//     case "add":
//       return a + b;

//     default:
//       throw new Error("Operation is not multiply, add or divide!");
//   }
// };

// try {
//   console.log(calculator(1, 5, "divide"));
//   console.log(calculator(1, 0, "divide"));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong: ";
//   if (error instanceof Error) {
//     errorMessage += error.message;
//   }
//   console.log(errorMessage);
// }

// console.log(calculator(1, 3, "multiply"));
// console.log(calculator(1, 3, "add"));
// console.log(calculator(1, 3, "divide"));
// console.log(calculator(1, 0, "divide"));

// Creating your first own types
// type Operation = "multiply" | "add" | "divide";
// type result = number | string
//Usually, you want to know what a function returns, and it would be nice to have a guarantee that it returns what it says it does.
// const calculator = (a: number, b: number, op: Operation): number => {
//   if (op === "multiply") {
//     return a * b;
//   } else if (op === "add") {
//     return a + b;
//   } else if (op === "divide") {
//     if (b === 0) return "can't divide by 0!";
//     return a / b;
//   }
// };

// console.log(calculator(1, 3, "multiply"));
// console.log(calculator(1, 3, "add"));
// console.log(calculator(1, 3, "divide"));
// console.log(calculator(1, 0, "divide"));

//Let's start by creating a simple Multiplier to the file multiplier.ts. It looks exactly as it would in JavaScript.
// const multiplicator = (a, b, printText) => {
//   console.log(printText,  a * b);
// }

// multiplicator(2, 4, 'Multiplied numbers 2 and 4, the result is:');

// Let's add types to the parameters and see where it takes us.
//adding types to the parameters now resulted as an error instead of NaN. mean no compilation happened
// const multiplicator = (a: number, b: number, printText: string) => {
//   console.log(printText, a * b);
// };

// multiplicator(2, 4, "Multiplied numbers 2 and 4, the result is:");
//What happens if we end up passing the wrong types of arguments to the multiplicator function?
// multiplicator(
//   "how about a string?",
//   4,
//   "Multiplied a string and 4, the result is:",
// );
