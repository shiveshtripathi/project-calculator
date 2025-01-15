const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')
let firstOperand = 0
let secondOperand = 0

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    console.log(`${buttonValue} Button was clicked`)
    displayArithmetic.textContent = buttonValue
  })
})

function resetCalculator() {
  displayArithmetic.textContent = ''
  let firstOperand = 0
  let secondOperand = 0
}
