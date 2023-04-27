import { Request, Response } from "express";
import { ERRORS_ENUM } from "../consts/ERRORS.ts";
import CustomError from "../errors/customError.ts";
import UserService from "./users.services.ts";
import dotenv from "dotenv";
dotenv.config();

class UserControllers {
  constructor() {}

  getCurrentUser = (req: Request, res: Response) => {
    try {
      const user = { ...req.user };

      if (!user) return res.status(404).send({ message: "User Not Found" });

      res.send(user);
    } catch (error) {
      req.logger.error(error);

      return res.status(404).send({ message: "SOMETHING WENT WRONG" });
    }
  };

  registerUser = (req: Request, res: Response) => {
    if (!req.user) return res.status(400);

    res.status(200).send({ paylaod: req.user });
  };

  changeUserRole = async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;

      await UserService.changeRole(uid);

      res.status(200).send({
        message: "User succesfully changed role",
      });
    } catch (error: any) {
      req.logger.error(error);

      return res.status(404).send({ message: "SOMETHING WENT WRONG" });
    }
  };

  //TODO endpoint no implementado en el front con next
  postRestore = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      await UserService.sendRestoreMail(email);

      res.status(200);
    } catch (error) {
      req.logger.error(error);

      return res.status(404).send({ message: "SOMETHING WENT WRONG" });
    }
  };

  //TODO endpoint no implementado en el front con next
  postRestoreForm = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { uid, token } = req.params;

      await UserService.restorePassword(uid, password, token);

      res.status(200);
    } catch (error) {
      req.logger.error(error);

      return res.status(404).send({ message: "SOMETHING WENT WRONG" });
    }
  };

  //TODO endpoint no implementado en el front con next
  uploadDocument = async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;

      if (!req.files)
        return res.status(404).send({ message: "SOMETHING WENT WRONG" });

      const filesValues = Object.values(req.files);

      filesValues.map(async (arrayOfFiles: Express.Multer.File[]) => {
        return arrayOfFiles.map(async (file: Express.Multer.File) => {
          const newDocument = {
            name: file.originalname,
            reference: file.path,
          };

          await UserService.updateUpload(uid, newDocument);

          return;
        });
      });

      res.status(200).send({
        message: `Document succesfully upload`,
      });
    } catch (error) {
      req.logger.error(error);

      return res.status(404).send({ message: "SOMETHING WENT WRONG" });
    }
  };
}

const UserController = new UserControllers();

export default UserController;
