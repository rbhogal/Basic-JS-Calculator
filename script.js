"use strict;";

// Element Selectors
const btnNumber = document.querySelector(".number__keys");
const btnOperator = document.querySelector(".operator__keys");
const btnEqual = document.querySelector("#equal");
const curOperand = document.querySelector(".current__operand");

const data = {
  curOperand: [],
  prevOperand: [],
};



// Event listeners
// User inputs numbers
btnNumber.addEventListener("click", function (e) {
  // Add guard clause for ENTER (equal) button and div element
  if (e.target.textContent === "=" || e.target.tagName === "DIV") return;
  const number = e.target.textContent;

  // 1) Render input to current operand and store it into data
  

  curOperand += Number(number);
  console.log(curOperand);
  render(number);
});

// User hits equals
btnEqual.addEventListener("click", function (e) {
  if (e.target.tagName === "DIV") return;
  console.log(e.target.textContent);

  // Store current operand into data

  // Display current operand into previous operand

  // Clear the current operand
});

// Event handler functions
function render(number) {
  console.log(number);

  // Display current input
  curOperand.textContent += number;
}

// Clear current input display
function clear() {
  curOperand.textContent = "";
}

// clear();
