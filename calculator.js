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
      console.log("add by default");
      return add;
  }
}

// the operator and enteredNumber will be strings, but the saved result is a number
// savedResult starts as undefined but gets assigned when pressing an op btn for the first time
let operator;
let savedResult;
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
    // if no saved result, we save the entered number to the saved result
    if (!savedResult) {
      savedResult = +enteredNumber;
    }
    // otherwise, calc using previously saved operator(savedResult, parsed enteredNumber)
    else {
      console.log(operator);
      savedResult = operate(operator, savedResult, +enteredNumber);
    }
    // parse and save new operator, and flush entered number
    enteredNumber = "";
    const operatorString = event.target.value;
    operator = parseOperator(operatorString);
    console.log(savedResult);
  }
});

// show the saved result after operating, and use it as the first number for any operation
// when the entered number is empty, show the saved result in the display instead
// only show the entered number until either an operation is pressed or the equal
