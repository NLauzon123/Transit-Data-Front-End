var dashBSelect;

var agencyNum = 1;
var firstName = "Emma";
var lastName = "Tremblay";
var years = ["Select a year", "2023", "2024", "2025", "2026", "2027"]; 
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
const graph = document.getElementById("tab1");
const table = document.getElementById("tab2");
var filter1Data, filter2Data, filter3Data, filter4Data, filter5Data;
function cleanAllFilters() {
    while(filter1.firstChild) filter1.removeChild(filter1.firstChild); filter1.style.display = "none";
    while(filter2.firstChild) filter2.removeChild(filter2.firstChild); filter2.style.display = "none";
    while(filter3.firstChild) filter3.removeChild(filter3.firstChild); filter3.style.display = "none";
    while(filter4.firstChild) filter4.removeChild(filter4.firstChild); filter4.style.display = "none";
    while(filter5.firstChild) filter5.removeChild(filter5.firstChild); filter5.style.display = "none";
    filterButton.style.display = "none";
    cleanGraph(); cleanTable();
    var headerG = document.createElement("h2");
    var headerT = document.createElement("h2");
    headerG.innerHTML="Graph zone";
    headerT.innerHTML="Table zone";
    graph.append(headerG); table.append(headerT);
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
    for (i = 0; i < years.length; i++) if (e.target.value == years[i]) filter1Data = years[i];
});
function populateFilter2() {
    var input = document.createElement("input");
    filter2.style.display = "block";
    filter2.innerHTML = "Select a period (in years): ";
    filter2.appendChild(input);
}
filter2.addEventListener("change", e => {filter2Data = e.target.value;});
function populateFilter3() {
    var input = document.createElement("input");
    input.id = "datePicker";
    input.class = "form-control";
    input.type = "date";
    filter3.style.display = "block";
    filter3.innerHTML = "Select a date: ";
    filter3.appendChild(input);
}
filter3.addEventListener("change", e => {filter3Data = e.target.value;});
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
filter4.addEventListener("change", e => {filter4Data = e.target.value;});
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
filter5.addEventListener("change", e => {filter5Data = e.target.value;});
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
    populateFilter3();
    populateFilter4();
    filterButton.style.display = "block";
}
function filterDataCompilation() {
    switch (dashBSelect) {
        case 0: console.log(dashBSelect + " " + filter1Data + " " + filter2Data); applyDashBGraph0(); applyDashBTable0(); break;
        case 1: console.log(dashBSelect + " " + filter1Data); applyDashBGraph1(); applyDashBTable1(); break;
        case 2: console.log(dashBSelect + " " + filter1Data); applyDashBGraph2(); applyDashBTable2(); break;
        case 3: console.log(dashBSelect + " " + filter1Data); applyDashBGraph3(); applyDashBTable3(); break;
        case 4: console.log(dashBSelect + " " + filter1Data + " " + filter2Data + " " + filter4Data + " " + filter5Data); applyDashBGraph4(); applyDashBTable4(); break;
        case 5: console.log(dashBSelect + " " + filter1Data + " " + filter4Data); applyDashBGraph5(); applyDashBTable5(); break;
        case 6: console.log(dashBSelect + " " + filter3Data + " " + filter4Data); applyDashBGraph6(); applyDashBTable6(); break;
    }
}
function cleanGraph() {while(graph.firstChild) graph.removeChild(graph.firstChild);}
function cleanTable() {while(table.firstChild) table.removeChild(table.firstChild);}
function applyDashBGraph0() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 0";
    graph.append(header);
    var graph0 = document.createElement("canvas");
    graph0.id = "graph0";
    graph0.style.width="100%"
    var xValues = ["Italy", "France", "Spain", "USA", "Argentina"];
    var yValues = [55, 49, 44, 24, 15];
    var barColors = ["red", "green","blue","orange","brown"];
    new Chart(graph0, {
        type: "bar",
        data: {labels: xValues, datasets: [{backgroundColor: barColors, data: yValues}]},
        options: {legend: {display: false}, title: {display: true, text: "World Wine Production 2018"}}
    });
    graph.append(graph0);
}
function applyDashBGraph1() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 1";
    graph.append(header);
}
function applyDashBGraph2() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 2";
    graph.append(header);
}
function applyDashBGraph3() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 3";
    graph.append(header);
}
function applyDashBGraph4() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 4";
    graph.append(header);
}
function applyDashBGraph5() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 5";
    graph.append(header);
    var graph5 = document.createElement("canvas");
    graph5.id = "graph0";
    graph5.style.width="100%";
    var xLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "Novmeber", "December"];
    var yLabel = ["Total", "Direction 0", "Direction 1"];
    var yAnnual = ["26932", "13466", "13466"];
    var dataSet = [["2838", "2332", "2330", "2258", "2270", "2128", "2346", "2178", "2108", "2146", "1934", "2064"],
        ["1419", "1166", "1165", "1129", "1135", "1064", "1173", "1089", "1054", "1073", "967", "1032"],
        ["1419", "1166", "1165", "1129", "1135", "1064", "1173", "1089", "1054", "1073", "967", "1032"]];
    var barColor = ["blue", "green", "orange"];
    var data = {
        labels: xLabel,
        datasets: [{label: yLabel[0], data: dataSet[0],  backgroundColor: barColor[0]}, 
            {label: yLabel[1], data: dataSet[1],  backgroundColor: barColor[1]}, 
            {label: yLabel[2], data: dataSet[2],  backgroundColor: barColor[2]}]
    };
    var config = {
        type: "bar", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph5, config);
    graph.append(graph5);
}
function applyDashBGraph6() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the graph for dashboard 6";
    graph.append(header);
}
function applyDashBTable0() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 0";
    table.append(header);
}
function applyDashBTable1() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 1";
    table.append(header);
}
function applyDashBTable2() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 2";
    table.append(header);
}
function applyDashBTable3() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 3";
    table.append(header);
}
function applyDashBTable4() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 4";
    table.append(header);
}
function applyDashBTable5() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 5";
    table.append(header);
}
function applyDashBTable6() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Tab for the table for dashboard 6";
    table.append(header);
}
