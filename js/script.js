const display = document.querySelector("#display");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const clear = document.querySelector(".clear");
const equals = document.querySelector(".equals");
const percent = document.querySelector(".percent");
const decimal = document.querySelector(".decimal");
const unaryPlusAndMinus = document.querySelector(".unary-plus-minus");

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
    (firstOperand.length >= 9 &&
      operator === null &&
      secondOperand.length <= 9) ||
    (operator !== null && secondOperand.length >= 9)
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

    if (secondOperand.length === 1) {
      return (display.textContent = digit.target.value);
    }

    return (display.textContent += digit.target.value);
  }
}

function addDigitToScreen(digit) {
  if (displayLimitations()) {
    return "There is to much numbers on the display.";
  }

  addFirstOperand(digit);
  addSecondOperand(digit);
}

function addOperator(o) {
  operators.forEach((o) => o.classList.remove("active"));

  if (firstOperand.length > 0 && secondOperand.length > 0) {
    calculate();
  }
  o.target.classList.add("active");

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
    return 0;
  }

  if (secondOperand.length === 0) {
    secondOperand = firstOperand;
  }

  firstOperand = Number(firstOperand.join(""));
  secondOperand = Number(secondOperand.join(""));

  let operation = Math.round(operate(firstOperand, operator, secondOperand));

  clearDisplay();
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
}

function percentValue() {
  if (display.textContent.length < 9) {
    display.textContent /= 100;
  }
}

function addDecimal() {
  firstOperandDecimals = firstOperand.reduce(
    (decimalTotal, item) => (item === "." ? (decimalTotal += 1) : decimalTotal),
    1
  );

  secondOperandDecimals = secondOperand.reduce(
    (decimalTotal, item) => (item === "." ? (decimalTotal += 1) : decimalTotal),
    1
  );

  if (
    display.textContent === firstOperand.join("") &&
    firstOperandDecimals === 1 &&
    firstOperand.length < 9
  ) {
    firstOperand.push(".");
    display.textContent = firstOperand.join("");
  } else if (
    display.textContent === secondOperand.join("") &&
    secondOperandDecimals === 1 &&
    secondOperand.length < 9
  ) {
    secondOperand.push(".");
    display.textContent = secondOperand.join("");
  }
}

function addUnaryMinusAndPlus() {
  if (display.textContent >= 0 && display.textContent.length < 9) {
    if (display.textContent === firstOperand.join("")) {
      firstOperand.unshift("-");
      display.textContent = firstOperand.join("");
    } else {
      secondOperand.unshift("-");
      display.textContent = secondOperand.join("");
    }
  } else if (display.textContent < 0 && display.textContent.length < 9) {
    if (display.textContent === firstOperand.join("")) {
      firstOperand.shift();
      display.textContent = firstOperand.join("");
    } else {
      secondOperand.shift("");
      display.textContent = secondOperand.join("");
    }
  }
}

operators.forEach((o) => o.addEventListener("click", addOperator));
digits.forEach((digit) => digit.addEventListener("click", addDigitToScreen));
clear.addEventListener("click", clearDisplay);
equals.addEventListener("click", calculate);
percent.addEventListener("click", percentValue);
decimal.addEventListener("click", addDecimal);
unaryPlusAndMinus.addEventListener("click", addUnaryMinusAndPlus);
