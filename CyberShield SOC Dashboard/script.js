let threats = 12;
let blocked = 87;

// Chart Data
let labels = [];
let threatData = [];
let blockedData = [];

// Threat Chart
const threatCtx = document.getElementById("threatChart").getContext("2d");
const threatChart = new Chart(threatCtx, {
    type: "line",
    data: {
        labels,
        datasets: [{
            label: "Threats",
            data: threatData,
            borderColor: "#ff4d4d",
            tension: 0.3
        }]
    }
});

// Blocked Chart
const blockedCtx = document.getElementById("blockedChart").getContext("2d");
const blockedChart = new Chart(blockedCtx, {
    type: "bar",
    data: {
        labels,
        datasets: [{
            label: "Blocked Attacks",
            data: blockedData,
            backgroundColor: "#00ff9c"
        }]
    }
});

// Logs
const logs = [
    "[INFO] Firewall active",
    "[WARNING] Brute force detected",
    "[BLOCKED] Malware blocked",
    "[INFO] System health OK",
    "[BLOCKED] SQL Injection attempt"
];

// Live Update
setInterval(() => {
    const time = new Date().toLocaleTimeString();

    threats += Math.floor(Math.random() * 4);
    blocked += Math.floor(Math.random() * 6);

    document.getElementById("threats").innerText = threats;
    document.getElementById("blocked").innerText = blocked;

    labels.push(time);
    threatData.push(threats);
    blockedData.push(blocked);

    if (labels.length > 6) {
        labels.shift();
        threatData.shift();
        blockedData.shift();
    }

    threatChart.update();
    blockedChart.update();

    const logList = document.getElementById("logList");
    const li = document.createElement("li");
    li.innerText = logs[Math.floor(Math.random() * logs.length)];
    logList.prepend(li);

    if (logList.children.length > 6) {
        logList.removeChild(logList.lastChild);
    }

}, 3000);
