const inputBox = document.getElementById("input-text");
const listTask = document.getElementById("list-tasks");

function addTask() {
    if (inputBox.value === '') {
        alert("Please enter a task");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listTask.appendChild(li);
        let button = document.createElement("button");
        button.innerHTML = `
        <button onclick="deleteTask()" id="delete-task-btn" class="btn">Delete</button>
        `;
        li.appendChild(button);
    }
    inputBox.value = "";
}

listTask.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
    }
}, false);

function deleteTask(){
    listTask.addEventListener("click", function (e) {
        if (e.target.tagName === "LI") {
            e.target.parentElement.remove();        }
    }, true);
}

