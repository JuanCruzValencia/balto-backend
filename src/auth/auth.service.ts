import jwt from "jsonwebtoken";
import userModel from "../models/users.model.js";
import dotenv from "dotenv";
import CustomError from "../errors/customError.js";
import { ERRORS_ENUM } from "../consts/ERRORS.js";
dotenv.config();

class AuthServices {
  constructor() {}

  async validateUser(username, password) {
    const user = await userModel.findOne({ email: username });

    if (!user) {
      CustomError.createError({
        name: ERRORS_ENUM["USER NOT FOUND"],
        message: "User not found in DB",
      });
    }

    if (user && (await userModel.comparePassword(password, user.password))) {
      return user;
    }

    return null;
  }

  async login(payload) {
    const user = { ...payload };

    const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
      expiresIn: 1200,
    });

    user.accessToken = token;

    return user;
  }
}

const AuthService = new AuthServices();

export default AuthService;
