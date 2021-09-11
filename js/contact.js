const form = document.querySelector("#contactForm");
const firstName = document.querySelector("#firstName");
const firstNameError = document.querySelector("#firstNameError");
const lastName = document.querySelector("#lastName");
const lastNameError = document.querySelector("#lastNameError");
const emailAddress = document.querySelector("#emailAddress");
const emailAddressError = document.querySelector("#emailAddressError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");
const formSuccess = document.querySelector("#form-success");

// Validate input
function validateForm(event) {
    event.preventDefault();

    if (checkLength(firstName.value, 0) === true) {
        firstNameError.style.display = "none";
    } else {
        firstNameError.style.display = "block";
    }

    if (checkLength(lastName.value, 0) === true) {
        lastNameError.style.display = "none";
    } else {
        lastNameError.style.display = "block";
    }

    if (validateEmailAddress(emailAddress.value) === true) {
        emailAddressError.style.display = "none";
    } else {
        emailAddressError.style.display = "block";
    }

    if (checkLength(message.value, 9) === true) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }

    if((checkLength(firstName.value, 0)) && (checkLength(lastName.value, 0)) && (checkLength(message.value, 9)) && (validateEmailAddress(emailAddress.value))) {
    formSuccess.innerHTML = '<h2>Thank you for your message!</h2>';
    
    form.reset();
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length > len) {
        return true;
    } else {
        return false;
    }
}

function validateEmailAddress(emailAddress) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(emailAddress);
    return patternMatches;
}