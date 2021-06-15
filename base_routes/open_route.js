const express = require("express");
const router = express.Router();


router.use("/api/v1/auth", require("../app_modules/authentication/route"));


module.exports = router;
