const Item = require("./item")

global.items = JSON.parse(Item.findAll());

module.exports = items;
