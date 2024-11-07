

let selectMenu = document.querySelectorAll("select");
let currentTime = document.querySelector("#currTime");
let setAlarmBtn = document.getElementById('set-alarm-btn');
let stopAlarmBtn = document.getElementById('stop-alarm-btn');
let alarmSound = document.getElementById('alarm-sound');

// Populate the select dropdowns (hour, minute, AM/PM)
for (let i = 12; i > 0; i--) {
    let option = document.createElement("option");
    let value = i < 10 ? "0" + i : i;
    option.value = value;
    option.textContent = value;
    selectMenu[0].appendChild(option);
}

for (let i = 59; i >= 0; i--) {
    let option = document.createElement("option");
    let value = i < 10 ? "0" + i : i;
    option.value = value;
    option.textContent = value;
    selectMenu[1].appendChild(option);
}

let ampmValues = ["A.M.", "P.M."];
ampmValues.forEach(value => {
    let option = document.createElement("option");
    option.value = value;
    option.textContent = value;
    selectMenu[2].appendChild(option);
});

// Variable to hold the alarm time
let alarmTime = null;

// Set alarm when the user clicks the 'Set Alarm' button
setAlarmBtn.addEventListener("click", () => {
    let hour = selectMenu[0].value;
    let minute = selectMenu[1].value;
    let ampm = selectMenu[2].value;

    if (hour !== "Hour" && minute !== "Minutes" && ampm !== "A.M./P.M.") {
        alarmTime = `${hour}:${minute} ${ampm}`;
        alert(`Alarm set for: ${alarmTime}`);
    } else {
        alert("Please select valid time for alarm.");
    }
});

// Check the time every second
setInterval(() => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    // Determine AM or PM
    let ampm = h >= 12 ? "P.M." : "A.M.";

    // Convert to 12-hour format
    h = h % 12;
    h = h == 0 ? h = 12 : h;

    // Format hours, minutes, seconds with leading zeros
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    // Check if current time matches the alarm time
    if (alarmTime) {
        let currentDisplayTime = `${h}:${m} ${ampm}`;
        if (currentDisplayTime === alarmTime) {
            alarmSound.play();
            stopAlarmBtn.style.display = "inline-block";
            alarmTime = null;  
        }
    }
}, 1000);


stopAlarmBtn.addEventListener("click", () => {
    alarmSound.pause();
    alarmSound.currentTime = 0;  
    stopAlarmBtn.style.display = "none";  
});

