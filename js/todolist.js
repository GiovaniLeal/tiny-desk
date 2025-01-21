/* == TO DO LIST Function == */

const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");
const addTask = document.getElementById("addTask");

// Evento de clique no botão "Adicionar Tarefa"
addTask.addEventListener('click', () => {
    const taskValue = taskInput.value.trim();
    if (taskValue !== "") {
        addNewTask(taskValue);
        saveTask();
    }
    taskInput.value = ""; // Limpar campo de entrada
});

// Função para adicionar uma nova tarefa
function addNewTask(taskValue, isCompleted = false) {
    const li = document.createElement('li');
    li.innerHTML = `
        <div class="taskLeft">
            <button class="conclusionTask">✔️</button>
            <span class="taskValue">${taskValue}</span>
        </div>
        <div class="taskRight">
            <button class="editTask">✏️</button>
            <button class="deleteTask">🗑️</button>
        </div>
        
    `;

    //Em caso de tarefa concluída
    if(isCompleted){
        li.querySelector(".taskValue").classList.add("task-completed");
        li.querySelector(".conclusionTask").remove();
        li.querySelector(".editTask").remove();
        
    } else {
        //caso a tarefa não esteja concluida
        addTaskEvents(li);
    }

     // Evento de exclusão de tarefa
     const deleteTask = li.querySelector('.deleteTask');
     deleteTask.addEventListener('click', () => {
        li.remove();
        saveTask();
    });

    taskList.appendChild(li);
}

// Função para adicionar evento aos botões de concluir e editar tarefa
function addTaskEvents(li) {
    const conclusionTask = li.querySelector('.conclusionTask');
    const editTask = li.querySelector('.editTask');
    const taskText = li.querySelector('.taskValue');

    // Evento de conclusão de tarefa
    conclusionTask.addEventListener('click', () => {
        taskText.classList.toggle("task-completed");
        editTask.remove();
        conclusionTask.remove();
        saveTask();
    });

    // Evento de edição de tarefa
    editTask.addEventListener('click', () => {
        const newTextTask = prompt("Editar tarefa", taskText.textContent);
        if (newTextTask !== null && newTextTask.trim() !== "") {
            taskText.textContent = newTextTask.trim();
            saveTask();
        }
    });

}


//Função para armazenar tarefas no localStorage
function saveTask(){
    const tasks = []
    taskList.querySelectorAll("li").forEach(li =>{
        const taskValue = li.querySelector(".taskValue").textContent;
        const taskCompleted = li.querySelector(".taskValue").classList.contains("task-completed");
        tasks.push({value: taskValue, completed: taskCompleted});
    })
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

//Função para recuperar tarefas salvas no localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addNewTask(task.value, task.completed));
}

document.addEventListener("DOMContentLoaded", loadTasks);