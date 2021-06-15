const express = require("express");
const router = express.Router();
const authController = require("./controller");

router.post("/login", authController.userLogin);

router.post("/register", authController.userRegister);


module.exports = router;
