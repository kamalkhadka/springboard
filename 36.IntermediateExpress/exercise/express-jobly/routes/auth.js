const express = require("express");
const router = express.Router();
const { SECRET_KEY, BCRYPT_WORK_FACTOR } = require("../config");
const jwt = require("jsonwebtoken");
const ExpressError = require("../helpers/expressError");
const User = require("../models/user");

router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password)
      throw new ExpressError("Missing username / password", 400);
    const payload = await User.authenticate(username, password);
    const _token = jwt.sign(payload, SECRET_KEY);
    return res.json({ _token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
