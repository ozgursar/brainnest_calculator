// Init calculator data
const calcData = {
  displayArray: [],
  numberInOperation: 0,
  selectedOperator: null,
  endOfCalculation: false,
  get numberDisplayed() {
    if (this.displayArray.length) {
      return +this.displayArray.join('')
    } else {
      return 0
    }
  },
  render() {
    screen.textContent = this.displayArray.length ? this.displayArray.join('') : 0
    // Dynamically reduce font size to fit numbers into screen
    this.displayArray.length>13 ? screen.classList.add('smaller-font') : screen.classList.remove('smaller-font')
    //console.log(this)
  }
}
const allowedDigits = 9 //max digits that you can type on screen

// Nodes and nodelists
const screen = document.querySelector("#screen")
const numbersContainer = document.querySelector(".numbers-container")
const numberButtons = numbersContainer.querySelectorAll(".btn")
const operatorsContainer = document.querySelector(".operators-container")
const operatorButtons = operatorsContainer.querySelectorAll(".btn.opr")
const btnCalculate = document.querySelector("#calculate")
const btnClear = document.querySelector("#clear")
const btnBackspace = document.querySelector("#backspace")

// Main operator functions
const operate = (operator, num1, num2) => operator(num1, num2)
const add = (num1, num2) => num1+num2
const subtract = (num1, num2) => num1-num2
const multiply = (num1, num2) => num1*num2
const divide = (num1, num2) => {
  if (num2 !== 0) {
    return num1/num2
  } else {
    screen.textContent = "Division by 0"
    return null
  }
}

// Event handlers
const handleEnterDigit = (e, numberFromKeyboard) => {
  if (calcData.endOfCalculation) {
    calcData.endOfCalculation = false
    calcData.displayArray = []
  }
  if (calcData.displayArray.length<allowedDigits) {
    if (e instanceof PointerEvent) {
      if (e.target.id === '.' && calcData.displayArray.includes('.')) return
      calcData.displayArray.push(e.target.id)
    }
    if (e instanceof KeyboardEvent) {
      if (numberFromKeyboard === '.' && calcData.displayArray.includes('.')) return
      calcData.displayArray.push(numberFromKeyboard)
    }
    calcData.render()
  }
}

const handleCalculate = () => {
  let tempResult //null when div by zero
  resetActiveColoredButtons()
  if (calcData.numberInOperation && calcData.selectedOperator) {
    tempResult=operate(calcData.selectedOperator, calcData.numberInOperation, calcData.numberDisplayed)
    if (typeof(tempResult) == 'number') {
      calcData.displayArray = (Number.isInteger(tempResult) ? tempResult.toString() : tempResult.toFixed(4)).split('')
    }
    calcData.selectedOperator = null
    calcData.numberInOperation = 0
    calcData.endOfCalculation = true
    if (tempResult !== null) calcData.render()
  }
}

const handleSelectOperator = (e, operatorFromKeyboard) => {
  // Chain calculation only once even if operator button clicked multiple times
  if (calcData.displayArray.length) {
    handleCalculate()
    calcData.numberInOperation = calcData.numberDisplayed
    calcData.displayArray = []
  }
  resetActiveColoredButtons()

  if (e instanceof PointerEvent) {
    switch (e.target.id) {
      case 'add':
        calcData.selectedOperator = add
        break
      case 'subtract':
        calcData.selectedOperator = subtract
        break
      case 'multiply':
        calcData.selectedOperator = multiply
        break
      case 'divide':
        calcData.selectedOperator = divide
    }
    // Change color of the selected operator
    e.target.classList.add('active')
  }

  if (e instanceof KeyboardEvent) {
    calcData.selectedOperator = operatorFromKeyboard
    // Change color of the selected operator
    switch (operatorFromKeyboard) {
      case add:
        document.querySelector('#add').classList.add('active')
        break
      case subtract:
        document.querySelector('#subtract').classList.add('active')
        break
      case multiply:
        document.querySelector('#multiply').classList.add('active')
        break
      case divide:
        document.querySelector('#divide').classList.add('active')
    }
  }
}

const handleClear = () => {
  calcData.displayArray = []
  calcData.numberInOperation = 0
  calcData.selectedOperator = null
  calcData.endOfCalculation = false
  resetActiveColoredButtons()
  calcData.render()
  //console.clear()
}

const handleBackspace = () => {
  calcData.displayArray.pop()
  calcData.render()
}

const handleKeyDown = (e) => {
  switch (e.key) {
    case 'c':
      handleClear()
      break
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '.':
      handleEnterDigit(e, e.key)
      break
    case '+':
      handleSelectOperator(e, add)
      break
    case '-':
      handleSelectOperator(e, subtract)
      break
    case '*':
      handleSelectOperator(e, multiply)
      break
    case '/':
      handleSelectOperator(e, divide)
      break
    case 'Backspace':
      handleBackspace()
      break
    case 'Enter':
      handleCalculate()
  }
}

// Event listeners
numberButtons.forEach((button) => button.addEventListener('click', handleEnterDigit))
btnClear.addEventListener('click', handleClear)
btnBackspace.addEventListener('click', handleBackspace)
operatorButtons.forEach((button) => button.addEventListener('click', handleSelectOperator))
btnCalculate.addEventListener('click', handleCalculate )

// Keyboard support
document.addEventListener("keydown", handleKeyDown);

// Remove active class from all operator buttons
function resetActiveColoredButtons() {
  operatorButtons.forEach((button) => button.classList.remove('active'))
}