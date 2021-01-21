'use strict;';

// Element Selectors
const btnNumber = document.querySelector('.number__keys');
const btnOperator = document.querySelector('.operator__keys');
const btnEqual = document.querySelector('#equal');
const btnDecimal = document.getElementById('decimal');

const containerCurOperand = document.querySelector('.current__operand');
const containerPrevOperand = document.querySelector('.previous__operand');

let newEquation;

const data = ['', '', '', ''];
[curOperand, prevOperand, operator, answer] = data;

// User inputs numbers
btnNumber.addEventListener('click', renderCurOperand.bind(this));

// User hits an operator key
btnOperator.addEventListener('click', renderOperator.bind(this));

// btnOperator.addEventListener('click', renderPrevOperand.bind(this));

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

  newEquation = false;
}

function renderOperator() {
  const click = e.target;
  const operator = e.target.textContent;

  // Guard clauses for equal button and number__keys div
  if (click.textContent === 'DEL' || click.tagName === 'DIV') return;
}

function renderPrevOperand(e) {
  const click = e.target;
  const operator = e.target.textContent;

  // Guard clauses for equal button and number__keys div
  if (click.textContent === 'DEL' || click.tagName === 'DIV') return;

  // Add operator key text to previous operand display
  curOperand += operator;

  //Display current operand into previous operand
  prevOperand = curOperand;
  containerPrevOperand.textContent = prevOperand;

  // Operator key allowed only once
  if (click.textContent === operator) click.disabled = true;

  // Clear the current operand
  clear();
  console.log(prevOperand);

  // Return previous operand as number
  calculate();
}

function calculate() {
  // stuff here;
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

// Helper functions

/**
 * Creates a guard clause to ignore button click
 * @param {*} button - button string (textContent)
 */

function guardClause(button) {
  if (this.click.textContent === button || this.click.tagName === 'DIV') return;
}

function init() {
  newEquation = true;
}

init();
