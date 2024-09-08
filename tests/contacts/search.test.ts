import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { app } from "../../src/app";
import request from "supertest";
import { contactsService } from "../../src/services/contacts-service";

process.env.NODE_ENV = "test";

describe("Search contacts", function () {
  const uri = "/api/contacts/search";
  const CONTACTS_COUNT = 5;
  const term = "term";

  it("success", async function () {
    const response = await request(app).get(`${uri}?term=${term}`);

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty("contacts");

    const contacts = response.body.contacts;
    expect(contacts.length).toEqual(CONTACTS_COUNT);
  });

  it("Invalid skip", async function () {
    const invalidSkip = -2;
    const response = await request(app).get(
      `${uri}?term=${term}&skip=${invalidSkip}`,
    );

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("error");

    const error = response.body.error;
    expect(error).toEqual(`Invalid skip`);
  });

  it("Invalid limit", async function () {
    const invalidLimit = 101;
    const response = await request(app).get(
      `${uri}?term=${term}&limit=${invalidLimit}`,
    );

    expect(response.statusCode).toBe(StatusCodes.BAD_REQUEST);
    expect(response.body).toHaveProperty("error");

    const error = response.body.error;
    expect(error).toEqual(`Invalid limit`);
  });

  it("Apply skip&limit", async function () {
    const limit = 5;
    const skip = 2;
    const response = await request(app).get(
      `${uri}?term=${term}&limit=${limit}&skip=${skip}`,
    );

    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body).toHaveProperty("contacts");

    const contacts = response.body.contacts;
    expect(contacts.length).toEqual(CONTACTS_COUNT - skip);
  });

  beforeEach(async () => {
    for (let i = 0; i < CONTACTS_COUNT; i++) {
      await contactsService.insertOne({
        first_name: `testy_${i}`,
        last_name: `testovich_${i}`,
        phone_number: `050777777${i}`,
        address: `testy_street_${i}`,
      });
      await contactsService.insertOne({
        first_name: `testy_${term}_${i}`,
        last_name: `testovich_${term}_${i}`,
        phone_number: `050777777_${term}_${i}`,
        address: `testy_street_${term}_${i}`,
      });
    }
  });
});
