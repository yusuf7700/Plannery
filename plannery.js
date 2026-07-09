// ==========================
// PlannerY v2.0
// ==========================

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const remainingTasks = document.getElementById("remainingTasks");

const progressFill = document.getElementById("progressFill");
const progressPercent = document.getElementById("progressPercent");

const welcomeText = document.getElementById("welcomeText");
const userName = document.getElementById("userName");
const avatar = document.getElementById("avatar");

const modal = document.getElementById("nameModal");
const nameInput = document.getElementById("nameInput");
const saveName = document.getElementById("saveName");

const todayDate = document.getElementById("todayDate");
const liveTime = document.getElementById("liveTime");

const toast = document.getElementById("toast");

let tasks =
JSON.parse(localStorage.getItem("plannerYTasks")) || [];


// ==========================
// TOAST
// ==========================

function showToast(text){

    toast.textContent=text;

    toast.classList.add("show");

    setTimeout(()=>{

        toast.classList.remove("show");

    },2500);

}


// ==========================
// USER
// ==========================

let savedUser=
localStorage.getItem("plannerYUser");

if(savedUser){

    modal.classList.add("hidden");

    welcomeText.textContent=
    `Assalomu alaykum, ${savedUser} 👋`;

    userName.textContent=savedUser;

    avatar.textContent=
    savedUser.charAt(0).toUpperCase();

}else{

    modal.classList.remove("hidden");

}

saveName.addEventListener("click",()=>{

    const name=nameInput.value.trim();

    if(name===""){

        alert("Ismingizni kiriting.");

        return;

    }

    localStorage.setItem(
        "plannerYUser",
        name
    );

    modal.classList.add("hidden");

    welcomeText.textContent=
    `Assalomu alaykum, ${name} 👋`;

    userName.textContent=name;

    avatar.textContent=
    name.charAt(0).toUpperCase();

    showToast("Xush kelibsiz 😊");

});
// ==========================
// TASK RENDER
// ==========================

function renderTasks(){

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li=document.createElement("li");

        li.className="task-item";

        if(task.completed){

            li.classList.add("completed");

        }

        li.innerHTML=`

            <span>${task.text}</span>

            <div class="actions">

                <button class="complete-btn">

                    ✔

                </button>

                <button class="delete-btn">

                    🗑

                </button>

            </div>

        `;

        const completeBtn=
        li.querySelector(".complete-btn");

        completeBtn.addEventListener("click",()=>{

            tasks[index].completed=
            !tasks[index].completed;

            saveTasks();

        });

        const deleteBtn=
        li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click",()=>{

            tasks.splice(index,1);

            saveTasks();

            showToast("Vazifa o'chirildi 🗑");

        });

        taskList.appendChild(li);

    });

    updateStats();

}



// ==========================
// SAVE
// ==========================

function saveTasks(){

    localStorage.setItem(

        "plannerYTasks",

        JSON.stringify(tasks)

    );

    renderTasks();

}



// ==========================
// ADD TASK
// ==========================

function addTask(){

    const text=

    taskInput.value.trim();

    if(text===""){

        return;

    }

    tasks.push({

        text:text,

        completed:false

    });

    taskInput.value="";

    saveTasks();

    showToast("Vazifa qo'shildi ✅");

}



// ==========================
// EVENTS
// ==========================

addTaskBtn.addEventListener(

"click",

addTask

);

taskInput.addEventListener(

"keypress",

function(e){

    if(e.key==="Enter"){

        addTask();

    }

});



// ==========================
// START
// ==========================

// ==========================
// STATISTICS
// ==========================

function updateStats() {

    const total = tasks.length;

    const completed = tasks.filter(task => task.completed).length;

    const remaining = total - completed;

    totalTasks.textContent = total;
    completedTasks.textContent = completed;
    remainingTasks.textContent = remaining;

    const percent = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    progressFill.style.width = percent + "%";

    progressPercent.textContent = percent + "%";

    if (percent === 100 && total > 0) {
        showToast("🎉 Barcha vazifalar bajarildi!");
    }

}



// ==========================
// DATE & TIME
// ==========================

function updateDateTime() {

    const now = new Date();

    const kunlar = [
        "Yakshanba",
        "Dushanba",
        "Seshanba",
        "Chorshanba",
        "Payshanba",
        "Juma",
        "Shanba"
    ];

    const oylar = [
        "Yanvar",
        "Fevral",
        "Mart",
        "Aprel",
        "May",
        "Iyun",
        "Iyul",
        "Avgust",
        "Sentabr",
        "Oktabr",
        "Noyabr",
        "Dekabr"
    ];

    todayDate.textContent =
        `${kunlar[now.getDay()]}, ${now.getDate()} ${oylar[now.getMonth()]} ${now.getFullYear()}`;

    liveTime.textContent =
        now.toLocaleTimeString("uz-UZ");

}

updateDateTime();

setInterval(updateDateTime,1000);



// ==========================
// APP START
// ==========================

renderTasks();

updateStats();

// ==========================
// EXTRA FEATURES
// ==========================

// ESC bosilganda modalni yopish
document.addEventListener("keydown", (e) => {

    if (e.key === "Escape") {

        if (!modal.classList.contains("hidden")) {

            modal.classList.add("hidden");

        }

    }

});

// Modalda Enter bosilsa ismni saqlash
nameInput.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        saveName.click();

    }

});

// Input ochilganda avtomatik fokus
window.addEventListener("load", () => {

    if (!localStorage.getItem("plannerYUser")) {

        setTimeout(() => {

            nameInput.focus();

        }, 300);

    }

});

// Progress 100% bo'lsa tabriklash
function celebrate() {

    if (tasks.length === 0) return;

    const completed = tasks.filter(t => t.completed).length;

    if (completed === tasks.length) {

        showToast("🎉 Ajoyib! Barcha vazifalar bajarildi!");

    }

}

// updateStats funksiyasidan keyin chaqiriladi
const oldUpdateStats = updateStats;

updateStats = function () {

    oldUpdateStats();

    celebrate();

};

// Ismni o'zgartirish funksiyasi
function changeUserName() {

    const newName = prompt("Yangi ismingizni kiriting:");

    if (!newName) return;

    localStorage.setItem("plannerYUser", newName);

    welcomeText.textContent =
        `Assalomu alaykum, ${newName} 👋`;

    userName.textContent = newName;

    avatar.textContent =
        newName.charAt(0).toUpperCase();

    showToast("Ism yangilandi ✨");

}

// Avatar bosilganda ismni almashtirish
avatar.addEventListener("click", changeUserName);

// ==========================
// FINISH
// ==========================

console.log("🚀 PlannerY v2 ishga tushdi.");