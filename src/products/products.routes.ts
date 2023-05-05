import { Router } from "express";
import ProductsController from "./products.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";
import { ROLES } from "../interface/interfaces.ts";

const router = Router();

router.get("/", authToken, ProductsController.getAllProducts);

router.get("/:pid", authToken, ProductsController.getProductById);

router.post(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.addNewProduct
);

router.put(
  "/:pid",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.updateProduct
);

router.delete(
  "/:pid",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.deleteProduct
);

export default router;
