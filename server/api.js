const express = require('express');
const router = express.Router();

router.use("/minions", require("./routes/minions"));
router.use("/ideas", require("./routes/ideas"));
router.use("/meetings", require("./routes/meetings"));

module.exports = router;