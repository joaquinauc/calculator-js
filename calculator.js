const BUTTON_QUANTITY = 16;
const BUTTON_VALUES = 
[
    '7', '8', '9', '÷', 
    '4', '5', '6', 'x',
    '1', '2', '3', '-',
    '0', '.', '+', '='
];

function addButtons()
{
    for (let i = 0; i < BUTTON_QUANTITY; i++)
    {
        const btnContainer = document.querySelector('#buttons-container');
        let calculatorBtn = document.createElement('button');

        calculatorBtn.setAttribute('value', `${BUTTON_VALUES[i]}`);
        calculatorBtn.textContent = BUTTON_VALUES[i];

        btnContainer.appendChild(calculatorBtn);
    }
}

function add(num1, num2)
{
    return num1 + num2;
}

function substract(num1, num2)
{
    return num1 - num2;
}

function multiply(num1, num2)
{
    return num1 * num2;
}

function divide(num1, num2)
{
    return num1 / num2;
}

function operate(num1, num2, operator)
{
    let result = 0;

    switch (operator)
    {
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

addButtons();

const calculatorBtns = document.querySelectorAll('button');
const calculatorScreen = document.querySelector('#screen');

let screenContent = '';
let calcOperator = '';
let numberOnScreen = '';
let firstNumber = 0;
let secondNumber = 0;
let result = 0;
let timesOperatorUsed = 0;
let opBtnPressed = false;
let dotBtnPressed = false;
let numBtnPressed = false;
let equalBtnPressed = false;
let flagSecondOp = false; // Without it, when trying to enter more than one digit after entering the first number, it won't let you, the number will keep being replaced.

for (let calculatorBtn of calculatorBtns)
{
    calculatorBtn.addEventListener('click', () => {
        const btnStoredValue = calculatorBtn.getAttribute('value');
        const btnRealValue = parseFloat(btnStoredValue);
        
        if (isNaN(btnRealValue))
        {
            switch (btnStoredValue)
            {
                case '.':
                    if (!screenContent.includes('.')) screenContent += btnStoredValue;
                    dotBtnPressed = true;
                    break;
                case '=':
                    if (screenContent === '') screenContent = '0';

                    if (!equalBtnPressed && opBtnPressed)
                    {
                        secondNumber = parseFloat(screenContent);
                        result = operate(firstNumber, secondNumber, calcOperator)
                        numberOnScreen = result;
                        screenContent = numberOnScreen;
                        opBtnPressed = false;
                        equalBtnPressed = true;
                    }
                    break;
                default:
                    numberOnScreen = '0';
                    dotBtnPressed = false;
                    flagSecondOp = true;

                    if (!opBtnPressed)
                    {
                        firstNumber = parseFloat(screenContent);
                        
                        if (isNaN(firstNumber))
                        {
                            screenContent = '0';
                            break;
                        }

                        numberOnScreen = firstNumber;
                        screenContent = numberOnScreen;
                        opBtnPressed = true;
                        equalBtnPressed = false;
                    }
                    else if (opBtnPressed && numBtnPressed)
                    {
                        secondNumber = parseFloat(screenContent);
                        result = operate(firstNumber, secondNumber, calcOperator)
                        numberOnScreen = result;
                        screenContent = numberOnScreen;
                        firstNumber = result;
                        numBtnPressed = false;
                    }

                    calcOperator = btnStoredValue;
                    break;
            }
        }
        else
        {
            if (screenContent === '0' || (opBtnPressed && !dotBtnPressed && flagSecondOp) || equalBtnPressed) screenContent = '';
            equalBtnPressed = false;
            screenContent += btnStoredValue;
            numBtnPressed = true;
            flagSecondOp = false;
        }

        calculatorScreen.textContent = screenContent;
    });
}