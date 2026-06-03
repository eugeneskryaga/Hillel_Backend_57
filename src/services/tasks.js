import { readTasks, writeTasks } from "../utils/tasks.js";

export const getAllTasks = async () => {
  const tasks = await readTasks();
  console.log(tasks);
};

export const getTaskById = async id => {
  const tasks = await readTasks();
  const task = tasks.find(task => task.id === Number(id));

  if (!task) {
    throw new Error("Task not found");
  }

  console.log(task);
};

export const addTask = async title => {
  if (!title) {
    throw new Error("Title is required");
  }

  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  tasks.push(newTask);

  await writeTasks(tasks);

  console.log(newTask);
};

export const updateTask = async ({ id, title, completed }) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const tasks = await readTasks();
  const taskIndex = tasks.findIndex(task => task.id === Number(id));

  if (taskIndex === -1) {
    throw new Error("Task not found");
  }

  if (title) {
    tasks[taskIndex].title = title;
  }

  if (completed !== undefined) {
    tasks[taskIndex].completed = completed === "true";
  }

  await writeTasks(tasks);
  console.log(tasks[taskIndex]);
};

export const removeTask = async id => {
  if (!id) {
    throw new Error("ID is required");
  }

  const tasks = await readTasks();
  const taskExists = tasks.some(task => task.id === Number(id));

  if (!taskExists) {
    throw new Error("Task not found");
  }

  const filteredTasks = tasks.filter(task => task.id !== Number(id));

  await writeTasks(filteredTasks);
  console.log(`Task with ID ${id} deleted`);
};
