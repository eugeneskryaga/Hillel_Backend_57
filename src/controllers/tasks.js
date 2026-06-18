import createHttpError from "http-errors";
import {
  addTaskService,
  deleteTaskService,
  getTaskByIdService,
  getTasksService,
  updateTaskService,
} from "../services/tasks.js";

export const getTasks = async (req, res) => {
  const {
    page,
    perPage,
    sortBy,
    sortOrder,
    priority,
    completed,
    minProgress,
    maxProgress,
    search,
  } = req.query;
  const authorId = req.user._id;
  const response = await getTasksService({
    page,
    perPage,
    sortBy,
    sortOrder,
    priority,
    completed,
    minProgress,
    maxProgress,
    search,
    authorId,
  });
  res.json(response);
};

export const getTaskById = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const task = await getTaskByIdService(taskId, authorId);

  if (!task) {
    throw createHttpError(404, "Task not found!");
  }

  res.json(task);
};

export const addTask = async (req, res) => {
  const body = req.body;
  const authorId = req.user._id;
  const newTask = await addTaskService({ ...body, authorId });

  res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
  const { taskId } = req.params;
  const body = req.body;
  const authorId = req.user._id;
  const result = await updateTaskService(taskId, authorId, body);

  if (!result) {
    throw createHttpError(404, "Task not found!");
  }

  res.json(result.data);
};

export const removeTask = async (req, res) => {
  const { taskId } = req.params;
  const authorId = req.user._id;
  const removedTask = await deleteTaskService(taskId, authorId);

  if (!removedTask) {
    throw createHttpError(404, "Task not found!");
  }

  res.sendStatus(204);
};

export const updateOrCreate = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const authorId = req.user._id;
  const { data, isUpdated } = await updateTaskService(id, authorId, body, {
    upsert: true,
  });

  res.status(isUpdated ? 200 : 201).json(data);
};
