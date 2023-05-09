import { Router } from "express";
import PaymentController from "./payment.controller";

const router = Router();

router.post("/client-payment-intent", PaymentController.createPayment);

export default router;
