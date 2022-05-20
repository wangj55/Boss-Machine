const express = require("express");
const minionsRouter = express.Router();
const db = require("../db");

minionsRouter.get("", (req, res) => {
    res.send(db.getAllFromDatabase("minions"));
});

module.exports = minionsRouter;