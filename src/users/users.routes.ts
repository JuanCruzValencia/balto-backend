import express from "express";
import passport from "passport";
import UserController from "./users.controllers.ts";
import upload from "../utils/multer.ts";
import { authToken } from "../middlewares/authToken.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";

const Router = express.Router();

Router.post(
  "/register",
  passport.authenticate("register", {
    failureMessage: "Cannot register new user",
  }),
  UserController.registerUser
);

Router.get(
  "/",
  authToken,
  authPolicies("ADMIN", null),
  UserController.getAllUsers
);

Router.delete(
  "/",
  authToken,
  authPolicies("ADMIN", null),
  UserController.deleteAllUsers
);

Router.delete(
  "/:pid",
  authToken,
  authPolicies("ADMIN", null),
  UserController.deleteUser
);

Router.get("/current", authToken, UserController.getCurrentUser);

Router.get("/premium/:uid", UserController.changeUserRole);

Router.post("/restore", UserController.postRestore);

Router.post("/restoreForm/:uid/:token", UserController.postRestoreForm);

Router.post(
  "/:uid/documents",
  upload.fields([
    { name: "documents", maxCount: 3 },
    { name: "profiles", maxCount: 1 },
    { name: "products", maxCount: 10 },
  ]),
  UserController.uploadDocument
);

export default Router;
