let firstOperand = [];
let operator;
let secondOperand = [];

let firstNumber = askForNumber("first");
let secondNumber = askForNumber("second");

function askForNumber(text) {
  let number;
  do {
    number = Number(prompt(`Enter ${text} number`));
  } while (isNaN(number) || number == undefined);

  return number;
}

console.log("firsNumber: " + firstNumber);
console.log("secondNumber: " + secondNumber);

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (a / b === Infinity) {
    return "You can not divide by 0";
  }
  return a / b;
}

console.log("add: " + add(firstNumber, secondNumber));
console.log("subtract: " + subtract(firstNumber, secondNumber));
console.log("multiply: " + multiply(firstNumber, secondNumber));
console.log("divide: " + divide(firstNumber, secondNumber));
