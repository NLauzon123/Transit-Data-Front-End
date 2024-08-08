var dashBSelect;

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
for (let i = 0; i < dashboardOptions.length; i++) {
    dashboardOptions[i].addEventListener('click', function() {dashBSelectSwitch(i);});
}

function dashBSelectSwitch(selected) {
    dashBSelect = selected;
    console.log(dashboardOptions[dashBSelect].innerHTML);
}

