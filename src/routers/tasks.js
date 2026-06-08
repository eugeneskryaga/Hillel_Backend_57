import { Router } from "express";
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateTask,
} from "../controllers/tasks.js";

const router = Router();

router.get("/tasks", getTasks);
router.get("/tasks/:taskId", getTaskById);
router.delete("/tasks/:taskId", removeTask);
router.post("/tasks", addTask);
router.patch("/tasks/:taskId", updateTask);

export default router;
