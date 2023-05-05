import express from "express";
import CartsController from "./carts.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";
import { ROLES } from "../interface/interfaces.ts";

const Router = express.Router();

Router.post("/", CartsController.createCart);

Router.get(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  CartsController.getCarts
);

Router.get("/:cid", authToken, CartsController.getCartById);

Router.post(
  "/:cid",
  authToken,
  authPolicies(ROLES.ADMIN, null),
  CartsController.addArrayOfProducts
);

Router.delete(
  "/:cid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.emptyCart
);

Router.post(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.addProductToCart
);

Router.post(
  "/:cid/purchase",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.purchaseCart
);

Router.put(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.updateProductQuantity
);

Router.delete(
  "/:cid/product/:pid",
  authToken,
  authPolicies(ROLES.USER, ROLES.PREMIUM),
  CartsController.deleteOneProduct
);

export default Router;
