const fs = require('fs'); // Import the 'fs' module for file system operations.
const path = './tasks.json'; // Define the path to the JSON file that will store tasks.

// Function to initialize the tasks file if it does not exist.
function initializeTasks() {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, JSON.stringify([]));
  }
}

// Function to add a new task.
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

// Function to update the description of a task by its ID.
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

// Function to update the status of a task by its ID.
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

// Function to delete a task by its ID.
function deleteTask(id) {
  let tasks = JSON.parse(fs.readFileSync(path));
  tasks = tasks.filter(t => t.id !== id);
  fs.writeFileSync(path, JSON.stringify(tasks, null, 2));
  console.log('Task deleted:', id);
}

// Function to list all tasks.
function listTasks() {
  const tasks = JSON.parse(fs.readFileSync(path));
  tasks.forEach(task => {
    console.log(`${task.id}. ${task.description} [${task.status}] (Created at: ${task.createdAt}, Updated at: ${task.updatedAt})`); 
  });
}

// Function to list tasks by a specific status.
function listTasksByStatus(status) {
  const tasks = JSON.parse(fs.readFileSync(path));
  tasks.filter(task => task.status === status).forEach(task => {
    console.log(`${task.id}. ${task.description} [${task.status}] (Created at: ${task.createdAt}, Updated at: ${task.updatedAt})`); 
  });
}

// Initialize the tasks file if it doesn't exist.
initializeTasks();

const command = process.argv[2]; // Command (e.g., 'add', 'update', 'delete', etc.)
const args = process.argv.slice(3); // Arguments accompanying the command.

// Switch case to determine which function to execute based on the provided command.
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
