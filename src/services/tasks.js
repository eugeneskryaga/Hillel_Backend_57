import fs from "node:fs/promises";
import path from "node:path";

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
