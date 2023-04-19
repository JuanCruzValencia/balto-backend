import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import __dirname from "./utils.ts";
import session from "express-session";
import productsRouter from "./products/products.routes.ts";
import cartRouter from "./carts/carts.routes.ts";
import chatRouter from "./messages/messages.routes.ts";
import sessionRouter from "./users/users.routes.ts";
import productsMockRouter from "./mocks/productsMock.routes.ts";
import loggerRouter from "./logger/logger.routes.ts";
import MongoConnection, { MongoStoreInstance } from "./utils/mongo.ts";
import { Server } from "socket.io";
import socket from "./utils/socket.ts";
import { errorHandler } from "./middlewares/errors/index.ts";
import { addLogger } from "./utils/logger.ts";
import authRouter from "./auth/auth.routes.ts";
import { jwtStrategy, localStrategy } from "./auth/strategies/index.ts";

//const and env variables
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

//init mongoDB
MongoConnection.getInstance();

//passport
jwtStrategy();
localStrategy();

//middlewares
app.use(session(MongoStoreInstance));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + "/public"));
app.use(errorHandler);
app.use(addLogger);

//routers
app.use("/auth", authRouter);
app.use("/api/users", sessionRouter);
app.use("/api/products", productsRouter);
app.use("/api/carts", cartRouter);
app.use("/chat", chatRouter);
app.use("/", productsMockRouter);
app.use("/loggerTest", loggerRouter);

//app.listen
const httpServer = app.listen(PORT, () => {
  console.log("Server up!");
});

//socket
const io = new Server(httpServer);
socket(io);
