const BUTTON_QUANTITY = 16;
const BUTTON_VALUES =
    [
        '7', '8', '9', '÷',
        '4', '5', '6', 'x',
        '1', '2', '3', '-',
        '0', '.', '+', '='
    ];

let screenContent = '';
let calcOperator = '';
let numberOnScreen = '';
let numberOffScreen = '';
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let timesOperatorUsed = 0;
let opBtnPressed = false;
let dotBtnPressed = false;
let numBtnPressed = false;
let equalBtnPressed = false;
let flagSecondNumber = false; // Without it, when trying to enter more than one digit after entering the first number, it won't let you, the number will keep being replaced.

function addButtons() {
    for (let i = 0; i < BUTTON_QUANTITY; i++) {
        const btnContainer = document.querySelector('#buttons-container');
        let calculatorBtn = document.createElement('button');
        calculatorBtn.setAttribute('class', 'calculator-btn');

        calculatorBtn.setAttribute('value', `${BUTTON_VALUES[i]}`);
        calculatorBtn.textContent = BUTTON_VALUES[i];

        btnContainer.appendChild(calculatorBtn);
    }
}

function add(num1, num2) {
    return num1 + num2;
}

function substract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2, operator) {
    let result = 0;

    switch (operator) {
        case '+':
            result = add(num1, num2);
            break;
        case '-':
            result = substract(num1, num2);
            break;
        case 'x':
            result = multiply(num1, num2);
            break;
        case '÷':
            result = divide(num1, num2);
            break;
    }

    return parseFloat(result.toFixed(5));
}

function clearEverything() {
    screenContent = '';
    calcOperator = '';
    numberOnScreen = '';
    numberOffScreen = '';
    firstNumber = 0;
    secondNumber = 0;
    result = 0;
    timesOperatorUsed = 0;
    opBtnPressed = false;
    dotBtnPressed = false;
    numBtnPressed = false;
    equalBtnPressed = false;
    flagSecondNumber = false;

    calculatorScreenNumber.textContent = '0';
}

function deleteLastEntry() {
    let screenContentArray = screenContent.split('');
    screenContentArray.pop();
    screenContent = screenContentArray.join('');

    if (screenContent === '') screenContent = '0';

    numberOnScreen = screenContent;
    numberOffScreen = screenContent;

    calculatorScreenNumber.textContent = screenContent;
}

function calculatorButtonsFunctionality(btnStoredValue) {
    const btnRealValue = parseFloat(btnStoredValue);

    if (isNaN(btnRealValue)) {
        switch (btnStoredValue) {
            case '.':
                if (!screenContent.includes('.')) screenContent += btnStoredValue;
                dotBtnPressed = true;
                break;
            case '=':
                if (!equalBtnPressed && opBtnPressed && (numberOffScreen !== '')) {
                    secondNumber = parseFloat(screenContent);
                    result = operate(firstNumber, secondNumber, calcOperator);
                    numberOnScreen = result;
                    screenContent = numberOnScreen;
                    opBtnPressed = false;
                    equalBtnPressed = true;
                }
                break;
            default:
                if (equalBtnPressed) clearEverything();

                numberOnScreen = '0';
                dotBtnPressed = false;
                flagSecondNumber = true;

                if (!opBtnPressed) {
                    firstNumber = parseFloat(screenContent);

                    if (isNaN(firstNumber)) {
                        calculatorScreenNumber.textContent = '0';
                        break;
                    }

                    numberOnScreen = firstNumber;
                    screenContent = numberOnScreen;
                    opBtnPressed = true;
                    equalBtnPressed = false;
                }
                else if (opBtnPressed && numBtnPressed && (numberOffScreen !== '')) {
                    secondNumber = parseFloat(screenContent);
                    result = operate(firstNumber, secondNumber, calcOperator);
                    numberOnScreen = result;
                    screenContent = numberOnScreen;
                    firstNumber = result;
                    numBtnPressed = false;
                }

                numberOffScreen = '';
                calcOperator = btnStoredValue;
                break;
        }
    }
    else {
        if (screenContent === '0' || (opBtnPressed && !dotBtnPressed && flagSecondNumber) || equalBtnPressed) screenContent = '';
        equalBtnPressed = false;
        screenContent += btnStoredValue;
        numberOffScreen += btnStoredValue;
        numBtnPressed = true;
        flagSecondNumber = false;
    }

    if (screenContent == '')
        calculatorScreenNumber.textContent = '0';
    else
        calculatorScreenNumber.textContent = screenContent;
}

addButtons();

const calculatorBtns = document.querySelectorAll('.calculator-btn');
const calculatorScreenNumber = document.querySelector('#screen-number');
const clearBtn = document.querySelector('#clear-button');
const backspaceBtn = document.querySelector('#backspace-button');

clearBtn.addEventListener('click', clearEverything);
backspaceBtn.addEventListener('click', deleteLastEntry);

for (let calculatorBtn of calculatorBtns) {
    calculatorBtn.addEventListener('click', () => {
        const btnStoredValue = calculatorBtn.getAttribute('value');
        calculatorButtonsFunctionality(btnStoredValue);
    });
}

document.addEventListener('keydown', event => {
    let btnStoredValue = event.key;

    switch (event.key) {
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
        case '*':
        case '/':
        case '+':
        case '-':
        case '.':
        case 'Enter':
            if (event.key === '*') btnStoredValue = 'x';
            else if (event.key === '/') btnStoredValue = '÷';
            else if (event.key === 'Enter') btnStoredValue = '=';

            calculatorButtonsFunctionality(btnStoredValue);
            break;
        case 'Escape':
            clearEverything();
            break;
        case 'Backspace':
            deleteLastEntry();
            break;
        default:
            break;
    }
});
