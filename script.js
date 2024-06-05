class InvalidInputError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidInputError';
    }
}

class CalculatorError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CalculatorError';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let form = document.querySelector('form');
    form.addEventListener('submit', e => {
        e.preventDefault();
        let output = document.querySelector('output');
        let firstNum = document.querySelector('#first-num').value;
        let secondNum = document.querySelector('#second-num').value;
        let operator = document.querySelector('#operator').value;

        try {
            // Validate input
            if (isNaN(firstNum) || isNaN(secondNum)) {
                throw new InvalidInputError('Invalid input. Please enter numbers only.');
            }

            if (operator === '/' && secondNum === '0') {
                throw new CalculatorError('Division by zero is not allowed.');
            }

            // Perform calculation
            let result = eval(`${firstNum} ${operator} ${secondNum}`);
            output.innerHTML = result;
        } catch (error) {
            if (error instanceof InvalidInputError || error instanceof CalculatorError) {
                console.error(`${error.name}: ${error.message}`);
                output.innerHTML = 'Error: ' + error.message;
            } else {
                console.error(error);
                output.innerHTML = 'An unexpected error occurred.';
            }
            // Log the error to TrackJS
            window.TrackJS && TrackJS.track(error);
        } finally {
            console.log('Calculation completed');
        }
    });

    let errorBtns = Array.from(document.querySelectorAll('#error-btns > button'));
    let demoData = [
        { name: 'Software Engineering', number: 100 },
        { name: 'Programming Language', number: 120 },
        { name: 'Advanced Software Eng', number: 130 }
    ];

    function triggerGlobalError() {
        // Reference error for triggering global error handling
        boom;
    }

    function handleBtnClick(index) {
        switch (index) {
            case 0: // Console Log
                console.log('This is a console log demo.');
                break;
            case 1: // Console Error
                console.error('%cThis is an error message', 'color: red');
                break;
            case 2: // Console Count
                console.count('Button Clicks');
                break;
            case 3: // Console Warn
                console.warn('This is a warning message');
                break;
            case 4: // Console Assert
                console.assert(demoData.some(data => data.number > 140), 'At least one number should be less than 130');
                break;
            case 5: // Console Clear
                console.clear();
                break;
            case 6: // Console Dir
                console.dir(errorBtns);
                break;
            case 7: // Console dirxml
                const dirxmlBtn = document.querySelector('#error-btns > button:nth-child(8)');
                console.dirxml(dirxmlBtn);
                break;
            case 8: // Console Group Start
                console.group('My Group');
                isGroupOpen = true;
                break;
            case 9: // Console Group End
                if (isGroupOpen) {
                    console.groupEnd();
                    isGroupOpen = false;
                }
                break;
            case 10: // Console Table
                console.table(demoData, ['name', 'number']);
                break;
            case 11: // Start Timer
                console.time('Timer');
                break;
            case 12: // End Timer
                console.timeEnd('Timer');
                break;
            case 13: // Console Trace
                function traceDemo() {
                    console.trace('This is a trace');
                }
                traceDemo();
                break;
            case 14: // Trigger a Global Error
                console.log('Sadly, an error happened!! Boo');
                try {
                    triggerGlobalError();
                } catch (error) {
                    // Just in case the error is caught synchronously
                    console.error('Caught an error:', error);
                }
                break;
        }
    }

    errorBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            handleBtnClick(index);
        });
    });

    // Catch global errors
    window.onerror = function (message, source, lineno, colno, error) {    
        console.error(`Uncaught ${error.name}: ${error.message} at ${source}:${lineno}:${colno}`);
        // Log the error to TrackJS
        window.TrackJS && TrackJS.track(error);
        return true; // Prevent the browser's default error handling
    };
});