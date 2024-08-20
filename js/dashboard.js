/*Global variables and operations*/
var dashBSelect;
var agencyNum = 1;
var firstName = "Emma";
var lastName = "Tremblay";
var years = [2023, 2024, 2025, 2026, 2027]; 
var servicesLab = ["Ligne 1 - Verte", "Ligne 2 - Orange", "Ligne 4 - Jaune", "Ligne 5 - Bleue", "Bus 18 - Beaubien", 
    "Bus 24 - Sherbrooke", "Bus 51 - Édouard-Montpetit", "Bus 67 - Saint-Michel", "Bus 105 - Sherbrooke", 
    "Bus 121 - Sauvé / Côte-Vertu", "Bus 141 - Jean-Talon Est", "Bus 165 - Côte-des-Neiges", "Bus 439 - Express Pie-IX"];
var servicesNum = [1, 2, 3, 4, 13, 16, 40, 51, 77, 89, 102, 110, 191];
var directionsLab = ["Direction 0", "Direction 1", "Both directions"];
var directionsNum = [0, 1, 2];
var filter1Data, filter2Data, filter3Data, filter4Data, filter5Data;
var requestData;
const agency = document.getElementById("agency");
const employee = document.getElementById("employee");
const dashboardOptions = document.querySelectorAll('.dropdown-item');
const filterID = document.getElementById("filterID");
const filter1 = document.getElementById("filterRow1");
const filter2 = document.getElementById("filterRow2");
const filter3 = document.getElementById("filterRow3");
const filter4 = document.getElementById("filterRow4");
const filter5 = document.getElementById("filterRow5");
const filterButton = document.getElementById("filterButton");
const graph = document.getElementById("nav-graph");
const table = document.getElementById("nav-table");

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

for (let i = 0; i < dashboardOptions.length; i++) {
    dashboardOptions[i].addEventListener('click', function() {dashBSelectSwitch(i);});
}

