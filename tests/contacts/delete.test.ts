import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { app } from "../../src/app";
import request from "supertest";
import { contactsService } from "../../src/services/contacts-service";
import { contactsManager } from "../../src/managers/contacts-manager";

process.env.NODE_ENV = "test";

describe("Delete contacts", function () {
  const uri = "/api/contacts";
  let contactId;

  it("success", async function () {
    const response = await request(app).delete(`${uri}\\${contactId}`);

    expect(response.statusCode).toBe(StatusCodes.OK);

    const contact = await contactsService.findOne(contactId);
    expect(contact).toEqual(null);
  });

  it("Invalid id", async function () {
    const invalidId = "invalidId";
    const response = await request(app).delete(`${uri}\\${invalidId}`);

    expect(response.statusCode).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toHaveProperty("error");

    const error = response.body.error;
    expect(error).toEqual(
      `${contactsManager.objectType} ${invalidId} not found`,
    );
  });

  beforeEach(async () => {
    const contact = await contactsService.insertOne({
      first_name: `testy`,
      last_name: `testovich`,
      phone_number: `0507777777`,
      address: `testy_street`,
    });
    contactId = contact.insertedId.toString();
  });

  afterEach(async () => {
    await contactsManager.delete({});
  });
});
