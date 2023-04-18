import express from "express";
import { generateMockProducts } from "./productsMock.controller.js";

const Router = express.Router();

Router.get("/mockingproducts", generateMockProducts);

export default Router;
