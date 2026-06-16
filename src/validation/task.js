import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message("Invalid id!");

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(validateId).required(),
  }),
};

export const getTasksSchema = {
  [Segments.QUERY]: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    perPage: Joi.number().integer().min(3).max(25).default(3),
    sortBy: Joi.string()
      .valid("title", "completed", "priority", "progress")
      .default("title"),
    sortOrder: Joi.string().valid("asc", "desc").default("asc"),
    priority: Joi.string().valid("low", "medium", "high"),
  }),
};

export const createTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50).required(),
    completed: Joi.boolean(),
    priority: Joi.string().valid("low", "medium", "high").required(),
    progress: Joi.number().min(0).max(100),
  }),
};

export const updateTaskSchema = {
  [Segments.BODY]: Joi.object({
    title: Joi.string().min(2).max(50),
    completed: Joi.boolean(),
    priority: Joi.string().valid("low", "medium", "high"),
    progress: Joi.number().min(0).max(100),
  }),
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(validateId).required(),
  }),
};
