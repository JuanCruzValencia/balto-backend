import { Router } from "express";
import { authToken } from "../utils/jwt.js";
import ProductsController from "./products.controller.js";
import { authPolicies } from "../utils.js";

const router = Router();

router.get("/", authToken, ProductsController.getAllProducts);

router.get("/:pid", ProductsController.getProductById);

router.post(
  "/",
  authToken,
  authPolicies("ADMIN", "PREMIUM"),
  ProductsController.addNewProduct
);

router.put(
  "/:pid",
  authToken,
  authPolicies("ADMIN", undefined),
  ProductsController.updateProduct
);

router.delete(
  "/:pid",
  authToken,
  authPolicies("ADMIN", "PREMIUM"),
  ProductsController.deleteProduct
);

export default router;
