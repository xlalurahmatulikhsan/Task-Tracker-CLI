const fs = require('fs');
const path = './tasks.json';

function initializeTasks() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
}

function addTask(description) {
  const tasks = JSON.parse(fs.readFileSync(path));
  const now = new Date().toISOString();

  const newTask = {
    id: tasks.length + 1,
    description,
    status: 'not started',
    createdAt: now,
    updatedAt: now
  };

  tasks.push(newTask);
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
  console.log('Task added:', description);
}

function updateTask(id, description) {
  const tasks = JSON.parse(fs.readFileSync(path));
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    task.description = description;
    task.updatedAt = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
    console.log('Task updated:', task);
  } else {
    console.log('Task not found');
  }
}

function updateTaskStatus(id, status) {
  const tasks = JSON.parse(fs.readFileSync(path));
  const task = tasks.find(t => t.id === id);
  
  if (task) {
    task.status = status;
    task.updatedAt = new Date().toISOString();
    fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
    console.log('Task status updated to:', status);
  } else {
    console.log('Task not found');
  }
}

function deleteTask(id) {
  let tasks = JSON.parse(fs.readFileSync(path));
  tasks = tasks.filter(t => t.id !== id);
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
  console.log('Task deleted:', id);
}

function listTasks() {
  const tasks = JSON.parse(fs.readFileSync(path));
  tasks.forEach(task => {
    console.log(`${task.id}. ${task.description} [${task.status}] (Created at: ${task.createdAt}, Updated at: ${task.updatedAt})`);
  });
}

function listTasksByStatus(status) {
  const tasks = JSON.parse(fs.readFileSync(path));
  tasks.filter(task => task.status === status).forEach(task => {
    console.log(`${task.id}. ${task.description} [${task.status}] (Created at: ${task.createdAt}, Updated at: ${task.updatedAt})`);
  });
}

initializeTasks();

const command = process.argv[2];
const args = process.argv.slice(3);

switch (command) {
  case 'add':
    addTask(args.join(' '));
    break;
  case 'update':
    updateTask(Number(args[0]), args.slice(1).join(' '));
    break;
  case 'status':
    updateTaskStatus(Number(args[0]), args[1]);
    break;
  case 'delete':
    deleteTask(Number(args[0]));
    break;
  case 'list':
    listTasks();
    break;
  case 'list-by-status':
    listTasksByStatus(args[0]);
    break;
  default:
    console.log('Unknown command');
}
