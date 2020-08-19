const express = require("express");
const router = express.Router();
const db = require("../db");
const ExpressError = require("../expressError");

router.get("/", async (req, res, next) => {
  try {
    const results = await db.query(`SELECT * FROM companies;`);
    return res.send({ companies: results.rows });
  } catch (e) {
    return next(e);
  }
});

router.get("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query(
      `SELECT code, name, description FROM companies WHERE code = $1`,
      [code]
    );
    if (results.rows.length === 0)
      throw new ExpressError(`Can't find company with code ${code}`, 404);

    let company = results.rows[0];
    const invoices = await db.query(
      `SELECT * FROM invoices WHERE comp_code = $1`,
      [company.code]
    );
    const resp = {
      code: company.code,
      name: company.name,
      description: company.description,
      invoices: invoices.rows,
    };

    return res.json({ company: resp });
  } catch (e) {
    return next(e);
  }
});

// Expects json msg {code: xx, name: xx, description: xx} returns obj of new company
router.post("/", async (req, res, next) => {
  try {
    const { code, name, description } = req.body;
    const result = await db.query(
      "INSERT INTO companies (code, name, description) VALUES ($1, $2, $3) RETURNING code, name, description",
      [code, name, description]
    );
    return res.status(201).json({ company: result.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// PUT /companies/:code
// Request Body:  { name, description }
// Respose Body:  {code, name, description}
router.put("/:code", async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { code } = req.params;
    const results = await db.query(
      `UPDATE companies SET name = $1, description = $2 WHERE code = $3 RETURNING code, name, description`,
      [name, description, code]
    );
    if (results.rows.length === 0)
      throw new ExpressError(`Can't find company with code ${code}`, 404);
    return res.json({ company: results.rows[0] });
  } catch (err) {
    return next(err);
  }
});

// DELETE /companies/:code
router.delete("/:code", async (req, res, next) => {
  try {
    const { code } = req.params;
    const results = await db.query(
      "DELETE FROM companies WHERE code = $1 RETURNING code",
      [code]
    );

    if (results.rows.length === 0)
      throw new ExpressError(`Can't find a company with code ${code}`, 404);

    return res.json({ status: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
