import { ERRORS_ENUM } from "../consts/ERRORS.js";
import CustomError from "../errors/customError.js";
import CartsService from "./carts.services.js";

class CartsControllers {
  constructor() {}

  createCart = async (req, res) => {
    try {
      await CartsService.createCart();

      res.status(200).send({
        message: "Cart created",
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  getCarts = async (req, res) => {
    try {
      const result = await CartsService.getAllCarts();

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["CART IS EMPTY"],
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  getCartById = async (req, res) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.getCartById(cid);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["CART NOT FOUND"],
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  addProductToCart = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const user = req.user._doc;

      const result = await CartsService.addProductToCart(cid, pid, user);

      if (!result) {
        CustomError.createError({
          message: "Failed to add producto to cart",
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.render("error", {
        error: error.message,
      });
    }
  };

  updateProductQuantity = async (req, res) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const result = await CartsService.updateQuantity(cid, pid, quantity);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["INVALID CART PROPERTY"],
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  addArrayOfProducts = async (req, res) => {
    try {
      const { cid } = req.params;
      const arrayOfProducts = req.body;

      const result = await CartsService.addArrayOfProducts(
        cid,
        arrayOfProducts
      );

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  deleteOneProduct = async (req, res) => {
    try {
      const { cid, pid } = req.params;

      const result = await CartsService.deleteProductFromCart(cid, pid);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["INVALID CART PROPERTY"],
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  emptyCart = async (req, res) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.deleteAllProducts(cid);

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };

  purchaseCart = async (req, res) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.purchaseProducts(cid);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["INVALID CART PROPERTY"],
        });
      }

      res.status(200).send({
        payload: result,
      });
    } catch (error) {
      req.logger.error(error);

      res.status(400).send({ status: error.name, message: error.message });
    }
  };
}

const CartsController = new CartsControllers();

export default CartsController;
