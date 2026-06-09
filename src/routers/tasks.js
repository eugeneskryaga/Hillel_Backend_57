import { Router } from "express";
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateTask,
} from "../controllers/tasks.js";

const router = Router();

router.get("/", getTasks);
router.get("/:taskId", getTaskById);
router.delete("/:taskId", removeTask);
router.post("/", addTask);
router.patch("/:taskId", updateTask);

export default router;
