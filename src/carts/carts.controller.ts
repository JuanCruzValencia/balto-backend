import { UserSession } from "../interface/interfaces.ts";
import CartsService from "./carts.services.ts";
import { Request, Response } from "express";

class CartsControllers {
  create = async (req: Request, res: Response) => {
    try {
      await CartsService.createCart();

      return res.status(200);
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  getAll = async (req: Request, res: Response) => {
    try {
      const result = await CartsService.getAllCarts();

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  getOne = async (req: Request, res: Response) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.getCartById(cid);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  addOne = async (req: Request, res: Response) => {
    try {
      const { cid, pid } = req.params;

      const data = req.user as UserSession;

      const user = data.user._doc; //TODO should be a better way of deconstruc the request.user

      const result = await CartsService.addProductToCart(cid, pid, user);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  updateQuantity = async (req: Request, res: Response) => {
    try {
      const { cid, pid } = req.params;
      const { quantity } = req.body;

      const result = await CartsService.updateQuantity(cid, pid, quantity);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  addMany = async (req: Request, res: Response) => {
    try {
      const { cid } = req.params;
      const arrayOfProducts = req.body;

      const result = await CartsService.addArrayOfProducts(
        cid,
        arrayOfProducts
      );

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  deleteOne = async (req: Request, res: Response) => {
    try {
      const { cid, pid } = req.params;

      const result = await CartsService.deleteProductFromCart(cid, pid);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  empty = async (req: Request, res: Response) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.deleteAllProducts(cid);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  purchase = async (req: Request, res: Response) => {
    try {
      const { cid } = req.params;

      const result = await CartsService.purchaseProducts(cid);

      return res.status(200).send({
        payload: result,
      });
    } catch (error: any) {
      req.logger.error(error);

      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };
}

const CartsController = new CartsControllers();

export default CartsController;
