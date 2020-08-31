const express = require("express");
const db = require("../db");
const Job = require("../models/job");
const jsonschema = require("jsonschema");
const postJob = require("../schemas/postJob.json");
const updateJob = require("../schemas/updateJob.json");
const ExpressError = require("../helpers/expressError");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

const router = express.Router();

router.post("/", ensureAdmin, async (req, res, next) => {
  try {

    const validator = jsonschema.validate(req.body, postJob);
    if (!validator.valid)
      throw new ExpressError(
        validator.errors.map((err) => err.stack),
        400
      );
    const job = await Job.create(req.body);
    return res.status(201).json({ job });
  } catch (error) {
    return next(error);
  }
});

router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const jobs = await Job.findAll(req.query);
    return res.json({ jobs });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) throw new ExpressError("Not a valid job id", 404);
    return res.json({ job });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const validator = jsonschema.validate(req.body, updateJob);
    if (!validator.valid) throw new ExpressError("Not a valid request", 400);
    const job = await Job.update(req.params.id, req.body);
    if (!job) throw new ExpressError("Not a valid id", 404);
    return res.json({ job });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", ensureAdmin, async (req, res, next) => {
  try {
    const message = await Job.delete(req.params.id);
    if (!message) throw new ExpressError("Not valid id", 404);
    return res.json({ message });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
