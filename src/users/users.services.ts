import { ERRORS_ENUM } from "../consts/ERRORS.ts";
import CustomError from "../errors/customError.ts";
import tokenModel from "../models/token.model.ts";
import userModel from "../models/users.model.ts";
import sendMail from "../utils/nodemailer.ts";
import { generateCode } from "../utils.ts";
import UserDto from "./dto/user.dto.ts";
import { User } from "../interface/interfaces.ts";
import { Request, Response } from "express";

class UserServices {
  finAll = async () => {
    try {
      const users = await userModel.find().lean().exec();

      const mapedUser = users.map((user) => new UserDto(user));

      return mapedUser;
    } catch (error) {
      console.log(error);
    }
  };

  findUser = async (email: User["email"]) => {
    try {
      const user = await userModel.findOne({ email }).lean().exec();

      if (!user) {
        CustomError.createError({
          name: ERRORS_ENUM["USER NOT FOUND"],
          message: ERRORS_ENUM["USER NOT FOUND"],
        });

        return;
      }

      const userDto = new UserDto(user);

      return userDto;
    } catch (error) {
      console.log(error);
    }
  };

  registerUser = (req: Request, res: Response) => {
    //TODO register must redirect fron the front
    if (!req.user) return res.status(400);

    res.status(200).send({ paylaod: req.user });
  };

  // loginUser = async (username: string, password: string, done: VerifyFunction) => {
  //   try {
  //     const user = await userModel.findOne({ email: username }).lean().exec();

  //     if (!user) {
  //       console.log("User Not Found");

  //       return done(null, user);
  //     }

  //     const verifyPassword = await userModel.comparePassword(
  //       password,
  //       user.password
  //     );

  //     if (!verifyPassword) {
  //       console.log("Incorrect Password");

  //       return done(null, false);
  //     }

  //     const dtoUser = new UserDto(user);

  //     const token = generateToken(dtoUser);

  //     dtoUser.accessToken = token;

  //     return done(null, dtoUser);
  //   } catch (error) {
  //     console.log(error);

  //     return done(error);
  //   }
  // };

  changeRole = async (uid: User["_id"]) => {
    try {
      const user = await this.findUserById(uid);

      if (!user) {
        CustomError.createError({
          name: ERRORS_ENUM["USER NOT FOUND"],
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      const result = await userModel.updateOne(
        { _id: uid },
        { role: user?.role === "USER" ? "PREMIUM" : "USER" }
      );

      if (!result) return false;

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  sendRestoreMail = async (email: string) => {
    try {
      const user = await this.findUser(email);

      if (!user) {
        CustomError.createError({
          name: "ERROR",
          message: "User with given email doesn't exist",
        });

        return;
      }

      let token = await tokenModel.findOne({ userId: user?._id });

      if (!token) {
        token = await new tokenModel({
          userId: user._id,
          token: generateCode(),
        }).save();
      }

      const link = `${process.env.BASE_URL}/restoreForm/${user?._id}/${token.token}`;

      await sendMail.send(user.email, "Password reset", link);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  restorePassword = async (
    uid: User["_id"],
    password: string,
    token: string
  ) => {
    try {
      const user = await this.findUserById(uid);

      if (!user) {
        CustomError.createError({
          name: ERRORS_ENUM["USER NOT FOUND"],
          message: ERRORS_ENUM["USER NOT FOUND"],
        });

        return;
      }

      const userToken = await this.findUserToken(uid, token);

      if (!userToken) {
        CustomError.createError({
          name: "ERROR",
          message: "Invalid or expired token",
        });

        return;
      }

      const verifyPassword = await userModel.comparePassword(
        password,
        user.password
      );

      if (verifyPassword) {
        CustomError.createError({
          name: "ERROR",
          message: "Can not use the last password, must be a new one",
        });

        return;
      }

      const result = await userModel.updateOne(
        { _id: uid },
        { password: await userModel.encryptPassword(password) }
      );

      if (!result) {
        return false;
      }

      await this.deleteToken(uid);

      return true;
    } catch (error) {
      console.log(error);
    }
  };

  findUserById = async (uid: User["_id"]) => {
    try {
      const user = await userModel.findById({ _id: uid }).lean().exec();

      if (!user) {
        CustomError.createError({
          name: ERRORS_ENUM["USER NOT FOUND"],
          message: ERRORS_ENUM["USER NOT FOUND"],
        });
      }

      return user;
    } catch (error) {
      console.log(error);
    }
  };

  findUserToken = async (uid: User["_id"], token: string) => {
    try {
      const userToken = await tokenModel.findOne({ userId: uid });

      return userToken;
    } catch (error) {
      console.log(error);
    }
  };

  deleteToken = async (uid: User["_id"]) => {
    try {
      const userToken = await tokenModel.deleteOne({ userId: uid });

      return userToken;
    } catch (error) {
      console.log(error);
    }
  };
}

const UserService = new UserServices();

export default UserService;
