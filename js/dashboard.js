import {
  getDataFromProcedure,
  signupUser,
  loginUser,
  checkToken,
} from './apiCalls.js';
/*Global variables and operations*/
var dashBSelect;
var agencyNum = 1;
var firstName = 'Emma';
var lastName = 'Tremblay';
var years = [2023, 2024, 2025, 2026, 2027];
var servicesLab = [
  'Ligne 1 - Verte',
  'Ligne 2 - Orange',
  'Ligne 4 - Jaune',
  'Ligne 5 - Bleue',
  'Bus 18 - Beaubien',
  'Bus 24 - Sherbrooke',
  'Bus 51 - Édouard-Montpetit',
  'Bus 67 - Saint-Michel',
  'Bus 105 - Sherbrooke',
  'Bus 121 - Sauvé / Côte-Vertu',
  'Bus 141 - Jean-Talon Est',
  'Bus 165 - Côte-des-Neiges',
  'Bus 439 - Express Pie-IX',
];
var servicesNum = [1, 2, 3, 4, 13, 16, 40, 51, 77, 89, 102, 110, 191];
var directionsLab = ['Direction 0', 'Direction 1', 'Both directions'];
var directionsNum = [0, 1, 2];
var filter1Data, filter2Data, filter3Data, filter4Data, filter5Data;
var requestData;
const agency = document.getElementById('agency');
const employee = document.getElementById('employee');
const dashboardOptions = document.querySelectorAll('.dropdown-item');
const filterID = document.getElementById('filterID');
const filter1 = document.getElementById('filterRow1');
const filter2 = document.getElementById('filterRow2');
const filter3 = document.getElementById('filterRow3');
const filter4 = document.getElementById('filterRow4');
const filter5 = document.getElementById('filterRow5');
const filterButton = document.getElementById('filterButton');
const filterButtonC = document.getElementById('filterButtonC');
const graph = document.getElementById('nav-graph');
const table = document.getElementById('nav-table');

switch (agencyNum) {
  case 1:
    agency.style.backgroundImage = "url('resources/artm-logo.png')";
    break;
  case 2:
    agency.style.backgroundImage = "url('resources/stm-logo.png')";
    break;
  case 3:
    agency.style.backgroundImage = "url('resources/exo-logo.png')";
    break;
  case 4:
    agency.style.backgroundImage = "url('resources/rtl-logo.png')";
    break;
  case 5:
    agency.style.backgroundImage = "url('resources/stl-logo.png')";
    break;
  case 6:
    agency.style.backgroundImage = "url('resources/rem-logo.jpg')";
    break;
  default:
    agency.innerHTML = '';
}
employee.innerHTML = 'Welcome ' + firstName + ' ' + lastName;

for (let i = 0; i < dashboardOptions.length; i++) {
  dashboardOptions[i].addEventListener('click', function () {
    dashBSelectSwitch(i);
  });
}

