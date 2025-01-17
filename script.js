const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')
let firstOperand = 0
let operator = 0
let tempHolder = 0
let result = 0
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    displayScreen(buttonValue)
    if (button.classList.contains('reset')) {
      resetCalculator()
    } else if (button.classList.contains('operator')) {
      displayArithmetic.textContent = ''
      if (result !== 0) {
        firstOperand = result
        result = 0
      } else firstOperand = tempHolder
      tempHolder = 0
      operator = buttonValue
    } else if (button.classList.contains('number')) {
      if (result !== 0) {
        result = 0
        resetCalculator()
        displayScreen(buttonValue)
      }
      tempHolder += buttonValue
    } else if (button.classList.contains('equal-to')) {
      if (operator === '/') {
        result = division(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result)
      }
      if (operator === '*') {
        result = multiplication(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result)
      }
      if (operator === '-') {
        result = subtraction(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result)
      }
      if (operator === '+') {
        result = addition(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result)
      }
    } else if (button.classList.contains('polarity')) {
      tempHolder = polarity(tempHolder)
      displayArithmetic.textContent = ''
      displayScreen(tempHolder)
    }
  })
})

function resetCalculator() {
  displayArithmetic.textContent = ''
  firstOperand = 0
  tempHolder = 0
}

function displayScreen(buttonValue) {
  displayArithmetic.textContent += buttonValue
}

function addition(firstOperand, secondOperand) {
  return firstOperand + secondOperand
}

function subtraction(firstOperand, secondOperand) {
  return firstOperand - secondOperand
}

function division(firstOperand, secondOperand) {
  return firstOperand / secondOperand
}

function multiplication(firstOperand, secondOperand) {
  return firstOperand * secondOperand
}

function polarity(operand) {
  return -1 * Number(operand)
}
