const express = require("express");
const router = express.Router();
const db = require("../db");

const model = "meetings";

router.get("", (req, res) => {
    res.send(db.getAllFromDatabase(model));
});

router.post("", (req, res) => {
    const newMeeting = db.createMeeting();
    const saved = db.addToDatabase(model, newMeeting);
    if (saved) {
        res.status(201).send(saved);
    }
});

router.delete("", (req, res) => {
    const allDeleted = db.deleteAllFromDatabase(model);
    if (allDeleted !== null) {
        res.status(204).send();
    }
});

module.exports = router;