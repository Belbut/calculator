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
            calculationFunction += number.textContent;
            outputFunction.textContent = Number(calculationFunction);
        })
    }
}



//----------------------------------------------------------------- Variables
let calculationResult = ""; // max numbers is 24
let calculationFunction = "";
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