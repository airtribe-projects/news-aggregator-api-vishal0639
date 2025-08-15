const fs = require("fs");
const path = require("path");

const NEWS_FILE = path.join(__dirname, "../news.json");

// Helper to read JSON file
const getNewsData = () => {
  try {
    const rawData = fs.readFileSync(NEWS_FILE, "utf-8");
    const parsed = JSON.parse(rawData);

    return parsed.news || { favorite: [], read: [] };
  } catch (err) {
    console.error("Failed to read news.json:", err);
    return { favorite: [], read: [] };
  }
};

// Helper to save data back to file
const saveNewsData = (news) => {
  try {
    fs.writeFileSync(
      NEWS_FILE,
      JSON.stringify({ news }, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.error("Failed to write news.json:", err);
    throw err;
  }
};

// ✅ Add to favorites (if not already added)
const addToFavorites = (article) => {
  const data = getNewsData();

  const alreadyExists = data.favorite.some(
    (item) => item.title === article.title
  );
  if (!alreadyExists) {
    data.favorite.push(article);
    saveNewsData(data);
  }
};

// ✅ Add to read (if not already added)
const addToRead = (article) => {
  const data = getNewsData();

  const alreadyExists = data.read.some(
    (item) => item.title === article.title
  );
  if (!alreadyExists) {
    data.read.push(article);
    saveNewsData(data);
  }
};

module.exports = {
  getNewsData,
  addToFavorites,
  addToRead,
};
