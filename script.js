class Calculator {
    constructor(previousOperandTxtElement, currentOperandTxtElement) {
        this.previousOperandTxtElement = previousOperandTxtElement;
        this.currentOperandTxtElement = currentOperandTxtElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    appendNumber(number) {
        if(number === "." && this.currentOperand.includes("."))
        return 
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if(this.currentOperand === "")
        return 
        if(this.currentOperand !== "" && this.previousOperand !== "")
        this.compute();
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    compute() {
        let computation
        let mod
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(current)) return;
        switch(this.operation) {
            case "+": computation = prev + current; break;
            case "-": computation = prev - current; break;
            case "*": computation = prev * current; break;
            case "÷": computation = prev / current; break;
            case "^": computation = prev ** current; break;
            case "%": mod = prev / current; mod = Math.floor(mod); mod = mod * current; mod = prev - mod; computation = mod; break;
            default: return;
        }
        this.readyToReset = true;
        this.currentOperand = computation;
        this.operation = undefined;
        this.previousOperand = "";
    }

    updateDisplay() {
        this.currentOperandTxtElement.innerText = 
        this.currentOperand;
        if(this.operation != null) {
            this.previousOperandTxtElement.innerText = 
            `${this.previousOperand} ${this.operation}`
        }
        else{this.previousOperandTxtElement.innerText = "";}
    }
}

const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const allClearButton = document.querySelector('[data-allClear]')
const previousOperandTxtElement = document.querySelector('[data-prevOperand]')
const currentOperandTxtElement = document.querySelector('[data-curOperand]')

const calculator = new Calculator(previousOperandTxtElement, currentOperandTxtElement);
allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

numberButtons.forEach(button => {
   button.addEventListener('click', ()=> {
    if(calculator.previousOperand === "" && 
    calculator.currentOperand !== "" && 
    calculator.readyToReset) {
        calculator.currentOperand = "";
        calculator.readyToReset = false;
    }
       calculator.appendNumber(button.innerText)
       calculator.updateDisplay()
   }) 
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.compute();
    calculator.updateDisplay();
})