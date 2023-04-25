import multer from "multer";
import { SessionUser } from "../interface/interfaces";

const storage = multer.diskStorage({
  destination(req, file, callback) {
    const dir = `../public/${file.fieldname}`;

    switch (file.fieldname) {
      case "profile":
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
    const { _id } = req.user as SessionUser;

    callback(null, `${_id}`);
  },
});

export default multer
