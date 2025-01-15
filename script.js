const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')
let firstOperand = 0
let secondOperand = 0
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string)

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    console.log(`${buttonValue} Button was clicked`)
    if (buttonValue === 'AC') resetCalculator()
    else if (isNumeric(buttonValue) || buttonValue === '.') {
      firstOperand(buttonValue)
      displayScreen(buttonValue)
      console.log(firstOperand)
    } else displayScreen(buttonValue)
  })
})

function resetCalculator() {
  displayArithmetic.textContent = ''
  firstOperand = 0
  secondOperand = 0
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
