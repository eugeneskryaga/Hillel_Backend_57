import { Router } from "express";
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateOrCreate,
  updateTask,
} from "../controllers/tasks.js";
import { celebrate } from "celebrate";
import {
  createTaskSchema,
  idSchema,
  updateTaskSchema,
} from "../validation/task.js";

const router = Router();

router.get("/", getTasks);
router.get("/:taskId", celebrate(idSchema), getTaskById);
router.delete("/:taskId", celebrate(idSchema), removeTask);
router.post("/", celebrate(createTaskSchema), addTask);
router.patch("/:taskId", celebrate(updateTaskSchema), updateTask);
router.put(
  "/:taskId",
  celebrate(idSchema),
  celebrate(createTaskSchema),
  updateOrCreate,
);

export default router;
