import { UserSession } from "../interface/interfaces.ts";
import { Request, Response, NextFunction } from "express";

export const authPolicies =
  (policieOne: string | null, policieTwo: string | null) =>
  (req: Request, res: Response, next: NextFunction) => {
    const data = req.user as UserSession;
    const { role } = data.user._doc; //TODO should be a better way of deconstruc the req.user

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
