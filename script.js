const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')
let firstOperand = 0
let secondOperand = 0
let tempHolder = 0
let result = 0
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    if (buttonValue === '=') {
      result = add(Number(firstOperand), Number(tempHolder))
      resetCalculator()
      displayScreen(result)
      tempHolder = result
      result = 0
      console.log(`TempHolder ${tempHolder} Result ${result}`)
    } else if (buttonValue === 'AC') resetCalculator()
    else if (
      buttonValue === '/' ||
      buttonValue === '*' ||
      buttonValue === '-' ||
      buttonValue === '+'
    ) {
      firstOperand = tempHolder
      tempHolder = 0
      displayScreen(buttonValue)
    } else if (isNumeric(buttonValue) || buttonValue === '.') {
      tempHolder += buttonValue
      console.log(` Temp ${tempHolder}`)
      displayScreen(buttonValue)
    }
  })
})

function resetCalculator() {
  displayArithmetic.textContent = ''
  firstOperand = 0
  secondOperand = 0
  tempHolder = 0
}

function displayScreen(buttonValue) {
  displayArithmetic.textContent += buttonValue
}

function storeFirstOperandValue(buttonValue) {
  firstOperand += buttonValue
}

function storeSecondOperandValue(buttonValue) {
  secondOperand += buttonValue
}

function add(firstOperand, secondOperand) {
  return firstOperand + secondOperand
}
