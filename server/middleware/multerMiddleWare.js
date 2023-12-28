import path from "path";

import multer from "multer";
// multer convert from binary data to the image(multipart/form-data)

const upload = multer({
  dest: "uploads/",
  limits: { fileSize: 200 * 1024 * 1024 }, // it is equivalent to 50 mb
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (_req, file, cb) => {
      cb(null, file.originalname);
    },
  }),
  fileFilter: (_req, file, cb) => {
    let ext = path.extname(file.originalname);

    if (
      ext !== ".jpg" &&
      ext !== ".jpeg" &&
      ext !== ".webp" &&
      ext !== ".mp4" &&
      ext !== ".png"
    ) {
      cb(new Error(`Unsupported file type ${ext}`), false);
      return;
    }
    cb(null, true);
  },
});

export default upload;
