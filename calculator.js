function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    alert("ERROR: Divide by zero is not permitted");
    return 0;
  }
  return num1 / num2;
}

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

function parseOperator(operatorString) {
  switch (operatorString) {
    case "add":
      return add;
    case "subtract":
      return subtract;
    case "multiply":
      return multiply;
    case "divide":
      return divide;
    default:
      console.log("unknown operator, parsed to null");
      return null;
  }
}

// the operator and enteredNumber will be strings, but the saved result is a number
// savedResult starts as 0, but can be reassigned by entering a number when no operator is queued
let operator;
let savedResult = 0;
let enteredNumber = "";

const display = document.querySelector(".display");
function updateDisplay() {
  if (enteredNumber) {
    display.textContent = enteredNumber;
  } else {
    display.textContent = Math.round(savedResult * 100000) / 100000;
  }
}

// number button press:
// append the number to the entry string
const numBtnContainer = document.querySelector(".numbers-container");
numBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // string concatenation
    enteredNumber += event.target.value;
    updateDisplay();
    console.log(enteredNumber);
  }
});

const decimalBtn = document.querySelector("#decimal-btn");
decimalBtn.addEventListener("click", () => (decimalBtn.disabled = true));

// operator button press:
// when no queued op and no entryNum:
// 1. queue the new operator
// when there is no queued operator but an entryNum:
// 1. set savedRes to entryNum
// 2. queue the new operator
// when there is a queued operator and entryNum:
// 1. calc with queued operator with savedRes and entryNum
// 2. flush entryNum
// 3. queue the new operator
// where there is a queued op but no etry num:
// 1. replace the queued op with the new op
const operatorBtnContainer = document.querySelector(".operators-container");
operatorBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const operatorString = event.target.value;
    // if no previously queued operator, we save the entered number to the saved result
    // should be able to overwrite previous savedresult as long as no queued operator
    if (!operator) {
      console.log("no queued operator");
      // only if there is an entered number do we overwrite, otherwise it just keeps the old saved res
      if (enteredNumber) {
        savedResult = +enteredNumber;
      }
    }
    // otherwise, calc using previously saved operator(savedResult, parsed enteredNumber)
    else {
      // if no entered number, just replace the queued op with the new op
      if (!enteredNumber) {
        operator = parseOperator(operatorString);
        return;
      }
      console.log(operator);
      savedResult = operate(operator, savedResult, +enteredNumber);
      console.log(savedResult);
    }
    // parse and save new operator, and flush entered number
    enteredNumber = "";
    decimalBtn.disabled = false;
    updateDisplay();
    operator = parseOperator(operatorString);
  }
});

// equal button
// when there is a queued op and an entry num, operate as normal and remove the queued op
// when there is no queued operator but there is an entry num, set savedRes to entry num
// when there is a queued operator but no entry num: alert "no second number" or just treat it as 0
// when there is no queued operator nor entry num: do nothing (display same savedRes)
const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", () => {
  if (operator && enteredNumber) {
    savedResult = operate(operator, savedResult, +enteredNumber);
    operator = null;
    enteredNumber = "";
    updateDisplay();
  } else if (enteredNumber) {
    savedResult = +enteredNumber;
    enteredNumber = "";
    updateDisplay();
  } else if (operator) {
    alert("Please enter a second number for the operation");
  }
  decimalBtn.disabled = false;
});

// clear button
const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
  operator = "";
  savedResult = 0;
  enteredNumber = "";
  decimalBtn.disabled = false;
  updateDisplay();
});
