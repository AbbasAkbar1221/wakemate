

let selectMenu = document.querySelectorAll("select");
let currentTime = document.querySelector("#currTime");
let setAlarmBtn = document.getElementById('set-alarm-btn');
let stopAlarmBtn = document.getElementById('stop-alarm-btn');
let alarmSound = document.getElementById('alarm-sound');

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


let alarmTime = null;


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


setInterval(() => {
    let today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();

    
    let ampm = h >= 12 ? "P.M." : "A.M.";

    
    h = h % 12;
    h = h == 0 ? h = 12 : h;

    
    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    currentTime.innerText = `${h}:${m}:${s} ${ampm}`;

    
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

