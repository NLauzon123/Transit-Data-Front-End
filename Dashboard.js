var dashBSelect;

var agencyNum = 1;
var firstName = "Emma";
var lastName = "Tremblay";
const agency = document.getElementById("agency");
const employee = document.getElementById("employee");
switch (agencyNum) {
    case 1: agency.style.backgroundImage = "url('resources/artm-logo.png')"; break;
    case 2: agency.style.backgroundImage = "url('resources/stm-logo.png')"; break;
    case 3: agency.style.backgroundImage = "url('resources/exo-logo.png')"; break;
    case 4: agency.style.backgroundImage = "url('resources/rtl-logo.png')"; break;
    case 5: agency.style.backgroundImage = "url('resources/stl-logo.png')"; break;
    case 6: agency.style.backgroundImage = "url('resources/rem-logo.jpg')"; break;
    default: agency.innerHTML = "";
}
employee.innerHTML = "Welcome " + firstName + " " + lastName;

const tabButtons = document.querySelectorAll('.tablink');
for (var i = 0; i < tabButtons.length; i++) {
    tabButtons[i].addEventListener('click', function() {
        var tabName = this.dataset.tab;
        var tabContent = document.getElementById(tabName);
        var allTabContent = document.querySelectorAll('.tabcontent');
        var allTabButtons = document.querySelectorAll('.tablink');
        for (var j = 0; j < allTabContent.length; j++) allTabContent[j].style.display = 'none';
        for (var j = 0; j < allTabButtons.length; j++) allTabButtons[j].classList.remove('active');
        tabContent.style.display = "block";
        this.classList.add('active');
    });
}
document.querySelector('.tablink').click();

const dashboardOptions = document.querySelectorAll('.dashboard-option');
const filterID = document.getElementById("filterID");
for (let i = 0; i < dashboardOptions.length; i++) {
    dashboardOptions[i].addEventListener('click', function() {dashBSelectSwitch(i);});
}

function dashBSelectSwitch(selected) {
    dashBSelect = selected;
    filterID.innerHTML = "Filter for " + dashboardOptions[dashBSelect].innerHTML + ":";
    switch (selected) {
        case 0: applyDashBFilter0(selected); break;
        case 1: applyDashBFilter1(selected); break;
        case 2: applyDashBFilter2(selected); break;
        case 3: applyDashBFilter3(selected); break;
        case 4: applyDashBFilter4(selected); break;
        case 5: applyDashBFilter5(selected); break;
        case 6: applyDashBFilter6(selected); break;
    }
}
function applyDashBFilter0(selected) {console.log(selected);}
function applyDashBFilter1(selected) {console.log(selected);}
function applyDashBFilter2(selected) {console.log(selected);}
function applyDashBFilter3(selected) {console.log(selected);}
function applyDashBFilter4(selected) {console.log(selected);}
function applyDashBFilter5(selected) {console.log(selected);}
function applyDashBFilter6(selected) {console.log(selected);}

