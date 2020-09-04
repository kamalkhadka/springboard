const fs = require("fs");
class Item {
  static findAll() {
    let jsonItems = fs.readFileSync("./items.json", "utf-8", (err, data) => {
      if (err) {
        console.log("Error reading file", err.stack);
        process.exit(1);
      }
      return data;
    });

    return jsonItems;
  }

  static async writeToFile(items) {
    fs.writeFile("./items.json", JSON.stringify(items), "utf-8", (err) => {
      if (err) {
        console.log("Something went wrong: ", err.stack);
        process.exit(1);
      }
    });
  }
}

module.exports = Item;
