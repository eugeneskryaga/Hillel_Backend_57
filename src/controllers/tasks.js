import { readTasks, writeTasks } from "../utils/tasks.js";

export const getTasks = async (req, res) => {
  const tasks = await readTasks();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const tasks = await readTasks();

  const task = tasks.find(({ id }) => id === Number(taskId));

  if (!task) {
    res.status(404).json({ message: "Task not found!" });
    return;
  }

  res.json(task);
};

export const addTask = async (req, res) => {
  const { title } = req.body;

  if (!title) {
    res.status(400).json({ message: "Title is required!" });
    return;
  }

  const tasks = await readTasks();
  const newTask = {
    id: Date.now(),
    title,
    completed: false,
  };

  const newTasks = [...tasks, newTask];

  await writeTasks(newTasks);

  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;

  const tasks = await readTasks();

  const task = tasks.find(({ id }) => id === Number(taskId));

  if (!task) {
    res.status(404).json({ message: "Task not found!" });
    return;
  }

  const body = req.body;

  const newTask = {
    ...task,
    ...body,
  };

  const updatedTasks = tasks.map(task =>
    task.id === Number(taskId) ? newTask : task,
  );

  await writeTasks(updatedTasks);
  res.json(newTask);
};

export const removeTask = async (req, res) => {
  const { taskId } = req.params;

  const tasks = await readTasks();
  const filteredTasks = tasks.filter(task => task.id !== Number(taskId));

  if (tasks.length === filteredTasks.length) {
    res.status(404).json({ message: "Task not found!" });
    return;
  }

  await writeTasks(filteredTasks);
  res.sendStatus(204);
};
