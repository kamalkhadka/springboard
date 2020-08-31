process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const Company = require("../../models/company");
const { response } = require("express");

let apple;

beforeEach(async () => {
  const results = await db.query(
    `INSERT INTO companies 
            (handle, name, num_employees, description, logo_url) 
        VALUES 
            ('Apple', 'Apple Inc', 1000, 'apple phone, mac', 'test@test.com')
        RETURNING name, handle;
    `
  );
  apple = results.rows[0];
});

afterEach(async () => {
  await db.query(`DELETE FROM companies`);
});

describe("GET /companies", () => {
  test("/companies should return list of companies", async () => {
    const response = await request(app).get("/companies");
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Search for company that exist using handle", async () => {
    const response = await request(app).get("/companies?search=Apple");
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searchig for a company that doesn't exist shoudl return 404", async () => {
    const response = await request(app).get("/companies?search=IBM");
    expect(response.status).toBe(404);
  });

  test("Searching for companies with param min_employees", async () => {
    const response = await request(app).get("/companies?min_employees=1000");
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searching for companies with param max_employees", async () => {
    const response = await request(app).get("/companies?max_employees=1000");
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searching for companies with param min_employees > max_employees should return error", async () => {
    const response = await request(app).get(
      "/companies?min_employees=2000&max_employees=1000"
    );
    expect(response.status).toBe(400);
  });
});

describe("POST /companies", () => {
  test("POST valid company should return posted company", async () => {
    const newCompany = {
      handle: "IBM",
      name: "International Business Machine",
      num_employees: 100,
    };
    const response = await request(app).post("/companies").send(newCompany);
    expect(response.status).toBe(201);
    expect(response.body.company.handle).toBe("IBM");
  });

  test("POST company with missing information", async () => {
    const newCompany = {
      handle: "IBM",
      num_employees: 100,
    };

    const response = await request(app).post("/companies").send(newCompany);
    expect(response.status).toBe(400);
  });
});

describe("GET /companies/[handle]", () => {
  test("GET a company whose handle exist", async () => {
    const response = await request(app).get(`/companies/${apple.handle}`);
    expect(response.status).toBe(200);
    expect(response.body.handle).toBe(apple.handle);
  });

  test("GET a company whose handle does not exist", async () => {
    const response = await request(app).get(`/companies/IBM`);
    expect(response.status).toBe(404);
  });
});

describe("PATCH /companies/[handle]", () => {
  test("PATCH /companies/Apple", async () => {
    let response = await request(app).get(`/companies/${apple.handle}`);
    const appleComputer = response.body;
    appleComputer.name = "Apple Computers";
    response = await request(app).patch(`/companies/${apple.handle}`).send(appleComputer);
    
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(appleComputer.name);
  })

  test("PATCH /companies/Apple with invalid json object", async () => {
    let response = await request(app).get(`/companies/${apple.handle}`);
    const appleComputer = response.body;
    delete appleComputer.name;

    response = await request(app).patch(`/companies/${appleComputer.handle}`).send(appleComputer);
    expect(response.status).toBe(400);
  })
});

describe("DELETE /companies/[handle]", () => {
  test("DELETE a valid company", async () => {
    const response = await request(app).delete(`/companies/${apple.handle}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("deleted");
  })

  test("DELETE an invalid company", async () => {
    const response = await request(app).delete("/companies/IBM");
    expect(response.status).toBe(404);
  });
})

afterAll(async () => {
  await db.end();
});
