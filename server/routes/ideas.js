const express = require("express");
const router = express.Router();
const db = require("../db");

const model = "ideas";

router.param("ideaId", (req, res, next, id) => {
    const found = db.getFromDatabaseById(model, id);
    if (found) {
        req.ideaId = id;
        next();
    } else {
        res.status(404).send();
    }
});

router.get("", (req, res) => {
    res.send(db.getAllFromDatabase(model));
});

router.get("/:ideaId", (req, res) => {
    res.send(db.getFromDatabaseById(model, req.ideaId));
});

router.post("", (req, res) => {
    const newItem = db.addToDatabase(model, req.body);
    if (newItem) {
        res.status(201).send(newItem);
    } else {
        res.status(500).send();
    }
});

router.put("/:ideaId", (req, res) => {
    res.send(db.updateInstanceInDatabase(model, req.body));
});

router.delete("/:ideaId", (req, res) => {
    const deleted = db.deleteFromDatabasebyId(model, req.ideaId);
    if (deleted) {
        res.status(204).send();
    }
});

module.exports = router;