const fs = require("fs");
const path = require("path");

const NEWS_FILE = path.join(__dirname, "../news.json");

// ✅ Read data from news.json
const getNewsData = () => {
  try {
    const rawData = fs.readFileSync(NEWS_FILE, "utf-8");
    const parsed = JSON.parse(rawData);

    return {
      news: parsed.news || [],
      "favorite-news": parsed["favorite-news"] || [],
      "read-news": parsed["read-news"] || [],
    };
  } catch (err) {
    console.error("Failed to read news.json:", err);
    return {
      news: [],
      "favorite-news": [],
      "read-news": [],
    };
  }
};

// ✅ Write data back to news.json
const saveNewsData = (data) => {
  try {
    fs.writeFileSync(NEWS_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Failed to write news.json:", err);
    throw err;
  }
};

// ✅ Add article to favorite-news (if not already present)
const addToFavorites = (article) => {
  const data = getNewsData();

  const alreadyExists = data["favorite-news"].some(
    (item) => item.title === article.title
  );

  if (!alreadyExists) {
    data["favorite-news"].push(article);
    saveNewsData(data);
  }
};

// ✅ Add article to read-news (if not already present)
const addToRead = (article) => {
  const data = getNewsData();

  const alreadyExists = data["read-news"].some(
    (item) => item.title === article.title
  );

  if (!alreadyExists) {
    data["read-news"].push(article);
    saveNewsData(data);
  }
};

// ✅ Optional helpers to get favorites and reads directly
const getFavoriteNews = () => getNewsData()["favorite-news"];
const getReadNews = () => getNewsData()["read-news"];

module.exports = {
  getNewsData,
  saveNewsData,
  addToFavorites,
  addToRead,
  getFavoriteNews,
  getReadNews,
};
