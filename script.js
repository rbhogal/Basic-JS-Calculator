'use strict;';

// Element Selectors
const btnNumber = document.querySelector('.number__keys');
const btnOperator = document.querySelector('.operator__keys');
const btnEqual = document.querySelector('#equal');
const btnDecimal = document.getElementById('decimal');

const containerCurOperand = document.querySelector('.current__operand');
const containerPrevOperand = document.querySelector('.previous__operand');

const data = ['', ''];
[curOperand, prevOperand] = data;

// User inputs numbers
btnNumber.addEventListener('click', renderCurOperand.bind(this));

// User hits an operator key
btnOperator.addEventListener('click', renderPrevOperand.bind(this));

// // User hits equals
// btnEqual.addEventListener("click", storeInput.bind(this));

// Event handlers (functions)

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
// Render input to calculator display as current operand
function renderCurOperand(e) {
  // Add guard clause for ENTER (equal) button and div element
  const click = e.target;
  const input = e.target.textContent;

  // Guard clauses for equal button and number__keys div
  if (click.textContent === '=' || click.tagName === 'DIV') return;

  // 1) Render input to current operand and store it into data
  containerCurOperand.textContent += input;

  // 2) Store current operand input data into array
  curOperand += input;
  console.log(curOperand);

  // Decimal press only allowed once
  if (click.textContent === '.') click.disabled = true;
}

function renderPrevOperand(e) {
  // Add guard clause for ENTER (equal) button and div element
  const click = e.target;
  const input = e.target.textContent;

  // Guard clauses for equal button and number__keys div
  if (click.textContent === 'DEL' || click.tagName === 'DIV') return;

  // Add operator key text to previous operand display !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

  //Display current operand into previous operand
  containerPrevOperand.textContent = curOperand;

  // Clear the current operand
  clear();
  console.log(curOperand);
  // Convert curOperand to a number
  // +curOperand
}

// function storeInput(e) {
//   if (e.target.tagName === "DIV") return;
//   console.log(e.target.textContent);

//   // Display current operand into previous operand

//   containerPrevOperand.textContent = curOperand;
//   // Convert curOperand to a number
//   // +curOperand

//   // Clear the current operand
// }

// Clear current input display
function clear() {
  containerCurOperand.textContent = '';
}

// clear();
