process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");
let cats = require("../fakeDb");
const { response } = require("express");

let pickles = { name: "Pickles" };

beforeEach(function () {
  cats.push(pickles);
});

afterEach(function () {
  cats.length = 0;
});

describe("GET /cats", function () {
  test("Get all cats", async function () {
    const resp = await request(app).get("/cats");
    expect(resp.statusCode).toBe(200);
    expect(resp.body).toEqual({ cats: [pickles] });
  });
});

describe("POST /cats", function () {
  test("Creating a cat", async function () {
    const res = await request(app).post("/cats").send({ name: "Blue" });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ cat: { name: "Blue" } });
  });
});

describe("PATCH /cats/:name", () => {
  test("Updating cat name", async () => {
    const res = await request(app)
      .patch(`/cats/${pickles.name}`)
      .send({ name: "Monster" });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ cat: { name: "Monster" } });
  });

  test("Responds with 4040 for invalid name", async () => {
    const res = await request(app)
      .patch(`/cats/Piggles`)
      .send({ name: "Monster" });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /cats/:name", () => {
  test("Deleteing a cat", async () => {
    const res = await request(app).delete(`/cats/${pickles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({message: 'Deleted'});
  });

  test("Responds with 404 for deleting invalid cat", async () => {
    const res = await request(app).delete(`/cats/hamface`);
    expect(res.statusCode).toBe(400);
    });
});
