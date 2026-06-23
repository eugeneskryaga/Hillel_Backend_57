import createHttpError from "http-errors";
import { saveFile } from "../utils/cloudinary.js";
import { updatePhoto } from "../services/user.js";
import { findSessionById } from "../services/auth.js";

export const updateUserPhoto = async (req, res) => {
  if (!req.file) {
    throw createHttpError(400, "No file");
  }
  const { secure_url } = await saveFile(req.file.buffer);

  const { _id } = req.user;

  const user = await updatePhoto(_id, { photo: secure_url });

  if (!user) {
    throw createHttpError(404, "Contact not found!");
  }

  res.json(user);
};
