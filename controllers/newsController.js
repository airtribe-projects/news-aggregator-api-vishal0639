const {
  getAllPreferencesNews,
  getNewsBasedOnPreferences,
} = require("../thirdPartyApi/newsApiService");
const { getUsersData } = require("../utils/fileService");

const users = getUsersData();

const getNews = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = users.find((user) => (user.id = userId));
    if (!Object.keys(user.preferences).length) {
      const newsObj = await getAllPreferencesNews();
      return res.status(200).json(newsObj);
    }
    const newsObj =await getNewsBasedOnPreferences(user.preferences);
    return res.status(200).json(newsObj);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getNews,
};
