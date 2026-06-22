import { User } from "../db/models/User.js";

export const updatePhoto = (id, urlData) =>
  User.findByIdAndUpdate(id, urlData, { returnDocument: "after" });
