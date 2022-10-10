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
            //after adding a factorial there need's to be add another operator
            if (isLastClickedAnOperator() && outputFunction.textContent.slice(-1) == "!") {
                return;
            }

            currentVariableNumber += number.textContent;
            outputFunction.textContent = displayFunctionString + Number(currentVariableNumber);
        })
    }
}

//TODO: Should separate the special case of factorial from the rest of operators listeners;
function operatorListener() {
    for (let operator of inputOperators) {
        operator.addEventListener("click", () => {
            clickedOperator = operator.textContent;
            if (clickedOperator != "!") {
                if (isLastClickedAnOperator() && outputFunction.textContent.slice(-1) != "!") {
                    outputFunction.textContent = outputFunction.textContent.slice(0, -1);
                }
                addOperator(clickedOperator);
            } else {
                // the second condition is to prevent duplication of factorial by overriding the last operator
                if (isLastClickedAnOperator()) {
                    if (outputFunction.textContent.slice(-2, -1) != "!") {
                        outputFunction.textContent = outputFunction.textContent.slice(0, -1);
                        addOperator(clickedOperator);
                    }
                } else addOperator(clickedOperator);
            }
        })
    }
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

function addOperator(clickedOperator) {
    //store display function for when to add new numbers we don't loose the older ones.
    displayFunctionString = outputFunction.textContent + clickedOperator;
    //reset Variables for new variable
    currentVariableNumber = 0;
    usedDecimal = false;
    //render the result
    outputFunction.textContent = displayFunctionString;
}

function isLastClickedAnOperator() {
    return isNaN(outputFunction.textContent.slice(-1))
}
function onStart() {
    numberListener();
    operatorListener();
}

//----------------------------------------------------------------- Run
outputResult.textContent = calculationResult;

onStart();