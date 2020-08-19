const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const db = require("../db");

// GET /companies
// Return: {companies: [{code, name}, ...]}
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT code, name FROM companies");
    return res.json({ companies: results.rows });
  } catch (err) {
    return next(err);
  }
});

// GET /companies/:code
// Return: obj of company {company: {code, name, description}}
// 404 if the company cannot be found
router.get("/:code", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT code, name, description FROM companies WHERE code = $1`,
      [req.params.code]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Company not found", 404);

    const company = results.rows[0];
    const iResults = await db.query(
      `SELECT id, amt, paid, add_date, paid_date FROM invoices WHERE comp_code = $1`,
      [company.code]
    );

    company.invoices = iResults.rows;

    return res.json({ company });
  } catch (err) {
    return next(err);
  }
});

// POST /companies {code, name, description}
// Return: obj of new company {company: {code, name, description}}
router.post("/", async (req, res, next) => {
  try {
    const { code, name, description } = req.body;
    const results = await db.query(
      `INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description`,
      [code, name, description]
    );

    return res.status(201).json({ company: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// DELETE /companies/:code
// Return {status: "deleted"}
// 404 if company cannot be found
router.delete("/:code", async (req, res, next) => {
  try {
    const results = await db.query(
      `DELETE FROM companies WHERE code=$1 RETURNING code`,
      [req.params.code]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Company not found", 404);
    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
