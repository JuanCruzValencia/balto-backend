import express from "express";
import { getChatPage } from "./messages.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { ROLES } from "../interface/interfaces.ts";
import { authToken } from "../middlewares/authToken.ts";

const Router = express.Router();

//should i user auth for this view??
Router.get("/", authToken, authPolicies(ROLES.USER, null), getChatPage);

export default Router;
