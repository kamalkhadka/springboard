const express = require("express");
const router = express.Router();
const ExpressError = require("../expressError");
const { BCRYPT_WORK_FACTOR, SECRET_KEY } = require("../config");
const jwt = require("jsonwebtoken");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

const db = require("../db");
const bcrypt = require("bcrypt");

router.get("/", (req, res, next) => {
  res.send("APP IS WORKING");
});

router.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ExpressError("Username and password required", 400);
    // hash password
    const hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);

    // save to db
    const results = await db.query(
      `INSERT INTO users (username, password) 
       VALUES ($1, $2)
       RETURNING username
            `,
      [username, hashedPassword]
    );

    return res.json(results.rows[0]);
  } catch (error) {
    if (error.code === "23505") {
      return next(new ExpressError("Username taken. Please pick another", 404));
    }
    return next(error);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      throw new ExpressError("Username and password required", 400);

    const results = await db.query(
      `SELECT username, password 
            FROM users 
            WHERE username = $1`,
      [username]
    );

    const user = results.rows[0];

    if (user) {
      if ((await bcrypt.compare(password, user.password)) === true) {
        // return res.json({msg: "Logged in"});
        const token = jwt.sign({ username, type: "Admin" }, SECRET_KEY);
        return res.json({ message: "Logged in", token });
      }
    }

    throw new ExpressError("Invalid username/password", 400);
  } catch (e) {
    return next(e);
  }
});

router.get("/topsecret", ensureLoggedIn, (req, res, next) => {
  try {
    return res.json({ message: "Signed in. This is top secret." });
  } catch (error) {
    return next(error);
  }
});

router.get("/private", ensureLoggedIn, (req, res, next) => {
  res.json({ msg: `Welcome to my VIP section, ${req.user.username}` });
});

router.get("/adminhome", ensureAdmin, (req, res, next) => {
  return res.json({ msg: "Admin Dashboard" });
});

module.exports = router;
