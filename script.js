'use strict;';

// Element Selectors
const btnNumber = document.querySelector('.number__keys');
const btnOperator = document.querySelector('.operator__keys');
const btnEqual = document.querySelector('#equal');
const btnDecimal = document.getElementById('decimal');

const containerMainDisplay = document.querySelector('.main__display');
const containerSecDisplay = document.querySelector('.secondary__display');

let newExpression;

const data = {
  curOperand: '',
  prevOperand: '',
  operator: '',
  answer: '',
  keysAllowed: ['.', '0', '-', '+', '%'],
};

const { curOperand, prevOperand, operator, answer, keysAllowed } = data;
console.log(keysAllowed);

// User inputs numbers
btnNumber.addEventListener('click', renderMainDisplay);
document.addEventListener('keydown', renderMainDisplay);

// User hits an operator key
btnOperator.addEventListener('click', renderSecDisplay);
// document.addEventListener('keydown', renderSecDisplay);55

// btnOperator.addEventListener('click', renderPrevOperand.bind(this));

// // User hits equals
// btnEqual.addEventListener("click", storeInput.bind(this));

// Event handlers (functions)

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

// Render input to calculator display as current operand
function renderMainDisplay(e) {
  const button = e.target;
  const numKey = e.key;
  const click = !numKey ? true : false;

  // 1) Input depending on click or keypress event (Scenario is for click, numKey = undefined)
  const input = numKey ? numKey : e.target.textContent;

  // Guard clauses for either click or keypress
  if (click) {
    if (input === '=' || button.tagName === 'DIV') return;
  } else {
    const newValue = false;
    const keysAllowed =
      +numKey ||
      numKey === '.' ||
      numKey === '0' ||
      numKey === '-' ||
      numKey === '+' ||
      numKey === '*' ||
      numKey === '%'
        ? true
        : false;

    // Guard clause for (KEYPRESS)
    if (!keysAllowed) return;

    // Allow operator again only once you enter new value
  }

  // 2) Render input to current operand and store it into data
  containerMainDisplay.textContent += input;

  // 3) Store current operand input data into array
  curOperand += input;

  // 4) Decimal press only allowed once
  if (input === '.') button.disabled = true;
}

function renderSecDisplay() {
  const click = e.target;
  const operator = e.target.textContent;

  // Check if this is the first operand input or second
  newExpression = newExpression ? false : true;

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
  containerSecDisplay.textContent = prevOperand;

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

//   containerSecDisplay.textContent = curOperand;
//   // Convert curOperand to a number
//   // +curOperand

//   // Clear the current operand
// }

// Clear current input display
function clear() {
  containerMainDisplay.textContent = '';
}

// clear();

/*
// Calculate
function calc(a, b, operator) {
  if (operator === '+') add(a, b);
  if (operator === '-') return;
  if (operator === '%') return;
  if (operator === '*') return;
}

calc(5, 2, '+');

// Math functions

function add(a, b) {
  return (answer = a + b);
}

*/
// Helper functions

/**
 * Creates a guard clause to ignore button click
 * @param {*} button - button string (textContent)
 */

function init() {
  newExpression = false;
}

init();
