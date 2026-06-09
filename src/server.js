import express from "express";
import tasksRouter from "./routers/tasks.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDb } from "./db/connectDb.js";
import "dotenv/config";

const PORT = process.env.PORT;

const server = express();
server.use(express.json());

server.use("/tasks", tasksRouter);

server.use(notFoundHandler);
server.use(errorHandler);

await connectDb();

server.listen(PORT, error => {
  if (error) {
    console.log("Error with server starting!");
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default server;
