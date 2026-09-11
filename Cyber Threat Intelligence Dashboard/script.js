fetch("data.json")
  .then(res => {
    if (!res.ok) throw new Error("Unable to load threat data");
    return res.json();
  })
  .then(data => {
    document.getElementById("activeThreats").innerText = data.overview.activeThreats;
    document.getElementById("blockedAttacks").innerText = data.overview.blockedAttacks;
    document.getElementById("riskLevel").innerText = data.overview.riskLevel;

    const table = document.getElementById("threatTable");
    table.innerHTML = "";
    data.threats.forEach(t => {
      const row = document.createElement("tr");
      [t.type, t.severity, t.status].forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });
      table.appendChild(row);
    });

    const logs = document.getElementById("logList");
    logs.innerHTML = "";
    data.logs.forEach(log => {
      const item = document.createElement("li");
      item.textContent = log;
      logs.appendChild(item);
    });
  })
  .catch(error => {
    console.error(error);
    document.getElementById("riskLevel").innerText = "Data Error";
  });

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  const target = document.getElementById(id);
  if (target) target.classList.remove("hidden");
}
