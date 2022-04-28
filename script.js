class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
      this.previousOperandTextElement = previousOperandTextElement
      this.currentOperandTextElement = currentOperandTextElement
      this.clear()
    }
    clear() {
        this.currentOperand = ''
        this.previousOperand = ''
        this.operation = undefined
      }
    delete(){
      this.currentOperand = this.currentOperand.toString().slice(0,-1)
    }
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
      }
    chooseOperation(operation){
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }
    compute(){
      let computation
      const prev = parseFloat(this.previousOperand)
      const current = parseFloat(this.currentOperand)
      if (isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
        case '+':
          computation = prev + current
          break
        case '-':
          computation = prev - current
          break
        case 'x':
          computation = prev * current
          break
        case '÷':
          computation = (prev / current).toFixed(3)
          break
        default:
          return
      }
      this.currentOperand = computation
      this.operation = undefined
      this.previousOperand = ''
    }
    getDisplayNumber(number) {
      const stringNumber = number.toString()
      const integerDigits = parseFloat(stringNumber.split('.')[0])
      const decimalDigits = stringNumber.split('.')[1]
      let integerDisplay
      if (isNaN(integerDigits)) {
        integerDisplay = ''
      } else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
      }
      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
      } else {
        return integerDisplay
      }
    }
    updateDisplay() {
      this.currentOperandTextElement.innerText =
        this.getDisplayNumber(this.currentOperand)
      if (this.operation != null) {
        this.previousOperandTextElement.innerText =
          `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
      } else {
        this.previousOperandTextElement.innerText = ''
      }
    }
  }


const numberButtons = document.querySelectorAll('[data-number]')
const opButtons = document.querySelectorAll('[data-op]')
const equalsButton = document.querySelector('[data-equals]')
const clearButton = document.querySelector('[data-clear]')
const deleteButton = document.querySelector('[data-delete]')
const previousOperandTextElement = document.querySelector('[data-previous]')
const currentOperandTextElement = document.querySelector('[data-current]')


const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
      calculator.appendNumber(button.innerText)
      calculator.updateDisplay()
    })
  })
opButtons.forEach(button => {
    button.addEventListener('click', () =>{
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})
equalsButton.addEventListener('click', button =>{
  calculator.compute()
  calculator.updateDisplay()
})
clearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})

document.addEventListener('keydown', handleKbInput)

function handleKbInput(e){
  if (e.key >=0 && e.key <=9) {
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
  }if (e.key === '.'){
    calculator.appendNumber(e.key)
    calculator.updateDisplay()
  } if (e.key === '=' || e.key === 'Enter'){
    calculator.compute()
    calculator.updateDisplay()
  } if (e.key === 'Escape') {
    calculator.clear()
    calculator.updateDisplay()
  } if (e.key === 'Backspace'){
    calculator.delete()
    calculator.updateDisplay()
  } if (e.key === '+' || e.key === '-'){
    calculator.chooseOperation(e.key)
    calculator.updateDisplay()
  } else if(e.key === '*'){
    let a = 'x'
    calculator.chooseOperation(a)
    calculator.updateDisplay()
  }
  else if(e.key === '/'){
    let a = '÷'
    calculator.chooseOperation(a)
    calculator.updateDisplay() 
  }
}
