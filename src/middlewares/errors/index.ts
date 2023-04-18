import { ERRORS_ENUM } from "../../consts/index.ts";
import { Request, Response, NextFunction } from "express";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.log(`El error es: ${error}`);

  const errorMessage = ERRORS_ENUM[error.name] || "Unhandled error";

  res.send({
    status: "Error",
    error: errorMessage,
  });
};
