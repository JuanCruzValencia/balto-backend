import multer from "multer";
import { SessionUser } from "../interface/interfaces";
import path from "path";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = `./src/public/${file.fieldname}`;

    switch (file.fieldname) {
      case "profiles":
        callback(null, dir);
        break;
      case "products":
        callback(null, dir);
        break;
      case "documents":
        callback(null, dir);
        break;
      default:
        break;
    }
  },
  filename(req, file, callback) {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage });

export default upload;
