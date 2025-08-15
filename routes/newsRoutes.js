const express = require("express");
const router = express.Router();
const newController = require("../controllers/newsController");

router.route("/").get(newController.getNews);
// router.route("/").put(newController);

module.exports = router;
