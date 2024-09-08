import { describe, expect, it } from "@jest/globals";
import { StatusCodes } from "http-status-codes";
import { version } from "../../package.json";
import { app } from "../../src/app";
import request from "supertest";

process.env.NODE_ENV = "test";

describe("GET /health-check", function () {
  it("Health Check", async function () {
    const response = await request(app).get(`/health-check`);
    expect(response.statusCode).toBe(StatusCodes.OK);
    expect(response.body.version).toBeDefined();
    expect(response.body.version).toEqual(version);
  });
});
