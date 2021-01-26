'use strict;';

// Element Selectors
const btnNumber = document.querySelector('.number__keys');
const btnOperator = document.querySelector('.operator__keys');
const btnEqual = document.querySelector('#equal');
const btnBackspace = document.getElementById('backspace');
const btnDecimal = document.getElementById('decimal');

const containerMainDisplay = document.querySelector('.main__display');
const containerSecDisplay = document.querySelector('.secondary__display');

const data = {
  curOperand: '',
  prevOperand: '',
  operator: '',
  answer: '',
  isOperator: false,
};
let { curOperand, prevOperand, operator, answer, isOperator } = data;

// Event listeners for first operand
btnNumber.addEventListener('click', controller);
btnBackspace.addEventListener('click', backspace);
document.addEventListener('keydown', controller);
btnBackspace.addEventListener('dblclick', init);

// Event listeners for second operand

// Most functions called here first?
function controller(e) {
  const button = e.target;
  const numKey = e.key;
  const click = !numKey ? true : false;
  const keyPress = numKey ? true : false;

  // 1) Input depending on click or keypress event (Scenario is for click, numKey = undefined)
  const input = numKey ? numKey : e.target.textContent;

  // 2) Guard clauses for clicks/key presses not allowed
  if (click)
    if (input === '=' || input === 'DEL' || button.tagName === 'DIV') return;
  if (keyPress) {
    // const newValue = false;
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
    if (!keysAllowed) return;
  }

  // 3) a. Render First Operand: Render numbers
  if (+input >= 0 || +input <= 9) renderNumbers(input);

  // 3) b. Render First Operand: Render decimal
  if (input === '.') renderDecimal(input);

  // 3) c. Render First Operand: Render operator
  if (input === '%' || input === '*' || input === '-' || input === '+')
    renderOperator(input);

  // 4) Store current operand and second input data into array
  curOperand += input;

  // 5) Separate string into first and second operand
  const oprExists = curOperand.indexOf(operator); 
  const oprIndex = oprExists; 
  if (oprExists) {
    console.log(curOperand.slice(oprIndex + 1));
    prevOperand = curOperand;
  }

}

function renderNumbers(input) {
  containerMainDisplay.textContent += input;
}

function renderDecimal(input) {
  containerMainDisplay.textContent += input;
  btnDecimal.disabled = true;
}

function renderOperator(input) {
  containerMainDisplay.textContent += input;
  btnOperator.removeEventListener('click', controller);
  operator = input;
}

function backspace() {
  const lastInput = curOperand[curOperand.length - 1];

  // Re-enable decimal or operator buttons if deleted
  if (lastInput === '.') btnDecimal.disabled = false;

  if (
    lastInput === '%' ||
    lastInput === '*' ||
    lastInput === '-' ||
    lastInput === '+'
  )
    btnOperator.addEventListener('click', controller);

  // Delete last character in string
  containerMainDisplay.textContent = '';
  curOperand = curOperand.slice(0, -1);
  containerMainDisplay.textContent = curOperand;
}

function checkLastInput(lastInput) {
  if (
    lastInput === '%' ||
    lastInput === '*' ||
    lastInput === '-' ||
    lastInput === '+'
  )
    isOperator = true;

  console.log(isOperator);
}

function renderOperand2(e) {
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

function renderSecDisplay() {
  const click = e.target;
  const operator = e.target.textContent;

  // Check if this is the first operand input or second
  newExpression = newExpression ? false : true;

  // Guard clauses for equal button and number__keys div
  if (click.textContent === 'DEL' || click.tagName === 'DIV') return;
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
// function clear() {
//   containerMainDisplay.textContent = '';
// }

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
  containerMainDisplay.textContent = '';
  containerSecDisplay.textContent = '';
  curOperand = '';
  prevOperand = '';
  operator = '';
  answer = '';
  btnDecimal.disabled = false;
  btnOperator.addEventListener('click', controller);
}

init();
