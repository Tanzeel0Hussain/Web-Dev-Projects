let incidents = JSON.parse(localStorage.getItem("incidents")) || [];

function saveIncidents() {
  localStorage.setItem("incidents", JSON.stringify(incidents));
}

function addIncident() {
  const title = document.getElementById("title").value.trim();
  const type = document.getElementById("type").value;
  const severity = document.getElementById("severity").value;
  const description = document.getElementById("description").value.trim();

  if (!title || !type || !severity || !description) {
    alert("Please fill all fields");
    return;
  }

  const incident = {
    title,
    type,
    severity,
    description,
    date: new Date().toLocaleString()
  };

  incidents.push(incident);
  saveIncidents();
  displayIncidents();
  clearForm();
}

function displayIncidents() {
  const list = document.getElementById("incidentList");
  list.innerHTML = "";

  if (incidents.length === 0) {
    list.innerHTML = '<tr><td colspan="6">No incidents reported yet.</td></tr>';
    return;
  }

  incidents.forEach((incident, index) => {
    const row = document.createElement("tr");

    [
      incident.title,
      incident.type,
      incident.severity,
      incident.description || "No description",
      incident.date
    ].forEach(value => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });

    const actionCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => deleteIncident(index));
    actionCell.appendChild(deleteButton);
    row.appendChild(actionCell);

    list.appendChild(row);
  });
}

function deleteIncident(index) {
  if (!confirm("Delete this incident?")) return;
  incidents.splice(index, 1);
  saveIncidents();
  displayIncidents();
}

function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("type").value = "";
  document.getElementById("severity").value = "";
  document.getElementById("description").value = "";
}

displayIncidents();
