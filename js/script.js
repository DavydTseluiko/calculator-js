const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");

let firstOperand = [];
let operator;
let secondOperand = [];

function displayLimitations() {
  if (display.textContent.length >= 9) {
    return true;
  }
}

function addFirstOperand(digit) {
  if (operator === undefined) {
    firstOperand.push(digit.target.value);
    console.log("firstOperand: ", firstOperand);

    if (firstOperand.length === 1) {
      return (display.textContent = digit.target.value);
    }

    return (display.textContent += digit.target.value);
  }
}

function addSecondOperand(digit) {
  if (operator !== undefined) {
    secondOperand.push(digit.target.value);
    console.log("secondOperand: ", secondOperand);

    if (secondOperand.length === 1) {
      return (display.textContent = digit.target.value);
    }

    return (display.textContent += digit.target.value);
  }
}

function addDigitToScreen(digit) {
  console.log("digit's clicked: ", digit.target.value);
  console.log(operator);
  console.log("display content: ", display.textContent);

  if (displayLimitations()) {
    return "There is to much numbers on the display.";
  }

  addFirstOperand(digit);
  addSecondOperand(digit);

  console.log("");
}

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

console.log("digits: ", digits);
digits.forEach((digit) => digit.addEventListener("click", addDigitToScreen));

// console.log("add: " + add(firstNumber, secondNumber));
// console.log("subtract: " + subtract(firstNumber, secondNumber));
// console.log("multiply: " + multiply(firstNumber, secondNumber));
// console.log("divide: " + divide(firstNumber, secondNumber));
// console.log("");
// console.log(operate(firstNumber, operator, secondNumber));
