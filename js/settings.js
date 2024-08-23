"use strict";

import { getUserDataFromToken, setupHeader } from "./pageSetup.js";
import { changePassword, getDataFromProcedure } from "./apiCalls.js";

const setup = async () => {
  const userData = await getUserDataFromToken(true);
  setupHeader(userData);
  userData.agency = userData.longName + " (" + userData.shortName + ")";
  setPlaceholders(userData);
};

const setPlaceholders = (userData) => {
  const fieldIds = [
    "inputAgencyID",
    "inputFName",
    "inputLName",
    "inputUsername",
  ];
  fieldIds.forEach((id) => {
    const fieldInput = document.getElementById(id);
    const propertName = fieldInput.getAttribute("data-field-name");
    fieldInput.value = userData[propertName];
  });
};

let cancelBtn = document.querySelector("#cancelRedirect");
cancelBtn.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  window.location.href = "dashboard.html";
});

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
      attribute: "pattern",
      isValid: (input) => {
        const patternRegex = new RegExp(input.pattern);
        return patternRegex.test(input.value);
      },
      errorMessage: (input, label) =>
        `Your password should have minimum length of 8,  with at least a symbol, upper and lower case letters and a number`,
    },
    {
      attribute: "minlength",
      isValid: (input) =>
        input.value && input.value.length >= parseInt(input.minLength, 10),
      errorMessage: (input, label) =>
        `${label.textContent} needs to be at least ${input.minLength} characters`,
    },
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input, label) => `${label.textContent} is required`,
    },
  ];

  const validateSingleFormGroup = (formGroup) => {
    const label = formGroup.querySelector("label");
    const input = formGroup.querySelector("input, textarea, select");
    const errorContainer = formGroup.querySelector(".error__settings");
    const errorIcon = formGroup.querySelector(".error-icon");
    const successIcon = formGroup.querySelector(".success-icon");

    let formGroupError = false;

    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        input.classList.add("border-danger");
        input.classList.remove("border-success");
        successIcon.classList.add("hidden");
        errorIcon.classList.remove("hidden");
        formGroupError = true;
      }
    }

    if (!formGroupError) {
      errorContainer.textContent = "";
      input.classList.add("border-succes");
      input.classList.remove("border-danger");
      successIcon.classList.remove("hidden");
      errorIcon.classList.add("hidden");
    }

    return !formGroupError;
  };
  //disable browser html validation
  formElement.setAttribute("novalidate", "");

  Array.from(formElement.elements).forEach((element) => {
    element.addEventListener("blur", (event) => {
      validateSingleFormGroup(event.srcElement.parentElement.parentElement);
    });
  });

  const validateAllFormGroups = (formToValidate) => {
    const formValidationGroups = Array.from(
      formToValidate.querySelectorAll(".formValidationGroup")
    );

    return formValidationGroups.every((formValidationGroup) =>
      validateSingleFormGroup(formValidationGroup)
    );
  };

  formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    const formValid = validateAllFormGroups(formElement);

    if (formValid) {
      callback(formElement);
    }
  });
};

const sendToAPI = async (formElement) => {
  const errorMessage = document.getElementById("error__submit");
  errorMessage.innerText = "";
  const formObject = Array.from(formElement.elements)
    .filter((element) => element.type !== "submit")
    .reduce(
      (accumulator, element) => ({
        ...accumulator,
        [element.id]: element.value,
      }),
      {}
    );

  const { oldPassword, newPassword } = formObject;

  const result = await changePassword({ oldPassword, password: newPassword });
  if (result && result.status == 200) {
    errorMessage.style.color = "green";
    errorMessage.innerText = result.message;
  } else {
    errorMessage.style.color = "red";

    errorMessage.innerText =
      "Unable to reset password, please ensure the old password is correct.";
  }
};

setup();

validateForm("#settingsForm", sendToAPI);
