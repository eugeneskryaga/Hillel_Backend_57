import { Router } from "express";
import { updateUserPhoto } from "../controllers/user.js";
import { parseFile } from "../middlewares/fileHandler.js";
import { celebrate } from "celebrate";
import { idSchema } from "../validation/general.js";
import { checkToken } from "../middlewares/checkToken.js";

const router = Router();

router.use(checkToken);

router.patch("/avatar", parseFile.single("photo"), updateUserPhoto);

export default router;
