const { getUsersData } = require("../fileService/userFileService");
const {
  getAllPreferencesNews,
  getNewsBasedOnPreferences,
} = require("../thirdPartyApi/newsApiService");

const users = getUsersData();
let news;
const getNews = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = users.find((user) => (user.id = userId));
    if (!Object.keys(user.preferences).length) {
      const newsObj = await getAllPreferencesNews();
      news = newsObj.news;
      return res.status(200).json(newsObj);
    }
    const newsObj = await getNewsBasedOnPreferences(user.preferences);
    return res.status(200).json(newsObj);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const postReadNews = (req, res) => {
  try {
    const article = req.body;

    addToRead(article);
    res.status(201).json({ message: "Article marked as read" });
  } catch (err) {
    console.error("Error adding to read:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const postFavoriteNews = (req, res) => {
  try {
    const article = req.body;
    if (!article || !article.title) {
      return res.status(400).json({ message: "Article data is required" });
    }
    addToFavorites(article);
    res.status(201).json({ message: "Article added to favorites" });
  } catch (err) {
    console.error("Error adding to favorites:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getReadNews = (req, res) => {
  try {
    const readNews = getReadNews();
    const newsRead = readNews.find((news) => (news.id = req.params.id));
    res.status(200).json({ read: newsRead });
  } catch (err) {
    console.error("Error getting read articles:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFavoriteNews = (req, res) => {
  try {
    const favoriteNews = getFavoriteNews();
    const newsFavorite = favoriteNews.find((news) => (news.id = req.params.id));
    res.status(200).json({ favorite: newsFavorite });
  } catch (err) {
    console.error("Error getting favorites:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNewsBasedOnSearch = async (req, res) => {
  try {
    const keyword = req.params.keyword;

    if (!keyword || keyword.trim() === "") {
      return res.status(400).json({ message: "Search keyword is required" });
    }

    const url = `${BASE_URL}/everything?q=${encodeURIComponent(
      keyword
    )}&apiKey=${NEWS_API_KEY}`;

    const response = await axios.get(url);
    res.status(200).json(response.data);
  } catch (err) {
    console.error("Search error:", err);
    res.status(500).json({ message: "Search failed" });
  }
};

module.exports = {
  getNews,
  postReadNews,
  postFavoriteNews,
  getReadNews,
  getFavoriteNews,
  getNewsBasedOnSearch,
};
