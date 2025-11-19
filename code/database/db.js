const models = require("./models");
const express = require("express");
const router = express.Router();
const { Sequelize } = require("sequelize");


async function initialize() {
    try {
    await models.sequelize.sync({ alter: true });
    } catch (err) {
    console.log(err);
  }
}

// Sincronizar todos los modelos con la base de datos
router.head("/sync", async function (req, res) {
  await initialize();
  res.json();
});

module.exports = router;