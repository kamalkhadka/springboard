/** Cat model.
 *
 * These is an example of a simple "collection-of-static-methods"
 * model. It helps get SQL out of routes, but doesn't provide
 * state. You never actually instantiate a Cat.
 *
 * */

const db = require("../db");
const ExpressError = require("../expressError");

class Cat {
  static async getAll() {
    const results = await db.query("SELECT id, name, age FROM cats");
    return results.rows;
  }

  static async getById(id) {
    const result = await db.query(`SELECT id,name, age FROM cats WHERE id=$1`, [
      id,
    ]);
    if (result.rows.length === 0) throw new ExpressError("Cat not found", 404);
    return result.rows[0];
  }

  static async create(name, age) {
    if (!name || !age) throw new ExpressError("Missing required data", 400);
    const result = await db.query(
      `INSERT INTO cats (name, age) VALUES ($1, $2) RETURNING id,name,age`,
      [name, age]
    );
    return result.rows[0];
  }

  static async delete(id) {
    const result = await db.query(`DELETE FROM cats WHERE id=$1`, [id]);
  }

  static async update(id, newName, newAge) {
    const results = await db.query(
      `UPDATE cats SET name = $1, age = $2 
      WHERE id = $3 RETURNING id, name, age`,
      [newName, newAge, id]
    );
    if (results.rows.length === 0) throw new ExpressError("Cat not found", 404);
    return results.rows[0];
  }

  static async makeOlder(id) {
    const results = await db.query(
      `UPDATE cats SET age = age + 1 
      WHERE id = $1 RETURNING id, name, age`,
      [id]
    );
    if (results.rows.length === 0) throw new ExpressError("Cat not found", 404);
    return results.rows[0];
  }
}

module.exports = Cat;
