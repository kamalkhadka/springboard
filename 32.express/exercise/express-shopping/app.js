const express = require("express");
const userRoutes = require("./routes/items");
const ExpressError = require("./expressError");

app = express();

app.use(express.json());
app.use("/items", userRoutes);

// 404 handler
app.use((req, res, next) => {
  throw new ExpressError("Not Found", 404);
});

// generic handler
app.use((error, req, res, next) => {
  return res.status(error.status).json({ message: error.message });
});

module.exports = app;
