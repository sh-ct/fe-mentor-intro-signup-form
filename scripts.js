formElement = document.querySelector('form');
inputElements = document.querySelectorAll('.form__input');

/* Helper Functions */

// Returns true if the email matches the valid regex
const emailValid = (email) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
};

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
formElement.addEventListener('submit', (event) => {
    event.preventDefault();

    const fieldsValid = Array.from(inputElements).map(element => checkInput(element));
    const formValid = fieldsValid.every(field => field === true);

    // Submit the form in a real project, here just log to console
    if (formValid) {
        console.log('form submitted', event);
    }
});

formElement.addEventListener('input', debounce((event) => {
    checkInput(event.target);
}))