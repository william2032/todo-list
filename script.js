//DOM elements

const todoForm = document.querySelector("#todo-form");
const todoList = document.querySelector(".todos");
const totalTasks = document.querySelector("#total-tasks");
const completedTask = document.querySelector("#completed-tasks");
const remainingTask = document.querySelector("#remaining-tasks");
const mainInput = document.querySelector("#todo-form  input");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

if (localStorage.getItem('tasks')) {
    tasks.map((task) => {
        createTask(task);
    })
}

todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const inputValue = mainInput.value;
    if (inputValue === '') return;
    const task = {
        id: new Date().getTime(),
        name: inputValue,
        iscompleted: false
    }
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    createTask(task);
    todoForm.reset();
    mainInput.focus();
    countTasks();
})


todoList.addEventListener('click', (e) => {
    const target = e.target;
    const listItem = target.closest('li');
    if (!listItem) return;
    const taskId = parseInt(listItem.dataset.id);

    if (target.closest('.remove-task')) {
        removeTask(taskId, listItem);
        return;
    }

    const span = listItem.querySelector("span");
    if (target === span) {
        return;
    }
    updateTask(taskId, listItem);
});



todoList.addEventListener('input', (e) => {
    const target = e.target;
    if (target.tagName === "SPAN") {
        const taskId = parseInt(target.closest("li").dataset.id);
        updateTask(taskId, target);
    }
})
todoList.addEventListener('keydown' ,(e) =>{
    if (e.keyCode === 13) {
        e.preventDefault();
        e.target.blur();
    }
})


function createTask(task) {
    const taskEL = document.createElement("li");
    taskEL.setAttribute("data-id", task.id);

    if (task.iscompleted) {
        taskEL.classList.add("checked");
    }

    const taskElMarkup = `
              <div>
                    <span  ${!task.iscompleted ? 'contenteditable' : ''}>${task.name}</span>
                </div>
                <button data-id="${task.id}" class=" remove-task" title="Remove  ${task.name}  task">
                    <?xml version="1.0" ?>
                    <svg width="15px" height="80px" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <style>
                                .cls-1 {
                                    fill: #150606;
                                    fill-rule: evenodd;
                                }
                            </style>
                        </defs>
                        <path class="cls-1"
                              d="M940,510a30,30,0,1,1,30-30A30,30,0,0,1,940,510Zm15-20.047A3.408,3.408,0,0,1,955,494.77l-0.221.22a3.42,3.42,0,0,1-4.833,0l-8.764-8.755a1.71,1.71,0,0,0-2.417,0l-8.741,8.747a3.419,3.419,0,0,1-4.836,0l-0.194-.193a3.408,3.408,0,0,1,.017-4.842l8.834-8.735a1.7,1.7,0,0,0,0-2.43l-8.831-8.725a3.409,3.409,0,0,1-.018-4.844l0.193-.193a3.413,3.413,0,0,1,2.418-1c0.944,0,3.255,1.835,3.872,2.455l7.286,7.287a1.708,1.708,0,0,0,2.417,0l8.764-8.748a3.419,3.419,0,0,1,4.832,0L955,465.243a3.408,3.408,0,0,1,0,4.818l-8.727,8.737a1.7,1.7,0,0,0,0,2.407Z"
                              id="uncheck" transform="translate(-910 -450)"/>
                    </svg>
                </button>
  `;
    taskEL.innerHTML = taskElMarkup;
    todoList.appendChild(taskEL);
    countTasks()
}

function countTasks() {
    const compeletedTasksList = tasks.filter((task) => task.iscompleted === true);

    totalTasks.textContent = tasks.length;
    completedTask.textContent = compeletedTasksList.length;
    remainingTask.textContent = tasks.length - compeletedTasksList.length;
}


function removeTask(taskId, taskElement) {
    // remove the task from the array
    tasks = tasks.filter((task) => task.id !== taskId);

    localStorage.setItem("tasks", JSON.stringify(tasks));//update the localstorage
    taskElement.remove();
    countTasks();
}

function updateTask(taskId, el) {
    const task = tasks.find((task) => task.id === taskId);
    if (!task) return;

    const listItem = el.closest('li');
    const span = listItem.querySelector('span');

    if (el === span && span.hasAttribute('contenteditable')) {
        task.name = span.textContent;
    } else {
        task.iscompleted = !task.iscompleted;

        if (task.iscompleted) {
            span.removeAttribute('contenteditable');
            listItem.classList.add('checked');
        } else {
            span.setAttribute('contenteditable', 'true');
            listItem.classList.remove('checked');
        }
    }


    localStorage.setItem("tasks", JSON.stringify(tasks));
    countTasks();
}