/*Methods for managing the filters*/
function dashBSelectSwitch(selected) {
    dashBSelect = selected;
    filter1Data = undefined; filter2Data = undefined; filter3Data = undefined;
    filter4Data = undefined; filter5Data = undefined;
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
    select.style.maxWidth = "300px";
    select.className = "form-select";
    select.ariaLabel = "Default select example"
    let initial = document.createElement("option");
    let initialText = document.createTextNode("Select...");
    initial.setAttribute('selected', years[0]);
    initial.appendChild(initialText);
    select.appendChild(initial);
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
    input.className = "form-control";
    input.style.maxWidth = "300px";
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
    select.style.maxWidth = "300px";
    select.className = "form-select";
    select.ariaLabel = "Default select example"
    let initial = document.createElement("option");
    let initialText = document.createTextNode("Select...");
    initial.setAttribute('selected', servicesNum[0]);
    initial.appendChild(initialText);
    select.appendChild(initial);
    for (i = 0; i < servicesLab.length; i++) {
        let option = document.createElement("option");
        let optionText = document.createTextNode(servicesLab[i]);
        option.setAttribute('value', servicesNum[i]);
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
    select.style.maxWidth = "300px";
    select.className = "form-select";
    select.ariaLabel = "Default select example"
    let initial = document.createElement("option");
    let initialText = document.createTextNode("Select...");
    initial.setAttribute('selected', directionsNum[0]);
    initial.appendChild(initialText);
    select.appendChild(initial);
    for (i = 0; i < directionsLab.length; i++) {
        let option = document.createElement("option");
        let optionText = document.createTextNode(directionsLab[i]);
        option.setAttribute('value', directionsNum[i]);
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
function getFilter4Lab() {
    var label = "";
    for (i = 0; i < servicesNum.length; i++) if (servicesNum[i] == filter4Data) label = servicesLab[i];
    return label;
}
function getFilter5Lab() {
    var label = "";
    for (i = 0; i < directionsNum.length; i++) if (directionsNum[i] == filter5Data) label = directionsLab[i];
    return label;
}
function filterDataCompilation() {
    switch (dashBSelect) {
        case 0: console.log(dashBSelect + " " + filter1Data + " " + filter2Data); 
            if (filter1Data != null && filter1Data != undefined && filter2Data != null && filter2Data != undefined) {
                requestData = undefined;
                requestData = {
                    procedure: "LongTermRevenueSummary",
                    params: [
                        {key: "endYear", type: "Int", value: parseInt(filter1Data),},
                        {key: "period", type: "Int", value: parseInt(filter2Data),},
                    ],
                }
                console.log(requestData);
                applyDashBGraph0(); applyDashBTable0();
            }
            break;
        case 1: console.log(dashBSelect + " " + filter1Data); 
            if (filter1Data != null && filter1Data != undefined) {
                requestData = undefined;
                requestData = {
                    procedure: "MidTermRevenueSummary",
                    params: [{key: "year", type: "Int", value: parseInt(filter1Data),},],
                }
                console.log(requestData);
                applyDashBGraph1(); applyDashBTable1(); 
            }
            break;
        case 2: console.log(dashBSelect + " " + filter1Data); 
            if (filter1Data != null && filter1Data != undefined) {
                requestData = undefined;
                requestData = {
                    procedure: "RevenueDetailsFareProducts",
                    params: [{key: "year", type: "Int", value: parseInt(filter1Data),},],
                }
                console.log(requestData);
                applyDashBGraph2(); applyDashBTable2(); 
            }
            break;
        case 3: console.log(dashBSelect + " " + filter1Data); 
            if (filter1Data != null && filter1Data != undefined) {
                requestData = undefined;
                requestData = {
                    procedure: "RevenueDetailsPOS",
                    params: [{key: "year", type: "Int", value: parseInt(filter1Data),},],
                }
                console.log(requestData);
                applyDashBGraph3(); applyDashBTable3(); 
            }
            break;
        case 4: console.log(dashBSelect + " " + filter1Data + " " + filter2Data + " " + filter4Data + " " + filter5Data); 
            if (filter1Data != null && filter1Data != undefined && filter2Data != null && filter2Data != undefined &&
                filter4Data != null && filter4Data != undefined && filter5Data != null && filter5Data != undefined) {
                applyDashBGraph4(); applyDashBTable4(); 
            }
            break;
        case 5: console.log(dashBSelect + " " + filter1Data + " " + filter4Data); 
            if (filter1Data != null && filter1Data != undefined && filter4Data != null && filter4Data != undefined) {
                applyDashBGraph5(); applyDashBTable5(); 
            }
            break;
        case 6: console.log(dashBSelect + " " + filter3Data + " " + filter4Data); 
            if (filter3Data != null && filter3Data != undefined && filter4Data != null && filter4Data != undefined) {
                applyDashBGraph6(); applyDashBTable6(); 
            }
            break;
    }
}

/*Methods for managing graph and table areas*/
function cleanGraph() {while(graph.firstChild) graph.removeChild(graph.firstChild);}
function cleanTable() {while(table.firstChild) table.removeChild(table.firstChild);}
function addTableInGraph(headerData, bodyData, headerTitle, bodyTitle) {
    var totalTable = document.createElement("div");
    totalTable.className = "table-responsive";
    totalTable.id = "graphTable";
    var table = document.createElement('table');
    table.className = "table";
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');
    var headerRow = document.createElement('tr');
    for (var i = -1; i < headerData.length; i++) {
        var th = document.createElement('th');
        if (i == -1) th.textContent  = headerTitle;
        else th.textContent = headerData[i];
        headerRow.appendChild(th);
    };
    thead.appendChild(headerRow);
    var dataRow = document.createElement('tr');
    for (var i = -1; i < bodyData.length; i++) {
        var td = document.createElement('td');
        if (i == -1) td.textContent  = bodyTitle;
        else td.textContent = bodyData[i];
        dataRow.appendChild(td);
    };
    tbody.appendChild(dataRow);
    table.appendChild(thead);
    table.appendChild(tbody);
    totalTable.appendChild(table);
    graph.append(totalTable);
}
function applyDashBGraph0() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Long-term revenue summary for a period of " + filter2Data + " years ending in " + filter1Data;
    graph.append(header);
    var graph0 = document.createElement("canvas");
    graph0.style.width="100%";
    var xLabel = ["Online", "Buses", "Region1", "Region2", "Region3", "Region4", "Region5", "Region6", "Region7", "Region8"];
    var yLabel = ["2023", "2024", "2025", "2026", "2027"];
    var yTotal = ["724387.75", "686620.00", "496512.75", "324966.75", "235801.75"];
    var dataSet = [
        ["145327.25", "0", "22773.00", "150440.25", "47832.25", "120941.00", "50924.25", "52646.00", "63073.50", "70430.25"],
        ["135092.00", "0", "23365.00", "142534.00", "40143.25", "113923.25", "54095.75", "45809.50", "58621.75", "73035.50"],
        ["98491.25", "0", "18171.00", "100215.00", "28646.75", "86601.00", "39408.50", "30911.25", "40450.25", "53617.75"],
        ["64188.00", "0", "12182.50", "63435.25", "19931.00", "57735.50", "26364.00", "20369.50", "28008.25", "32752.75"],
        ["49023.25", "0", "8036.50", "48003.50", "14206.25", "40166.50", "18456.75", "14832.75", "19368.75", "23707.50"]
    ];
    var yColor = ["blue", "green", "orange", "brown", "black"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0], borderColor: yColor[0], backgroundColor: yColor[0]}, 
            {label: yLabel[1], data: dataSet[1], borderColor: yColor[1], backgroundColor: yColor[1]}, 
            {label: yLabel[2], data: dataSet[2], borderColor: yColor[2], backgroundColor: yColor[2]},
            {label: yLabel[3], data: dataSet[3], borderColor: yColor[3], backgroundColor: yColor[3]},
            {label: yLabel[4], data: dataSet[4], borderColor: yColor[4], backgroundColor: yColor[4]}
        ]
    };
    var config = {
        type: "line", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph0, config);
    graph.append(graph0);
    addTableInGraph(yLabel, yTotal, "Year: ", "Total revenue by year: ");
}
function applyDashBGraph1() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Mid-term revenue summary for " + filter1Data;
    graph.append(header);
    var graph1 = document.createElement("canvas");
    graph1.style.width="100%";
    var xLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yLabel = ["Buses", "Online", "Region1", "Region2", "Region3", "Region4", "Region5", "Region6", "Region7", "Region8"];
    var yTotal = ["19899.50", "19168.75", "19438.75", "19451.00", "19864.00", "19435.00", "20151.25", "20140.50", "19558.75", "19680.50", "19374.75", "19639.00"];
    var dataSet = [
        ["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"],
        ["3660.00", "4394.00", "3995.50", "4471.25", "4223.25", "4558.00", "3628.25", "4007.25", "4521.25", "3668.50", "3559.00", "4337.00"],
        ["741.50", "794.25", "694.50", "497.75", "734.25", "294.50", "454.00", "761.00", "794.25", "1015.00", "768.00", "487.5"],
        ["3275.00", "3091.75", "3319.75", "3946.25", "4377.25", "4520.50", "3788.00", "4552.25", "4340.75", "4245.75", "3953.50", "4592.75"],
        ["1309.50", "1194.25", "1236.00", "1276.50", "1248.25", "1516.50", "1115.00", "1175.00", "955.25", "1369.00", "1436.00", "375.00"],
        ["3540.00", "2813.50", "3533.00", "3325.25", "2683.00", "3398.50", "4299.00", "3821.00", "2745.25", "3874.50", "2713.75", "3419.75"],
        ["1596.75", "1166.00", "1642.75", "1476.25", "1509.50", "1117.00", "1730.00", "1576.25", "1596.75", "1422.00", "1442.00", "2181.50"],
        ["1296.00", "1162.25", "1335.75", "1502.50", "1022.25", "762.50", "1222.00", "1716.25", "930.50", "950.00", "1830.25", "1102.50"],
        ["2024.25", "2282.50", "1969.00", "1284.75", "2083.50", "1516.25", "1590.00", "1183.25", "1269.25", "1356.50", "1535.25", "1274.25"],
        ["2456.50", "2270.25", "1712.50", "1670.50", "1982.75", "1751.25", "2325.00", "1348.25", "2405.50", "1779.25", "2137.00", "1868.75"],
    ];
    var yColor = ["blue", "green", "orange", "brown", "black", "yellow", "gray", "red", "aqua", "chocolate"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0], backgroundColor: yColor[0]}, 
            {label: yLabel[1], data: dataSet[1], backgroundColor: yColor[1]}, 
            {label: yLabel[2], data: dataSet[2], backgroundColor: yColor[2]},
            {label: yLabel[3], data: dataSet[3], backgroundColor: yColor[3]},
            {label: yLabel[4], data: dataSet[4], backgroundColor: yColor[4]},
            {label: yLabel[5], data: dataSet[5], backgroundColor: yColor[5]},
            {label: yLabel[6], data: dataSet[6], backgroundColor: yColor[6]},
            {label: yLabel[7], data: dataSet[7], backgroundColor: yColor[7]},
            {label: yLabel[8], data: dataSet[8], backgroundColor: yColor[8]},
            {label: yLabel[9], data: dataSet[9], backgroundColor: yColor[9]}
        ]
    };
    var config = {
        type: "bar", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph1, config);
    graph.append(graph1);
    addTableInGraph(xLabel, yTotal, "Month: ", "Total revenue: ");
}
function applyDashBGraph2() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Revenue details by fare products for" + filter1Data;
    graph.append(header);
    var graph2 = document.createElement("canvas");
    graph2.style.width="100%";
    var xLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yLabel = ["Two trips", "Ten trips", "Monthly"];
    var yTotal = ["12747.00", "57954.75", "165100.00"];
    var dataSet = [
        ["1078.00", "980.00", "1050.00", "1162.00", "910.00", "1246.00", "1064.00", "987.00", "1071.00", "1127.00", "1120.00", "952.00"],
        ["4721.50", "4488.75", "4488.75", "4389.00", "5054.00", "4389.00", "5087.25", "5253.50", "4887.75", "5253.50", "4754.75", "5187.00"],
        ["14100.00", "13700.00", "13900.00", "13900.00", "13900.00", "13800.00", "14000.00", "13900.00", "13600.00", "13300.00", "13500.00", "13500.00"]
    ];
    var yColor = ["blue", "green", "orange"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0], backgroundColor: yColor[0]}, 
            {label: yLabel[1], data: dataSet[1], backgroundColor: yColor[1]}, 
            {label: yLabel[2], data: dataSet[2], backgroundColor: yColor[2]},
        ]
    };
    var config = {
        type: "bar", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph2, config);
    graph.append(graph2);
    addTableInGraph(yLabel, yTotal, "Fare product: ", "Total annual revenue: ");
}
function applyDashBGraph3() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Revenue details by points of sales for " + filter1Data + " - Under development";
    graph.append(header);
}
function applyDashBGraph4() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Long-term user traffic for a period of " + filter2Data + " years ending in " + filter1Data +
        ", for service " + getFilter4Lab() + ", in " + getFilter5Lab();
    graph.append(header);
    var graph4 = document.createElement("canvas");
    graph4.style.width="100%";
    var xLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yLabel = ["2023", "2024", "2025", "2026", "2027"];
    var yTotal = ["38940", "37768", "26932", "20224", "14148"];
    var dataSet = [
        ["3292", "2926", "3352", "2938", "3210", "3156", "3234", "3374", "3318", "3428", "3428", "3284"],
        ["3522", "3130", "3154", "3288", "3342", "3122", "3314", "3210", "2984", "3016", "2790", "2896"],
        ["2838", "2332", "2330", "2258", "2270", "2128", "2346", "2178", "2108", "2146", "1934", "2064"],
        ["2010", "1780", "1864", "1874", "1842", "1838", "1834", "1662", "1526", "1420", "1322", "1252"],
        ["1130", "1098", "1186", "1198", "1234", "1238", "1310", "1216", "1166", "1128", "1104", "1140"]
    ];
    var yColor = ["blue", "green", "orange", "brown", "black"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0], borderColor: yColor[0], backgroundColor: yColor[0]}, 
            {label: yLabel[1], data: dataSet[1], borderColor: yColor[1], backgroundColor: yColor[1]}, 
            {label: yLabel[2], data: dataSet[2], borderColor: yColor[2], backgroundColor: yColor[2]},
            {label: yLabel[3], data: dataSet[3], borderColor: yColor[3], backgroundColor: yColor[3]},
            {label: yLabel[4], data: dataSet[4], borderColor: yColor[4], backgroundColor: yColor[4]}
        ]
    };
    var config = {
        type: "line", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph4, config);
    graph.append(graph4);
    addTableInGraph(yLabel, yTotal, "Year: ", "Total users: ");

}
function applyDashBGraph5() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Mid-term user traffic in " + filter1Data + " for service " +  getFilter4Lab();
    graph.append(header);
    var graph5 = document.createElement("canvas");
    graph5.style.width="100%";
    var xLabel = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var yLabel = ["Total", "Direction 0", "Direction 1"];
    var yAnnual = ["26932", "13466", "13466"];
    var dataSet = [
        ["2838", "2332", "2330", "2258", "2270", "2128", "2346", "2178", "2108", "2146", "1934", "2064"],
        ["1419", "1166", "1165", "1129", "1135", "1064", "1173", "1089", "1054", "1073", "967", "1032"],
        ["1419", "1166", "1165", "1129", "1135", "1064", "1173", "1089", "1054", "1073", "967", "1032"]
    ];
    var barColor = ["blue", "green", "orange"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0],  backgroundColor: barColor[0]}, 
            {label: yLabel[1], data: dataSet[1],  backgroundColor: barColor[1]}, 
            {label: yLabel[2], data: dataSet[2],  backgroundColor: barColor[2]}
        ]
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
    addTableInGraph(yLabel, yAnnual, "Direction: ", "Total annual users: ");
}
function applyDashBGraph6() {
    cleanGraph();
    var header = document.createElement("h2");
    header.innerHTML = "Graph: Short-term user traffic on " + filter3Data + " for service " +  getFilter4Lab();
    graph.append(header);
    var graph6 = document.createElement("canvas");
    graph6.style.width="100%";
    var xLabel = ["0AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM","12AM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];
    var yLabel = ["Total", "Direction 0", "Direction 1"];
    var yAnnual = ["6", "3", "3"];
    var dataSet = [
        ["0", "0", "0", "0", "0", "0", "1", "0", "1", "0", "1", "0","0", "0", "0", "0", "0", "0", "1", "0", "0", "1", "1", "0"],
        ["0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "1", "0","0", "0", "0", "0", "0", "0", "1", "0", "0", "0", "0", "0"],
        ["0", "0", "0", "0", "0", "0", "0", "0", "1", "0", "0", "0","0", "0", "0", "0", "0", "0", "0", "0", "0", "1", "1", "0"],
    ];
    var barColor = ["blue", "green", "orange"];
    var data = {
        labels: xLabel,
        datasets: [
            {label: yLabel[0], data: dataSet[0],  backgroundColor: barColor[0]}, 
            {label: yLabel[1], data: dataSet[1],  backgroundColor: barColor[1]}, 
            {label: yLabel[2], data: dataSet[2],  backgroundColor: barColor[2]}
        ]
    };
    var config = {
        type: "bar", data: data,
        options: {
            responsive: true,
            plugins: {legend: {position: 'top',}, title: {display: false, text: ""}}
        },
    };
    new Chart(graph6, config);
    graph.append(graph6);
    addTableInGraph(yLabel, yAnnual, "Direction: ", "Total users for the day: ");
}
function applyDashBTable0() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Long-term revenue summary for a period of " + filter2Data + " years ending in " + filter1Data;
    table.append(header);
}
function applyDashBTable1() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Mid-term revenue summary for " + filter1Data;
    table.append(header);
}
function applyDashBTable2() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Revenue details by fare products for" + filter1Data;
    table.append(header);
}
function applyDashBTable3() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Revenue details by points of sales for " + filter1Data + " - Under development";
    table.append(header);
}
function applyDashBTable4() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Long-term user traffic for a period of " + filter2Data + " years ending in " + filter1Data +
        ", for service " + getFilter4Lab() + ", in " + getFilter5Lab();
    table.append(header);
}
function applyDashBTable5() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Mid-term user traffic in " + filter1Data + " for service " +  getFilter4Lab();
    table.append(header);
}
function applyDashBTable6() {
    cleanTable();
    var header = document.createElement("h2");
    header.innerHTML = "Table: Short-term user traffic on " + filter3Data + " for service " +  getFilter4Lab();
    table.append(header);
}
