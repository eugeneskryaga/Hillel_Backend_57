import express from "express";
import tasksRouter from "./routers/tasks.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const PORT = 8000;

const server = express();

server.use(express.json());

server.use(tasksRouter);

server.use(notFoundHandler);
server.use(errorHandler);

server.listen(PORT, error => {
  if (error) {
    console.log("Error with server starting!");
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default server;
