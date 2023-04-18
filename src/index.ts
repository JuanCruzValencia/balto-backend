import express from "express";
import dotenv from "dotenv";
import passport from "passport";
import __dirname from "./utils.js";
import session from "express-session";
import productsRouter from "./products/products.routes.js";
import cartRouter from "./carts/carts.routes.js";
import chatRouter from "./messages/messages.routes.js";
import sessionRouter from "./users/users.routes.js";
import productsMockRouter from "./mocks/productsMock.routes.js";
import loggerRouter from "./logger/logger.routes.js";
import MongoConnection, { MongoStoreInstance } from "./utils/mongo.js";
import { Server } from "socket.io";
import socket from "./utils/socket.js";
import { errorHandler } from "./middlewares/errors/index.js";
import { addLogger } from "./utils/logger.js";
import authRouter from "./auth/auth.routes.js";
import { jwtStrategy, localStrategy } from "./auth/strategies/index.js";

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
// app.use("/chat", chatRouter);
// app.use("/", productsMockRouter);
app.use("/loggerTest", loggerRouter);

//app.listen
const httpServer = app.listen(PORT, () => {
  console.log("Server up!");
});

//socket
const io = new Server(httpServer);
socket(io);
