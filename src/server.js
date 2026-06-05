import http from "node:http";

import { getRequestBody, sendJSON } from "./utils/tasks.js";
import {
  addTask,
  getAllTasks,
  getTaskById,
  removeTask,
  updateTask,
} from "./controllers/tasks.js";

const PORT = 8000;

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    const method = req.method;

    if (method === "GET" && pathname === "/tasks") {
      const tasks = await getAllTasks();
      sendJSON(res, 200, tasks);
    } else if (method === "GET" && /^\/tasks\/\d+$/.test(pathname)) {
      const id = pathname.split("/")[2];
      const task = await getTaskById(id);
      sendJSON(res, 200, task);
    } else if (method === "POST" && pathname === "/tasks") {
      const body = await getRequestBody(req);
      const newTask = await addTask(body.title);
      sendJSON(res, 201, newTask);
    } else if (method === "PATCH" && /^\/tasks\/\d+$/.test(pathname)) {
      const id = pathname.split("/")[2];
      const body = await getRequestBody(req);
      const updated = await updateTask({ id, ...body });
      sendJSON(res, 200, updated);
    } else if (method === "DELETE" && /^\/tasks\/\d+$/.test(pathname)) {
      const id = pathname.split("/")[2];
      const result = await removeTask(id);
      sendJSON(res, 200, result);
    } else {
      sendJSON(res, 404, { error: "Not found" });
    }
  } catch (err) {
    const status = err.code && Number(err.code) ? Number(err.code) : 500;
    sendJSON(res, status, { error: err.message });
  }
});

server.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
