const screenData = {
  displayed: [],
  num1: 0,
  num2: 0,
  selectedOperator: null,
  calculated: 0
}

const add = (num1, num2) => num1+num2
const subtract = (num1, num2) => num1-num2
const multiply = (num1, num2) => num1*num2
const divide = (num1, num2) => num1/num2
const operate = (operator, num1, num2) => operator(num1, num2)
const renderScreen = () => {
  console.log(screenData)
  if (screenData.displayed.length) {
    screen.textContent = screenData.displayed.join('')
  } else {
    screen.textContent = screenData.calculated
  }
}
const clearData = () => {
  screenData.displayed = []
  screenData.num1 = 0
  screenData.num2 = 0
  screenData.selectedOperator = null,
  screenData.calculated = 0
}

const screen = document.querySelector("#screen")
const numbersContainer = document.querySelector(".numbers-container")
const numberButtons = numbersContainer.querySelectorAll(".btn")
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    // No leading zeros
    if (!(button.id==0 && screenData.displayed.length==0) && screenData.displayed.length<9) {
      screenData.displayed.push(button.id)
      renderScreen()
    }
  })
})

// Clear function
const btnClear = document.querySelector("#clear")
btnClear.addEventListener('click', () => {
  clearData()
  renderScreen()
})

// Backspace function
const btnBackSpace = document.querySelector("#backspace")
btnBackSpace.addEventListener('click', () => {
  screenData.displayed.pop()
  renderScreen()
})

// Operator buttons
const operatorsContainer = document.querySelector(".operators-container")
const operatorButtons = operatorsContainer.querySelectorAll(".btn.opr")
operatorButtons.forEach((button) => {
  button.addEventListener('click', () => {
    switch (button.id) {
      case 'add':
        screenData.selectedOperator = add
        break
      case 'subtract':
        screenData.selectedOperator = subtract
        break
      case 'multiply':
        screenData.selectedOperator = multiply
        break
      case 'divide':
        screenData.selectedOperator = divide
    }
    if (screenData.displayed.length) {
      screenData.num1 = +screenData.displayed.join('')
      screenData.displayed = []
    }
  })
})


// Calculate function
const btnCalculate = document.querySelector("#calculate")
btnCalculate.addEventListener('click', () => {
  let result
  if (screenData.num1 && screenData.displayed.length && screenData.selectedOperator) {
    screenData.num2 = +screenData.displayed.join('')
    screenData.displayed = []
    result=operate(screenData.selectedOperator,screenData.num1,screenData.num2)
    // if result is float, limit with 2 decimals
    if (Number.isInteger(result)) {
      screenData.calculated = result
    } else {
      screenData.calculated = +result.toFixed(2)
    }
    // post calculation operations
    screenData.selectedOperator = null
    screenData.num1 = screenData.calculated
    screenData.num2 = 0
  } else {
    screenData.calculated = +screenData.displayed.join('')
    clearData()
  }
  renderScreen()
})
