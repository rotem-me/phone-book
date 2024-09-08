import {
  MongoClient,
  Collection,
  Filter,
  UpdateFilter,
  WithId,
  IndexDescription,
} from "mongodb";
import { ValidateFunction } from "ajv";
import { ObjectId } from "bson";
import { DuplicatedError, InvalidParamError, UnknownError } from "../errors";
import { DEFAULT_DOCS_LIMIT } from "../settings";

export interface BaseDoc {
  _id: ObjectId;
  _ut?: Date;
  _ct?: Date;
}

class MongoDBManager<T extends BaseDoc> {
  private client: MongoClient;
  private collection: Collection<T>;
  protected indexes: IndexDescription[];
  public objectType: string; // define in derived classes

  constructor(uri: string, dbName: string, collectionName: string) {
    this.client = new MongoClient(uri);
    this.collection = this.client.db(dbName).collection<T>(collectionName);
  }

  convertInput(
    data: unknown,
    schemaValidator: ValidateFunction,
    partial: boolean = false,
  ): any {
    let validation = schemaValidator(data);
    if (schemaValidator.errors) {
      if (partial) {
        for (const schemaError of schemaValidator.errors) {
          if (schemaError.params.hasOwnProperty("missingProperty")) {
            continue;
          }
          throw new InvalidParamError(`${schemaError.instancePath}`);
        }
      } else {
        throw new InvalidParamError(
          `${schemaValidator.errors[0].instancePath}`,
        );
      }
    } else if (!validation) {
      throw new UnknownError();
    }
    return data;
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();
      if (this.indexes) {
        await this.collection.createIndexes(this.indexes);
      }
      console.log("Connected successfully to MongoDB");
    } catch (error) {
      console.error("MongoDB connection failed:", error);
      throw error;
    }
  }

  async close(): Promise<void> {
    await this.client.close();
    console.log("Connection to MongoDB closed");
  }

  async find(
    filter: Filter<T> = {},
    skip: number = 0,
    limit: number = DEFAULT_DOCS_LIMIT,
  ): Promise<any[]> {
    const docs = this.collection.find(filter);

    if (skip > 0) {
      docs.skip(skip);
    }

    if (limit > 0) {
      docs.limit(limit);
    }

    return docs.toArray();
  }

  async findOne(filter: Filter<T>): Promise<WithId<T> | null> {
    return this.collection.findOne(filter);
  }

  async insertOne(doc: any): Promise<any> {
    doc._ut = new Date();
    doc._ct = new Date();
    try {
      return await this.collection.insertOne(doc);
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicatedError(`${this.objectType}`);
      }
    }
  }

  async update(filter: Filter<T>, doc: any): Promise<any> {
    doc._ut = new Date();
    try {
      return await this.collection.updateMany(filter, { $set: { ...doc } });
    } catch (err) {
      if (err.code === 11000) {
        throw new DuplicatedError(`${this.objectType}`);
      }
    }
  }

  async delete(filter: Filter<T>): Promise<void> {
    await this.collection.deleteMany(filter);
  }
}

export default MongoDBManager;
