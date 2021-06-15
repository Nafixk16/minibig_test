const express = require("express");
const router = express.Router();

router.use("/api/v1/task", require("../app_modules/task/route"));
router.use("/api/v1/categories", require("../app_modules/categories/route"));

module.exports = router;
