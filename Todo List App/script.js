const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("todoTasks")) || [];

function saveTasks() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        if (task.completed) li.classList.add("completed");

        const taskText = document.createElement("span");
        taskText.className = "task-text";
        taskText.textContent = task.text;
        taskText.title = "Click to mark complete";
        taskText.addEventListener("click", () => toggleTask(index));

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "X";
        deleteButton.setAttribute("aria-label", `Delete ${task.text}`);
        deleteButton.addEventListener("click", () => deleteTask(index));

        li.append(taskText, deleteButton);
        taskList.appendChild(li);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (!taskText) {
        alert("Please enter a task!");
        return;
    }

    tasks.push({ text: taskText, completed: false });
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

taskInput.addEventListener("keydown", event => {
    if (event.key === "Enter") addTask();
});

renderTasks();
