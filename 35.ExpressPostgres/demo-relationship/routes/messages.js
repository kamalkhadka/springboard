/** Routes for messages of pg-relationships-demo. */

const db = require("../db");
const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const results = await db.query(
      `SELECT m.id, m.msg, t.tag
      FROM messages AS m
      LEFT JOIN messages_tags AS mt
      ON m.id = mt.message_id
      LEFT JOIN tags AS t
      ON mt.tag_code = t.code
      WHERE m.id = $1;`,
      [id]
    );
    if (results.rows.length === 0)
      throw new ExpressError("Message not found", 404);
    const { mId, msg } = results.rows[0];
    const tags = results.rows.map((r) => r.tag);
    return res.send({ mId, msg, tags });
  } catch (e) {
    return next(e);
  }
});

module.exports = router;
