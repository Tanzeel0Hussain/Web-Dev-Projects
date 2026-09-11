const repoBase = "https://github.com/Tanzeel0Hussain/Web-Dev-Projects/tree/main/";

const projects = [
  {
    name: "CyberShield SOC Dashboard",
    description: "Live simulated SOC counters, logs, charts, and functional dashboard navigation.",
    category: ["cybersecurity", "dashboard"],
    tags: ["HTML", "CSS", "JavaScript", "Chart.js"],
    path: "CyberShield%20SOC%20Dashboard"
  },
  {
    name: "Login & Roles CyberShield SOC Dashboard",
    description: "Frontend SOC login and role-based interface simulation for Admin and Analyst users.",
    category: ["cybersecurity", "dashboard"],
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    path: "Login%20%26%20Roles%20CyberShield%20SOC%20Dashboard"
  },
  {
    name: "SOC Dashboard",
    description: "Basic SOC dashboard simulation with live counters, logs, and sidebar navigation.",
    category: ["cybersecurity", "dashboard"],
    tags: ["HTML", "CSS", "JavaScript"],
    path: "SOC%20Dashboard"
  },
  {
    name: "Todo List App",
    description: "Responsive task manager with completed states, deletion, Enter-key support, and LocalStorage.",
    category: ["utility"],
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    path: "Todo%20List%20App"
  },
  {
    name: "Weather App",
    description: "API-less weather UI that demonstrates DOM updates using simulated weather data.",
    category: ["utility"],
    tags: ["HTML", "CSS", "JavaScript"],
    path: "Weather%20App"
  },
  {
    name: "Cyber Incident Reporting System",
    description: "Browser-based incident reporting demo with descriptions, severity, history, deletion, and persistence.",
    category: ["cybersecurity", "utility"],
    tags: ["HTML", "CSS", "JavaScript", "LocalStorage"],
    path: "Cyber%20Incident%20Reporting%20System"
  },
  {
    name: "Password Strength Checker",
    description: "Real-time rule-based password composition checker with clear validation feedback.",
    category: ["cybersecurity", "utility"],
    tags: ["HTML", "CSS", "JavaScript"],
    path: "Password%20Strength%20Checker"
  },
  {
    name: "Phishing URL Detector",
    description: "Educational URL analyzer that checks several common phishing indicators using browser-side heuristics.",
    category: ["cybersecurity", "utility"],
    tags: ["HTML", "CSS", "JavaScript"],
    path: "Phishing%20URL%20Detector"
  },
  {
    name: "Email Phishing Detector",
    description: "Email-text analyzer for urgency, credential requests, plain HTTP links, and common URL shorteners.",
    category: ["cybersecurity", "utility"],
    tags: ["HTML", "CSS", "JavaScript"],
    path: "Email%20Phishing%20Detector"
  },
  {
    name: "Cyber Threat Intelligence Dashboard",
    description: "SOC-style threat intelligence dashboard that loads simulated threat and log data from JSON.",
    category: ["cybersecurity", "dashboard"],
    tags: ["HTML", "CSS", "JavaScript", "JSON"],
    path: "Cyber%20Threat%20Intelligence%20Dashboard"
  },
  {
    name: "AI-Inspired Log Anomaly Dashboard",
    description: "Frontend anomaly-scoring simulation with JSON logs, threshold detection, and risk summary.",
    category: ["cybersecurity", "dashboard"],
    tags: ["HTML", "CSS", "JavaScript", "JSON"],
    path: "AI%20Log%20Anomaly%20Dashboard"
  },
  {
    name: "Website Safety & Trust Analyzer",
    description: "Reason-based URL risk analyzer using browser-side heuristics and a small local demo blacklist.",
    category: ["cybersecurity", "utility"],
    tags: ["HTML", "CSS", "JavaScript", "JSON"],
    path: "Website%20Safety%20%26%20Trust%20Analyzer"
  }
];

const grid = document.getElementById("projectGrid");
const searchInput = document.getElementById("searchInput");
const emptyState = document.getElementById("emptyState");
const filterButtons = [...document.querySelectorAll(".filter")];

let activeFilter = "all";

function cardTemplate(project, index) {
  const tags = project.tags.map(tag => `<span class="tag">${tag}</span>`).join("");
  const liveUrl = `./${project.path}/`;
  const sourceUrl = `${repoBase}${project.path}`;

  return `
    <article class="project-card">
      <div class="project-number">${String(index + 1).padStart(2, "0")}</div>
      <h3>${project.name}</h3>
      <p>${project.description}</p>
      <div class="tags">${tags}</div>
      <div class="card-actions">
        <a class="live" href="${liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo ↗</a>
        <a class="source" href="${sourceUrl}" target="_blank" rel="noopener noreferrer">Source</a>
      </div>
    </article>`;
}

function renderProjects() {
  const query = searchInput.value.trim().toLowerCase();

  const filtered = projects.filter(project => {
    const matchesFilter = activeFilter === "all" || project.category.includes(activeFilter);
    const searchable = `${project.name} ${project.description} ${project.tags.join(" ")}`.toLowerCase();
    return matchesFilter && searchable.includes(query);
  });

  grid.innerHTML = filtered.map(project => cardTemplate(project, projects.indexOf(project))).join("");
  emptyState.hidden = filtered.length !== 0;
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(item => item.classList.toggle("active", item === button));
    renderProjects();
  });
});

searchInput.addEventListener("input", renderProjects);
renderProjects();
