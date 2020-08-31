/** Express app for jobly. */

const express = require("express");

const ExpressError = require("./helpers/expressError");

const morgan = require("morgan");
const { authenticateJWT } = require("./middleware/auth");
const app = express();

app.use(express.json());

// add logging system
app.use(
  morgan("tiny", { skip: (req, res) => process.env.NODE_ENV === "test" })
);

app.use(authenticateJWT);

const companiesRoutes = require("./routes/companies");
const jobsRoutes = require("./routes/jobs");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

app.use(authRoutes);
app.use("/companies", companiesRoutes);
app.use("/jobs", jobsRoutes);
app.use("/users", userRoutes);
/** 404 handler */

app.use(function (req, res, next) {
  const err = new ExpressError("Not Found", 404);

  // pass the error to the next piece of middleware
  return next(err);
});

/** general error handler */

app.use(function (err, req, res, next) {
  res.status(err.status || 500);

  return res.json({
    status: err.status,
    message: err.message,
  });
});

module.exports = app;
