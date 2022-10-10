//----------------------------------------------------------------- ELements
const outputFunction = document.getElementById("output-function");
const outputResult = document.getElementById("output-result");

const inputNumbers = document.getElementsByClassName("number");
const inputOperators = document.getElementsByClassName("operator");

//----------------------------------------------------------------- Listeners
function numberListener() {
    for (let number of inputNumbers) {
        number.addEventListener("click", () => {
            if (number.textContent == ".") {
                if (usedDecimal) return;
                usedDecimal = true;
            }
            currentVariableNumber += number.textContent;
            outputFunction.textContent = displayFunctionString + Number(currentVariableNumber);
        })
    }
}

function operatorListener() {
    for (let operator of inputOperators) {
        operator.addEventListener("click", () => {
            displayFunctionString = outputFunction.textContent + operator.textContent;
            currentVariableNumber=0;
            usedDecimal=false;
            outputFunction.textContent = displayFunctionString;

        })
    }
}


function onStart() {
    numberListener();
    operatorListener();
}



//----------------------------------------------------------------- Variables
let calculationResult = ""; // max numbers is 24

let currentVariableNumber = 0;
let displayFunctionString = "";

let usedDecimal = false;
const OPERATORS = ["addition", "subtraction", "multiplication", "division", "factorial"];

//----------------------------------------------------------------- Functions

const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number2 === 0 ? "ERROR" : number1 / number2;
const factorial = (number) => number === 0 ? 1 : number * factorial(number - 1);

function operate(operator, number1, number2) {

    switch (operator) {
        case OPERATORS[0]:
            return add(number1, number2);

        case OPERATORS[1]:
            return subtract(number1, number2);

        case OPERATORS[2]:
            return multiply(number1, number2);

        case OPERATORS[3]:
            return divide(number1, number2);

        case OPERATORS[4]:
            return factorial(number1);
    }
}



//----------------------------------------------------------------- Run
outputResult.textContent = calculationResult;

onStart();