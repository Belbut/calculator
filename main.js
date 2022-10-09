//----------------------------------------------------------------- ELements
const outputFunction = document.getElementById("output-function");
const outputResult = document.getElementById("output-result");

const inputNumbers = document.getElementsByClassName("number");

//----------------------------------------------------------------- Listeners
function numberListener() {
    for (let number of inputNumbers) {
        number.addEventListener("click", (clickedNumber) => {
            if (clickedNumber.target.textContent == ".") {
                if(usedDecimal) return;
                usedDecimal = true;
            }
            calculationFunction += clickedNumber.target.textContent;
            outputFunction.textContent = Number(calculationFunction);
        })
    }
}


//----------------------------------------------------------------- Variables
let calculationResult = ""; // max numbers is 24
let calculationFunction = "";
let usedDecimal = false;

//----------------------------------------------------------------- Functions

const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;
const divide = (number1, number2) => number2 === 0 ? "ERROR" : number1 / number2;
const factorial = (number) => number === 0 ? 1 : number * factorial(number - 1);


//----------------------------------------------------------------- Run
outputResult.textContent = calculationResult;

numberListener();