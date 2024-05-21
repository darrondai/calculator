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

const numBtnContainer = document.querySelector(".number-btn-container");

numBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // string concatenation
    enteredNumber += event.target.value;
    console.log(enteredNumber);
  }
});

const operatorBtnContainer = document.querySelector(".operator-btn-container");
operatorBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    // if no previously queued operator, we save the entered number to the saved result
    // should be able to overwrite previous savedresult as long as no queued operator
    if (!operator) {
      savedResult = +enteredNumber;
    }
    // otherwise, calc using previously saved operator(savedResult, parsed enteredNumber)
    else {
      console.log(operator);
      savedResult = operate(operator, savedResult, +enteredNumber);
      console.log(savedResult);
    }
    // parse and save new operator, and flush entered number
    enteredNumber = "";
    const operatorString = event.target.value;
    operator = parseOperator(operatorString);
  }
});

// equal button
const equalBtn = document.querySelector("#equal-btn");
equalBtn.addEventListener("click", () => {
  savedResult = operate(operator, savedResult, +enteredNumber);
  operator = "";
  enteredNumber = "";
  console.log(savedResult);
});

// clear button
const clearBtn = document.querySelector("#clear-btn");
clearBtn.addEventListener("click", () => {
  operator = "";
  savedResult = 0;
  enteredNumber = "";
});

// show the saved result after operating, and use it as the first number for any operation
// when the entered number is empty, show the saved result in the display instead
// only show the entered number until either an operation is pressed or the equal

// number button press:
// append the number to the entry string

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

// equal button press:
// when there is no queued operator but there is an entry num, set savedRes to entry num
// when there is a queued operator but no entry num: alert "no second number" or just treat it as 0
// when there is no queued operator nor entry num: do nothing (display same savedRes)
