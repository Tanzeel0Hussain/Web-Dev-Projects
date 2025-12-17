function login() {
    const u = document.getElementById("username").value;
    const p = document.getElementById("password").value;

    if (u === "admin" && p === "admin123") {
        localStorage.setItem("role", "admin");
        window.location.href = "dashboard.html";
    }
    else if (u === "analyst" && p === "analyst123") {
        localStorage.setItem("role", "analyst");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid credentials");
    }
}

function checkAuth() {
    const role = localStorage.getItem("role");
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
    document.getElementById(id).classList.add("active");
}

function logout() {
    localStorage.clear();
    window.location.href = "index.html";
}
