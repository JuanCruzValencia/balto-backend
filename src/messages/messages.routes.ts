import express from "express";
import { authToken } from "../utils/jwt.ts";
import { getChatPage } from "./messages.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";

const Router = express.Router();

Router.get("/", authToken, authPolicies("USER", null), getChatPage);

export default Router;
