//----------------------------------------------------------------- ELements
const outputFunction = document.getElementById("output-function");
const outputResult = document.getElementById("output-result");

const inputNumbers = document.getElementsByClassName("number");
const inputOperators = document.getElementsByClassName("operator");

const inputBackspace = document.getElementById("backspace");
const inputClear = document.getElementById("clear");
//----------------------------------------------------------------- Listeners
function numberListener() {
    for (let number of inputNumbers) {
        number.addEventListener("click", () => {
            if (number.textContent == ".") {
                if (usedDecimal(currentVariableNumber)) return;

            }
            //after adding a factorial there need's to be add another operator
            if (isLastClickedAnOperator() && outputFunction.textContent.slice(-1) == "!") {
                return;
            }
            currentVariableNumber += number.textContent;
            outputFunction.textContent = storedExpressionString + Number(currentVariableNumber);
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

function backspaceListener() {
    inputBackspace.addEventListener("click", () => {
        if (!isLastClickedAnOperator()) {
            //delete number
            console.log("delete a number");
            currentVariableNumber = currentVariableNumber.slice(0, -1);
            outputFunction.textContent = outputFunction.textContent.slice(0, -1);
            if (outputFunction.textContent.length == 0) {
                currentVariableNumber = 0;
                outputFunction.textContent = storedExpressionString + Number(currentVariableNumber);
            }
        } else if (outputFunction.textContent.slice(-1) == "!") {
            //delete factorial
            outputFunction.textContent = outputFunction.textContent.slice(0, -1);
        } else {
            // deleting operators
            storedExpressionString = storedExpressionString.slice(0, -1);
            outputFunction.textContent = outputFunction.textContent.slice(0, -1);
            splitString = storedExpressionString.split(/[÷+×-]/);
            let i = splitString[splitString.length - 1].length;
            currentVariableNumber = storedExpressionString.slice(-i);
            storedExpressionString = storedExpressionString.slice(0, -i);
        }
    })
}

function clearListener() {
    inputClear.addEventListener("click", () => {
        calculationResult = "";
        currentVariableNumber = 0;
        storedExpressionString = "";
        outputFunction.textContent=0;
        
    })
}


//----------------------------------------------------------------- Variables
let calculationResult = ""; // max numbers is 24

let currentVariableNumber = 0;
let storedExpressionString = "";

let usedDecimal = (a) => a % 1 != 0;
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

    if (clickedOperator != "!") {
        //store display function for when to add new numbers we don't loose the older ones.
        storedExpressionString = outputFunction.textContent + clickedOperator;
        //reset Variables for new variable
        currentVariableNumber = 0;
        usedDecimal = false;
    }
    //render the result
    outputFunction.textContent = outputFunction.textContent + clickedOperator;
}

function isLastClickedAnOperator() {
    let lastClicked = outputFunction.textContent.slice(-1);
    return isNaN(lastClicked) || lastClicked == ".";
}
function onStart() {
    numberListener();
    operatorListener();
    backspaceListener();
    clearListener();
}

//----------------------------------------------------------------- Run
outputResult.textContent = calculationResult;

onStart();