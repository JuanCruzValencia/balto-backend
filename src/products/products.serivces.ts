import CustomError from "../errors/customError.ts";
import { ERRORS, Product, SessionUser } from "../interface/interfaces.ts";
import productsModel from "../models/products.model.ts";
import { PaginateOptions } from "mongoose";
import sendMail from "../utils/nodemailer.ts";

class ProductsServices {
  getAllProducts = async (query: string, options: PaginateOptions) => {
    try {
      if (query === "inStock") {
        const products = await productsModel.paginate(
          { status: true },
          options
        );
        5;

        return products;
      }

      if (
        query === "jewelery" ||
        query === "men's clothings" ||
        query === "women's clothings" ||
        query === "electronics"
      ) {
        const products = await productsModel.paginate(
          { category: query },
          options
        );

        return products;
      }
      const products = await productsModel.paginate({}, options);

      return products;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };

  getProductById = async (pid: Product["_id"]) => {
    try {
      const product = await productsModel.findById({ _id: pid }).lean();

      if (!product) {
        CustomError.createError({
          name: ERRORS.PRODUCT_NOT_FOUND,
          message: ERRORS.PRODUCT_NOT_FOUND,
        });

        return;
      }

      return product;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };

  addNewProduct = async (newProduct: Product, user: SessionUser) => {
    try {
      const product = await productsModel.findOne({ code: newProduct.code });

      if (product) {
        CustomError.createError({
          name: ERRORS.PRODUCT_ALREADY_IS_IN_DB,
          message: ERRORS.PRODUCT_ALREADY_IS_IN_DB,
        });

        return;
      }

      const addProduct = await productsModel.create({
        ...newProduct,
        owner: user._id,
      });

      return addProduct;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };

  updateProduct = async (pid: Product["_id"], newProduct: Partial<Product>) => {
    try {
      const product = await this.getProductById(pid);

      if (!product) {
        CustomError.createError({
          name: ERRORS.PRODUCT_NOT_FOUND,
          message: ERRORS.PRODUCT_NOT_FOUND,
        });

        return;
      }

      const updateProduct = await productsModel.updateOne(
        { _id: pid },
        newProduct
      );

      return updateProduct;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };

  deleteProduct = async (pid: Product["_id"], user: SessionUser) => {
    try {
      const product = await this.getProductById(pid);

      //TODO el owner dentro del prodcuto se guarda como un objeto
      if (!product) {
        CustomError.createError({
          name: ERRORS.PRODUCT_NOT_FOUND,
          message: ERRORS.PRODUCT_NOT_FOUND,
        });

        return;
      }

      if (product.owner !== "ADMIN" && product.owner != user._id) {
        CustomError.createError({
          name: ERRORS.INVALID_USER,
          message: ERRORS.INVALID_USER,
        });

        return;
      }

      if (product.owner === "PREMIUM") {
        const body =
          "We have to inform your product was deleted: " + product.title;

        await sendMail.send(user.email, "Product deleted", body);
      }

      const deleteProduct = await productsModel.deleteOne({ _id: pid });

      return deleteProduct;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };

  updateStock = async (pid: Product["_id"], quantity: number) => {
    try {
      const product = await this.getProductById(pid);

      if (!product) {
        CustomError.createError({
          name: ERRORS.PRODUCT_NOT_FOUND,
          message: ERRORS.PRODUCT_NOT_FOUND,
        });

        return;
      }

      if (product.stock < quantity) {
        console.log("No stock");

        return false;
      }

      await productsModel.updateOne(
        { _id: pid },
        { $inc: { stock: -quantity } }
      );

      return true;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });

      return;
    }
  };
}

const ProductsService = new ProductsServices();

export default ProductsService;
