import session from 'express-session';
import { Express } from 'express';
import { User } from './interfaces';

declare module 'express-session' {
  export interface SessionData {
    user: Partial<User>;
  }
}

declare namespace Express {
  export interface Request {
     logger?: any
  }
}