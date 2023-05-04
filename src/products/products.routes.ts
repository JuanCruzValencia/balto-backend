import { Router } from "express";
import ProductsController from "./products.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";

const router = Router();

router.get("/", authToken, ProductsController.getAllProducts);

router.get("/:pid", authToken, ProductsController.getProductById);

router.post(
  "/",
  authToken,
  authPolicies("ADMIN", "PREMIUM"),
  ProductsController.addNewProduct
);

router.put(
  "/:pid",
  authToken,
  authPolicies("ADMIN", null),
  ProductsController.updateProduct
);

router.delete(
  "/:pid",
  authToken,
  authPolicies("ADMIN", "PREMIUM"),
  ProductsController.deleteProduct
);

export default router;
