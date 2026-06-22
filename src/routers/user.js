import { Router } from "express";
import { updateUserPhoto } from "../controllers/user.js";
import { parseFile } from "../middlewares/fileHandler.js";
import { celebrate } from "celebrate";
import { idSchema } from "../validation/general.js";

const router = Router();

router.patch(
  "/:id",
  celebrate(idSchema),
  parseFile.single("photo"),
  updateUserPhoto,
);

export default router;
