import dotenv from "dotenv";
import CustomError from "./errors/customError.ts";
import { User } from "./interface/interfaces.ts";
dotenv.config();

export const generateCode = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  let result = " ";
  const charactersLength = characters.length;
  for (let i = 0; i < 12; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export const validateNewUser = (newUser: Partial<User>) => {
  const { first_name, last_name, age, email, password } = newUser;

  if (!first_name || !last_name || !age || !email || !password) {
    CustomError.createError({
      name: "VALIDATION ERROR",
      message: "One or more properties are undefined",
    });

    return false;
  }

  if (
    first_name.length <= 3 ||
    last_name.length <= 3 ||
    age <= 0 ||
    email.length <= 10 ||
    password.length <= 6
  ) {
    CustomError.createError({
      name: "VALIDATION ERROR",
      message: "One or more properties are incomplete",
    });

    return false;
  }

  if (!email.includes("@")) {
    CustomError.createError({
      name: "VALIDATION ERROR",
      message: "Invalid email",
    });

    return false;
  }

  return true;
};
