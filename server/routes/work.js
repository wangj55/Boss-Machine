const express = require("express");
const router = express.Router({mergeParams: true});
const db = require("../db");

const model = "work";

const checkAligned = (req, res, next) => {
    const found = db.getFromDatabaseById(model, req.workId);
    if (req.minionId === found.minionId) {
        next();
    } else {
        res.status(400).send();
    }
};

router.param("workId", (req, res, next, id) => {
    const found = db.getFromDatabaseById(model, id);
    if (found) {
        req.workId = id;
        next();
    } else {
        res.status(404).send();
    }
});

router.get("", (req, res) => {
    const found = db.getAllFromDatabase(model).filter(work => work.minionId === req.minionId);
    if (found) {
        res.send(found);
    }
});

router.post("", (req, res) => {
    const saved = db.addToDatabase(model, req.body);
    if (saved) {
        res.status(201).send(saved);
    } else {
        res.status(500).send();
    }
});

router.put("/:workId", checkAligned, (req, res) => {
    const updated = db.updateInstanceInDatabase(model, req.body);
    if (updated) {
        res.send(updated);
    } else {
        res.status(400).send();
    }
});

router.delete("/:workId", (req, res) => {
    const deleted = db.deleteFromDatabasebyId(model, req.workId);
    if (deleted) {
        res.status(204).send();
    }
});

module.exports = router;