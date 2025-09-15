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

    return result;
}

addButtons();

const calculatorBtns = document.querySelectorAll('button');
const calculatorScreen = document.querySelector('#screen');

let screenContent = '';
let firstNumber = 0;
let secondNumber = 0;
let timesOperatorUsed = 0;
let calcOperator = '';

for (let calculatorBtn of calculatorBtns)
{
    calculatorBtn.addEventListener('click', () => {
        const btnStoredValue = calculatorBtn.getAttribute('value');
        const btnRealValue = parseInt(btnStoredValue);
        
        if (isNaN(btnRealValue))
        {
            timesOperatorUsed++;

            switch (timesOperatorUsed)
            {
                case 1:
                    firstNumber = parseInt(screenContent);
                    screenContent = '0';
                    break;
                case 2:
                    secondNumber = parseInt(screenContent);
                    firstNumber = operate(firstNumber, secondNumber, calcOperator)
                    screenContent = firstNumber;
                    break;
                default:
                    break;
            }
            
            console.log(timesOperatorUsed);
            calcOperator = btnStoredValue;
        }
        else
        {
            if (screenContent === '0') screenContent = '';
            screenContent += btnStoredValue;
        }

        calculatorScreen.textContent = screenContent;
    });
}