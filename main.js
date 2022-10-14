//----------------------------------------------------------------- ELements
const outputFunction = document.getElementById("output-function");
const outputResult = document.getElementById("output-result");

const inputNumbers = document.getElementsByClassName("number");
const inputOperators = document.getElementsByClassName("operator");

const inputBackspace = document.getElementById("backspace");
const inputClear = document.getElementById("clear");
const inputResolve = document.getElementById("resolve");
const inputFactorial = document.getElementById("factorial");

//----------------------------------------------------------------- Variables
let lastCalculatorSolution = "";

let currentVariableNumber = 0;
let storedExpressionString = "";

//----------------------------------------------------------------- Listeners
function numberListener() {
    for (let number of inputNumbers) {
        number.addEventListener("click", () => {
            if (number.textContent == "." && currentVariableNumber.includes(".")) return;
            //After adding a factorial there needs to be add another operator
            if (isLastClickedAnOperator() && outputFunction.textContent.slice(-1) == "!") return;
            currentVariableNumber += number.textContent;
            outputFunction.textContent = storedExpressionString + Number(currentVariableNumber);
        })
    }
}

function operatorListener() {
    for (let operator of inputOperators) {
        operator.addEventListener("click", () => {
            clickedOperator = operator.textContent;
            if (isLastClickedAnOperator()) {
                if (outputFunction.textContent.slice(-2, -1) != "!") {
                    outputFunction.textContent = outputFunction.textContent.slice(0, -1);
                    addOperator(clickedOperator);
                }
            } else addOperator(clickedOperator);
        })
    }
}

function factorialListener() {
    inputFactorial.addEventListener("click", () => {
        if (isLastClickedAnOperator() && outputFunction.textContent.slice(-1) != "!") {
            outputFunction.textContent = outputFunction.textContent.slice(0, -1);
        }
        addOperator(inputFactorial.textContent);
    })
}

function backspaceListener() {
    inputBackspace.addEventListener("click", () => {
        if (!isLastClickedAnOperator()) {
            //delete number
            try {
                currentVariableNumber = currentVariableNumber.slice(0, -1)
            } catch (e) { };

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
        lastCalculatorSolution;
        currentVariableNumber = 0;
        storedExpressionString = "";
        outputFunction.textContent = 0;
    })
}

function resolveListener() {
    inputResolve.addEventListener("click", () => {
        let unProcessedArray = outputFunction.textContent.split(/(\+|-|×|÷)/g)
        let factorialProcessedArray = resolveForFactorial(unProcessedArray);
        let multiplicationProcessedArray = resolveForOperator(factorialProcessedArray, "×", "÷");
        let fullProcessedArray = resolveForOperator(multiplicationProcessedArray, "+", "-");

        lastCalculatorSolution = Number(fullProcessedArray[0]);
        if (isNaN(lastCalculatorSolution)) {
            outputResult.textContent = "ERROR DIV/0"
        } else outputResult.textContent = lastCalculatorSolution;
    })
}

//----------------------------------------------------------------- Functions

const add = (number1, number2) => number1 + number2;
const subtract = (number1, number2) => number1 - number2;
const multiply = (number1, number2) => number1 * number2;

const divide = (number1, number2) => {
    if (number2 == 0) {
        alert("Dividing with zero is a impossible to solve")
        return "ERROR"
    } else return number1 / number2;
}

const factorial = (number) => {
    if (usingDecimal(number)) {
        alert(`Sorry this is not the calculator for you, we will round your ${number}!`);
        number = Math.round(number);
    }
    return number == 0 ? 1 : number * factorial(number - 1);
};

let usingDecimal = (a) => (Number(a)) % 1 != 0;

function addOperator(clickedOperator) {

    if (clickedOperator != "!") {
        //store display function for when to add new numbers we don't loose the older ones.
        storedExpressionString = outputFunction.textContent + clickedOperator;
        //reset Variables for new variable
        currentVariableNumber = 0;
    }
    //render the result
    outputFunction.textContent = outputFunction.textContent + clickedOperator;
}

function isLastClickedAnOperator() {
    let lastClicked = outputFunction.textContent.slice(-1);
    return isNaN(lastClicked) || lastClicked == ".";
}

function resolveForFactorial(unProcessedArray) {
    return unProcessedArray.map(number => number.endsWith("!") ? factorial(number.slice(0, -1)) : number);
}

function resolveForOperator(initialArray, operator1, operator2) {
    if (initialArray.includes(operator1) || initialArray.includes(operator2)) {
        const indexOfOperator1 = initialArray.indexOf(operator1);
        const indexOfOperator2 = initialArray.indexOf(operator2);
        let indexOfFirst = Math.min(indexOfOperator1, indexOfOperator2);

        //in case only one type of operator is left
        if (indexOfFirst == -1) indexOfFirst = Math.max(indexOfOperator1, indexOfOperator2);

        const typeOfOperation = (indexOfFirst == initialArray.indexOf(operator2)) ? operator2 : operator1;
        return resolveForOperator(resolveOneOperation(initialArray, typeOfOperation, indexOfFirst), operator1, operator2);
    }
    return initialArray;
}

function resolveOneOperation(array, typeOfOperation, position) {
    let newArray;
    const numb1 = Number(array[position - 1]);
    const numb2 = Number(array[position + 1]);

    switch (typeOfOperation) {
        case "÷":
            newArray = [
                ...array.slice(0, position - 1),
                divide(numb1, numb2),
                ...array.slice(position + 2)
            ]
            break;
        case "×":
            newArray = [
                ...array.slice(0, position - 1),
                multiply(numb1, numb2),
                ...array.slice(position + 2)
            ]
            break;

        case "+":
            newArray = [
                ...array.slice(0, position - 1),
                add(numb1, numb2),
                ...array.slice(position + 2)
            ]
            break;

        case "-":
            newArray = [
                ...array.slice(0, position - 1),
                subtract(numb1, numb2),
                ...array.slice(position + 2)
            ]
            break;
    }
    return newArray;
}

function onStart() {
    numberListener();
    operatorListener();
    backspaceListener();
    clearListener();
    resolveListener();
    factorialListener();
}

//----------------------------------------------------------------- Run

onStart();