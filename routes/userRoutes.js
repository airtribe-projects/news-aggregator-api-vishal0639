const express = require("express");
const { registerUser, loginUser } = require("../controllers/userController");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdatePreferenceBody,
} = require("../middlewares/validateBody");
const isAuthenticated = require("../middlewares/authMiddleware");
const { getAllPreferences } = require("../controllers/newsController");
const router = express.Router();

router.post("/register", validateRegisterBody, registerUser);

router.post("/login", validateLoginBody, loginUser);

router.route("/preferences").get(isAuthenticated, getAllPreferences);

router.route("/preferences").post(isAuthenticated,validateUpdatePreferenceBody);

module.exports = router;
