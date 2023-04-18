import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (user) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return token;
};

export const authToken = (req, res, next) => {
  const signedJwt = req.headers["authorization"];

  jwt.verify(
    signedJwt.split(" ")[1],
    process.env.JWT_SECRET!,
    (error, credentials) => {
      if (error) {
        console.log(error);
        return res.status(403).send({
          error: "Not Authorized from JWT",
        });
      }

      req.user = credentials.user;

      next();
    }
  );
};
