import express from "express";
import CartsController from "./carts.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";

const Router = express.Router();

Router.post("/", CartsController.createCart);

Router.get(
  "/",
  authToken,
  authPolicies("ADMIN", null),
  CartsController.getCarts
);

Router.get("/:cid", authToken, CartsController.getCartById);

Router.post(
  "/:cid",
  authToken,
  authPolicies("ADMIN", null),
  CartsController.addArrayOfProducts
);

Router.delete(
  "/:cid",
  authToken,
  authPolicies("USER", "PREMIUM"),
  CartsController.emptyCart
);

Router.post(
  "/:cid/product/:pid",
  authToken,
  authPolicies("USER", "PREMIUM"),
  CartsController.addProductToCart
);

Router.post(
  "/:cid/purchase",
  authToken,
  authPolicies("USER", "PREMIUM"),
  CartsController.purchaseCart
);

Router.put(
  "/:cid/product/:pid",
  authToken,
  authPolicies("USER", "PREMIUM"),
  CartsController.updateProductQuantity
);

Router.delete(
  "/:cid/product/:pid",
  authToken,
  authPolicies("USER", "PREMIUM"),
  CartsController.deleteOneProduct
);

export default Router;
