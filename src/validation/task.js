import { Joi, Segments } from "celebrate";
import { isValidObjectId } from "mongoose";

const validateId = (id, utils) =>
  isValidObjectId(id) ? id : utils.message("Invalid id!");

export const idSchema = {
  [Segments.PARAMS]: Joi.object({
    taskId: Joi.string().custom(validateId).required(),
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