/*Methods for managing the filters*/
function dashBSelectSwitch(selected) {
  dashBSelect = selected;
  filter1Data = undefined;
  filter2Data = undefined;
  filter3Data = undefined;
  filter4Data = undefined;
  filter5Data = undefined;
  filterID.innerHTML =
    'Filter for ' + dashboardOptions[dashBSelect].innerHTML + ':';
  switch (selected) {
    case 0:
      applyDashBFilter0();
      break;
    case 1:
      applyDashBFilter1to3();
      break;
    case 2:
      applyDashBFilter1to3();
      break;
    case 3:
      applyDashBFilter1to3();
      break;
    case 4:
      applyDashBFilter4();
      break;
    case 5:
      applyDashBFilter5();
      break;
    case 6:
      applyDashBFilter6();
      break;
  }
}
function cleanAllFilters() {
  while (filter1.firstChild) filter1.removeChild(filter1.firstChild);
  filter1.style.display = 'none';
  while (filter2.firstChild) filter2.removeChild(filter2.firstChild);
  filter2.style.display = 'none';
  while (filter3.firstChild) filter3.removeChild(filter3.firstChild);
  filter3.style.display = 'none';
  while (filter4.firstChild) filter4.removeChild(filter4.firstChild);
  filter4.style.display = 'none';
  while (filter5.firstChild) filter5.removeChild(filter5.firstChild);
  filter5.style.display = 'none';
  filterButton.style.display = 'none';
  cleanGraph();
  cleanTable();
  var headerG = document.createElement('h2');
  var headerT = document.createElement('h2');
  headerG.innerHTML = 'Graph zone';
  headerT.innerHTML = 'Table zone';
  graph.append(headerG);
  table.append(headerT);
}
function populateFilter1() {
  var select = document.createElement('select');
  select.style.maxWidth = '300px';
  select.className = 'form-select';
  select.ariaLabel = 'Default select example';
  let initial = document.createElement('option');
  let initialText = document.createTextNode('Select...');
  initial.setAttribute('selected', years[0]);
  initial.appendChild(initialText);
  select.appendChild(initial);
  for (let i = 0; i < years.length; i++) {
    let option = document.createElement('option');
    let optionText = document.createTextNode(years[i]);
    option.setAttribute('value', years[i]);
    option.appendChild(optionText);
    select.appendChild(option);
  }
  filter1.style.display = 'block';
  if (dashBSelect == 0 || dashBSelect == 4)
    filter1.innerHTML = 'Select an end year: ';
  else filter1.innerHTML = 'Select a year: ';
  filter1.appendChild(select);
}
filter1.addEventListener('change', (e) => {
  for (let i = 0; i < years.length; i++)
    if (e.target.value == years[i]) filter1Data = years[i];
});
function populateFilter2() {
  var input = document.createElement('input');
  input.className = 'form-control';
  input.style.maxWidth = '300px';
  filter2.style.display = 'block';
  filter2.innerHTML = 'Select a period (in years, more than 1 and no more than 10): ';
  filter2.appendChild(input);
}
filter2.addEventListener('change', (e) => {
  filter2Data = e.target.value;
});
function populateFilter3() {
  var input = document.createElement('input');
  input.id = 'datePicker';
  input.class = 'form-control';
  input.type = 'date';
  filter3.style.display = 'block';
  filter3.innerHTML = 'Select a date: ';
  filter3.appendChild(input);
}
filter3.addEventListener('change', (e) => {
  filter3Data = e.target.value;
});
function populateFilter4() {
  var select = document.createElement('select');
  select.style.maxWidth = '300px';
  select.className = 'form-select';
  select.ariaLabel = 'Default select example';
  let initial = document.createElement('option');
  let initialText = document.createTextNode('Select...');
  initial.setAttribute('selected', servicesNum[0]);
  initial.appendChild(initialText);
  select.appendChild(initial);
  for (let i = 0; i < servicesLab.length; i++) {
    let option = document.createElement('option');
    let optionText = document.createTextNode(servicesLab[i]);
    option.setAttribute('value', servicesNum[i]);
    option.appendChild(optionText);
    select.appendChild(option);
  }
  filter4.style.display = 'block';
  filter4.innerHTML = 'Select a service: ';
  filter4.appendChild(select);
}
filter4.addEventListener('change', (e) => {
  filter4Data = e.target.value;
});
function populateFilter5() {
  var select = document.createElement('select');
  select.style.maxWidth = '300px';
  select.className = 'form-select';
  select.ariaLabel = 'Default select example';
  let initial = document.createElement('option');
  let initialText = document.createTextNode('Select...');
  initial.setAttribute('selected', directionsNum[0]);
  initial.appendChild(initialText);
  select.appendChild(initial);
  for (let i = 0; i < directionsLab.length; i++) {
    let option = document.createElement('option');
    let optionText = document.createTextNode(directionsLab[i]);
    option.setAttribute('value', directionsNum[i]);
    option.appendChild(optionText);
    select.appendChild(option);
  }
  filter5.style.display = 'block';
  filter5.innerHTML = 'Select a service: ';
  filter5.appendChild(select);
}
filter5.addEventListener('change', (e) => {
  filter5Data = e.target.value;
});
function applyDashBFilter0() {
  cleanAllFilters();
  filterButtonC.innerHTML = "Apply filter(s)"
  populateFilter1();
  populateFilter2();
  filterButton.style.display = 'block';
}
function applyDashBFilter1to3() {
  cleanAllFilters();
  filterButtonC.innerHTML = "Apply filter(s)"
  populateFilter1();
  filterButton.style.display = 'block';
}
function applyDashBFilter4(selected) {
  cleanAllFilters();
  filterButtonC.innerHTML = "Apply filter(s)"
  populateFilter1();
  populateFilter2();
  populateFilter4();
  populateFilter5();
  filterButton.style.display = 'block';
}
function applyDashBFilter5(selected) {
  cleanAllFilters();
  filterButtonC.innerHTML = "Apply filter(s)"
  populateFilter1();
  populateFilter4();
  filterButton.style.display = 'block';
}
function applyDashBFilter6(selected) {
  cleanAllFilters();
  filterButtonC.innerHTML = "Apply filter(s)"
  populateFilter3();
  populateFilter4();
  filterButton.style.display = 'block';
}
function getFilter4Lab() {
  var label = '';
  for (let i = 0; i < servicesNum.length; i++)
    if (servicesNum[i] == filter4Data) label = servicesLab[i];
  return label;
}
function getFilter5Lab() {
  var label = '';
  for (let i = 0; i < directionsNum.length; i++)
    if (directionsNum[i] == filter5Data) label = directionsLab[i];
  return label;
}
filterButtonC.addEventListener('click', filterDataCompilation);
async function filterDataCompilation() {
  switch (dashBSelect) {
    case 0:
      console.log(dashBSelect + ' ' + filter1Data + ' ' + filter2Data);
      if (
        filter1Data != null &&
        filter1Data != undefined &&
        filter2Data != null &&
        filter2Data != undefined &&
        !isNaN(filter2Data)
      ) {
        if (parseInt(filter2Data) > 1 && parseInt(filter2Data) < 11) {
          var requestData = undefined;
          requestData = {
            procedure: 'LongTermRevenueSummary',
            params: [
              { key: 'endYear', type: 'Int', value: parseInt(filter1Data) },
              { key: 'period', type: 'Int', value: parseInt(filter2Data) },
            ],
          };
          console.log(requestData);
          var data = null;
          filterButtonC.innerHTML = "Processing... please wait.";
          data = await getDataFromProcedure(requestData);
          filterButtonC.innerHTML = "Apply filter(s)";
          applyDashBGraph0(data);
          applyDashBTable0(data);
        }
        else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 1:
      console.log(dashBSelect + ' ' + filter1Data);
      if (filter1Data != null && filter1Data != undefined) {
        var requestData = undefined;
        requestData = {
          procedure: 'MidTermRevenueSummary',
          params: [{ key: 'year', type: 'Int', value: parseInt(filter1Data) }],
        };
        console.log(requestData);
        var data = null; 
        filterButtonC.innerHTML = "Processing... please wait.";
        data = await getDataFromProcedure(requestData);
        filterButtonC.innerHTML = "Apply filter(s)";
        applyDashBGraph1(data);
        applyDashBTable1(data);
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 2:
      console.log(dashBSelect + ' ' + filter1Data);
      if (filter1Data != null && filter1Data != undefined) {
        var requestData = undefined;
        requestData = {
          procedure: 'RevenueDetailsFareProducts',
          params: [{ key: 'year', type: 'Int', value: parseInt(filter1Data) }],
        };
        console.log(requestData);
        var data = null; 
        filterButtonC.innerHTML = "Processing... please wait.";
        data = await getDataFromProcedure(requestData);
        filterButtonC.innerHTML = "Apply filter(s)";
        applyDashBGraph2(data);
        applyDashBTable2(data);
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 3:
      console.log(dashBSelect + ' ' + filter1Data);
      if (filter1Data != null && filter1Data != undefined) {
        var requestData = undefined;
        requestData = {
          procedure: 'RevenueDetailsPOS',
          params: [{ key: 'year', type: 'Int', value: parseInt(filter1Data) }],
        };
        console.log(requestData);
        var data = null; 
        filterButtonC.innerHTML = "Processing... please wait.";
        data = await getDataFromProcedure(requestData);
        filterButtonC.innerHTML = "Apply filter(s)";
        applyDashBGraph3(data);
        applyDashBTable3(data);
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 4:
      console.log(dashBSelect + ' ' + filter1Data + ' ' + filter2Data + ' ' + filter4Data + ' ' + filter5Data);
      if (
        filter1Data != null &&
        filter1Data != undefined &&
        filter2Data != null &&
        filter2Data != undefined &&
        !isNaN(filter2Data) &&
        filter4Data != null &&
        filter4Data != undefined &&
        filter5Data != null &&
        filter5Data != undefined
      ) {
        if (parseInt(filter2Data) > 1 && parseInt(filter2Data) < 11) {
          var dir;
          if (filter5Data == 2) dir = null;
          else dir = parseInt(filter5Data);
          var requestData = undefined;
          requestData = {
            procedure: 'LongTermTrafficProc',
            params: [
              { key: 'givenYear', type: 'Int', value: parseInt(filter1Data) },
              { key: 'period', type: 'Int', value: parseInt(filter2Data) },
              { key: 'service', type: 'Int', value: parseInt(filter4Data) },
              { key: 'direction', type: 'Int', value: dir },
            ],
          };
          console.log(requestData);
          var data = null; 
          filterButtonC.innerHTML = "Processing... please wait.";
          data = await getDataFromProcedure(requestData);
          filterButtonC.innerHTML = "Apply filter(s)";
          applyDashBGraph4(data);
          applyDashBTable4(data);
        }
        else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 5:
      console.log(dashBSelect + ' ' + filter1Data + ' ' + filter4Data);
      if (
        filter1Data != null &&
        filter1Data != undefined &&
        filter4Data != null &&
        filter4Data != undefined
      ) {
        var requestData = undefined;
        requestData = {
          procedure: 'MidTermTraffic',
          params: [
            { key: 'year', type: 'Int', value: parseInt(filter1Data) },
            { key: 'service', type: 'Int', value: parseInt(filter4Data) },
          ],
        };
        console.log(requestData);
        var data = null; 
        filterButtonC.innerHTML = "Processing... please wait.";
        data = await getDataFromProcedure(requestData);
        filterButtonC.innerHTML = "Apply filter(s)";
        applyDashBGraph5(data);
        applyDashBTable5(data);
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
    case 6:
      console.log(dashBSelect + ' ' + filter3Data + ' ' + filter4Data);
      if (
        filter3Data != null &&
        filter3Data != undefined &&
        filter4Data != null &&
        filter4Data != undefined
      ) {
        console.log(filter3Data.replaceAll('-', '/'));
        var requestData = {
          procedure: 'ShortTermTrafficProc',
          params: [{ key: 'year', type: 'Int', value: parseInt(filter1Data) }],
          params: [
            {
              key: 'givenDay',
              type: 'DateTime',
              value: filter3Data.replaceAll('-', '/'),
            },
            { key: 'service', type: 'Int', value: parseInt(filter4Data) },
          ],
        };
        console.log(requestData);
        var data = null; 
        filterButtonC.innerHTML = "Processing... please wait.";
        data = await getDataFromProcedure(requestData);
        filterButtonC.innerHTML = "Apply filter(s)";
        applyDashBGraph6(data);
        applyDashBTable6(data);
      }
      else {filterButtonC.innerHTML = "Invalid filter inputs, try again.";}
      break;
  }
}

/*Methods for managing graph and table areas*/
function cleanGraph() {
  while (graph.firstChild) graph.removeChild(graph.firstChild);
}
function cleanTable() {
  while (table.firstChild) table.removeChild(table.firstChild);
}
function addTableInGraph(headerData, bodyData, headerTitle, bodyTitle) {
  var totalTable = document.createElement('div');
  totalTable.className = 'table-responsive';
  totalTable.id = 'graphTable';
  var table = document.createElement('table');
  table.className = 'table';
  var thead = document.createElement('thead');
  var tbody = document.createElement('tbody');
  var headerRow = document.createElement('tr');
  for (var i = -1; i < headerData.length; i++) {
    var th = document.createElement('th');
    if (i == -1) th.textContent = headerTitle;
    else th.textContent = headerData[i];
    headerRow.appendChild(th);
  }
  thead.appendChild(headerRow);
  var dataRow = document.createElement('tr');
  for (var i = -1; i < bodyData.length; i++) {
    var td = document.createElement('td');
    if (i == -1) td.textContent = bodyTitle;
    else td.textContent = bodyData[i];
    dataRow.appendChild(td);
  }
  tbody.appendChild(dataRow);
  table.appendChild(thead);
  table.appendChild(tbody);
  totalTable.appendChild(table);
  graph.append(totalTable);
}
function applyDashBGraph0(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML =
    'Graph: Long-term revenue summary for a period of ' +
    filter2Data +
    ' years ending in ' +
    filter1Data;
  graph.append(header);
  var graph0 = document.createElement('canvas');
  graph0.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['Online', 'Buses', 'Region1', 'Region2', 'Region3', 'Region4', 'Region5', 'Region6', 'Region7', 'Region8',];
  var yLabel = [];  var yTotal = []; var dataSet = []; var dataPack = [];
  for (let i = 0; i < data[1].length; i++) {
    yLabel[i] = data[1][i].Year; yTotal[i] = data[1][i].All;
    dataSet[i] = [data[1][i].Online, data[1][i].Buses, data[1][i]['Region 1'], data[1][i]['Region 2'], data[1][i]['Region 3'],
        data[1][i]['Region 4'], data[1][i]['Region 5'], data[1][i]['Region 6'], data[1][i]['Region 7'], data[1][i]['Region 8']];
    for (let j = 0; j < xLabel.length; j++) if (dataSet[i][j] == null) dataSet[i][j] = 0;
    dataPack[i] = {label: yLabel[i], data: dataSet[i], borderColor: yColor[i],backgroundColor: yColor[i],};
  }
  var data = {labels: xLabel, datasets: dataPack};
  var config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph0, config);
  graph.append(graph0);
  addTableInGraph(yLabel, yTotal, 'Year: ', 'Total revenue by year: ');
}
function applyDashBGraph1(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML = 'Graph: Mid-term revenue summary for ' + filter1Data;
  graph.append(header);
  var graph1 = document.createElement('canvas');
  graph1.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  var yLabel = ['Buses', 'Online', 'Region 1', 'Region 2', 'Region 3', 'Region 4', 'Region 5', 'Region 6', 'Region 7', 'Region 8',];
  var yTotal = []; var dataSet = []; var dataPack = [];
  for (let i = 0; i < data[1].length; i++) 
    if (data[1][i].Region == 'Total') 
        yTotal = [data[1][i].January, data[1][i].February, data[1][i].March, data[1][i].April, data[1][i].May, 
        data[1][i].June, data[1][i].July, data[1][i].August, data[1][i].September, data[1][i].October, 
        data[1][i].November, data[1][i].December,];
  for (let i = 0; i < yLabel.length; i++) {
    for (let j = 0; j < data[1].length; j++) {
        if (data[1][j].Region == yLabel[i]) {
            dataSet[i] = [data[1][j].January, data[1][j].February, data[1][j].March, data[1][j].April, data[1][j].May, 
            data[1][j].June, data[1][j].July, data[1][j].August, data[1][j].September, data[1][j].October, 
            data[1][j].November, data[1][j].December,];
        }
    }
    for (let j = 0; j < xLabel.length; j++) if (dataSet[i][j] == null) dataSet[i][j] = 0;
    dataPack[i] ={ label: yLabel[i], data: dataSet[i], backgroundColor: yColor[i] };
  }
  var data = {labels: xLabel, datasets: dataPack,};
  var config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph1, config);
  graph.append(graph1);
  addTableInGraph(xLabel, yTotal, 'Month: ', 'Total revenue: ');
}
function applyDashBGraph2(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML = 'Graph: Revenue details by fare products for' + filter1Data;
  graph.append(header);
  var graph2 = document.createElement('canvas');
  graph2.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  var yLabel = ['Two trips', 'Ten trips', 'Monthly'];
  var product = ['twoTrips', 'tenTrips', 'monthly'];
  var yTotal = []; var dataSet = []; var dataPack = [];
  for (let i = 0; i < product.length; i++) {
    for (let j = 0; j < data[1].length; j++) {
      if (data[1][j].Product == product[i]) {
        yTotal[i] = data[1][j].TotalYear;
        dataSet[i] = [data[1][j].January, data[1][j].February, data[1][j].March, data[1][j].April, data[1][j].May, 
          data[1][j].June, data[1][j].July, data[1][j].August, data[1][j].September, data[1][j].October, 
          data[1][j].November, data[1][j].December,];
      }
    }
    for (let j = 0; j < xLabel.length; j++) if (dataSet[i][j] == null) dataSet[i][j] = 0;
    dataPack[i] ={ label: yLabel[i], data: dataSet[i], backgroundColor: yColor[i] };
  }
  var data = {labels: xLabel, datasets: dataPack,};
  var config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph2, config);
  graph.append(graph2);
  addTableInGraph(yLabel, yTotal, 'Fare product: ', 'Total annual revenue: ');
}
function applyDashBGraph3(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML =
    'Graph: Revenue details by points of sales for ' +
    filter1Data +
    ' No graph available for this type of result. Please refer to the table instead.';
  graph.append(header);
}
function applyDashBGraph4(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML = 'Graph: Long-term user traffic for a period of ' + filter2Data + ' years ending in ' +
    filter1Data + ', for service ' + getFilter4Lab() + ', in ' + getFilter5Lab();
  graph.append(header);
  var graph4 = document.createElement('canvas');
  graph4.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  var yLabel = [];  var yTotal = []; var dataSet = []; var dataPack = [];
  for (let i = 0; i < data[1].length; i++) {
    yLabel[i] = data[1][i].Year; yTotal[i] = data[1][i].WholeYear;
    dataSet[i] = [data[1][i].January, data[1][i].February, data[1][i].March, data[1][i].April, data[1][i].May,
        data[1][i].June, data[1][i].July, data[1][i].August, data[1][i].September, data[1][i].October,
        data[1][i].November, data[1][i].December,];
    for (let j = 0; j < xLabel.length; j++) if (dataSet[i][j] == null) dataSet[i][j] = 0;
    dataPack[i] = {label: yLabel[i], data: dataSet[i], borderColor: yColor[i],backgroundColor: yColor[i],};
  }
  var data = {labels: xLabel, datasets: dataPack,};
  var config = {
    type: 'line',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph4, config);
  graph.append(graph4);
  addTableInGraph(yLabel, yTotal, 'Year: ', 'Total users: ');
}
function applyDashBGraph5(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML = 'Graph: Mid-term user traffic in ' + filter1Data + ' for service ' + getFilter4Lab();
  graph.append(header);
  var graph5 = document.createElement('canvas');
  graph5.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];
  var yLabel = ['Total', 'Direction 0', 'Direction 1'];
  var yAnnual = []; var dataSet = []; var dataPack = []; var tot = []; var dir0 = []; var dir1 = [];
  for (let i = 0; i < data[1].length; i++) {
    if (data[1][i].period == "Annual") yAnnual = [data[1][i].total, data[1][i].direction0, data[1][i].direction1,];
  }
  for (let i = 0; i < xLabel.length; i++) {
    for (let j = 0; j < data[1].length; j++) {
      if (data[1][j].period == xLabel[i]) {
        tot[i] = data[1][j].total; dir0[i] = data[1][j].direction0; dir1[i] = data[1][j].direction1;
      }
    }
    if (tot[i] == null) tot[i] = 0;
    if (dir0[i] == null) dir0[i] = 0;
    if (dir1[i] == null) dir1[i] = 0;
  }
  dataSet[0] = tot; dataSet[1] = dir0; dataSet[2] = dir1;
  dataPack[0] ={ label: yLabel[0], data: dataSet[0], backgroundColor: yColor[0] };
  dataPack[1] ={ label: yLabel[1], data: dataSet[1], backgroundColor: yColor[1] };
  dataPack[2] ={ label: yLabel[2], data: dataSet[2], backgroundColor: yColor[2] };
  var data = {labels: xLabel, datasets: dataPack,};
  var config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph5, config);
  graph.append(graph5);
  addTableInGraph(yLabel, yAnnual, 'Direction: ', 'Total annual users: ');
}
function applyDashBGraph6(data) {
  cleanGraph();
  var header = document.createElement('h2');
  header.innerHTML = 'Graph: Short-term user traffic on ' + filter3Data + ' for service ' + getFilter4Lab();
  graph.append(header);
  var graph6 = document.createElement('canvas');
  graph6.style.width = '100%';
  var yColor = ['blue', 'green', 'orange', 'brown', 'black', 'yellow', 'gray', 'red', 'aqua', 'chocolate',];
  var xLabel = ['0AM', '1AM', '2AM', '3AM', '4AM', '5AM', '6AM', '7AM', '8AM', '9AM', '10AM', '11AM', '12AM',
    '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM', '8PM', '9PM', '10PM', '11PM',];
  var yLabel = ['Total', 'Direction 0', 'Direction 1'];
  var yDaily = []; var dataSet = []; var dataPack = []; var tot = []; var dir0 = []; var dir1 = [];
  for (let i = 0; i < data[1].length; i++) {
    if (data[1][i].period == 'Daily') yDaily = [data[1][i].total, data[1][i].direction0, data[1][i].direction1,];
  }
  for (let i = 0; i < xLabel.length; i++) {
    for (let j = 0; j < data[1].length; j++) {
      if (data[1][j].period == xLabel[i]) {
        tot[i] = data[1][j].total; dir0[i] = data[1][j].direction0; dir1[i] = data[1][j].direction1;
      }
    }
    if (tot[i] == null) tot[i] = 0;
    if (dir0[i] == null) dir0[i] = 0;
    if (dir1[i] == null) dir1[i] = 0;
  }
  dataSet[0] = tot; dataSet[1] = dir0; dataSet[2] = dir1;
  dataPack[0] ={ label: yLabel[0], data: dataSet[0], backgroundColor: yColor[0] };
  dataPack[1] ={ label: yLabel[1], data: dataSet[1], backgroundColor: yColor[1] };
  dataPack[2] ={ label: yLabel[2], data: dataSet[2], backgroundColor: yColor[2] };
  var data = {labels: xLabel, datasets: dataPack,};
  var config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      plugins: {
        legend: { position: 'top' },
        title: { display: false, text: '' },
      },
    },
  };
  new Chart(graph6, config);
  graph.append(graph6);
  addTableInGraph(yLabel, yDaily, 'Direction: ', 'Total users for the day: ');
}

