import productsRouter from "../products/products.routes.ts";
import cartRouter from "../carts/carts.routes.ts";
import chatRouter from "../messages/messages.routes.ts";
import sessionRouter from "../users/users.routes.ts";
import productsMockRouter from "../mocks/productsMock.routes.ts";
import loggerRouter from "../logger/logger.routes.ts";
import authRouter from "../auth/auth.routes.ts";
import paymentRouter from "../payment/payment.routes.ts";

const Routers = {
  productsRouter,
  cartRouter,
  chatRouter,
  sessionRouter,
  productsMockRouter,
  loggerRouter,
  authRouter,
  paymentRouter,
};

export default Routers;
