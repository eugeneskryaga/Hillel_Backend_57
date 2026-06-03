import yargs from "yargs";
import { hideBin } from "yargs/helpers";

import {
  addTask,
  getAllTasks,
  getTaskById,
  removeTask,
  updateTask,
} from "./src/services/tasks.js";

const argv = yargs(hideBin(process.argv))
  .command("list", "Get all tasks")
  .command("get", "Get task by ID")
  .command("add", "Add task")
  .command("update", "Update task")
  .command("remove", "Delete task")
  .help()
  .parse();

const run = async () => {
  try {
    const type = argv._[0];

    switch (type) {
      case "list":
        await getAllTasks();
        break;

      case "get":
        await getTaskById(argv.id);
        break;

      case "add":
        await addTask(argv.title);
        break;

      case "update":
        await updateTask({
          id: argv.id,
          title: argv.title,
          completed: argv.completed,
        });
        break;

      case "remove":
        await removeTask(argv.id);
        break;

      default:
        console.log("Unknown command");
    }
  } catch (error) {
    console.error(error.message);
  }
};

run();
