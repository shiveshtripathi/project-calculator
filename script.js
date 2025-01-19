const buttonData = document.querySelectorAll('#button') // To fetch all the buttons of the calculator
const displayArithmetic = document.querySelector('.display-box') // To fetch the display box
const divideSelector = document.querySelector('.divide') //Fetch the divide element to set and reset opacity
const multiplySelector = document.querySelector('.multiply') //Fetch the multiply element to set and reset opacity
const subtractionSelector = document.querySelector('.subtraction') //Fetch the subtract element to set and reset opacity
const additionSelector = document.querySelector('.addition') //Fetch the add element to set and reset opacity
let firstOperand = 0 // To store the first operand
let operator = 0 // To store the operator
let tempHolder = 0 // Temp hold and transfer to firstOperand when operator is selected
let result = 0 //To store the result
let operatorClicks = 0 //To check number of times an Operator is clicked to check multiple operator clicks
const isNumeric = (string) => /^[+-]?\d+(\.\d+)?$/.test(string) //To check the a string is numeric or not

// Add event listener to each button
buttonData.forEach((button) => {
  button.addEventListener('click', () => {
    //Extract the text of the element
    const buttonValue = button.textContent
    //Pass to function to display it

    displayScreen(buttonValue, button)
    //Reset the calculator if AC is selected
    if (button.classList.contains('reset')) {
      resetCalculator()
    } else if (button.classList.contains('operator')) {
      //check no. of operator clicks
      operatorClicks += checkOperatorClicks()
      if (operatorClicks > 1) {
        //To ignore multiple operatorClicks//
      } else {
        if (result !== 0) {
          //if result is not zero previous result is stored in it
          firstOperand = result
          result = 0
        } else {
          firstOperand = tempHolder
          tempHolder = 0
        }
      }
      //Store the operator to call the appropriate function when equal to is clicked
      operator = buttonValue
    }
    //To get the number input
    else if (button.classList.contains('number')) {
      //Reset the operator clicks counter
      operatorClicks = 0
      //Check for operator Opacity if it is there reset it and display the 2nd operand
      if (checkOpacity()) {
        resetOpacity()
        displayArithmetic.textContent = ''
        displayScreen(buttonValue, button)
      }
      //if there is result stored from previous operation reset it to zero
      if (result !== 0) {
        result = 0
        resetCalculator()
        displayScreen(buttonValue, button)
      }
      tempHolder += buttonValue
    }
    //when equal to is clicked
    else if (button.classList.contains('equal-to')) {
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
    }
    //Polarity
    else if (button.classList.contains('polarity')) {
      if (result !== 0) {
        result = polarity(result)
        displayArithmetic.textContent = ''
        displayScreen(result, button)
      } else {
        tempHolder = polarity(tempHolder)
        displayArithmetic.textContent = ''
        displayScreen(tempHolder, button)
      }
    }
    //Display percentage
    else if (button.classList.contains('percentage')) {
      if (result !== 0) {
        result = percentage(result)
        displayArithmetic.textContent = ''
        displayScreen(result, button)
      } else {
        tempHolder = percentage(tempHolder)
        displayArithmetic.textContent = ''
        displayScreen(tempHolder, button)
      }
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
      (button.classList.contains('equal-to') ||
        button.classList.contains('percentage')) &&
      buttonValue.toString().length > 8
    ) {
      buttonValue = buttonValue.toExponential(2) // "1.23e+8"
    } else if (displayArithmetic.textContent.toString().length >= 7) {
      buttonValue = ''
      displayArithmetic.textContent = displayArithmetic.textContent
        .toString()
        .slice(0, 7)
    } else if (buttonValue.toString().length >= 7) {
      if (buttonValue.toString()[0] === '-') {
        buttonValue = buttonValue.toString().slice(0, 8)
        tempHolder = buttonValue
      } else {
        buttonValue = buttonValue.toString().slice(0, 7)
        buttonValue = tempHolder
      }
    }
    displayArithmetic.textContent += buttonValue
  } else if (buttonValue === NaN || buttonValue === Infinity) {
    displayArithmetic.textContent = 'LOL'
    tempHolder = 0
    firstOperand = 0
    result = 0
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
