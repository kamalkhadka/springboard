process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../app");

const items = require("../fakeDB");

let popsicle = { name: "popsicle", price: 1.45 };

beforeEach(() => {
  items.push(popsicle);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual([popsicle]);
  });
});

describe("POST /items", () => {
  test("Post nothing", async () => {
    const res = await request(app).post("/items");
    expect(res.statusCode).toBe(404);
  });

  test("Post a lollipop", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "lollipop", price: 2 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ name: "lollipop", price: 2 });
  });
});

describe("GET /:name", () => {
  test("GET /items/posicle", async () => {
    const res = await request(app).get(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(popsicle);
  });
  test("GET /items/:name that doesn't exits", async () => {
    const res = await request(app).get("/items/lollipop");
    expect(res.statusCode).toBe(404);
  });
});

describe("PATCH /items/:name", () => {
  test("PATCH /items/posible", async () => {
    const res = await request(app)
      .patch(`/items/${popsicle.name}`)
      .send({ name: "lollipop", price: 2.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ updated: { name: "lollipop", price: 2.0 } });
  });

  test("PATCH /items/:name item doesn't exit", async () => {
    const res = await request(app)
      .patch(`/items/candy`)
      .send({ name: "popsicle", price: 2.45 });
    expect(res.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", () => {
  test("DELETE item that doesn't exists", async () => {
    const res = await request(app).delete("/items/captain");
    expect(res.statusCode).toBe(404);
  });
  test("DELETE item that exist", async () => {
    console.log(popsicle.name);
    const res = await request(app).delete(`/items/${popsicle.name}`);
    expect(res.statusCode).toBe(200);
  });
});
