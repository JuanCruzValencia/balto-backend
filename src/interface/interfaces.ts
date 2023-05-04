import { Types } from "mongoose";

export interface User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  password: string;
  cart: Cart;
  role: string;
  documents: Document[];
  last_connection: Date;
}

export interface UserSession {
  user: {
    _doc: User;
  };
}

export interface Document {
  name: string;
  reference: string;
}

export enum FIELDNAMES {
  DOCUMENTS = "documents",
  PROFILES = "profiles",
  PRODUCTS = "products",
}

export interface Message {
  user: string;
  message: string;
}

export interface Ticket {
  id: Types.ObjectId;
  code: string;
  amount: number;
  purchaser: string;
  purchased_datetime: Date;
}

export interface Token {
  userId: Types.ObjectId;
  token: string;
  expireAt: Date;
}

export interface SessionUser extends Express.User {
  _id: string;
  first_name: string;
  last_name: string;
  email: string;
  age: number;
  cart: Cart;
  role: string;
  accessToken: string;
}

export interface Cart {
  id: string;
  products: CartProduct[];
}

export interface Product {
  _id: string;
  title: string;
  description: string;
  code: string;
  price: number;
  status: boolean;
  stock: number;
  category: string;
  thumbnails: string[];
  owner: string;
}

export interface CartProduct {
  product: Product["_id"];
  quantity: number;
}
