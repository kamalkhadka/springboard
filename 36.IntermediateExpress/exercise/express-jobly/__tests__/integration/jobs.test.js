process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const Company = require("../../models/company");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");
const { update } = require("../../models/job");

let job;
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
  const apple = results.rows[0];

  results = await db.query(`
    INSERT INTO jobs (title, salary, equity, company_handle)
    VALUES ('Software Developer', 10000, 0.1, '${apple.handle}')
    RETURNING *
  `);

  job = results.rows[0];

  let password = await bcrypt.hash("testadmin", BCRYPT_WORK_FACTOR);
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

afterAll(async () => {
  await db.end();
});

describe("GET /jobs", () => {
  test("Respond with list of jobs for authenticated user", async () => {
    const response = await request(app)
      .get("/jobs")
      .send({ _token: adminUserToken });

    expect(response.status).toBe(200);
    expect(response.body.jobs.length).toEqual(1);
  });

  test("Search for job by job title", async () => {
    const response = await request(app)
      .get("/jobs?search=Software Developer")
      .send({ _token: adminUserToken });
    expect(response.status).toBe(200);
    expect(response.body.jobs[0].title).toEqual("Software Developer");
  });
});

describe("POST /jobs allowed to admins only", () => {
  const newJob = {
    title: "Business Analyst",
    salary: 70000,
    equity: 0.01,
    company_handle: "Apple",
  };

  test("Post a valid job", async () => {
    newJob._token = adminUserToken;
    const response = await request(app).post("/jobs").send(newJob);
    expect(response.status).toBe(201);
  });

  test("Post a job with missing information", async () => {
    newJob._token = adminUserToken;
    delete newJob.title;
    const response = await request(app).post("/jobs").send(newJob);
    expect(response.status).toBe(400);
  });
});

describe("GET /jobs/:id", () => {
  test("Get job with valid id", async () => {
    const response = await request(app)
      .get(`/jobs/${job.id}`)
      .send({ _token: adminUserToken });
    expect(response.status).toBe(200);
    expect(response.body.job.title).toEqual(job.title);
  });

  test("Invalid job id should return 404", async () => {
    const response = await request(app)
      .get(`/jobs/100`)
      .send({ _token: adminUserToken });
    expect(response.status).toBe(404);
  });
});

describe("PATCH /jobs/:id", () => {
  test("Path a job with valid id", async () => {
    const updatedJob = { title: "Business Analyst" };
    updatedJob._token = adminUserToken;
    const response = await request(app)
      .patch(`/jobs/${job.id}`)
      .send(updatedJob);
    expect(response.status).toBe(200);
    expect(response.body.job.title).toEqual("Business Analyst");
  });
});

describe("DELETE /jobs/:id", () => {
  test("Delete a job with valid id", async () => {
    const response = await request(app)
      .delete(`/jobs/${job.id}`)
      .send({ _token: adminUserToken });
    expect(response.status).toBe(200);
    expect(response.body.message).toEqual(expect.any(String));
  });
});
