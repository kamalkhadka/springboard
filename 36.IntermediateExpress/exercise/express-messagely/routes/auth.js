const express = require("express");
const User = require("../models/user");
const ExpressError = require("../expressError");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");

/** POST /login - login: {username, password} => {token}
 *
 * Make sure to update their last-login!
 *
 **/
router.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (await User.authenticate(username, password)) {
      await User.updateLoginTimestamp(username);
      const _token = jwt.sign({ username }, SECRET_KEY);
      return res.json({ _token });
    } else {
      throw new ExpressError("Unable to authenticate", 400);
    }
  } catch (error) {
    return next(error);
  }
});

/** POST /register - register user: registers, logs in, and returns token.
 *
 * {username, password, first_name, last_name, phone} => {token}.
 *
 *  Make sure to update their last-login!
 */
router.post("/register", async (req, res, next) => {
  try {
    const { username, password, first_name, last_name, phone } = req.body;
    if (!username || !password || !first_name || !last_name || !phone)
      throw new ExpressError(
        "Request body missing info: {username, password, first_name, last_name, phone",
        401
      );

    const user = await User.register({
      username,
      password,
      first_name,
      last_name,
      phone,
    });
    if (!user) throw new ExpressError("Couldn't register user. Try again", 401);

    const _token = jwt.sign({ username }, SECRET_KEY);
    User.updateLoginTimestamp(username);
    return res.json({ _token });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
