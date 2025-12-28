fetch("data.json")
  .then(res => res.json())
  .then(data => {
    document.getElementById("activeThreats").innerText = data.overview.activeThreats;
    document.getElementById("blockedAttacks").innerText = data.overview.blockedAttacks;
    document.getElementById("riskLevel").innerText = data.overview.riskLevel;

    const table = document.getElementById("threatTable");
    data.threats.forEach(t => {
      table.innerHTML += `
        <tr>
          <td>${t.type}</td>
          <td>${t.severity}</td>
          <td>${t.status}</td>
        </tr>`;
    });

    const logs = document.getElementById("logList");
    data.logs.forEach(l => {
      logs.innerHTML += `<li>${l}</li>`;
    });
  });

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
}
