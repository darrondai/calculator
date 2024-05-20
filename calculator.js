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

let operator;
let num1;
let num2;

function operate(operator, num1, num2) {
  return operator(num1, num2);
}

const numBtnContainer = document.querySelector(".number-btn-container");

numBtnContainer.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    console.log(+event.target.value);
  }
});
