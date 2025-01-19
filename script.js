const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')
const divideSelector = document.querySelector('.divide')
const multiplySelector = document.querySelector('.multiply')
const subtractionSelector = document.querySelector('.subtraction')
const additionSelector = document.querySelector('.addition')
let firstOperand = 0
let operator = 0
let tempHolder = 0
let result = 0
let operatorClicks = 0
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    displayScreen(buttonValue, button)
    if (button.classList.contains('reset')) {
      resetCalculator()
    } else if (button.classList.contains('operator')) {
      operatorClicks += checkOperatorClicks()
      if (operatorClicks > 1) {
      } else {
        if (result !== 0) {
          firstOperand = result
          result = 0
        } else {
          firstOperand = tempHolder
          tempHolder = 0
        }
      }
      operator = buttonValue
    } else if (button.classList.contains('number')) {
      operatorClicks = 0
      if (checkOpacity()) {
        resetOpacity()
        displayArithmetic.textContent = ''
        displayScreen(buttonValue, button)
      }
      if (result !== 0) {
        result = 0
        resetCalculator()
        displayScreen(buttonValue, button)
      }
      tempHolder += buttonValue
    } else if (button.classList.contains('equal-to')) {
      if (operator === '/') {
        result = division(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result, button)
        operator = 'Operation Done'
        divideSelector.style.opacity = 1
      }
      if (operator === '*') {
        result = multiplication(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result, button)
        operator = 'Operation Done'
        multiplySelector.style.opacity = 1
      }
      if (operator === '-') {
        result = subtraction(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result, button)
        operator = 'Operation Done'
        subtractionSelector.style.opacity = 1
      }
      if (operator === '+') {
        result = addition(Number(firstOperand), Number(tempHolder))
        resetCalculator()
        displayScreen(result, button)
        operator = 'Operation Done'
        additionSelector.style.opacity = 1
      }
    } else if (button.classList.contains('polarity')) {
      tempHolder = polarity(tempHolder)
      displayArithmetic.textContent = ''
      displayScreen(tempHolder, button)
    } else if (button.classList.contains('percentage')) {
      tempHolder = percentage(tempHolder)
      displayArithmetic.textContent = ''
      displayScreen(tempHolder, button)
    }
  })
})

function resetCalculator() {
  displayArithmetic.textContent = ''
  firstOperand = 0
  tempHolder = 0
  resetOpacity()
}

function displayScreen(buttonValue, button) {
  if (button.classList.contains('operator')) {
    button.style.opacity = 0.25
  } else if (
    isNumeric(Number(buttonValue)) ||
    button.classList.contains('decimal')
  ) {
    if (
      button.classList.contains('equal-to') &&
      buttonValue.toString().length > 8
    ) {
      buttonValue = buttonValue.toExponential(2) // "1.23e+8"
    } else if (displayArithmetic.textContent.toString().length > 7) {
      buttonValue = ''
      displayArithmetic.textContent = displayArithmetic.textContent
        .toString()
        .slice(0, 8)
    } else if (buttonValue.toString().length > 7) {
      buttonValue = buttonValue.toString().slice(0, 8)
    }
    displayArithmetic.textContent += buttonValue
  }
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

function resetOpacity() {
  divideSelector.style.opacity = 1
  multiplySelector.style.opacity = 1
  subtractionSelector.style.opacity = 1
  additionSelector.style.opacity = 1
}

function checkOpacity() {
  if (
    divideSelector.style.opacity === '0.25' ||
    multiplySelector.style.opacity === '0.25' ||
    subtractionSelector.style.opacity === '0.25' ||
    additionSelector.style.opacity === '0.25'
  )
    return true
}

function checkOperatorClicks() {
  return (
    (divideSelector.style.opacity === '0.25') +
    (multiplySelector.style.opacity === '0.25') +
    (subtractionSelector.style.opacity === '0.25') +
    (additionSelector.style.opacity === '0.25')
  )
}

function percentage(operand) {
  return Number(operand) / 100
}
