const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const validateBody = require("../middlewares/validateBody");
const router = express.Router();

router.post("/register",validateBody, registerUser);

router.post("/login",validateBody,loginUser);

module.exports = router;
