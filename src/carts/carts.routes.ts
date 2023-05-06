import express from "express";
import CartsController from "./carts.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";
import { ROLES } from "../interface/interfaces.ts";

const Router = express.Router();

Router.get(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  CartsController.getAll
);

Router.get("/:cid", authToken, CartsController.getOne);

Router.post(
  "/:cid",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  CartsController.addMany
);

Router.post("/", CartsController.create);

Router.post(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.addOne
);
Router.post(
  "/:cid/purchase",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.purchase
);

Router.put(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.updateQuantity
);

Router.delete(
  "/:cid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.empty
);

Router.delete(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.deleteOne
);

export default Router;
