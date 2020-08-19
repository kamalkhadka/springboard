process.env.NODE_ENV === "test";

const request = require("supertest");
const app = require("../app");
const db = require("../db");

let company;
let invoice;
beforeEach(async () => {
  const results = await db.query(
    "INSERT INTO companies (code, name, description) VALUES ('apple', 'Apple Computer', 'Maker of OSX.')"
  );
  company = results.rows[0];

  const invoices = await db.query(
    "INSERT INTO invoices (comp_Code, amt, paid, paid_date) VALUES ('apple', 100, false, null)"
  );

  invoice = invoices.rows[0];
});

afterEach(async () => {
  await db.query("DELETE * FROM invoices");
  await db.query("DELETE * FROM companies");
});



// close db connection after all test
afterAll(async () => {
  await db.end();
});
