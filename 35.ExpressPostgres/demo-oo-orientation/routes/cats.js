/** Cat routes for express-pg-oo */

const express = require("express");
const db = require("../db");

const Cat = require("../models/cat");

const router = new express.Router();

// IMPORTANT: all of these function bodies should really be
// wrapped in a try/catch, where catching an error calls
// next(err) --- this is omitted here for brevity in slides

/** get all cats: [{id, name, age}, ...] */

router.get("/", async function (req, res, next) {
  let cats = await Cat.getAll();
  return res.json(cats);
});

router.get("/:id", async (req, res, next) => {
  try {
    const cat = await Cat.getById(req.params.id);
    return res.json(cat);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.create(name, age);
    return res.json(cat);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    await Cat.delete(req.params.id);
    return res.json({ msg: "deleted" });
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.update(req.params.id, name, age);
    return res.json({ cat });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const cat = await Cat.makeOlder(req.params.id);
    return res.json({ cat });
  } catch (error) {
    return next(error);
  }
});


module.exports = router;
