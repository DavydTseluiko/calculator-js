const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");

let firstOperand = [];
let operator = null;
let secondOperand = [];

function clearDisplay() {
  firstOperand = [];
  operator = null;
  secondOperand = [];

  display.textContent = 0;
  operators.forEach((o) => o.classList.remove("active"));
  // console.clear();
}

function displayLimitations() {
  if (
    display.textContent.length >= 9 &&
    operator === null &&
    secondOperand.length >= 9
  ) {
    return true;
  }
}

function addFirstOperand(digit) {
  if (operator === null) {
    if (
      firstOperand.length == 1 &&
      firstOperand[0] == 0 &&
      digit.target.value == 0
    ) {
      return "There is already 0 on the screen as a first digit.";
    }
    firstOperand.push(digit.target.value);
    console.log("firstOperand: ", firstOperand);

    if (firstOperand.length === 1) {
      return (display.textContent = digit.target.value);
    }

    return (display.textContent += digit.target.value);
  }
}

function addSecondOperand(digit) {
  if (operator !== null) {
    operators.forEach((o) => o.classList.remove("active"));

    if (
      secondOperand.length == 1 &&
      secondOperand[0] == 0 &&
      digit.target.value == 0
    ) {
      return "There is already 0 on the screen as a first digit.";
    }

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
  console.log("current operator: ", operator);
  console.log("display content: ", display.textContent);

  if (displayLimitations()) {
    return "There is to much numbers on the display.";
  }

  addFirstOperand(digit);
  addSecondOperand(digit);

  console.log("");
}

function addOperator(o) {
  operators.forEach((o) => o.classList.remove("active"));

  console.log("firstOperand inside oprerators function", firstOperand);
  console.log("secondOperand inside oprerators function", secondOperand);

  if (firstOperand.length > 0 && secondOperand.length > 0) {
    calculate();
  }
  console.log("");
  console.log("firstOperand inside oprerators function", firstOperand);
  console.log("secondOperand inside oprerators function", secondOperand);

  console.log("current operator: ", operator);
  console.log("operator clicked", o.target.textContent);

  o.target.classList.add("active");
  console.log(o.target.classList);

  operator = o.target.textContent;
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
    return NaN;
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

function calculate() {
  if (operator === null) {
    console.log("Can't calculate without operator");
    return 0;
  }

  if (secondOperand.length === 0) {
    secondOperand = firstOperand;
  }

  firstOperand = Number(firstOperand.join(""));
  secondOperand = Number(secondOperand.join(""));

  console.log("firstOperand inside calculate", firstOperand);
  console.log("secondOperand inside calculate", secondOperand);

  let operation = Math.round(operate(firstOperand, operator, secondOperand));
  console.log("result: ", operation);

  clearDisplay();
  console.log("operation: ", operation);
  console.log("operation length", String(operation).length);
  if (String(operation).length > 9) {
    operation = Math.round(operation);
  }
  if (operation === Infinity) {
    operation = NaN;
  }
  display.textContent = operation;
  if (isNaN(operation)) {
    firstOperand = [];
  } else {
    firstOperand = String(operation).split("");
  }
  console.log("firstOperand after calculation", firstOperand);
}

function percentValue() {
  console.log("current number on display: ", display.textContent);
  display.textContent /= 100;
}

function addDecimal() {
  console.log("current number on display: ", display.textContent);
  console.log("firstOperand: ", firstOperand.join(""));
  console.log("secondOperand: ", secondOperand.join(""));

  if (display.textContent === firstOperand.join("")) {
    firstOperand.push(".");
    display.textContent = firstOperand.join("");
  } else {
    secondOperand.push(".");
    display.textContent = secondOperand.join("");
  }
}

console.log("digits: ", digits);
console.log("operators: ", operators);

operators.forEach((o) => o.addEventListener("click", addOperator));
digits.forEach((digit) => digit.addEventListener("click", addDigitToScreen));
clear.addEventListener("click", clearDisplay);
equals.addEventListener("click", calculate);
percent.addEventListener("click", percentValue);
decimal.addEventListener("click", addDecimal);
