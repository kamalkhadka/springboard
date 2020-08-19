const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const db = require("../db");

// GET /invoices
// Return: {invoices: {id, comp_code}, ...}
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT id, comp_code FROM invoices");
    return res.json({ invoices: results.rows });
  } catch (err) {
    return next(err);
  }
});

// GET /invoices/:id
// Return: {invoice: {id, amt, paid, add_date, paid_date, company: {code, name, description}}}
// 404 if invoice not found
router.get("/:id", async (req, res, next) => {
  try {
    const results = await db.query(
      `SELECT id, amt, paid, add_date, paid_date, comp_code FROM invoices WHERE id=$1`,
      [req.params.id]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Invoice not found", 404);
    const invoice = results.rows[0];
    const cResults = await db.query(
      `SELECT code, name, description FROM companies WHERE code=$1`,
      [invoice.comp_code]
    );
    invoice.company = cResults.rows[0];
    delete invoice.comp_code;
    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

// POST /invoices
// Return: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      `INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [comp_code, amt]
    );
    const invoice = results.rows[0];
    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

// PUT /invoices/:id
// Return: {invoice: {id, comp_code, amt, paid, add_date, paid_date}}
// 404 if invoice not found by id
router.put("/:id", async (req, res, next) => {
  try {
    const { amt } = req.body;
    const results = await db.query(
      `UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING id, comp_code, amt, paid, add_date, paid_date`,
      [amt, req.params.id]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Invoice not found", 404);
    const invoice = results.rows[0];
    return res.json({ invoice });
  } catch (err) {
    return next(err);
  }
});

// DELETE /invoices/:id
// Return: {status: "deleted"}
// 404 if invoice not found by id
router.delete("/:id", async (req, res, next) => {
  try {
    const results = await db.query(
      `DELETE FROM invoices WHERE id=$1 RETURNING id`,
      [req.params.id]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Inovice not found", 404);
    return res.json({ stauts: "deleted" });
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
