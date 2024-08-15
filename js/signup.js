'use strict';

const validateForm = (formSelector, callback) => {
  const formElement = document.querySelector(formSelector);

  const validationOptions = [
    {
      attribute: "match",
      isValid: (input) => {
        const matchSelector = input.getAttribute("match");
        const matchedElement = formElement.querySelector(`#${matchSelector}`);
        return (
          matchedElement && matchedElement.value.trim() === input.value.trim()
        );
      },
      errorMessage: (input, label) => {
        const matchSelector = input.getAttribute("match");
        const matchedElement = formElement.querySelector(`#${matchSelector}`);
        const matchedLabel =
          matchedElement.parentElement.parentElement.querySelector("label");

        return `${label.textContent} should match ${matchedLabel.textContent}`;
      },
    },
    {
      attribute: 'pattern',
      isValid: (input) => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) =>
        `Your password should have minimum length of 8,  with at least a symbol, upper and lower case letters and a number`,
    },
    {
      attribute: 'minlength',
      isValid: (input) =>
        input.value && input.value.length >= parseInt(input.minLength, 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be at least ${input.minLength} characters`,
    },
    {
      attribute: 'required',
      isValid: (input) => input.value.trim() !== '',
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
  ];

  const validateSingleFormGroup = (formGroup) => {
    const label = formGroup.querySelector('label');
    const input = formGroup.querySelector('input, textarea');
    const errorContainer = formGroup.querySelector('.error__signup');
    const errorIcon = formGroup.querySelector('.error-icon');
    const successIcon = formGroup.querySelector('.success-icon');

    let formGroupError = false;

    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        input.classList.add('border-red-700');
        input.classList.remove('border-green-700');
        successIcon.classList.add('hidden');
        errorIcon.classList.remove('hidden');
        formGroupError = true;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = '';
      input.classList.add('border-green-700');
      input.classList.remove('border-red-700');
      successIcon.classList.remove('hidden');
      errorIcon.classList.add('hidden');
    }

    return !formGroupError;
  };
  //disable browser html validation
  formElement.setAttribute('novalidate', '');

  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener('blur', (event) => {
      validateSingleFormGroup(event.srcElement.parentElement.parentElement);
    });
  });

  const validateAllFormGroups = (formToValidate) => {
    const formValidationGroups = Array.from(
      formToValidate.querySelectorAll('.formValidationGroup')
    );

    return formValidationGroups.every((formValidationGroup) =>
      validateSingleFormGroup(formValidationGroup)
    );
  };

  formElement.addEventListener('submit', (event) => {
    event.preventDefault(); //Stop form completely submitting the form

    const formValid = validateAllFormGroups(formElement);

    if (formValid) {
      console.log('Form is valid');
      callback(formElement);
    }
  });
};

const sendToAPI = (formElement) => {
  const formObject = Array.from(formElement.elements)
    .filter((element) => element.type !== 'submit')
    .reduce(
      (accumulator, element) => ({
        ...accumulator,
        [element.id]: element.value,
      }),
      {}
    );

  console.log(formObject);

  //submitting to an API via AJAX or smtg.
};

validateForm('#signUpForm', sendToAPI);
