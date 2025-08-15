const express = require("express");
const router = express.Router();
const newController = require("../controllers/newsController");

router.route("/").get(newController.getNews);

router.route("/:id/read").post(newController.postReadNews);

router.route("//news/:id/favorite").post(newController.postFavoriteNews);

router.route("/news/read").post(newController.getReadNews);

router.route("/news/favorites").get(newController.getFavoriteNews);

router.route("/news/search/:keyword").get(newController.getNewsBasedOnSearch);

module.exports = router;
