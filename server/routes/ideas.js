const express = require("express");
const ideasRouter = express.Router();
const db = require("../db");

ideasRouter.get("", (req, res) => {
    res.send(db.getAllFromDatabase("ideas"));
});

module.exports = ideasRouter;