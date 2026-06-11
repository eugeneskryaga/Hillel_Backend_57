import { Task } from "../db/models/Task.js";

export const getTasksService = () => Task.find();

export const getTaskByIdService = id => Task.findById(id);

export const addTaskService = task => Task.create(task);

export const deleteTaskService = id => Task.findByIdAndDelete(id);

export const updateTaskService = async (id, task, options) => {
  const result = await Task.findByIdAndUpdate(id, task, {
    returnDocument: "after",
    includeResultMetadata: true,
    ...options,
  });

  if (!result.value) {
    return null;
  }

  return {
    data: result.value,
    isUpdated: result.lastErrorObject.updatedExisting,
  };
};
