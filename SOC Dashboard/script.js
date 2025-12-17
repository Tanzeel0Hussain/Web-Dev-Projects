let threats = 12;
let blocked = 87;

setInterval(() => {
    threats += Math.floor(Math.random() * 3);
    blocked += Math.floor(Math.random() * 5);

    document.getElementById("threats").innerText = threats;
    document.getElementById("blocked").innerText = blocked;

    const logs = [
        "[INFO] Port scan detected",
        "[WARNING] Failed login attempt",
        "[BLOCKED] SQL Injection attempt",
        "[INFO] System health normal",
        "[BLOCKED] Malware signature blocked"
    ];

    const logList = document.getElementById("logList");
    const li = document.createElement("li");
    li.innerText = logs[Math.floor(Math.random() * logs.length)];

    logList.prepend(li);

    if (logList.children.length > 6) {
        logList.removeChild(logList.lastChild);
    }
}, 3000);
