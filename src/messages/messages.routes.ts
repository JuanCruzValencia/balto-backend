import express from "express";
import { getChatPage } from "./messages.controller.ts";

const Router = express.Router();

Router.get("/", getChatPage);

export default Router;
