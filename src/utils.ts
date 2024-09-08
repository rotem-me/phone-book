import { ObjectId } from "bson";
import { NotFoundError } from "./errors";

export function toId(id: string, objType: string) {
  try {
    return new ObjectId(id);
  } catch (err) {
    throw new NotFoundError(`${objType} ${id}`);
  }
}
