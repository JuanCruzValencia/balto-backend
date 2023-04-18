import { Schema, Types, model } from "mongoose";

interface Token {
  userId: Types.ObjectId;
  token: string;
  expireAt: Date;
}

const tokenSchema: Schema<Token> = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  token: {
    type: String,
    required: true,
  },
  expireAt: {
    type: Date,
    default: new Date(),
    expires: 3600,
  },
});

const tokenModel = model<Token>("Token", tokenSchema);

export default tokenModel;
