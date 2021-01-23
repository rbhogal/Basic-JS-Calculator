
// Event Listener
btnOperator.addEventListener('click', renderOperator.bind(this));

// Event handler
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

// Helper function
function guardClause(button) {
  if (click.textContent === button || click.tagName === 'DIV') return;
}

