import express from "express";
import { authToken } from "../utils/jwt.js";
import { getChatPage } from "./messages.controller.js";
import { authPolicies } from "../utils.js";

const Router = express.Router();

Router.get("/", authToken, authPolicies("USER", undefined), getChatPage);

export default Router;
