const express = require("express");
const ExpressErorr = require("./expressErrors");
const { mean, mode, median, validateNums } = require("./central");

const app = express();

app.use(express.json());

app.get("/mean", (req, res, next) => {
  if (!req.query.nums) throw new ExpressError("Missing query param nums", 400);
  try {
    let nums = req.query.nums.split(",");
    nums = validateNums(nums);
    return res.json({
      response: {
        operation: "mean",
        value: mean(nums),
      },
    });
  } catch (e) {
    next(e);
  }
});

app.get("/median", (req, res, next) => {
  if (!req.query.nums) throw new ExpressError("Missing query param nums", 400);
  try {
    let nums = req.query.nums.split(",");
    nums = validateNums(nums);
    return res.json({
      response: {
        operation: "median",
        value: median(nums),
      },
    });
  } catch (e) {
    next(e);
  }
});

app.get("/mode", (req, res, next) => {
  if (!req.query.nums) throw new ExpressError("Missing query param nums", 400);
  try {
    let nums = req.query.nums.split(",");
    nums = validateNums(nums);
    return res.json({
      response: {
        operation: "mode",
        value: mode(nums),
      },
    });
  } catch (e) {
    next(e);
  }
});

app.use("/all", (req, res, next) => {
  try {
    let nums = req.query.nums.split(",");
    nums = validateNums(nums);
    return res.json({
      response: {
        operation: "all",
        mean: mean(nums),
        median: median(nums),
        mode: mode(nums),
      },
    });
  } catch (error) {
    return next(error);
  }
});

app.use((error, req, res, next) => {
  console.log(error.message);
  return res.status(error.status).json({ msg: error.message });
});

app.listen(3000, () => {
  console.log("App started");
});
