export enum ENVS {
  DEV = "dev",
  TEST = "test",
}
export const APP_NAME = "PHONE-BOOK";
export const NODE_ENV = ENVS.DEV; //process.env.NODE_ENV || ENVS.DEV;
export const PHONE_BOOK_PORT = 7010; //process.env.PHONE_BOOK_PORT || 7010;

export const ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";

export const ALLOWED_ORIGIN = "*";

export const MAX_DOCS_LIMIT = 100;
export const DEFAULT_DOCS_LIMIT = 10;

export const DB_NAME = process.env.DB_NAME || "phone-book";

export const MONGO_URL = process.env.MONGO_URL || "mongodb://mongo:27017";
