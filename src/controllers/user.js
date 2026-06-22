import createHttpError from "http-errors";
import { saveFile } from "../utils/cloudinary.js";
import { updatePhoto } from "../services/user.js";

export const updateUserPhoto = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "No file");
  }
  const { secure_url } = await saveFile(req.file.buffer);

  const { id } = req.params;

  const user = await updatePhoto(id, { photo: secure_url });

  if (!user) {
    throw createHttpError(404, "Contact not found!");
  }

  res.json(user);
};
