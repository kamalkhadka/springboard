/** Dog routes for express-pg-oo */

const express = require("express");

const Dog = require("../models/dog");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides

/** get all dogs: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  try {
    let dogs = await Dog.getAll();
    return res.json({ dogs });
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async function (req, res, next) {
  try {
    let dog = await Dog.getById(req.params.id);
    return res.json({ dog });
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    let dog = await Dog.create(name, age);
    return res.json({ dog });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    await dog.remove();
    return res.json({msg: "deleted"});
  } catch (error) {
    return next(error);
  }
});


router.patch("/:id/age", async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    dog.age += 1;
    await dog.save();
    return res.json({dog});
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
