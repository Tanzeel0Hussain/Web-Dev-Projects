const ROLE_KEY = "cybershieldSocRole";

function login() {
    const u = document.getElementById("username").value.trim();
    const p = document.getElementById("password").value;

    if (u === "admin" && p === "admin123") {
        localStorage.setItem(ROLE_KEY, "admin");
        window.location.href = "dashboard.html";
    }
    else if (u === "analyst" && p === "analyst123") {
        localStorage.setItem(ROLE_KEY, "analyst");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid credentials");
    }
}

function checkAuth() {
    const role = localStorage.getItem(ROLE_KEY);
    if (!role) {
        window.location.href = "index.html";
        return;
    }

    document.getElementById("roleBadge").innerText = role.toUpperCase();

    if (role === "analyst") {
        document.querySelectorAll(".admin-only").forEach(e => {
            e.style.display = "none";
        });
    }

    showSection("dashboard");
}

function showSection(id) {
    document.querySelectorAll(".content-section").forEach(s => {
        s.classList.remove("active");
    });

    const target = document.getElementById(id);
    if (target) target.classList.add("active");
}

function logout() {
    localStorage.removeItem(ROLE_KEY);
    window.location.href = "index.html";
}
