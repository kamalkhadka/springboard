const express = require("express");
const app = express();

const routes = require("./routes/auth");
const ExpressError = require("./expressError");
const { authenticateJWT } = require("./middleware/auth");

app.use(express.json());
app.use(authenticateJWT);
app.use("/", routes);

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);
});

app.use(function (err, req, res, next) {
  let status = err.status || 500;
  return res.status(status).json({
    error: {
      message: err.message,
      status: err.status,
    },
  });
});

module.exports = app;
