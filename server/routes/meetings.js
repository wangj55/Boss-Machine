const express = require("express");
const meetingsRouter = express.Router();
const db = require("../db");

meetingsRouter.get("", (req, res) => {
    res.send(db.getAllFromDatabase("meetings"));
});

module.exports = meetingsRouter;