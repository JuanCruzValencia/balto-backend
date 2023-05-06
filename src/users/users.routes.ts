import express from "express";
import passport from "passport";
import UserController from "./users.controllers.ts";
import upload from "../utils/multer.ts";
import { authToken } from "../middlewares/authToken.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { ROLES } from "../interface/interfaces.ts";

const Router = express.Router();

Router.post(
  "/register",
  passport.authenticate("register", {
    failureMessage: "Cannot register new user",
  }),
  UserController.registerOne
);

Router.get(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  UserController.getAll
);

Router.get("/current", authToken, UserController.getCurrent);

Router.get(
  "/premium/:uid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  UserController.changeRole
);

Router.post("/restore", UserController.sendRestoreMail);

Router.post("/restoreForm/:uid/:token", UserController.restorePassword);

Router.post(
  "/:uid/documents",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),

  upload.fields([
    { name: "documents", maxCount: 3 },
    { name: "profiles", maxCount: 1 },
    { name: "products", maxCount: 10 },
  ]),
  UserController.uploadDocument
);

Router.delete(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  UserController.deleteAllUsers
);

Router.delete(
  "/:pid",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  UserController.deleteUser
);

export default Router;
