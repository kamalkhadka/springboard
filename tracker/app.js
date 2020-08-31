const express = require("express");
const app = express();
const morgan = require("morgan");

const indexRoutes = require("./routes/indexRoutes");

const ExpressError = require("./expressError");

app.use(morgan("tiny"));

app.use(express.json());
app.use(express.static("public"));


app.use((req, res, next) => {
  const err = new ExpressError("Not found", 404);
  return next(err);
});

app.use((err, req, res, next) => {
  res.status = err.status || 500;
  return res.json(err);
});

module.exports = app;
