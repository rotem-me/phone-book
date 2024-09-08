import MongoDBManager, { BaseDoc } from "./base-mongo-manager";
import Ajv, { ValidateFunction } from "ajv";
import { DB_NAME, MONGO_URL } from "../settings";
import { IndexDescription } from "mongodb";

export interface Contact extends BaseDoc {
  first_name?: string;
  last_name?: string;
  phone_number: string;
  address: string;
}

const schema = {
  type: "object",
  additionalProperties: true,
  properties: {
    first_name: {
      type: "string",
    },
    last_name: {
      type: "string",
    },
    phone_number: {
      type: "string",
    },
    address: {
      type: "string",
    },
  },
  required: ["phone_number"],
};

const uri = MONGO_URL;
const dbName = DB_NAME;
const collectionName = "contacts";

export class ContactsManager extends MongoDBManager<Contact> {
  public schemaValidator: ValidateFunction = new Ajv({
    allErrors: true,
  }).compile(schema);

  public objectType = "Contact";

  protected indexes: IndexDescription[] = [
    { key: { first_name: 1 } },
    { key: { last_name: 1 } },
    { key: { phone_number: 1 }, unique: true },
    { key: { address: 1 } },
  ];
}
export const contactsManager = new ContactsManager(uri, dbName, collectionName);
