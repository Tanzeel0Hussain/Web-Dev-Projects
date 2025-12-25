let incidents = JSON.parse(localStorage.getItem("incidents")) || [];

function addIncident() {
  const title = document.getElementById("title").value;
  const type = document.getElementById("type").value;
  const severity = document.getElementById("severity").value;
  const description = document.getElementById("description").value;

  if (!title || !type || !severity || !description) {
    alert("Please fill all fields");
    return;
  }

  const incident = {
    title,
    type,
    severity,
    date: new Date().toLocaleString()
  };

  incidents.push(incident);
  localStorage.setItem("incidents", JSON.stringify(incidents));
  displayIncidents();
  clearForm();
}

function displayIncidents() {
  const list = document.getElementById("incidentList");
  list.innerHTML = "";

  incidents.forEach(i => {
    list.innerHTML += `
      <tr>
        <td>${i.title}</td>
        <td>${i.type}</td>
        <td>${i.severity}</td>
        <td>${i.date}</td>
      </tr>
    `;
  });
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("type").value = "";
  document.getElementById("severity").value = "";
  document.getElementById("description").value = "";
}

displayIncidents();
