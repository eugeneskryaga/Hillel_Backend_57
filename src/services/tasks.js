import { Task } from "../db/models/Task.js";

export const getTasksService = async ({
  page = 1,
  perPage = 3,
  sortBy = "title",
  sortOrder = "asc",
}) => {
  const skip = (page - 1) * perPage;
  const tasksQuery = Task.find();

  const [totalCount, tasks] = await Promise.all([
    tasksQuery.clone().countDocuments(),
    tasksQuery
      .skip(skip)
      .limit(perPage)
      .sort({ [sortBy]: sortOrder }),
  ]);

  const totalPages = Math.ceil(totalCount / perPage);

  return { tasks, totalCount, totalPages };
};

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
