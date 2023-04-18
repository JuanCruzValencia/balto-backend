import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";
import { SessionUser } from "../interface/interfaces";
dotenv.config();

export const generateToken = (user: SessionUser) => {
  const token = jwt.sign({ user }, process.env.JWT_SECRET!, {
    expiresIn: "24h",
  });

  return token;
};

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  const signedJwt = req.headers["authorization"];

  if (!signedJwt) return;

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

      req.user = credentials?.user;

      next();
    }
  );
};
