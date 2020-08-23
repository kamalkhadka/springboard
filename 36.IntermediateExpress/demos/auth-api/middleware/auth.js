const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../expressError");

function authenticateJWT(req, res, next) {
  try {
    const payload = jwt.verify(req.body._token, SECRET_KEY);
    req.user = payload;
    console.log(payload);
    console.log("You have a valid token");
    return next();
  } catch (error) {
    return next();
  }
}

function ensureLoggedIn(req, res, next) {
  if (!req.user) {
    const e = new ExpressError("Unauthorize", 401);
    return next(e);
  } else {
    return next();
  }
}

function ensureAdmin(req, res, next) {
  if (!req.user || req.user.type !== "Admin")
    return next(new ExpressError("Must be and admin", 401));

  return next();
}

module.exports = { authenticateJWT, ensureLoggedIn, ensureAdmin };
