import fs from "node:fs/promises";
import path from "node:path";

export const sendJSON = (res, status, data) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(data));
};

export const getRequestBody = req =>
  new Promise((resolve, reject) => {
    let body = "";
    req.on("data", chunk => {
      body += chunk;
    });
    req.on("end", () => {
      if (!body) return resolve({});
      try {
        resolve(JSON.parse(body));
      } catch (err) {
        reject(new Error("Invalid JSON in request body"));
      }
    });
    req.on("error", err => reject(err));
  });

const DB_PATH = path.resolve("src", "db", "tasks.json");

export const readTasks = async () => {
  try {
    const tasks = await fs.readFile(DB_PATH, "utf-8");
    return JSON.parse(tasks);
  } catch (error) {
    throw new Error(`Failed to read tasks: ${error.message}`);
  }
};

export const writeTasks = async tasks => {
  try {
    await fs.writeFile(DB_PATH, JSON.stringify(tasks, null, 2), "utf-8");
  } catch (error) {
    throw new Error(`Failed to write tasks: ${error.message}`);
  }
};
