import { Router } from "express";
import {
  addTask,
  getTaskById,
  getTasks,
  removeTask,
  updateOrCreate,
  updateTask,
} from "../controllers/tasks.js";

const router = Router();

router.get("/", getTasks);
router.get("/:taskId", getTaskById);
router.delete("/:taskId", removeTask);
router.post("/", addTask);
router.patch("/:taskId", updateTask);
router.put("/:id", updateOrCreate);

export default router;
