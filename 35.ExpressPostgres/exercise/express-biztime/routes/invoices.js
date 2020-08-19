const express = require("express");
const db = require("../db");
const ExpressError = require("../expressError");
const router = express.Router();

// GET /invoices
// Returns list of invoices
router.get("/", async (req, res, next) => {
  try {
    const results = await db.query("SELECT * FROM invoices");
    return res.json({ invoices: [results.rows] });
  } catch (error) {
    return next(error);
  }
});

// GET /invoices/:id
// Returns single invoice based on id
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const results = await db.query(
      `SELECT 
            i.id, i.amt, i.paid, i.add_date, i.paid_date, c.code, c.name, c.description
        FROM invoices AS i 
            INNER JOIN companies c ON i.comp_code = c.code
        WHERE i.id = $1`,
      [id]
    );
    if (results.rows.length === 0)
      throw new ExpressError(`No Invoice with id:  ${id}.`, 404);

    const result = results.rows[0];
    const invoice = {
      id: result.id,
      amt: result.amt,
      paid: result.paid,
      add_date: result.add_date,
      company: {
        code: result.code,
        name: result.name,
        description: result.description,
      },
    };
    return res.json({ invoice: invoice });
  } catch (error) {
    return next(error);
  }
});

// POST /invoices
// Request: {comp_code, amt}
// Returns: {id, comp_code, amt, paid, add_date, paid_date}
router.post("/", async (req, res, next) => {
  try {
    const { comp_code, amt } = req.body;
    const results = await db.query(
      "INSERT INTO invoices (comp_code, amt) VALUES ($1, $2) RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [comp_code, amt]
    );
    return res.status(201).json({ invoice: results.rows[0] });
  } catch (error) {
    return next(error);
  }
});

// PUT /invoices/:id
// Request : {amt}
// Response: {id, comp_code, amt, paid, add_date, paid_date}
router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const { amt } = req.body;
    const results = await db.query(
      "UPDATE invoices SET amt = $1 WHERE id = $2 RETURNING id, comp_code, amt, paid, add_date, paid_date",
      [amt, id]
    );
    if (results.rows.length === 0)
      throw new ExpressError(`No invoice with id ${id}`);
    return res.json({ invoice: results.rows[0] });
  } catch (error) {
    return next(error);
  }
});

// DELETE /invoices/:id
// Response: {status}
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const results = await db.query(
      `DELETE FROM invoices WHERE id = $1 RETURNING comp_code`,
      [id]
    );
    if (results.rows.length === 0)
      throw new ExpressError(`No invoice with id ${id}`, 404);
    return res.json({ status: "deleted" });
  } catch (error) {
    return next(error);
  }
});
module.exports = router;
