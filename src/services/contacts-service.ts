import { Contact, contactsManager } from "../managers/contacts-manager";
import { DEFAULT_DOCS_LIMIT, MAX_DOCS_LIMIT } from "../settings";
import { Filter } from "mongodb";
import { InvalidParamError, NotFoundError } from "../errors";
import { toId } from "../utils";

class ContactsService {
  find(
    filter: Filter<Contact>,
    reqSkip: string,
    reqLimit: string,
  ): Promise<Contact[]> {
    const skip = parseInt(reqSkip, 10) || 0;
    const limit = parseInt(reqLimit, 10) || DEFAULT_DOCS_LIMIT;

    if (skip < 0) {
      throw new InvalidParamError("skip");
    }

    if (limit < 0 || limit > MAX_DOCS_LIMIT) {
      throw new InvalidParamError("limit");
    }

    return contactsManager.find(filter, skip, limit) as Promise<Contact[]>;
  }

  findOne(id: string): Promise<Contact> {
    return contactsManager.findOne({
      _id: toId(id, contactsManager.objectType),
    }) as Promise<Contact>;
  }

  search(term: string, reqSkip: string, reqLimit: string): Promise<Contact[]> {
    let filter = {};
    const searchFields = ["first_name", "last_name", "phone_number", "address"];

    if (term) {
      filter = {
        $or: searchFields.map((field) => ({
          [field]: { $regex: term, $options: "i" },
        })),
      };
    }

    return this.find(filter, reqSkip, reqLimit) as Promise<Contact[]>;
  }

  insertOne(data: {}): Promise<any> {
    const doc = contactsManager.convertInput(
      data,
      contactsManager.schemaValidator,
    );
    return contactsManager.insertOne(doc);
  }

  async update(id: string, data: unknown): Promise<void> {
    const doc = contactsManager.convertInput(
      data,
      contactsManager.schemaValidator,
      true,
    );
    const result = await contactsManager.update(
      { _id: toId(id, contactsManager.objectType) },
      doc,
    );
    if (!result["modifiedCount"]) {
      throw new NotFoundError(contactsManager.objectType);
    }
  }

  delete(id: string): Promise<any> {
    return contactsManager.delete({
      _id: toId(id, contactsManager.objectType),
    });
  }
}
export const contactsService = new ContactsService();
