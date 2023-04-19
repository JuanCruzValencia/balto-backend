import CustomError from "../errors/customError.ts";
import { Product, SessionUser } from "../interface/interfaces.ts";
import productsModel from "../models/products.model.ts";
import { PaginateOptions } from "mongoose";

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
    }
  };

  getProductById = async (pid: Product["_id"]) => {
    try {
      const product = await productsModel.findById({ _id: pid }).lean();

      if (!product) {
        throw new Error("Product Not Found");
      }

      return product;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  addNewProduct = async (newProduct: Product, user: SessionUser) => {
    try {
      const product = await productsModel.findOne({ code: newProduct.code });

      if (product) {
        throw new Error("Product Already Exist in DB");
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
    }
  };

  updateProduct = async (pid: Product["_id"], newProduct: Partial<Product>) => {
    try {
      const product = await this.getProductById(pid);

      if (!product) {
        throw new Error("Product Not Found");
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
    }
  };

  deleteProduct = async (pid: Product["_id"], user: SessionUser) => {
    try {
      const product = await this.getProductById(pid);

      //TODO el owner dentro del prodcuto se guarda como un objeto
      if (!product) {
        throw new Error("Product Not Found");
      }

      if (product.owner !== "ADMIN" && product.owner != user._id) {
        throw new Error("Not Authorized");
      }

      const deleteProduct = await productsModel.deleteOne({ _id: pid });

      return deleteProduct;
    } catch (error: any) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  updateStock = async (pid: Product["_id"], quantity: number) => {
    try {
      const product = await this.getProductById(pid);

      if (!product) {
        throw new Error("Product Not Found");
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
    }
  };
}

const ProductsService = new ProductsServices();

export default ProductsService;
