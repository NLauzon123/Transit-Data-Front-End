'use strict';

document.addEventListener('DOMContentLoaded', function () {
    const yearFooter = document.querySelector('#footer_year');
    const yearUpdate = new Date().getFullYear();
    yearFooter.innerHTML = `&#169 Copyright ${yearUpdate}, Fare Transit Management.`;
  });