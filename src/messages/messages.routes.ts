import express from "express";
import { getChatPage } from "./messages.controller.ts";

const Router = express.Router();

//should i use auth for this view??
Router.get("/", getChatPage);

export default Router;
