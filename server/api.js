const express = require('express');
const apiRouter = express.Router();

apiRouter.use("/minions", require("./routes/minions"));
apiRouter.use("/ideas", require("./routes/ideas"));
apiRouter.use("/meetings", require("./routes/meetings"));

module.exports = apiRouter;
