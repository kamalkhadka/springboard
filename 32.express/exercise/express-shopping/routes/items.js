const express = require("express");
const ExpressError = require("../expressError");

const router = new express.Router();

const items = require("../fakeDB");

router.get("/", function (req, res) {
  res.json(items);
});

router.post("/", (req, res) => {
  const item = { name: req.body.name, price: req.body.price };
  if(!(req.body.name || req.body.price)) throw new ExpressError("Post body is required", 404);
  items.push(item);
  res.status(201).json(item);
});

router.get("/:name", (req, res) => {
  const item = items.find((item) => item.name === req.params.name);
  if (!item) throw new ExpressError("Item not found", 404);
  res.json(item);
});

router.patch("/:name", (req, res) => {
  const item = items.find((item) => item.name === req.params.name);
  if (!item) throw new ExpressError("Item not found", 404);
  item.name = req.body.name;
  item.price = req.body.price;

  res.json({ updated: item });
});

router.delete("/:name", (req, res) => {
  const item = items.findIndex((item) => item.name === req.params.name);
  if (item < 0) throw new ExpressError("Item not found", 404);
  items.splice(item, 1);
  res.json({ message: "Deleted" });
});

module.exports = router;
