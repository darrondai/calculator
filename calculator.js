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

// the operator and enteredNumber will be strings, but the saved result is a number
// savedResult starts as undefined but gets assigned when pressing an op btn for the first time
let operator;
let savedResult;
let enteredNumber = "";

const numBtnContainer = document.querySelector(".number-btn-container");

numBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log(+event.target.value);
  }
});
