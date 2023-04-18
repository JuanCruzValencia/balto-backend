import { Schema, model, Model } from "mongoose";
import bcrypt from "bcryptjs";
import { User } from "../interface/interfaces";

interface UserModel extends Model<User> {
  encryptPassword: (password: string) => Promise<void>;
  comparePassword: (
    password: string,
    recivedPassword: string
  ) => Promise<boolean>;
}

const userSchema: Schema<User> = new Schema({
  first_name: String,
  last_name: String,
  email: {
    type: String,
    unique: true,
  },
  age: Number,
  password: String,
  cart: {
    type: Schema.Types.ObjectId,
    ref: "Carts",
  },
  role: {
    type: String,
    default: "USER",
  },
});

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);

  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, recivedPassword) => {
  return await bcrypt.compare(password, recivedPassword);
};

const userModel = model<User, UserModel>("User", userSchema);

export default userModel;
