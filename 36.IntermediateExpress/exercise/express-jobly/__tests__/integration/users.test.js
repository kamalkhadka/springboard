process.env.NODE_ENV = "test";

const request = require("supertest");
const app = require("../../app");
const db = require("../../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../../config");
const jwt = require("jsonwebtoken");
const { update } = require("../../models/job");

let regularUser;
let regularUserToken;

beforeEach(async () => {
  let password = await bcrypt.hash("test", BCRYPT_WORK_FACTOR);
  let results = await db.query(
    `
  INSERT INTO users (username, password, first_name, last_name, email, is_admin)
  VALUES ('testuser', $1, 'user1', 'lyod', 'test@user1.com', false)
  RETURNING *
  `,
    [password]
  );

  regularUser = results.rows[0];
  regularUserToken = jwt.sign(
    { username: regularUser.username, is_admin: regularUser.is_admin },
    SECRET_KEY
  );
});

afterEach(async () => {
  await db.query(`DELETE FROM users`);
});

describe("GET /users", () => {
  test("/users should return list of users", async () => {
    const response = await request(app).get("/users");
    const user = response.body.users[0];
    expect(response.status).toBe(200);
    expect(user.username).toBe(regularUser.username);
  });
});

describe("GET /users/:handle", () => {
  test("Get a valid user", async () => {
    const response = await request(app).get(`/users/${regularUser.username}`);
    expect(response.status).toBe(200);
    expect(response.body.user.username).toBe(regularUser.username);
  });

  test("Trying to get an invalid user should return 404", async () => {
    const response = await request(app).get(`/users/user1`);
    expect(response.status).toBe(404);
  });
});

describe("POST /users", () => {
  let newUser = {
    username: "user1",
    password: "hello",
    first_name: "ufirst",
    last_name: "ulast",
    email: "ufirst@test.com",
  };
  test("Post a valid user", async () => {
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(201);
    expect(response.body._token).toEqual(expect.any(String));
  });

  test("Post a user with duplicate username", async () => {
    let response = await request(app).post("/users").send(newUser);
    response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(400);
  });

  test("Post invalid use json object", async () => {
    delete newUser.password;
    const response = await request(app).post("/users").send(newUser);
    expect(response.status).toBe(400);
  });
});

describe("PATCH /users/:username", () => {
  test("PATCH a user with a valid json object", async () => {
    let updateUserInfo = { first_name: "testuser" };
    updateUserInfo._token = regularUserToken;
    const response = await request(app)
      .patch(`/users/${regularUser.username}`)
      .send(updateUserInfo);
    expect(response.status).toBe(200);
    expect(response.body.user.first_name).toBe("testuser");
  });

  test("PATCH should not be allowd to any user", async () => {
    let updateUserInfo = { first_name: "testuser" };
    updateUserInfo._token = regularUserToken;
    const response = await request(app)
      .patch(`/users/test`)
      .send(updateUserInfo);
    expect(response.status).toBe(400);
  });
});

describe("DELETE /users/:username", () => {
  test("DELETE a user with a valid token", async () => {
    const response = await request(app)
      .delete(`/users/${regularUser.username}`)
      .send({ _token: regularUserToken });
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("User deleted");
  });

  test("DELETE should not be allowed to any user", async () => {
    const response = await request(app)
      .delete(`/users/test`)
      .send({ _token: regularUserToken });
    expect(response.status).toBe(400);
  });
});

afterAll(async () => {
  await db.end();
});
