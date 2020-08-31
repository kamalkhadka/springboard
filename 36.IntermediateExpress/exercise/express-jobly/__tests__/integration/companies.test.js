process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const Company = require("../../models/company");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");

let apple;
let regularUserToken;
let adminUserToken;

beforeEach(async () => {
  let results = await db.query(
    `INSERT INTO companies 
            (handle, name, num_employees, description, logo_url) 
        VALUES 
            ('Apple', 'Apple Inc', 1000, 'apple phone, mac', 'test@test.com')
        RETURNING name, handle;
    `
  );
  apple = results.rows[0];

  results = await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('Software Developer', 10000, 0.1, '${apple.handle}')
    RETURNING *
  `);

  const job = results.rows[0];

  let password = await bcrypt.hash("test", BCRYPT_WORK_FACTOR);
  results = await db.query(
    `
  INSERT INTO users (username, password, first_name, last_name, email, is_admin)
  VALUES ('testuser', $1, 'user1', 'lyod', 'test@user1.com', false)
  RETURNING *
  `,
    [password]
  );

  const regularUser = results.rows[0];
  regularUserToken = jwt.sign(
    { username: regularUser.username, is_admin: regularUser.is_admin },
    SECRET_KEY
  );

  password = await bcrypt.hash("testadmin", BCRYPT_WORK_FACTOR);
  results = await db.query(
    `
  INSERT INTO users (username, password, first_name, last_name, email, is_admin)
  VALUES ('testadmin', $1, 'admin', 'user', 'admintest@user1.com', true)
  RETURNING *
  `,
    [password]
  );

  const adminUser = results.rows[0];
  adminUserToken = jwt.sign(
    { username: adminUser.username, is_admin: adminUser.is_admin },
    SECRET_KEY
  );
});

afterEach(async () => {
  await db.query(`DELETE FROM companies`);
  await db.query(`DELETE FROM users`);
  await db.query(`DELETE FROM jobs`);
});

describe("GET /companies", () => {
  test("/companies should return list of companies for authorized user", async () => {
    const response = await request(app)
      .get("/companies")
      .send({ _token: regularUserToken });
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("/companies should return 401 for unauthorized user", async () => {
    const response = await request(app).get("/companies");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });

  test("Search for company that exist using handle", async () => {
    const response = await request(app)
      .get("/companies?search=Apple")
      .send({ _token: regularUserToken });
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searchig for a company that doesn't exist shoudl return 404", async () => {
    const response = await request(app)
      .get("/companies?search=IBM")
      .send({ _token: regularUserToken });
    expect(response.status).toBe(404);
  });

  test("Searching for companies with param min_employees", async () => {
    const response = await request(app)
      .get("/companies?min_employees=1000")
      .send({ _token: regularUserToken });
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searching for companies with param max_employees", async () => {
    const response = await request(app)
      .get("/companies?max_employees=1000")
      .send({ _token: regularUserToken });
    const company = response.body.companies[0];
    expect(response.status).toBe(200);
    expect(company.handle).toBe(apple.handle);
    expect(company.name).toBe(apple.name);
  });

  test("Searching for companies with param min_employees > max_employees should return error", async () => {
    const response = await request(app)
      .get("/companies?min_employees=2000&max_employees=1000")
      .send({ _token: regularUserToken });
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
    newCompany._token = adminUserToken;
    const response = await request(app).post("/companies").send(newCompany);
    expect(response.status).toBe(201);
    expect(response.body.company.handle).toBe("IBM");
  });

  test("POST company with missing information", async () => {
    const newCompany = {
      handle: "IBM",
      num_employees: 100,
    };
    newCompany._token = adminUserToken;
    const response = await request(app).post("/companies").send(newCompany);
    expect(response.status).toBe(400);
  });

  test("POST company with missing token", async () => {
    const newCompany = {
      handle: "IBM",
      name: "International Business Machine",
      num_employees: 100,
    };
    const response = await request(app).post("/companies").send(newCompany);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("GET /companies/[handle]", () => {
  test("GET a company whose handle exist", async () => {
    const response = await request(app)
      .get(`/companies/${apple.handle}`)
      .send({ _token: regularUserToken });
    expect(response.status).toBe(200);
    expect(response.body.handle).toBe(apple.handle);
  });

  test("GET a company whose handle does not exist", async () => {
    const response = await request(app)
      .get(`/companies/IBM`)
      .send({ _token: regularUserToken });
    expect(response.status).toBe(404);
  });

  test("GET a company for unauthenticated user should return 401 status", async () => {
    const response = await request(app).get(`/companies/${apple.handle}`);
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Unauthorized");
  });
});

describe("PATCH /companies/[handle]", () => {
  test("PATCH /companies/Apple", async () => {
    let response = await request(app)
      .get(`/companies/${apple.handle}`)
      .send({ _token: adminUserToken });

    const appleComputer = response.body;

    delete appleComputer.jobs;

    appleComputer.name = "Apple Computers";
    appleComputer._token = adminUserToken;

    response = await request(app)
      .patch(`/companies/${apple.handle}`)
      .send(appleComputer);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe(appleComputer.name);
  });

  test("PATCH /companies/Apple with invalid json object", async () => {
    let response = await request(app).get(`/companies/${apple.handle}`);
    const appleComputer = response.body;
    delete appleComputer.name;
    appleComputer._token = adminUserToken;
    response = await request(app)
      .patch(`/companies/${appleComputer.handle}`)
      .send(appleComputer);
    expect(response.status).toBe(400);
  });

  test("PATCH /companies/Apple with invalid token", async () => {
    let response = await request(app)
      .get(`/companies/${apple.handle}`)
      .send({ _token: adminUserToken });

    const appleComputer = response.body;

    appleComputer.name = "Apple Computers";
    delete appleComputer.jobs;

    response = await request(app)
      .patch(`/companies/${appleComputer.handle}`)
      .send(appleComputer);
    expect(response.status).toBe(401);
  });
});

describe("DELETE /companies/[handle]", () => {
  test("DELETE a valid company", async () => {
    const response = await request(app)
      .delete(`/companies/${apple.handle}`)
      .send({ _token: adminUserToken });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("deleted");
  });

  test("DELETE an invalid company", async () => {
    const response = await request(app)
      .delete("/companies/IBM")
      .send({ _token: adminUserToken });
    expect(response.status).toBe(404);
  });
});

afterAll(async () => {
  await db.end();
});
