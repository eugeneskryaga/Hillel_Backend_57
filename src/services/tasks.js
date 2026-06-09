import { Task } from "../db/models/Task.js";

export const getTasksService = () => Task.find();

export const getTaskByIdService = id => Task.findById(id);

export const addTaskService = task => Task.create(task);

export const deleteTaskService = id => Task.findByIdAndDelete(id);

export const updateTaskService = (id, task) =>
  Task.findByIdAndUpdate(id, task, {
    returnDocument: "after",
  });
