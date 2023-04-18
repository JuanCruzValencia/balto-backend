import CustomError from "../errors/customError.js";
import { productsModel } from "../models/products.model.js";

class ProductsServices {
  getAllProducts = async (query, options) => {
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
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  getProductById = async (pid) => {
    try {
      const product = await productsModel.findById({ _id: pid }).lean();

      if (!product) {
        throw new Error("Product Not Found");
      }

      return product;
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  addNewProduct = async (newProduct, user) => {
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
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  updateProduct = async (pid, newProduct) => {
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
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  deleteProduct = async (pid, user) => {
    try {
      const product = await this.getProductById(pid);

      //TODO el owner dentro del prodcuto se guarda como un objeto

      if (product.owner !== "ADMIN" && product.owner != user._id) {
        throw new Error("Not Authorized");
      }

      if (!product) {
        throw new Error("Product Not Found");
      }

      const deleteProduct = await productsModel.deleteOne({ _id: pid });

      return deleteProduct;
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };

  updateStock = async (pid, quantity) => {
    try {
      const product = await this.getProductById(pid);

      if (product.stock < quantity) {
        console.log("No stock");

        return false;
      }

      await productsModel.updateOne(
        { _id: pid },
        { $inc: { stock: -quantity } }
      );

      return true;
    } catch (error) {
      CustomError.createError({
        name: error.name,
        message: error.message,
      });
    }
  };
}

const ProductsService = new ProductsServices();

export default ProductsService;
