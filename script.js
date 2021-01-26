'use strict;';

// Element Selectors
const btnNumber = document.querySelector('.number__keys');
const btnOperator = document.querySelector('.operator__keys');
const btnEqual = document.querySelector('#equal');
const btnBackspace = document.getElementById('backspace');
const btnDecimal = document.getElementById('decimal');
const btnAllClear = document.getElementById('all-clear');

const containerMainDisplay = document.querySelector('.main__display');
const containerSecDisplay = document.querySelector('.secondary__display');

const data = {
  curOperand: '',
  operator: '',
  answer: '',
  operandA: '',
  operandB: '',
};
let { curOperand, operator, answer, operandA, operandB } = data;

// Event listeners
btnBackspace.addEventListener('click', backspace);
document.addEventListener('keydown', controller);
btnBackspace.addEventListener('dblclick', init);
btnAllClear.addEventListener('click', init);

// Most functions called here first?
function controller(e) {
  const button = e.target;
  const numKey = e.key;
  const click = !numKey ? true : false;
  const keyPress = numKey ? true : false;

  // 1) Input a number keypress ? Then input = to the text of the keypress, otherwise = to the button text
  // Scenario is for click, numKey = undefined
  const input = numKey ? numKey : e.target.textContent;

  // 2) Guard clauses for clicks/key presses not allowed
  if (click)
    if (
      input === '=' ||
      input === 'DEL' ||
      input === 'AC' ||
      button.tagName === 'DIV'
    )
      return;
  if (keyPress) {
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

  // 3) Separate and store string (operand) into inputs aka operands A and B
  curOperand += input;
  storeOperands();

  // 4) Render main display
  renderMainDisplay(input);

  // 5) Calculate expression
  calc(operandA, operandB);

  // 6) Render result to secDisplay
  renderSecDisplay();
}

function storeOperands() {
  // console.log(operator);
  const operatorExists = !operator ? false : true;
  if (operatorExists) {
    const oprIndex = curOperand.lastIndexOf(operator);
    operandA = curOperand.slice(0, oprIndex);
    operandB = curOperand.slice(oprIndex + 1);
  }
}

function renderMainDisplay(input) {
  // 1) Render numbers
  if (+input >= 0 || +input <= 9) renderNumbers(input);

  // 2) Render decimal
  if (input === '.') renderDecimal(input);

  // 3) Render operator
  if (input === '%' || input === '*' || input === '-' || input === '+')
    renderOperator(input);
}

function renderNumbers(input) {
  containerMainDisplay.textContent += input;
}

function renderDecimal(input) {
  containerMainDisplay.textContent += input;
  btnDecimal.disabled = true;
}

function renderOperator(input) {
  // if operator is empty then render it, but don't store it as an operator, and don't remove the event listener. otherwise do it
  if (curOperand === '-') {
    containerMainDisplay.textContent += input;
    return;
  }

  // Store operator
  operator = input;
  // Exception for negative numbers
  containerMainDisplay.textContent += input;
  btnOperator.removeEventListener('click', controller);

  // Re-enable decimal
  btnDecimal.disabled = false;
}

function backspace() {
  const lastInput = curOperand[curOperand.length - 1];

  // Re-enable decimal or operator if deleted in display
  if (lastInput === '.') btnDecimal.disabled = false;
  if (
    lastInput === '%' ||
    lastInput === '*' ||
    lastInput === '-' ||
    lastInput === '+'
  ) {
    btnOperator.addEventListener('click', controller);
    operator = '';
  }

  // Delete the last character in the string
  containerMainDisplay.textContent = '';
  curOperand = curOperand.slice(0, -1);
  containerMainDisplay.textContent = curOperand;

  // Update secondary display (answer)
  storeOperands(curOperand);
  calc(operandA, operandB);
  renderSecDisplay();
}

function calc(a, b) {
  if (!operandB) return;
  if (operator === '%') divide(+a, +b);
  if (operator === '*') multiply(+a, +b);
  if (operator === '+') add(+a, +b);
  if (operator === '-') subtract(+a, +b);
}

// Math functions
function divide(a, b) {
  if (+operandB === 0) return (answer = 'undefined');
  return (answer = a / b);
}
function multiply(a, b) {
  return (answer = a * b);
}
function subtract(a, b) {
  return (answer = a - b);
}
function add(a, b) {
  return (answer = a + b);
}

function renderSecDisplay() {
  !operandB || !operator
    ? (containerSecDisplay.textContent = '')
    : (containerSecDisplay.textContent = answer);
}

function equals() {
  // Show answer in main display
  containerMainDisplay.textContent = containerSecDisplay.textContent;
  containerSecDisplay.textContent = '';

  // remove equals event listeners
  btnEqual.removeEventListener('click', equals);
  btnNumber.removeEventListener('click', controller);

  // Hide DEL button (add hidden class)
  btnBackspace.classList.add('hidden');

  // Add AC button (remove hidden class)
  btnAllClear.classList.remove('hidden');
  //
}

// removeAllEventListeners('click', );

// function removeAllEventListeners(type, selector, callback) {
//   selector.removeEventListener(type, callback);
// }

function init() {
  containerMainDisplay.textContent = '';
  containerSecDisplay.textContent = '';
  curOperand = '';
  prevOperand = '';
  operator = '';
  answer = '';
  operandA = '';
  operandB = '';
  btnDecimal.disabled = false;

  btnOperator.addEventListener('click', controller);
  btnEqual.addEventListener('click', equals);
  btnNumber.addEventListener('click', controller);

  btnAllClear.classList.add('hidden');
  btnBackspace.classList.remove('hidden');
}

init();
// console.log(operator);
