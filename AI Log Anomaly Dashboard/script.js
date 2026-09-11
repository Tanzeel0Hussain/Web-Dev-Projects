fetch("logs.json")
  .then(res => {
    if (!res.ok) throw new Error("Unable to load log data");
    return res.json();
  })
  .then(data => {
    const table = document.getElementById("logTable");
    table.innerHTML = "";
    let anomalyCount = 0;

    data.forEach(log => {
      const isAnomaly = Number(log.score) >= 70;
      if (isAnomaly) anomalyCount++;

      const row = document.createElement("tr");
      const values = [log.time, log.event, log.score];

      values.forEach(value => {
        const cell = document.createElement("td");
        cell.textContent = value;
        row.appendChild(cell);
      });

      const statusCell = document.createElement("td");
      statusCell.className = isAnomaly ? "anomaly" : "normal";
      statusCell.textContent = isAnomaly ? "Anomaly" : "Normal";
      row.appendChild(statusCell);
      table.appendChild(row);
    });

    document.getElementById("totalLogs").innerText = data.length;
    document.getElementById("anomalies").innerText = anomalyCount;
    document.getElementById("riskLevel").innerText =
      anomalyCount >= 2 ? "High" : anomalyCount === 1 ? "Medium" : "Low";
  })
  .catch(error => {
    console.error(error);
    document.getElementById("riskLevel").innerText = "Data Error";
  });
