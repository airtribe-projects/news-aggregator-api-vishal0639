const express = require("express");
const userController = require("../controllers/userController");
const {
  validateRegisterBody,
  validateLoginBody,
  validateUpdatePreferenceBody,
} = require("../middlewares/validateBody");
const isAuthenticated = require("../middlewares/authMiddleware");
const { getAllPreferences } = require("../controllers/newsController");
const router = express.Router();

router.post("/register", validateRegisterBody, userController.registerUser);

router.post("/login", validateLoginBody, userController.loginUser);

router
  .route("/preferences")
  .get(isAuthenticated, userController.getAllPreferences);

router
  .route("/preferences")
  .patch(
    isAuthenticated,
    validateUpdatePreferenceBody,
    userController.updatePreferences
  );

module.exports = router;
