const express = require("express");
const router = express.Router();
const users = require('./user.controller');

router.put("/:id", users.update);
router.post("/", users.create);
router.get("/", users.get);
router.delete("/", users.remove);

module.exports = router