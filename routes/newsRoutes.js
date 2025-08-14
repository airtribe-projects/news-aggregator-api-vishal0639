const express = require("express");
const router = express.Router();
const preferencesController = require("../controllers/newsController");

router.route("/").get(preferencesController.getAllPreferences);
router.route("/").put(preferencesController.getBasedOnSourcePreferences);

module.exports = router;
