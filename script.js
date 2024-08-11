

const calculator = {
  displayValue: '0',
  firstOperand: null,
  waitingForSecondOperand: false,
  operator: null,
};

function updateDisplay() {
  const display = document.querySelector('#calculator-screen');
  display.value = calculator.displayValue;
}

function handleDigit(digit) {
  const { displayValue, waitingForSecondOperand } = calculator;

  if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
  } else {
      calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
  }

  updateDisplay();
}

function handleOperator(nextOperator) {
  const { firstOperand, displayValue, operator } = calculator;
  const inputValue = parseFloat(displayValue);

  if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
  }

  if (firstOperand == null && !isNaN(inputValue)) {
      calculator.firstOperand = inputValue;
  } else if (operator) {
      const result = performCalculation[operator](firstOperand, inputValue);

      calculator.displayValue = String(result);
      calculator.firstOperand = result;
  }

  calculator.waitingForSecondOperand = true;
  calculator.operator = nextOperator;

  updateDisplay();
}

const performCalculation = {
  '/': (firstOperand, secondOperand) => firstOperand / secondOperand,
  '*': (firstOperand, secondOperand) => firstOperand * secondOperand,
  '+': (firstOperand, secondOperand) => firstOperand + secondOperand,
  '-': (firstOperand, secondOperand) => firstOperand - secondOperand,
  '=': (firstOperand, secondOperand) => secondOperand
};

function resetCalculator() {
  calculator.displayValue = '0';
  calculator.firstOperand = null;
  calculator.waitingForSecondOperand = false;
  calculator.operator = null;
  updateDisplay();
}

function handleDecimal(dot) {
  if (calculator.waitingForSecondOperand) {
      calculator.displayValue = '0.';
      calculator.waitingForSecondOperand = false;
      return;
  }

  if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
  }

  updateDisplay();
}

const keys = document.querySelector('.calculator-keys');
keys.addEventListener('click', event => {
  const { target } = event;

  if (!target.matches('button')) {
      return;
  }

  if (target.classList.contains('operator')) {
      handleOperator(target.value);
      return;
  }

  if (target.classList.contains('decimal')) {
      handleDecimal(target.value);
      return;
  }

  if (target.classList.contains('all-clear')) {
      resetCalculator();
      return;
  }

  handleDigit(target.value);
});
