import express from "express";
import passport from "passport";
import session from "express-session";
import { Server } from "socket.io";
import dotenv from "dotenv";
//routers
import Routers from "./utils/routers.ts";
//utils
import socket from "./utils/socket.ts";
import { errorHandler } from "./middlewares/errors/index.ts";
import { addLogger } from "./utils/logger.ts";
import initSwagger from "./utils/swagger.ts";
//conections
import MongoConnection, { MongoStoreInstance } from "./utils/mongo.ts";
import { jwtStrategy, localStrategy } from "./auth/strategies/index.ts";
import swaggerUiExpress from "swagger-ui-express";
import path from "path";
//const and env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//mongoDb init
MongoConnection.getInstance();

//passport strategies init
jwtStrategy();
localStrategy();

//middlewares
app.use(session(MongoStoreInstance));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(errorHandler);
app.use(addLogger);

//routers
app.use("/auth", Routers.authRouter);
app.use("/api/users", Routers.sessionRouter);
app.use("/api/products", Routers.productsRouter);
app.use("/api/carts", Routers.cartRouter);
app.use("/chat", Routers.chatRouter);
app.use("/mocks", Routers.productsMockRouter);
app.use("/loggerTest", Routers.loggerRouter);
app.use(
  "/api/docs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(initSwagger())
);

//app.listen
const httpServer = app.listen(PORT, () => {
  console.log("Server up!");
});

//socket
const io = new Server(httpServer);
socket(io);
