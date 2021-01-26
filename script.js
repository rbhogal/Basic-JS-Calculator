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
  inputA: '',
  inputB: '',
};
let { curOperand, prevOperand, operator, answer, inputA, inputB } = data;

// Event listeners
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

  // 3) Render main display
  renderMainDisplay(input);

  // 4) Separate and store string into inputs A and B
  storeOperands(input);

  // 5) Calculate expression
  calc(inputA, inputB);

  // 7) Render result to secDisplay
  renderSecDisplay();
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
  btnDecimal.disabled = false;
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

function storeOperands(input) {
  curOperand += input;
  const oprExists = curOperand.indexOf(operator);
  const oprIndex = oprExists;
  if (oprExists) {
    inputA = curOperand.slice(0, oprIndex);
    inputB = curOperand.slice(oprIndex + 1);
    // console.log(inputA);
    // console.log(inputB);
  }
}

function calc(a, b) {
  if (!inputB) return;
  if (operator === '%') divide(+a, +b);
  if (operator === '*') multiply(+a, +b);
  if (operator === '+') add(+a, +b);
  if (operator === '-') subtract(+a, +b);
}

// Math functions
function divide(a, b) {
  if (+inputB === 0) return (answer = 'undefined');
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

function renderMainDisplay(input) {
  // 1) Render numbers
  if (+input >= 0 || +input <= 9) renderNumbers(input);

  // 2) Render decimal
  if (input === '.') renderDecimal(input);

  // 3) Render operator
  if (input === '%' || input === '*' || input === '-' || input === '+')
    renderOperator(input);
}

function renderSecDisplay() {
  containerSecDisplay.textContent = answer;
}

function equals() {
  containerMainDisplay.textContent = containerSecDisplay.textContent;
  containerSecDisplay.textContent = '';
  btnEqual.removeEventListener('click', equals);
}

function init() {
  containerMainDisplay.textContent = '';
  containerSecDisplay.textContent = '';
  curOperand = '';
  prevOperand = '';
  operator = '';
  answer = '';
  inputA = '';
  inputB = '';
  btnDecimal.disabled = false;
  btnOperator.addEventListener('click', controller);
  btnEqual.addEventListener('click', equals);
}

init();