/* Method: generate table template */
function tableGenerateorType1(dData) {
  let tbl_container = document.querySelector('#nav-table');
  tbl_container.classList.add('table-responsive');
  let tbl = document.createElement('table');
  tbl.classList.add('table');
  //tbl.classList.add("table-bordered");
  tbl.classList.add('table-hover');
  tbl.classList.add('border-info');

  let cols = Object.keys(dData[1][0]);

  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  cols.forEach((item) => {
    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.innerText = item;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  tbl.append(thead);
  let tbody = document.createElement('tbody');

  dData[1].forEach((record) => {
    let tr = document.createElement('tr');

    let vals = Object.values(record);

    vals.forEach((elem) => {
      let td = document.createElement('td');
      if (elem === null) {
        td.innerText = '0';
      } else {
        td.innerText = elem;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tbl.appendChild(tbody);
  tbl_container.appendChild(tbl);
}

function tableGenerateorType2(dData) {
  let tbl_container = document.querySelector('#nav-table');
  tbl_container.classList.add('table-responsive');
  let tbl = document.createElement('table');
  tbl.classList.add('table');
  //tbl.classList.add("table-bordered");
  tbl.classList.add('table-hover');
  tbl.classList.add('border-info');

  let cols = Object.keys(dData[0]);

  let thead = document.createElement('thead');
  let tr = document.createElement('tr');
  cols.forEach((item) => {
    let th = document.createElement('th');
    th.setAttribute('scope', 'col');
    th.innerText = item;
    tr.appendChild(th);
  });

  thead.appendChild(tr);
  tbl.append(thead);

  let tbody = document.createElement('tbody');

  dData.forEach((record) => {
    let tr = document.createElement('tr');

    let vals = Object.values(record);

    vals.forEach((elem) => {
      let td = document.createElement('td');
      if (elem === null) {
        td.innerText = '0';
      } else {
        td.innerText = elem;
      }
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });

  tbl.appendChild(tbody);
  tbl_container.appendChild(tbl);
}

function applyDashBTable0(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Long-term revenue summary for a period of ' +
    filter2Data +
    ' years ending in ' +
    filter1Data;
  table.append(header);
  tableGenerateorType1(data);
}
function applyDashBTable1(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML = 'Table: Mid-term revenue summary for ' + filter1Data;
  table.append(header);
  tableGenerateorType1(data);
}
function applyDashBTable2(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Revenue details by fare products for' + filter1Data;
  table.append(header);
  tableGenerateorType1(data);
}
function applyDashBTable3(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Revenue details by points of sales for ' +
    filter1Data;
  table.append(header);
  tableGenerateorType2(data);
}
function applyDashBTable4(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Long-term user traffic for a period of ' +
    filter2Data +
    ' years ending in ' +
    filter1Data +
    ', for service ' +
    getFilter4Lab() +
    ', in ' +
    getFilter5Lab();
  table.append(header);
  tableGenerateorType1(data);
}
function applyDashBTable5(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Mid-term user traffic in ' +
    filter1Data +
    ' for service ' +
    getFilter4Lab();
  table.append(header);
  tableGenerateorType1(data);
}
function applyDashBTable6(data) {
  cleanTable();
  var header = document.createElement('h2');
  header.innerHTML =
    'Table: Short-term user traffic on ' +
    filter3Data +
    ' for service ' +
    getFilter4Lab();
  table.append(header);
  tableGenerateorType1(data);
}
