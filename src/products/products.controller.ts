import { ERRORS_ENUM } from "../consts/ERRORS.js";
import CustomError from "../errors/customError.js";
import { generateProductErrorInfo } from "../errors/infoError.js";
import ProductsService from "./products.services.js";

class ProductsControllers {
  constructor() {}

  getAllProducts = async (req, res) => {
    try {
      const { query, limit, sort, page } = req.query;

      const options = {
        limit: limit || 10,
        page: page || 1,
        sort: { price: sort } || { price: 1 },
        lean: true,
      };

      const result = await ProductsService.getAllProducts(query, options);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["PRODUCT NOT FOUND"],
        });
      }

      return res.status(200).send({
        status: "succes",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink
          ? `/api/products?page=${result.prevPage}`
          : null,
        nextLink: result.nextLink
          ? `/api/products?page=${result.nextPage}`
          : null,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { pid } = req.params;

      const result = await ProductsService.getProductById(pid);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["PRODUCT NOT FOUND"],
        });
      }

      return res.status(200).send({
        payload: result,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  addNewProduct = async (req, res) => {
    try {
      const newProduct = req.body;
      const user = req.session.user;

      const { title, price, description, code, category } = newProduct;

      if (!title || !price || !description || !code || !category) {
        CustomError.createError({
          name: ERRORS_ENUM["INVALID PRODUCT PROPERTY"],
          message: generateProductErrorInfo(newProduct),
        });
      }

      const result = await ProductsService.addNewProduct(newProduct, user);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["INVALID PRODUCT PROPERTY"],
        });
      }

      return res.status(200).send({
        payload: result,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  updateProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const newProduct = req.body;

      const result = await ProductsService.updateProduct(pid, newProduct);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["PRODUCT NOT FOUND"],
        });
      }

      return res.status(200).send({
        payload: result,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };

  deleteProduct = async (req, res) => {
    try {
      const { pid } = req.params;
      const user = req.session.user;

      const result = await ProductsService.deleteProduct(pid, user);

      if (!result) {
        CustomError.createError({
          message: ERRORS_ENUM["PRODUCT NOT FOUND"],
        });
      }

      return res.status(202).send({
        payload: result,
      });
    } catch (error) {
      return res
        .status(400)
        .send({ status: error.name, message: error.message });
    }
  };
}

const ProductsController = new ProductsControllers();

export default ProductsController;
