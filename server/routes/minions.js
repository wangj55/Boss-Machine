const express = require("express");
const router = express.Router();
const db = require("../db");

const workRouter = require("./work");
router.use("/:minionId/work", workRouter);

const model = "minions";

router.param("minionId", (req, res, next, id) => {
    const found = db.getFromDatabaseById(model, id);
    if (found) {
        req.minionId = id;
        next();
    } else {
        res.status(404).send();
    }
});

router.get("", (req, res) => {
    res.send(db.getAllFromDatabase(model));
});

router.get("/:minionId", (req, res) => {
    res.send(db.getFromDatabaseById(model, req.minionId));
});

router.post("", (req, res) => {
    const newItem = db.addToDatabase(model, req.body);
    if (newItem) {
        res.status(201).send(newItem);
    } else {
        res.status(500).send();
    }
});

router.put("/:minionId", (req, res) => {
    res.send(db.updateInstanceInDatabase(model, req.body));
});

router.delete("/:minionId", (req, res) => {
    const deleted = db.deleteFromDatabasebyId(model, req.minionId);
    if (deleted) {
        res.status(204).send();
    }
});


module.exports = router;