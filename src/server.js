import express from "express";
import authRouter from "./routers/auth.js";
import tasksRouter from "./routers/tasks.js";
import userRouter from "./routers/user.js";
import cookieParser from "cookie-parser";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { connectDb } from "./db/connectDb.js";
import { errors } from "celebrate";
import "dotenv/config";

const PORT = process.env.PORT;

const server = express();
server.use(express.json());
server.use(cookieParser());

server.use("/auth", authRouter);
server.use("/tasks", tasksRouter);
server.use("/users", userRouter);

server.use(notFoundHandler);

server.use(errors());
server.use(errorHandler);

await connectDb();

server.listen(PORT, error => {
  if (error) {
    console.log("Error with server starting!");
  }
  console.log(`Server listening on http://localhost:${PORT}`);
});

export default server;
