const { request, json } = require("express");

const express = require("express");
const router = express.Router();
const Company = require("../models/company");
const jsonschema = require("jsonschema");
const postCompany = require("../schemas/postCompany.json");
const ExpressError = require("../helpers/expressError");
const updateCompany = require("../schemas/updateCompany.json");
const Job = require("../models/job");
const { ensureLoggedIn, ensureAdmin } = require("../middleware/auth");

// GET /companies
// return handle and name for all of the company objects
router.get("/", ensureLoggedIn, async (req, res, next) => {
  try {
    let companies;
    const { search, min_employees, max_employees } = req.query;
    if (search || min_employees || max_employees) {
      companies = await Company.findAllSearch(
        search,
        min_employees,
        max_employees
      );
    } else {
      companies = await Company.findAll();
    }
    return res.json({ companies });
  } catch (error) {
    return next(error);
  }
});

// POST /companies
// validates the request body before creating a company
router.post("/", ensureAdmin, async (req, res, next) => {
  try {
    const validate = jsonschema.validate(req.body, postCompany);
    if (!validate.valid) {
      return next(
        new ExpressError(
          validate.errors.map((err) => err.stack),
          400
        )
      );
    }
    const company = await Company.create(req.body);
    return res.status(201).json({ company });
  } catch (error) {
    return next(error);
  }
});

// GET /companies/[handle]
// return single company found by handle
router.get("/:handle",ensureLoggedIn, async (req, res, next) => {
  try {
    const company = await Company.findByHandle(req.params.handle);
    const jobs = await Job.findAllByHandle(req.params.handle);
    company.jobs = jobs;
    return res.json(company);
  } catch (error) {
    return next(error);
  }
});

// PATCH /companies/[handle]
// This method validates the json sent in request body with jsonschema
// if json validation passes then it uses the handle property value to find the company
// if company is found then only updates the company otherwise returns 404 with a message
router.patch("/:handle", ensureAdmin, async (req, res, next) => {
  try {
    const updatedCompany = req.body;
    const validator = jsonschema.validate(updatedCompany, updateCompany);

    if (!validator.valid) {
      return next(
        new ExpressError(
          validator.errors.map((err) => err.stack),
          400
        )
      );
    }

    const company = await Company.findByHandle(req.params.handle);

    if (!company)
      throw new ExpressError(
        `Company not found with handle ${req.params.handle}`,
        404
      );
    await company.update(updatedCompany);

    return res.json(company);
  } catch (error) {
    return next(error);
  }
});

// DELETE /companies/:handle
router.delete("/:handle", ensureAdmin, async (req, res, next) => {
  try {
    const company = await Company.findByHandle(req.params.handle);
    const message = await company.delete();
    return res.json(message);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
