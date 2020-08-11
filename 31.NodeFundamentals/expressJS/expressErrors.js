const express = require("express");
const ExpressError = require("./error");

const app = express();

app.use(express.json());

function attemptToSaveToDB() {
  throw "Connection Error!";
}

const USERS = [
  { username: "StacysMom", city: "Reno" },
  { usename: "Roslia", city: "R" },
];

app.get("/users/:username", function (req, res, next) {
  try {
    const user = USERS.find((u) => u.username === req.params.username);
    if (!user) throw new ExpressError("Invalid username", 404);
    return res.send({ user });
  } catch (e) {
    next(e);
  }
});

app.get("/savetodb", (req, res) => {
  attemptToSaveToDB();
  res.send("SAVED TO DB!");
});

app.use((error, req, res, next) => {
//   console.log(error.message);
  res.status(error.status).send(error.msg);
});

app.listen(3000, () => {
  console.log("App started");
});
