import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { Product } from "../interface/interfaces";

interface ProductModel extends Product {
  owner: string;
}

const productsSchema: Schema<ProductModel> = new Schema({
  title: String,
  description: String,
  code: String,
  price: Number,
  status: {
    type: Boolean,
    default: true,
  },
  stock: {
    type: Number,
    index: true,
    default: 0,
  },
  category: {
    type: String,
    index: true,
  },
  thumbnails: [String],
  owner: {
    type: String,
    ref: "User",
    default: "ADMIN",
  },
});

productsSchema.plugin(mongoosePaginate);

const productsModel = model<ProductModel>(
  "Products",
  productsSchema
);

export default productsModel
