// TODO: Make sure numbers are not ruin the calculators display

// let firstOperand = [];
let operator = askForOperator();
// let secondOperand = [];

let firstNumber = askForNumber("first");
let secondNumber = askForNumber("second");

function askForNumber(text) {
  let number;
  do {
    number = Number(prompt(`Enter ${text} number`));
  } while (isNaN(number) || number == undefined);

  return number;
}

function askForOperator() {
  let operator;

  do {
    operator = prompt("Enter an operator (+, -, *, /)");
  } while (
    operator !== "+" &&
    operator !== "-" &&
    operator !== "*" &&
    operator !== "/"
  );

  return operator;
}

console.log("firsNumber: " + firstNumber);
console.log("operator: ", operator);
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

function operate(firstOperand, operator, secondOperand) {
  switch (operator) {
    case "+":
      return add(firstOperand, secondOperand);
    case "-":
      return subtract(firstOperand, secondOperand);
    case "*":
      return multiply(firstOperand, secondOperand);
    case "/":
      return divide(firstOperand, secondOperand);
  }
}

console.log("add: " + add(firstNumber, secondNumber));
console.log("subtract: " + subtract(firstNumber, secondNumber));
console.log("multiply: " + multiply(firstNumber, secondNumber));
console.log("divide: " + divide(firstNumber, secondNumber));
console.log("");
console.log(operate(firstNumber, operator, secondNumber));
