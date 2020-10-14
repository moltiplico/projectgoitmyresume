const callbackForm = document.getElementById('callback-form-container');

const userName = document.getElementById('callback-form-input-name');
const userEmail = document.getElementById('callback-form-input-email');
const userPhone = document.getElementById('callback-form-input-phone');

const callbackFormRequestModal = document.getElementById('request');

// Phone click show "+380"
userPhone.addEventListener('click', function () {
    if (!userPhone.value.trim()) {
        userPhone.value = '+380';
    }
})

userPhone.addEventListener('blur', function () {
    if (userPhone.value === '+380') {
        userPhone.value = '';
    }
})


callbackForm.addEventListener('submit', (e) => {
    e.preventDefault();

    checkInputs();
})

function checkInputs() {
    const userNameValue = userName.value.trim();
    const userEmailValue = userEmail.value.trim();
    const userPhoneValue = userPhone.value.trim();
    let hasError = false;

    if (userNameValue === '') {
        // show error
        // add error class
        setErrorFor(userName, 'Username cannot be blank');
        hasError = true;
    } else {
        //add success class
        setSuccessFor(userName);
    }

    if (userEmailValue === '') {
        setErrorFor(userEmail, 'Email cannot be blank');
        hasError = true;
    } else if (!isEmailValid(userEmailValue)) {
        setErrorFor(userEmail, 'Email is not valid');
        hasError = true;
    } else {
        setSuccessFor(userEmail);
    }

    if (userPhoneValue === '') {
        setErrorFor(userPhone, 'Phone cannot be blank');
        hasError = true;
    } else if (!isPhoneValid(userPhoneValue)) {
        setErrorFor(userPhone, 'Phone is not valid');
        hasError = true;
    } else {
        setSuccessFor(userPhone);
    }

    if (hasError) {
        return;
    }

    userName.value = '';
    userEmail.value = '';
    userPhone.value = '';

    // show success message

    callbackFormRequestModal.classList.add('modal-active');

    setTimeout(function () {
        callbackFormRequestModal.classList.remove('modal-active');
    }, 2000);
}

function setErrorFor(input, message) {
    const callbackFormBlockInput = input.parentElement; // .callbackFormBlockInput
    const small = callbackFormBlockInput.querySelector('small')

    // add error message inside small
    small.innerText = message;

    // add error class
    callbackFormBlockInput.className = 'callback-form-block-input error';
}

function setSuccessFor(input) {
    const callbackFormBlockInput = input.parentElement;
    callbackFormBlockInput.className = 'callback-form-block-input success';
}

// valid function
function isPhoneValid(phone = '') {
    const regexp = /(\+38)?\(?\d{3}\)?[\s\.-]?(\d{7}|\d{3}[\s\.-]\d{2}[\s\.-]\d{2}|\d{3}-\d{4})/;

    return phone.match(regexp);
}

function isEmailValid(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}