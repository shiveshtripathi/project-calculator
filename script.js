const buttonData = document.querySelectorAll('#button')
const displayArithmetic = document.querySelector('.display-box')

buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent
    console.log(`${buttonValue} Button was clicked`)
    displayArithmetic.textContent = buttonValue
  })
})
