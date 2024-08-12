'use strict';

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
