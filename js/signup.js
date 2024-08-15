'use strict';

//On change to detect changes on inputs
function validateAgencyID() {
  var agencyIDInput = document.getElementById('inputAgencyID').value;
  var message = document.getElementById('error__agencyID');

  if (agencyIDInput !== ' ' && agencyIDInput.length > 0) {
    message.textContent = 'Checked';
    message.style.color = 'green';
  } else {
    agencyIDInput.clear();
    message.textContent = 'Please enter your angency ID 22';
    message.style.color = 'red';
  }
}

function validateFName() {
  var fNameInput = document.getElementById('inputFName').value;
  var message = document.getElementById('error__fname');

  if (fNameInput !== ' ' && fNameInput.length > 0) {
    message.textContent = 'Checked';
    message.style.color = 'green';
  } else {
    fNameInput = "";
    message.textContent = 'Please key in your first name 22';
    message.style.color = 'red';
  }
}

function validateLName() {
  var lNameInput = document.getElementById('inputLName').value;
  var message = document.getElementById('error__lname');

  if (lNameInput !== ' ' && lNameInput.length > 0) {
    message.textContent = 'checked';
    message.style.color = 'green';
  } else {
    lNameInput = "";
    message.textContent = 'Please key in your last name 22';
    message.style.color = 'red';
  }
}

function validateUsername() {
  var usernameInput = document.getElementById('inputUsername').value;
  var message = document.getElementById('error__username');

  if (usernameInput !== ' ' && usernameInput.length > 0) {
    message.textContent = 'checked';
    message.style.color = 'green';
  } else {
    usernameInput = "";
    message.textContent = 'Please key in your username 22';
    message.style.color = 'red';
  }
}

function validatePassword() {
  var passwordInput = document.getElementById('inputPassword').value;
  var message = document.getElementById('error__password');

  // Simple password validation pattern
  var regexPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/;
  if (passwordInput.match(regexPattern)) {
    message.textContent = 'checked';
    message.style.color = 'green';
  } else {
    passwordInput = "";
    message.textContent = 'Your password should have minimum length of 8,  with at least a symbol, upper and lower case letters and a number';
    message.style.color = 'red';
  }
}

let formAjaxValidate = document.getElementById('form_ajax_validate');
let checkForm = function (e) {
  let form = e.target;

  if (this.inputAgencyID.value == '') {
    document.getElementById('error__agencyID').innerHTML =
      'Please key in your agency ID';
    this.inputAgencyID.focus();
    e.preventDefault();
    return;
  }
  if (this.inputFName.value == '') {
    document.getElementById('error__fname').innerHTML =
      'Please key in your first name';
    this.inputFName.focus();
    e.preventDefault();
    return;
  }
  if (this.inputLName.value == '') {
    document.getElementById('error__lname').innerHTML =
      'Please key in your last name';
    this.inputLName.focus();
    e.preventDefault();
    return;
  }
  if (this.inputUsername.value == '') {
    document.getElementById('error__username').innerHTML =
      'Please key in your username';
    this.inputUsername.focus();
    e.preventDefault();
    return;
  }
  if (this.inputPassword.value == '') {
    document.getElementById('error__password').innerHTML =
      'Please key in your password';
    this.inputPassword.focus();
    e.preventDefault();
    return;
  }

  alert(
    'Success!  The form has been completed, validated and is ready to be submitted...'
  );
  e.preventDefault();
};

formAjaxValidate.addEventListener('submit', checkForm, false);
