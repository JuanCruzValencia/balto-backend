import { fileURLToPath } from "url";
import { dirname } from "path";
import dotenv from "dotenv";
import CustomError from "./errors/customError.js";
import { User } from "./interface/interfaces.js";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default __dirname;

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

export const authPolicies = (policieOne, policieTwo) => (req, res, next) => {
  const role = req.user._doc.role;

  if (typeof policieOne === "undefined") {
    policieOne = policieTwo;
    policieTwo = null;
  }

  if (role !== policieOne && role !== policieTwo) {
    return res.status(403).send({
      error: "Not Authorized from Policies",
    });
  }

  next();
};

export const validateNewUser = (newUser: User) => {
  const { first_name, last_name, age, email, password } = newUser;

  if (
    first_name.length <= 3 ||
    last_name.length <= 3 ||
    age <= 0 ||
    email.length <= 10 ||
    password.length <= 6
  ) {
    CustomError.createError({
      name: "VALIDATION ERROR",
      message: "One or more properties are undefined or incomplete",
    });
  }

  if (!email.includes("@")) {
    CustomError.createError({
      name: "VALIDATION ERROR",
      message: "Invalid email",
    });
  }

  return true;
};
