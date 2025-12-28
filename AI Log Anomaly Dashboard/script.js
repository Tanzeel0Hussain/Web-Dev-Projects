fetch("logs.json")
  .then(res => res.json())
  .then(data => {
    const table = document.getElementById("logTable");
    let anomalyCount = 0;

    data.forEach(log => {
      let status = "Normal";
      let className = "normal";

      if (log.score >= 70) {
        status = "Anomaly";
        className = "anomaly";
        anomalyCount++;
      }

      table.innerHTML += `
        <tr>
          <td>${log.time}</td>
          <td>${log.event}</td>
          <td>${log.score}</td>
          <td class="${className}">${status}</td>
        </tr>
      `;
    });

    document.getElementById("totalLogs").innerText = data.length;
    document.getElementById("anomalies").innerText = anomalyCount;
    document.getElementById("riskLevel").innerText =
      anomalyCount >= 2 ? "High" : "Medium";
  });
