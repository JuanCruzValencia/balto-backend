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
    // const { _id } = req.user as SessionUser;

    callback(null, `${file.filename}` + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
