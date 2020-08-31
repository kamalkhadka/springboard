const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config");
const ExpressError = require("../helpers/expressError");

function authenticateJWT(req, res, next) {
  try {
    if (req.body._token) {
      const payload = jwt.verify(req.body._token, SECRET_KEY);
      req.user = payload;
    }
    return next();
  } catch (error) {
    return next(error);
  }
}

function ensureLoggedIn(req, res, next) {
  try {
    if (!req.user) return next(new ExpressError("Unauthorized", 401));
    return next();
  } catch (error) {
    return next(error);
  }
}

function ensureAdmin(req, res, next) {
  if (!req.user || !req.user.is_admin)
    return next(new ExpressError("Unauthorized", 401));

  return next();
}

module.exports = { authenticateJWT, ensureLoggedIn, ensureAdmin };
