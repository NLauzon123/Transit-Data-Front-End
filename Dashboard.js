var dashBSelect;

var agencyNum = 1;
var firstName = "Emma";
var lastName = "Tremblay";
var years = []; 
years[0]= "Select a year"; years[1] = "2023"; years[2] = "2024"; years[3] = "2025"; years[4] = "2026"; years[5] = "2027";
var services = {"Select a service" : "0", "Ligne 1 - Verte',1" : "1", "Ligne 2 - Orange" : "2", "Ligne 4 - Jaune" : "3",
    "Ligne 5 - Bleue" : "4", "Bus 18 - Beaubien" : "13", "Bus 24 - Sherbrooke" : "16", "Bus 51 - Édouard-Montpetit" : "40",
    "Bus 67 - Saint-Michel" : "51", "Bus 105 - Sherbrooke" : "77", "Bus 121 - Sauvé / Côte-Vertu" : "89",
    "Bus 141 - Jean-Talon Est" : "102", "Bus 165 - Côte-des-Neiges" : "110", "Bus 439 - Express Pie-IX" : "191"};
var directions = {"Select a direction" : "-1", "Direction 0" : "0", "Direction 1" : "1", "Both directions" : null};
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
        case 0: applyDashBFilter0(); break;
        case 1: applyDashBFilter1to3(); break;
        case 2: applyDashBFilter1to3(); break;
        case 3: applyDashBFilter1to3(); break;
        case 4: applyDashBFilter4(); break;
        case 5: applyDashBFilter5(); break;
        case 6: applyDashBFilter6(); break;
    }
}
const filter1 = document.getElementById("filterRow1");
const filter2 = document.getElementById("filterRow2");
const filter3 = document.getElementById("filterRow3");
const filter4 = document.getElementById("filterRow4");
const filter5 = document.getElementById("filterRow5");
const filterButton = document.getElementById("filterButton");
function cleanAllFilters() {
    while(filter1.firstChild) filter1.removeChild(filter1.firstChild); filter1.style.display = "none";
    while(filter2.firstChild) filter2.removeChild(filter2.firstChild); filter2.style.display = "none";
    while(filter3.firstChild) filter3.removeChild(filter3.firstChild); filter3.style.display = "none";
    while(filter4.firstChild) filter4.removeChild(filter4.firstChild); filter4.style.display = "none";
    while(filter5.firstChild) filter5.removeChild(filter5.firstChild); filter5.style.display = "none";
    filterButton.style.display = "none";
}
function populateFilter1() {
    var select = document.createElement("select");
    for (i = 0; i < years.length; i++) {
        let option = document.createElement("option");
        let optionText = document.createTextNode(years[i]);
        option.setAttribute('value', years[i]);
        option.appendChild(optionText);
        select.appendChild(option);
    }
    filter1.style.display = "block";
    if (dashBSelect == 0 || dashBSelect == 4) filter1.innerHTML = "Select an end year: ";
    else filter1.innerHTML = "Select a year: ";
    filter1.appendChild(select);
}
filter1.addEventListener("change", e => {
    for (i = 0; i < years.length; i++) if (e.target.value == years[i]) console.log("Got year: " + years[i]);
});
function populateFilter2() {
    var input = document.createElement("input");
    filter2.style.display = "block";
    filter2.innerHTML = "Select a period (in years): ";
    filter2.appendChild(input);
}
function populateFilter3() {}
function populateFilter4() {
    var select = document.createElement("select");
    for (var key in services) {
        let option = document.createElement("option");
        let optionText = document.createTextNode(key);
        option.setAttribute('value', services[key]);
        option.appendChild(optionText);
        select.appendChild(option);
    }
    filter4.style.display = "block";
    filter4.innerHTML = "Select a service: ";
    filter4.appendChild(select);
}
filter4.addEventListener("change", e => {console.log("Got service: " + e.target.value);});
function populateFilter5() {
    var select = document.createElement("select");
    for (var key in directions) {
        let option = document.createElement("option");
        let optionText = document.createTextNode(key);
        option.setAttribute('value', directions[key]);
        option.appendChild(optionText);
        select.appendChild(option);
    }
    filter5.style.display = "block";
    filter5.innerHTML = "Select a service: ";
    filter5.appendChild(select);
}
filter5.addEventListener("change", e => {console.log("Got direction: " + e.target.value);});
function applyDashBFilter0() {
    cleanAllFilters();
    populateFilter1();
    populateFilter2();
    filterButton.style.display = "block";
}
function applyDashBFilter1to3() {
    cleanAllFilters();
    populateFilter1();
    filterButton.style.display = "block";
}
function applyDashBFilter4(selected) {
    cleanAllFilters();
    populateFilter1();
    populateFilter2();
    populateFilter4();
    populateFilter5();
    filterButton.style.display = "block";
}
function applyDashBFilter5(selected) {
    cleanAllFilters();
    populateFilter1();
    populateFilter4();
    filterButton.style.display = "block";
}
function applyDashBFilter6(selected) {
    cleanAllFilters();
    populateFilter4();
    filterButton.style.display = "block";
}

