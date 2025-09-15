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
    switch (operator)
    {
        case '+':
            add(num1, num2);
            break;
        case '-':
            substract(num1, num2);
            break;
        case 'x':
            multiply(num1, num2);
            break;
        case '÷':
            divide(num1, num2);
            break;
    }
}

addButtons();