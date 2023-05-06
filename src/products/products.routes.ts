import { Router } from "express";
import ProductsController from "./products.controller.ts";
import { authPolicies } from "../middlewares/authPolicies.ts";
import { authToken } from "../middlewares/authToken.ts";
import { ROLES } from "../interface/interfaces.ts";

const router = Router();

router.get("/", authToken, ProductsController.getAll);

router.get("/:pid", authToken, ProductsController.getOne);

router.post(
  "/",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.addOne
);

router.put(
  "/:pid",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.updateOne
);

router.delete(
  "/:pid",
  authToken,
  authPolicies(ROLES.ADMIN, ROLES.PREMIUM),
  ProductsController.deleteOne
);

export default router;
