const db = require("../db");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");
const sqlForPartialUpdate = require("../helpers/partialUpdate");
const ExpressError = require("../helpers/expressError");

class User {
  static async create(user) {
    if (await User.findByUsername(user.username))
      throw new ExpressError("Username already taken", 400);

    const hashedPassword = await bcrypt.hash(user.password, BCRYPT_WORK_FACTOR);
    //   if(!user.photo_url) user.photo_url = null;
    const result = await db.query(
      `
      INSERT INTO users
      (username, password, first_name, last_name, email, photo_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING username, first_name, last_name, email, is_admin`,
      [
        user.username,
        hashedPassword,
        user.first_name,
        user.last_name,
        user.email,
        user.photo_url,
      ]
    );

    return result.rows[0];
  }

  static async findAll() {
    const results = await db.query(`
      SELECT username, first_name, last_name, email
      FROM users
      `);

    return results.rows;
  }

  static async findByUsername(username) {
    const results = await db.query(
      `SELECT username, first_name, last_name, email, photo_url
            FROM users
            WHERE username = $1`,
      [username]
    );

    const user = results.rows[0];
    return user;
  }

  static async update(username, user) {
    const { query, values } = sqlForPartialUpdate(
      "users",
      user,
      "username",
      username
    );
    const results = await db.query(query, values);
    const updatedUser = results.rows[0];
    delete updatedUser.password;
    return updatedUser;
  }

  static async delete(username) {
    const results = await db.query(
      `
      DELETE FROM users 
      WHERE username = $1 
      RETURNING username
      `,
      [username]
    );
    if (results.rows.length === 1) return "User deleted";
  }

  static async authenticate(username, password) {
    let user = await User.findByUsername(username);
    if (!user) throw new ExpressError("Invalid username / password", 404);
    const userInfo = await db.query(
      `SELECT password, is_admin FROM users WHERE username = $1`,
      [username]
    );
    user = userInfo.rows[0];
    if (await bcrypt.compare(password, user.password)) {
      return { username: username, is_admin: user.is_admin };
    }
  }
}

module.exports = User;
