const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

document.addEventListener('DOMContentLoaded', loadTasks);
addTaskBtn.addEventListener('click', addTask);

function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.forEach(task => displayTask(task));
}

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  const task = { id: Date.now(), text: taskText };
  displayTask(task);
  saveTask(task);

  taskInput.value = '';
}

function displayTask(task) {
  const li = document.createElement('li');
  li.classList.add('task-item');
  li.innerHTML = `
    <span>${task.text}</span>
    <div>
      <button class="edit-btn" onclick="editTask(${task.id})">Editar</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Deletar</button>
    </div>
  `;
  li.dataset.id = task.id;
  taskList.appendChild(li);
}

function saveTask(task) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function editTask(id) {
  const tasks = JSON.parse(localStorage.getItem('tasks'));
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex !== -1) {
    const taskItem = document.querySelector(`[data-id="${id}"]`);
    const newText = prompt("Edit your task:", tasks[taskIndex].text);
    
    if (newText && newText.trim() !== '') {
      tasks[taskIndex].text = newText;
      taskItem.querySelector('span').textContent = newText;
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
}

function deleteTask(id) {
  document.querySelector(`[data-id="${id}"]`).remove();
  deleteTaskFromStorage(id);
}

function deleteTaskFromStorage(id) {
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks = tasks.filter(task => task.id !== id);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}