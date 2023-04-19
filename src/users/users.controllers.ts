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
    }
  };

  changeUserRole = async (req: Request, res: Response) => {
    try {
      const { uid } = req.params;

      const result = await UserService.changeRole(uid);

      if (!result) {
        CustomError.createError({
          message: "Something went wrong",
        });
      }

      res.status(200).send({
        message: "User succesfully changed role",
      });
    } catch (error: any) {
      req.logger.error(error);
    }
  };

  postRestore = async (req: Request, res: Response) => {
    try {
      const { email } = req.body;

      const result = await UserService.sendRestoreMail(email);

      if (!result) {
        return res.render("error", { error: "Email Not Found" });
      }

      res.status(200).redirect("login");
    } catch (error) {
      req.logger.error(error);
    }
  };

  postRestoreForm = async (req: Request, res: Response) => {
    try {
      const { password } = req.body;
      const { uid, token } = req.params;

      const result = await UserService.restorePassword(uid, password, token);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      res.status(200).redirect("login");
    } catch (error) {
      req.logger.error(error);
    }
  };
}

const UserController = new UserControllers();

export default UserController;
