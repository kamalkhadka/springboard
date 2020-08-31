const express = require("express");
const router = express.Router();
const User = require("../models/user");
const validator = require("jsonschema");
const postUser = require("../schemas/postUser.json");
const updateUser = require("../schemas/updateUser.json");
const ExpressError = require("../helpers/expressError");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const { ensureLoggedIn } = require("../middleware/auth");

router.post("/", async (req, res, next) => {
  try {
    const newUser = req.body;
    const validateUser = validator.validate(newUser, postUser);
    if (!validateUser.valid)
      throw new ExpressError(validateUser.errors.map((err) => err.stack));
    const user = await User.create(newUser);
    const payload = { username: user.username, is_admin: user.is_admin };
    const _token = jwt.sign(payload, SECRET_KEY);
    return res.json({ _token });
  } catch (error) {
    return next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.findAll();
    return res.json({ users });
  } catch (error) {
    return next(error);
  }
});

router.get("/:username", async (req, res, next) => {
  try {
    const user = await User.findByUsername(req.params.username);
    if (!user) throw ExpressError("User not found", 404);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    if (req.user.username != req.params.username)
      throw new ExpressError("Unauthorized", 400);
    const validateUser = validator.validate(req.body, updateUser);
    if (!validateUser.valid)
      return next(
        new ExpressError(
          validateUser.errors.map((err) => err.stack),
          400
        )
      );
    const user = await User.update(req.params.username, req.body);
    return res.json({ user });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:username", ensureLoggedIn, async (req, res, next) => {
  try {
    if (req.user.username != req.params.username)
      throw new ExpressError("Unauthorized", 400);
    const message = await User.delete(req.params.username);
    if (!message) return next(new ExpressError("User not found", 404));
    return res.json({ message });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
