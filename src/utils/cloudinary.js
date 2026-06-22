import { v2 } from "cloudinary";
import { Readable } from "node:stream";
import "dotenv/config.js";

v2.config({
  cloud_name: process.env.CL_NAME,
  api_key: process.env.CL_KEY,
  api_secret: process.env.CL_SECRET,
});

export const saveFile = buffer => {
  return new Promise((resolve, reject) => {
    const stream = v2.uploader.upload_stream(
      {
        resource_type: "image",
        folder: "hillel/contacts",
      },
      (error, uploadResult) => {
        if (error) {
          return reject(error);
        }
        return resolve(uploadResult);
      },
    );

    Readable.from(buffer).pipe(stream);
  });
};
