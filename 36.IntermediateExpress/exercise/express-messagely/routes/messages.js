const express = require("express");
const router = express.Router();
const { ensureLoggedIn } = require("../middleware/auth");
const Message = require("../models/message");
const ExpressError = require("../expressError");
/** GET /:id - get detail of message.
 *
 * => {message: {id,
 *               body,
 *               sent_at,
 *               read_at,
 *               from_user: {username, first_name, last_name, phone},
 *               to_user: {username, first_name, last_name, phone}}
 *
 * Make sure that the currently-logged-in users is either the to or from user.
 *
 **/
router.get("/:id", ensureLoggedIn, async (req, res, next) => {
  try {
    const { username } = req.user;

    const message = await Message.get(req.params.id);

    if (message.from_user === username || message.to_user === username) {
      return res.json({ message });
    }
    throw new ExpressError("Unauthorized", 401);
  } catch (error) {
    return next(error);
  }
});

/** POST / - post message.
 *
 * {to_username, body} =>
 *   {message: {id, from_username, to_username, body, sent_at}}
 *
 **/
router.post("/", ensureLoggedIn, async (req, res, next) => {
  try {
    const { to_username, body } = req.body;
    console.log(req.body);
    if (!to_username || !body)
      throw new ExpressError(
        "Request must be of form {to_username, body}",
        400
      );
    const from_username = req.user.username;
    if (to_username === from_username)
      throw new ExpressError("Sending messasge to self prohibited", 400);

    const message = await Message.create({ from_username, to_username, body });
    return res.json({ message });
  } catch (error) {
    return next(error);
  }
});

/** POST/:id/read - mark message as read:
 *
 *  => {message: {id, read_at}}
 *
 * Make sure that the only the intended recipient can mark as read.
 *
 **/
router.post("/:id/read", ensureLoggedIn, async (req, res, next) => {
  try {
    const { username } = req.user;
    const message = await Message.get(req.params.id);
    if (message.to_user.username === username) {
      const read = await Message.markRead(req.params.id);
      if (read) {
        return res.json({ status: "message read" });
      }
    }
    throw new ExpressError("Unauthorized", 401);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
