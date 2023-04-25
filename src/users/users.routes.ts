import express from "express";
import passport from "passport";
import UserController from "./users.controllers.ts";
import { authToken } from "../utils/jwt.ts";
import UserService from "./users.services.ts";

const Router = express.Router();

Router.post(
  "/register",
  passport.authenticate("register", {
    failureMessage: "Cannot register new user",
  }),
  UserService.registerUser
);

Router.get("/current", authToken, UserController.getCurrentUser);

Router.get("/premium/:uid", UserController.changeUserRole);

Router.post("/restore", UserController.postRestore);

Router.post("/restoreForm/:uid/:token", UserController.postRestoreForm);

Router.post("/:uid/documents", UserController.uploadDocument);

export default Router;
