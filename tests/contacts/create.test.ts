import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { app } from "../../src/app";
import request from "supertest";
import { contactsService } from "../../src/services/contacts-service";
import { contactsManager } from "../../src/managers/contacts-manager";

describe("Create contact", function () {
  const uri = "/api/contacts";

  it("success", async function () {
    const body = {
      first_name: "testy",
      last_name: "testovich",
      phone_number: "0507777777",
      address: "test",
    };
    const response = await request(app).put(uri).send(body);
    expect(response.statusCode).toBe(StatusCodes.OK);
  });

  it("Duplicated contact", async function () {
    const body = {
      first_name: "testy",
      last_name: "testovich",
      phone_number: "0507777777",
      address: "test",
    };
    await contactsService.insertOne(body);
    const response = await request(app).put(uri).send(body);
    expect(response.statusCode).toBe(StatusCodes.CONFLICT);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toEqual(
      `${contactsManager.objectType} already exists`,
    );
  });
});
