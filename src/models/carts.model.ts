import { Schema, model } from "mongoose";
import { Cart } from "../interface/interfaces.ts";

const cartSchema: Schema<Cart> = new Schema({
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Products",
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    default: [],
  },
});

const cartsModel = model<Cart>("Carts", cartSchema);

export default cartsModel;
