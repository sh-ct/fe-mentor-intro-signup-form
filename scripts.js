formElement = document.querySelector('form');
inputElements = document.querySelectorAll('.form__input');

/* Helper Functions */

// Returns true if the email matches the valid regex
const emailValid = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

// Checks the value of the input element for validity and sets styles accordingly
const checkInput = (element) => {
    let valid = false;
    const elementType = element.title;
    const value = element.value.trim();

    if (value === '') {
        onInputInvalid(
            element,
            `${elementType} cannot be blank`
        );
    }
    else if (elementType === 'Email' && !emailValid(value)) {
        onInputInvalid(
            element,
            'Looks like this is not an email'
        );
    }
    else {
        onInputValid(element);
        valid = true;
    }
    return valid;
};

// Toggle valid class to invalid on the form input group and sets the content of the error message
const onInputInvalid = (element, message) => {
    const formField = element.parentElement;
    formField.classList.remove('valid');
    formField.classList.add('invalid');

    const error = formField.querySelector('.error-message')
    error.textContent = message;

};

// Toggle invalid class to valid on the form input and removes error message content
const onInputValid = (element) => {
    const formField = element.parentElement;
    formField.classList.remove('invalid');
    formField.classList.add('valid');

    const error = formField.querySelector('.error-message');
    error.textContent = '';
};

// Prevents multiple function triggers within delay ms, only actions function if there is not currently a timer
const debounce = (func, delay = 500) => {
    let timeoutID;
    return (...args) => {
        // cancel the previous timer
        if (timeoutID) {
            clearTimeout(timeoutID);
        }
        // Set new timer
        timeoutID = setTimeout(() => {
            func.apply(null, args)
        }, delay);
    };
};

/* Event Listeners */

// Listens for submit events and checks the array of form inputs for validity before submitting the form
formElement.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent automatic submission

    // Map the nodelist to a boolean array of input field validity
    const fieldsValid = Array.from(inputElements).map(element => checkInput(element));// 
    // The form is valid if every input element has a valid value
    const formValid = fieldsValid.every(field => field === true);

    // Submit the form in a real project, here just log to console
    if (formValid) {
        console.log('form submitted', event);
    }
});

// Listens for input events in the input fields and prevents validation triggering as they are typing
formElement.addEventListener('input', debounce((event) => {
    checkInput(event.target);
}))