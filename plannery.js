const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

let tasks = JSON.parse(localStorage.getItem("plannerYTasks")) || [];

function saveTasks() {
    localStorage.setItem(
        "plannerYTasks",
        JSON.stringify(tasks)
    );
}

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(
        task => task.completed
    ).length;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = total - completed;
}

function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task-item";

        if(task.completed){
            li.classList.add("completed");
        }

        li.innerHTML = `
            <span>${task.text}</span>

            <div class="actions">

                <button onclick="toggleTask(${index})">
                    ${task.completed ? "↩" : "✔"}
                </button>

                <button onclick="deleteTask(${index})">
                    🗑
                </button>

            </div>
        `;

        taskList.appendChild(li);

    });

    updateStats();
    saveTasks();
}

function addTask() {

    const text = taskInput.value.trim();

    if(text === "") return;

    tasks.push({
        text,
        completed:false
    });

    taskInput.value = "";

    renderTasks();
}

function toggleTask(index) {

    tasks[index].completed =
        !tasks[index].completed;

    renderTasks();
}

function deleteTask(index) {

    tasks.splice(index,1);

    renderTasks();
}

addTaskBtn.addEventListener(
    "click",
    addTask
);

taskInput.addEventListener(
    "keypress",
    function(event){

        if(event.key === "Enter"){
            addTask();
        }

    }
);

renderTasks();