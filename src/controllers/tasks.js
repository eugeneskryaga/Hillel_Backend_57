import createHttpError from "http-errors";
import {
  addTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  updateTaskService,
} from "../services/tasks.js";

export const getTasks = async (req, res) => {
  const tasks = await getTasksService();
  res.json(tasks);
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const task = await getTaskByIdService(taskId);

  if (!task) {
    throw createHttpError(404, "Task not found!");
  }

  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;

  const newTask = await addTaskService(body);

  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;

  const updatedTask = await updateTaskService(taskId, body);

  if (!updatedTask) {
    throw createHttpError(404, "Task not found!");
  }

  res.json(updatedTask);
};

export const removeTask = async (req, res) => {
  const { taskId } = req.params;

  const removedTask = await deleteTaskService(taskId);

  if (!removedTask) {
    throw createHttpError(404, "Task not found!");
  }

  res.sendStatus(204);
};
