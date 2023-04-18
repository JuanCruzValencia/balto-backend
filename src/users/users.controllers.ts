import { ERRORS_ENUM } from "../consts/ERRORS.js";
import CustomError from "../errors/customError.js";
import { validateNewUser } from "../utils.js";
import UserService from "./users.services.js";
import dotenv from "dotenv";
dotenv.config();

class UserControllers {
  constructor() {}

  getCurrentUser = (req, res) => {
    try {
      const user = { ...req.user };

      if (!user) return res.status(404).send({ message: "User Not Found" });

      res.send(user);
    } catch (error) {
      req.logger.error(error);
    }
  };

  changeUserRole = async (req, res) => {
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
    } catch (error) {
      req.logger.error(error);

      res.render("error", {
        error: error.message,
      });
    }
  };

  postRestore = async (req, res) => {
    try {
      const { email } = req.body;

      const result = await UserService.sendRestoreMail(email);

      if (!result) {
        return res.render("error", { error: "Email Not Found" });
      }

      res.status(200).redirect("login");
    } catch (error) {
      req.logger.error(error);

      res.render("error", {
        error: error.message,
      });
    }
  };

  postRestoreForm = async (req, res) => {
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

      res.render("error", {
        error: error.message,
      });
    }
  };
}

const UserController = new UserControllers();

export default UserController;
