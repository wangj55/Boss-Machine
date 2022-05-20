const express = require("express");
const router = express.Router();
const db = require("../db");

router.param("minionId", (req, res, next, id) => {
    const found = db.getFromDatabaseById("minions", id);
    if (found) {
        req.minionId = id;
        next();
    } else {
        res.status(404).send();
    }
});

router.get("", (req, res) => {
    res.send(db.getAllFromDatabase("minions"));
});

router.get("/:minionId", (req, res) => {
    res.send(db.getFromDatabaseById("minions", req.minionId));
});

router.post("", (req, res) => {
    const newItem = db.addToDatabase("minions", req.body);
    if (newItem) {
        res.status(201).send(newItem);
    } else {
        res.status(500).send();
    }
});

router.put("/:minionId", (req, res) => {
    res.send(db.updateInstanceInDatabase("minions", req.body));
});

router.delete("/:minionId", (req, res) => {
    const deleted = db.deleteFromDatabasebyId("minions", req.minionId);
    if (deleted) {
        res.status(204).send();
    }
});


module.exports = router;