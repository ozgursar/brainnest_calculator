// Init calculator data
const calcData = {
  displayArray: [],
  numberDisplayed: 0,
  numberInOperation: 0,
  selectedOperator: null,
  endOfCalculation: false,
  render() {
    this.numberDisplayed = this.displayArray.length ? +this.displayArray.join('') : 0
    screen.textContent = this.displayArray.length ? this.displayArray.join('') : 0
    console.log(this)
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
    return num1 // Return first number if division by zero
  }

}

// Event handlers
const handleEnterDigit = (e) => {
  if (calcData.endOfCalculation) {
    calcData.endOfCalculation = false
    calcData.displayArray = []
  }
  if (calcData.displayArray.length<allowedDigits) {
    if ((e.target.id === '.') && calcData.displayArray.includes('.')) return
    calcData.displayArray.push(e.target.id)
    calcData.render()
  }
}

const handleCalculate = () => {
  let tempResult
  if (calcData.numberInOperation && calcData.selectedOperator) {
    tempResult=operate(calcData.selectedOperator, calcData.numberInOperation, calcData.numberDisplayed)
    calcData.displayArray = (Number.isInteger(tempResult) ? tempResult.toString() : tempResult.toFixed(2)).split('')
    calcData.selectedOperator = null
    calcData.numberInOperation = 0
    calcData.endOfCalculation = true
    calcData.render()
  }
}

const handleSelectOperator = (e) => {
  if (calcData.displayArray.length) {
    handleCalculate() // Chain calculations
    calcData.numberInOperation = +calcData.displayArray.join('')
    calcData.displayArray = []
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
  }
}

const handleClear = () => {
  calcData.displayArray = []
  calcData.numberDisplayed = 0
  calcData.numberInOperation = 0
  calcData.selectedOperator = null
  calcData.endOfCalculation = false
  calcData.render()
  console.clear()
}

const handleBackspace = () => {
  calcData.displayArray.pop()
  calcData.render()
}

// Event listeners
numberButtons.forEach((button) => button.addEventListener('click', handleEnterDigit))
btnClear.addEventListener('click', handleClear)
btnBackspace.addEventListener('click', handleBackspace)
operatorButtons.forEach((button) => button.addEventListener('click', handleSelectOperator))
btnCalculate.addEventListener('click', handleCalculate )
